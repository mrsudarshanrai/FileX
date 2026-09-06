use crate::helper;
use crate::utils;
use std::fs;
use std::path::PathBuf;

const FILE_URI_PREFIX: &str = "file://";

/** The bookmarks file is shared with other GTK file managers */
fn bookmarks_file() -> PathBuf {
  let config_home = match std::env::var("XDG_CONFIG_HOME") {
    Ok(dir) if !dir.is_empty() => PathBuf::from(dir),
    _ => PathBuf::from(helper::get_home()).join(".config"),
  };

  config_home.join("gtk-3.0").join("bookmarks")
}

/**
 * A line is a URI, optionally followed by a space and a display label:
 *   file:///home/fox/projects projects
 * Without a label the basename is shown instead.
 */
fn parse_line(line: &str) -> Option<helper::Place> {
  let line = line.trim();
  if line.is_empty() {
    return None;
  }

  let (uri, label) = match line.split_once(' ') {
    Some((uri, label)) => (uri, Some(label.trim())),
    None => (line, None),
  };

  // Entries FileX cannot navigate to, such as smb:// or sftp://, are skipped
  let encoded_path = uri.strip_prefix(FILE_URI_PREFIX)?;
  let path = utils::percent_decode(encoded_path);
  if path.is_empty() {
    return None;
  }

  let name = match label {
    Some(label) if !label.is_empty() => label.to_string(),
    _ => utils::get_full_filename_from_path(&path),
  };

  Some(helper::Place { name, path })
}

/** Trailing slashes would otherwise make the same folder look like two bookmarks */
fn normalize(path: &str) -> String {
  let trimmed = path.trim_end_matches('/');
  if trimmed.is_empty() {
    String::from("/")
  } else {
    trimmed.to_string()
  }
}

pub fn list_bookmarks() -> Vec<helper::Place> {
  let contents = match fs::read_to_string(bookmarks_file()) {
    Ok(contents) => contents,
    Err(_) => {
      return Vec::new();
    }
  };

  contents.lines().filter_map(parse_line).collect()
}

/**
 * adds a new bookmark to the bookmarks file without removing existing entries, ensuring
 * compatibility with other file managers that may use different URI schemes.
 */
pub fn add_bookmark(path: String) -> Result<(), String> {
  let normalized = normalize(&path);

  if
    list_bookmarks()
      .iter()
      .any(|bookmark| normalize(&bookmark.path) == normalized)
  {
    return Ok(());
  }

  let file = bookmarks_file();
  if let Some(parent) = file.parent() {
    fs::create_dir_all(parent).map_err(|error| error.to_string())?;
  }

  let mut contents = fs::read_to_string(&file).unwrap_or_default();
  if !contents.is_empty() && !contents.ends_with('\n') {
    contents.push('\n');
  }

  contents.push_str(
    &format!(
      "{}{} {}\n",
      FILE_URI_PREFIX,
      utils::percent_encode(&normalized),
      utils::get_full_filename_from_path(&normalized)
    )
  );

  fs::write(&file, contents).map_err(|error| error.to_string())
}

/**
 * removes a bookmark from the bookmarks file, if it is identified by parse_line ,
 */
pub fn remove_bookmark(path: String) -> Result<(), String> {
  let normalized = normalize(&path);
  let file = bookmarks_file();

  let contents = match fs::read_to_string(&file) {
    Ok(contents) => contents,
    Err(_) => {
      return Ok(());
    }
  };

  let kept: Vec<&str> = contents
    .lines()
    .filter(|line| {
      match parse_line(line) {
        Some(bookmark) => normalize(&bookmark.path) != normalized,
        None => true,
      }
    })
    .collect();

  let mut remaining = kept.join("\n");
  if !remaining.is_empty() {
    remaining.push('\n');
  }

  fs::write(&file, remaining).map_err(|error| error.to_string())
}
