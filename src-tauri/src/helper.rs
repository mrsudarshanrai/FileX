use crate::utils;
use async_recursion::async_recursion;
use serde::{ Deserialize, Serialize };
use std::{ env, fs::{ self }, path::{ Path, PathBuf }, process::Command, sync::OnceLock };

pub fn get_home() -> String {
  let home_dir = match env::var("HOME") {
    Ok(val) => val,
    Err(_) => panic!("Failed to get HOME directory"),
  };

  home_dir
}

#[derive(Serialize, Debug)]
pub struct Files {
  pub path: PathBuf,
  pub is_dir: bool,
  pub extension: String,
  pub folder_name: String,
  pub is_visible: bool,
  pub thumbnail: String,
  pub is_image: bool,
}

const DEFAULT_FILE_THUMBNAIL: &str = "/assets/file.svg";
const FOLDER_THUMBNAIL: &str = "/assets/folder.svg";
const FILE_TYPES_JSON: &str = include_str!("../../app/lib/files.json");

#[derive(Deserialize)]
struct FileTypeEntry {
  #[serde(default)]
  extensions: Vec<String>,
  #[serde(default, rename = "fileNames")]
  file_names: Vec<String>,
  #[serde(default, rename = "type")]
  type_name: String,
  thumbnail: String,
}

fn file_types() -> &'static Vec<FileTypeEntry> {
  static FILE_TYPES: OnceLock<Vec<FileTypeEntry>> = OnceLock::new();
  FILE_TYPES.get_or_init(|| serde_json::from_str(FILE_TYPES_JSON).unwrap_or_default())
}

fn is_image_extension(extension: &str) -> bool {
  if extension.is_empty() {
    return false;
  }

  file_types()
    .iter()
    .find(|entry| entry.type_name == "Image")
    .map(|entry| entry.extensions.iter().any(|ext| ext.eq_ignore_ascii_case(extension)))
    .unwrap_or(false)
}

pub fn resolve_thumbnail(folder_name: &str, extension: &str, is_dir: bool) -> String {
  if is_dir {
    return FOLDER_THUMBNAIL.to_string();
  }

  let entries = file_types();

  if !extension.is_empty() {
    if
      let Some(entry) = entries
        .iter()
        .find(|entry| entry.extensions.iter().any(|ext| ext.eq_ignore_ascii_case(extension)))
    {
      return entry.thumbnail.clone();
    }
  }

  if
    let Some(entry) = entries
      .iter()
      .find(|entry| { entry.file_names.iter().any(|name| name.eq_ignore_ascii_case(folder_name)) })
  {
    return entry.thumbnail.clone();
  }

  DEFAULT_FILE_THUMBNAIL.to_string()
}

pub fn get_files(path: String) -> Result<Vec<Files>, String> {
  let mut dirs: Vec<Files> = Vec::new();

  for (_, entry) in fs::read_dir(path).unwrap().enumerate() {
    let entry = entry.unwrap();
    let path = entry.path();
    let extension = utils::option_to_string(path.extension());
    let is_dir = path.is_dir();
    let folder_name = utils::option_to_string(path.file_name()).trim().to_string();
    let is_visible = !folder_name.starts_with(".");
    let thumbnail = resolve_thumbnail(&folder_name, &extension, is_dir);
    let is_image = !is_dir && is_image_extension(&extension);

    let file = Files {
      path,
      is_dir,
      extension,
      folder_name,
      is_visible,
      thumbnail,
      is_image,
    };
    dirs.push(file);
  }
  dirs.retain(|a| !a.folder_name.starts_with("."));
  dirs.sort_by(|a, b| {
    b.is_dir
      .cmp(&a.is_dir)
      .then_with(|| a.folder_name.to_lowercase().cmp(&b.folder_name.to_lowercase()))
  });
  Ok(dirs)
}

#[derive(Serialize, Debug)]
pub struct Place {
  pub name: String,
  pub path: String,
}

fn xdg_user_dir(key: &str) -> Option<String> {
  let output = Command::new("xdg-user-dir").arg(key).output().ok()?;
  if !output.status.success() {
    return None;
  }
  let path = String::from_utf8_lossy(&output.stdout).trim().to_string();
  if path.is_empty() {
    None
  } else {
    Some(path)
  }
}

pub fn get_places() -> Vec<Place> {
  let home = get_home();
  let categories = [
    ("DESKTOP", "Desktop"),
    ("DOCUMENTS", "Documents"),
    ("DOWNLOAD", "Downloads"),
    ("MUSIC", "Music"),
    ("PICTURES", "Pictures"),
    ("VIDEOS", "Videos"),
  ];

  categories
    .iter()
    .filter_map(|(key, label)| {
      let path = xdg_user_dir(key).unwrap_or_else(|| format!("{}/{}", home, label));
      if path == home || !Path::new(&path).is_dir() {
        return None;
      }
      Some(Place { name: label.to_string(), path })
    })
    .collect()
}

#[derive(Serialize, Debug)]
pub struct DiskUsage {
  pub total: u64,
  pub used: u64,
  pub available: u64,
}

pub fn get_disk_usage(path: &str) -> Option<DiskUsage> {
  let output = Command::new("df").env("LC_ALL", "C").arg("-Pk").arg(path).output().ok()?;
  if !output.status.success() {
    return None;
  }

  let stdout = String::from_utf8_lossy(&output.stdout);
  let line = stdout.lines().nth(1)?;
  let columns: Vec<&str> = line.split_whitespace().collect();
  if columns.len() < 4 {
    return None;
  }

  let total = columns[1].parse::<u64>().ok()? * 1024;
  let used = columns[2].parse::<u64>().ok()? * 1024;
  let available = columns[3].parse::<u64>().ok()? * 1024;

  Some(DiskUsage { total, used, available })
}

#[derive(Debug)]
pub enum XDGSearchResult {
  Found(String),
  NotFound,
}

pub fn get_file_mime_type(path: &str) -> Result<XDGSearchResult, String> {
  let mime_type = Command::new("xdg-mime").arg("query").arg("filetype").arg(path).output();
  match mime_type {
    Ok(output) => {
      if output.status.success() {
        let mime_type = String::from_utf8_lossy(&output.stdout).trim().to_string();
        Ok(XDGSearchResult::Found(mime_type))
      } else {
        Ok(XDGSearchResult::NotFound)
      }
    }
    Err(_) => Err(String::from("mime_type_not_found")),
  }
}

pub fn get_default_file_opener(mime_type: String) -> Result<XDGSearchResult, String> {
  let default_opener_output = Command::new("xdg-mime")
    .arg("query")
    .arg("default")
    .arg(mime_type)
    .output();
  match default_opener_output {
    Ok(output) => {
      if output.status.success() {
        let default_opener = String::from_utf8_lossy(&output.stdout).trim().to_string();
        if default_opener.is_empty() {
          Ok(XDGSearchResult::NotFound)
        } else {
          Ok(XDGSearchResult::Found(default_opener))
        }
      } else {
        Ok(XDGSearchResult::NotFound)
      }
    }
    Err(_) => Err(String::from("mime_type_not_found")),
  }
}

pub fn open_file_with_default_file_opener(path: &String) -> String {
  let res = Command::new("xdg-open").arg(path).status();
  match res {
    Ok(status) => {
      if status.success() { String::from("success") } else { String::from("unable_to_open_file") }
    }
    Err(_) => String::from("unable_to_open_file"),
  }
}

#[async_recursion]
pub async fn calculate_file_size_recursive(
  path: &Path,
  total_size: &mut u64,
  file_count: &mut u64
) {
  if let Ok(entries) = fs::read_dir(path) {
    for entry in entries {
      if let Ok(entry) = entry {
        let metadata = entry.metadata().map_err(|e| e.to_string());
        if let Ok(metadata) = metadata {
          if metadata.is_file() {
            *total_size += metadata.len();
            *file_count += 1;
          } else if metadata.is_dir() {
            calculate_file_size_recursive(&entry.path(), total_size, file_count).await;
          }
        }
      }
    }
  }
}
