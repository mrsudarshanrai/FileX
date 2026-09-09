use crate::helper;
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::{ Mutex, OnceLock };

/// Sizes to try when a theme has no scalable svg, largest first
const PNG_SIZES: [&str; 8] = ["512x512", "256x256", "128x128", "96x96", "64x64", "48x48", "32x32", "24x24"];

fn icon_base_dirs() -> Vec<PathBuf> {
  let home = helper::get_home();
  [
    PathBuf::from(&home).join(".local/share/icons"),
    PathBuf::from(&home).join(".icons"),
    PathBuf::from("/usr/share/icons"),
    PathBuf::from("/usr/local/share/icons"),
  ]
    .into_iter()
    .filter(|dir| dir.is_dir())
    .collect()
}

/**
 * shared-mime-info's globs file, so no subprocess is needed per lookup.
 * Lines look like `text/markdown:*.md`; an extension can appear more than once
 * (.md is also a Genesis ROM), and the first entry is the authoritative one.
 */
fn mime_by_extension() -> &'static HashMap<String, String> {
  static MIMES: OnceLock<HashMap<String, String>> = OnceLock::new();
  MIMES.get_or_init(|| {
    let mut map = HashMap::new();
    let Ok(contents) = fs::read_to_string("/usr/share/mime/globs") else {
      return map;
    };

    for line in contents.lines() {
      if line.starts_with('#') {
        continue;
      }
      let Some((mime, glob)) = line.split_once(':') else {
        continue;
      };
      let Some(extension) = glob.strip_prefix("*.") else {
        continue;
      };
      if extension.contains('*') || extension.contains('[') {
        continue;
      }
      map.entry(extension.to_lowercase()).or_insert_with(|| mime.to_string());
    }

    map
  })
}

/** GTK apps read settings.ini, so it wins over the gsettings value when they disagree */
fn current_theme() -> String {
  let ini = PathBuf::from(helper::get_home()).join(".config/gtk-3.0/settings.ini");
  if let Ok(contents) = fs::read_to_string(ini) {
    for line in contents.lines() {
      if let Some(value) = line.trim().strip_prefix("gtk-icon-theme-name") {
        let value = value.trim_start_matches([' ', '=']).trim();
        if !value.is_empty() {
          return value.to_string();
        }
      }
    }
  }

  std::process::Command
    ::new("gsettings")
    .args(["get", "org.gnome.desktop.interface", "icon-theme"])
    .output()
    .ok()
    .map(|out| String::from_utf8_lossy(&out.stdout).trim().trim_matches('\'').to_string())
    .filter(|theme| !theme.is_empty())
    .unwrap_or_else(|| String::from("Adwaita"))
}

fn inherits_of(theme: &str) -> Vec<String> {
  for base in icon_base_dirs() {
    let index = base.join(theme).join("index.theme");
    let Ok(contents) = fs::read_to_string(index) else {
      continue;
    };
    for line in contents.lines() {
      if let Some(value) = line.trim().strip_prefix("Inherits=") {
        return value
          .split(',')
          .map(|parent| parent.trim().to_string())
          .filter(|parent| !parent.is_empty())
          .collect();
      }
    }
  }
  Vec::new()
}

/** The theme plus everything it inherits, hicolor last as the spec's final fallback */
fn theme_chain() -> &'static Vec<String> {
  static CHAIN: OnceLock<Vec<String>> = OnceLock::new();
  CHAIN.get_or_init(|| {
    let mut chain = vec![current_theme()];
    let mut index = 0;

    while index < chain.len() {
      for parent in inherits_of(&chain[index]) {
        if !chain.contains(&parent) {
          chain.push(parent);
        }
      }
      index += 1;
    }

    if !chain.iter().any(|theme| theme == "hicolor") {
      chain.push(String::from("hicolor"));
    }
    chain
  })
}

/** Symbolic directories hold monochrome glyphs, which would look wrong beside our own icons */
fn find_icon_file(name: &str) -> Option<PathBuf> {
  for theme in theme_chain() {
    for base in icon_base_dirs() {
      let theme_dir = base.join(theme);
      if !theme_dir.is_dir() {
        continue;
      }

      let scalable = theme_dir.join("scalable/mimetypes").join(format!("{}.svg", name));
      if scalable.is_file() {
        return Some(scalable);
      }

      for size in PNG_SIZES {
        let sized = theme_dir.join(size).join("mimetypes").join(format!("{}.png", name));
        if sized.is_file() {
          return Some(sized);
        }
      }
    }
  }
  None
}

fn lookup(extension: &str) -> Option<String> {
  let mime = mime_by_extension().get(&extension.to_lowercase())?;
  let (media, _) = mime.split_once('/')?;

  // application/json -> application-json, falling back to the media type's generic icon
  let candidates = [mime.replace('/', "-"), format!("{}-x-generic", media)];

  candidates
    .iter()
    .find_map(|name| find_icon_file(name))
    .map(|path| path.to_string_lossy().to_string())
}

/**
 * Resolved per extension rather than per file and memoised, so a directory of
 * thousands of files costs one lookup per distinct extension.
 */
pub fn resolve(extension: &str) -> Option<String> {
  if extension.is_empty() {
    return None;
  }

  static CACHE: OnceLock<Mutex<HashMap<String, Option<String>>>> = OnceLock::new();
  let cache = CACHE.get_or_init(|| Mutex::new(HashMap::new()));
  let key = extension.to_lowercase();

  if let Ok(map) = cache.lock() {
    if let Some(hit) = map.get(&key) {
      return hit.clone();
    }
  }

  let resolved = lookup(&key);
  if let Ok(mut map) = cache.lock() {
    map.insert(key, resolved.clone());
  }
  resolved
}
