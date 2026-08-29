use crate::helper::get_home;
use std::{
  collections::hash_map::DefaultHasher,
  fs,
  hash::{ Hash, Hasher },
  path::PathBuf,
};

const THUMBNAIL_SIZE: u32 = 160;

fn cache_dir() -> PathBuf {
  PathBuf::from(get_home()).join(".cache/filex/thumbnails")
}

fn cache_path(path: &str, modified: u64, size: u64) -> PathBuf {
  let mut hasher = DefaultHasher::new();
  path.hash(&mut hasher);
  modified.hash(&mut hasher);
  size.hash(&mut hasher);
  let key = hasher.finish();

  cache_dir().join(format!("{:x}.jpg", key))
}

pub fn generate_thumbnail(path: &str) -> Option<String> {
  let metadata = fs::metadata(path).ok()?;
  let modified = metadata.modified().ok()?.duration_since(std::time::UNIX_EPOCH).ok()?.as_secs();
  let cache_file = cache_path(path, modified, metadata.len());

  if cache_file.exists() {
    return Some(cache_file.to_string_lossy().to_string());
  }

  fs::create_dir_all(cache_dir()).ok()?;

  let img = image::open(path).ok()?;
  let thumbnail = img.thumbnail(THUMBNAIL_SIZE, THUMBNAIL_SIZE);
  thumbnail.into_rgb8().save_with_format(&cache_file, image::ImageFormat::Jpeg).ok()?;

  Some(cache_file.to_string_lossy().to_string())
}
