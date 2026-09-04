use crate::helper;
use crate::utils;
use chrono::Local;
use serde::Serialize;
use std::fs::{ self, OpenOptions };
use std::io::Write;
use std::os::unix::fs::MetadataExt;
use std::path::{ Path, PathBuf };

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum TrashFailure {
  CrossDevice,
  NotFound,
  Io,
}

#[derive(Serialize, Debug)]
pub struct TrashOutcome {
  pub path: String,
  pub trashed: bool,
  pub reason: Option<TrashFailure>,
}

impl TrashOutcome {
  fn ok(path: &str) -> Self {
    TrashOutcome { path: path.to_string(), trashed: true, reason: None }
  }

  fn failed(path: &str, reason: TrashFailure) -> Self {
    TrashOutcome { path: path.to_string(), trashed: false, reason: Some(reason) }
  }
}

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum RestoreFailure {
  DestinationExists,
  UnknownOrigin,
  Io,
}

#[derive(Serialize, Debug)]
pub struct RestoreOutcome {
  pub path: String,
  pub restored: bool,
  pub restored_to: Option<String>,
  pub reason: Option<RestoreFailure>,
}

/** $XDG_DATA_HOME/Trash, falling back to ~/.local/share/Trash */
pub fn trash_dir() -> PathBuf {
  match std::env::var("XDG_DATA_HOME") {
    Ok(data_home) if !data_home.is_empty() => PathBuf::from(data_home).join("Trash"),
    _ => PathBuf::from(helper::get_home()).join(".local/share/Trash"),
  }
}

pub fn trash_files_dir() -> PathBuf {
  trash_dir().join("files")
}

fn trash_info_dir() -> PathBuf {
  trash_dir().join("info")
}

/** The trash is only created once something is actually thrown away */
fn ensure_trash_dirs() -> std::io::Result<()> {
  fs::create_dir_all(trash_files_dir())?;
  fs::create_dir_all(trash_info_dir())?;
  Ok(())
}

/**
 * The Path field of a .trashinfo is URL-encoded, so a name containing a space
 * or '@' round-trips through other file managers unchanged.
 */
fn percent_encode(value: &str) -> String {
  let mut encoded = String::with_capacity(value.len());
  for byte in value.as_bytes() {
    match byte {
      b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'.' | b'_' | b'~' | b'/' => {
        encoded.push(*byte as char);
      }
      _ => encoded.push_str(&format!("%{:02X}", byte)),
    }
  }
  encoded
}

fn percent_decode(value: &str) -> String {
  let bytes = value.as_bytes();
  let mut decoded: Vec<u8> = Vec::with_capacity(bytes.len());
  let mut index = 0;

  while index < bytes.len() {
    if bytes[index] == b'%' && index + 2 < bytes.len() {
      let hex = std::str::from_utf8(&bytes[index + 1..index + 3]).ok();
      if let Some(byte) = hex.and_then(|h| u8::from_str_radix(h, 16).ok()) {
        decoded.push(byte);
        index += 3;
        continue;
      }
    }
    decoded.push(bytes[index]);
    index += 1;
  }

  String::from_utf8_lossy(&decoded).to_string()
}

/**
 * Claim a free name in the trash by creating its info file with create_new, so
 * two items trashed at once can never take the same slot.
 */
fn claim_trash_name(file_name: &str) -> std::io::Result<(String, fs::File)> {
  let (stem, extension) = utils::get_filename_and_extension_from_path(file_name);
  let info_dir = trash_info_dir();
  let mut attempt = 0;

  loop {
    let candidate = if attempt == 0 {
      file_name.to_string()
    } else if extension.is_empty() {
      format!("{}_{}", stem, attempt)
    } else {
      format!("{}_{}.{}", stem, attempt, extension)
    };

    match
      OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(info_dir.join(format!("{}.trashinfo", candidate)))
    {
      Ok(handle) => {
        return Ok((candidate, handle));
      }
      Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => {
        attempt += 1;
      }
      Err(error) => {
        return Err(error);
      }
    }
  }
}

fn same_filesystem(path: &Path, trash_files: &Path) -> std::io::Result<bool> {
  let source = fs::symlink_metadata(path)?;
  let target = fs::metadata(trash_files)?;
  Ok(source.dev() == target.dev())
}

fn trash_one(path: &str) -> Result<(), TrashFailure> {
  let source = Path::new(path);

  if fs::symlink_metadata(source).is_err() {
    return Err(TrashFailure::NotFound);
  }

  ensure_trash_dirs().map_err(|_| TrashFailure::Io)?;
  let files_dir = trash_files_dir();

  if !same_filesystem(source, &files_dir).map_err(|_| TrashFailure::Io)? {
    return Err(TrashFailure::CrossDevice);
  }

  let file_name = utils::option_to_string(source.file_name());
  let (trash_name, mut info_handle) = claim_trash_name(&file_name).map_err(|_| TrashFailure::Io)?;

  // Canonicalize the parent rather than the item, so trashing a symlink records
  // the link's own path instead of resolving to whatever it points at
  let absolute = source
    .parent()
    .and_then(|parent| fs::canonicalize(parent).ok())
    .and_then(|parent| source.file_name().map(|name| parent.join(name)))
    .map(|resolved| resolved.to_string_lossy().to_string())
    .unwrap_or_else(|| path.to_string());

  let info = format!(
    "[Trash Info]\nPath={}\nDeletionDate={}\n",
    percent_encode(&absolute),
    Local::now().format("%Y-%m-%dT%H:%M:%S")
  );

  let info_path = trash_info_dir().join(format!("{}.trashinfo", trash_name));
  let written = info_handle
    .write_all(info.as_bytes())
    .and_then(|_| fs::rename(source, files_dir.join(&trash_name)));

  if written.is_err() {
    let _ = fs::remove_file(info_path);
    return Err(TrashFailure::Io);
  }

  Ok(())
}

pub fn move_to_trash(paths: Vec<String>) -> Vec<TrashOutcome> {
  paths
    .iter()
    .map(|path| {
      match trash_one(path) {
        Ok(_) => TrashOutcome::ok(path),
        Err(reason) => TrashOutcome::failed(path, reason),
      }
    })
    .collect()
}

/** True when the path is the trash's files directory, which we list specially */
pub fn is_trash_files_dir(path: &str) -> bool {
  Path::new(path) == trash_files_dir()
}

fn info_path_for(name: &str) -> PathBuf {
  trash_info_dir().join(format!("{}.trashinfo", name))
}

/** Read the original path and deletion date back out of a .trashinfo */
fn read_info(name: &str) -> Option<(String, String)> {
  let raw = fs::read_to_string(info_path_for(name)).ok()?;
  let mut original = None;
  let mut deleted_at = None;

  for line in raw.lines() {
    if let Some(value) = line.strip_prefix("Path=") {
      original = Some(percent_decode(value.trim()));
    } else if let Some(value) = line.strip_prefix("DeletionDate=") {
      deleted_at = Some(value.trim().to_string());
    }
  }

  Some((original?, deleted_at.unwrap_or_default()))
}

/**
 * Lists the trash from the info files rather than with helper::get_files, so
 * trashed dotfiles stay visible and every entry carries where it came from.
 */
pub fn list_trash() -> Result<Vec<helper::Files>, String> {
  let files_dir = trash_files_dir();
  if !files_dir.is_dir() {
    return Ok(Vec::new());
  }

  let entries = fs::read_dir(&files_dir).map_err(|error| error.to_string())?;
  let mut items: Vec<helper::Files> = Vec::new();

  for entry in entries {
    let entry = match entry {
      Ok(entry) => entry,
      Err(_) => {
        continue;
      }
    };

    let is_dir = entry
      .file_type()
      .map(|t| t.is_dir())
      .unwrap_or(false);
    let path = entry.path();
    let trash_name = utils::option_to_string(path.file_name());
    let info = read_info(&trash_name);

    // Show the name it had before it was trashed, not the de-duplicated one
    let original_path = info.as_ref().map(|(original, _)| original.clone());
    let display_name = original_path
      .as_ref()
      .map(|original| utils::get_full_filename_from_path(original))
      .unwrap_or_else(|| trash_name.clone());

    let extension = utils::option_to_string(Path::new(&display_name).extension());
    let (thumbnail, is_image) = helper::resolve_file_type(&display_name, &extension, is_dir);

    items.push(helper::Files {
      path,
      is_dir,
      extension,
      folder_name: display_name,
      is_visible: true,
      thumbnail,
      is_image,
      original_path,
      deleted_at: info.map(|(_, deleted_at)| deleted_at),
    });
  }

  items.sort_by_cached_key(|item| (!item.is_dir, item.folder_name.to_lowercase()));
  Ok(items)
}

fn restore_one(path: &str) -> Result<String, RestoreFailure> {
  let trash_name = utils::get_full_filename_from_path(&path.to_string());
  let (original, _) = read_info(&trash_name).ok_or(RestoreFailure::UnknownOrigin)?;
  let destination = Path::new(&original);

  if destination.symlink_metadata().is_ok() {
    return Err(RestoreFailure::DestinationExists);
  }

  if let Some(parent) = destination.parent() {
    fs::create_dir_all(parent).map_err(|_| RestoreFailure::Io)?;
  }

  fs::rename(path, destination).map_err(|_| RestoreFailure::Io)?;
  let _ = fs::remove_file(info_path_for(&trash_name));

  Ok(original)
}

pub fn restore_from_trash(paths: Vec<String>) -> Vec<RestoreOutcome> {
  paths
    .iter()
    .map(|path| {
      match restore_one(path) {
        Ok(restored_to) =>
          RestoreOutcome {
            path: path.clone(),
            restored: true,
            restored_to: Some(restored_to),
            reason: None,
          },
        Err(reason) =>
          RestoreOutcome {
            path: path.clone(),
            restored: false,
            restored_to: None,
            reason: Some(reason),
          },
      }
    })
    .collect()
}

fn purge_one(path: &str) -> std::io::Result<()> {
  let trash_name = utils::get_full_filename_from_path(&path.to_string());
  let target = Path::new(path);

  if target.is_dir() {
    fs::remove_dir_all(target)?;
  } else {
    fs::remove_file(target)?;
  }

  let _ = fs::remove_file(info_path_for(&trash_name));
  Ok(())
}

/** Permanently remove specific items from the trash */
pub fn purge_trash(paths: Vec<String>) -> Vec<TrashOutcome> {
  paths
    .iter()
    .map(|path| {
      match purge_one(path) {
        Ok(_) => TrashOutcome::ok(path),
        Err(_) => TrashOutcome::failed(path, TrashFailure::Io),
      }
    })
    .collect()
}

/** Permanently remove everything in the trash */
pub fn empty_trash() -> Result<(), String> {
  let files_dir = trash_files_dir();
  if !files_dir.is_dir() {
    return Ok(());
  }

  let entries = fs::read_dir(&files_dir).map_err(|error| error.to_string())?;
  for entry in entries.flatten() {
    let _ = purge_one(&entry.path().to_string_lossy());
  }

  // Sweep up any .trashinfo left without a matching item
  if let Ok(info_entries) = fs::read_dir(trash_info_dir()) {
    for entry in info_entries.flatten() {
      let _ = fs::remove_file(entry.path());
    }
  }

  Ok(())
}
