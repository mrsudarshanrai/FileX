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

pub fn list_bookmarks() -> Vec<helper::Place> {
  let contents = match fs::read_to_string(bookmarks_file()) {
    Ok(contents) => contents,
    Err(_) => {
      return Vec::new();
    }
  };

  contents.lines().filter_map(parse_line).collect()
}
