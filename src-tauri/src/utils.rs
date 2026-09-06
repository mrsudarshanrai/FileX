use chrono::{DateTime, Utc};
use std::{ffi::OsStr, time::SystemTime};
pub fn option_to_string(option: Option<&OsStr>) -> String {
    option
        .unwrap_or(OsStr::new(""))
        .to_owned()
        .to_string_lossy()
        .to_string()
}

pub fn get_full_filename_from_path(path: &String) -> String {
    let chunk = path.split("/").last().unwrap();
    chunk.to_string()
}

pub fn get_filename_and_extension_from_path(full_filename: &str) -> (&str, &str) {
    let parts: Vec<&str> = full_filename.rsplitn(2, ".").collect();
    match parts.len() {
        2 => (parts[1], parts[0]), // filename and extension
        _ => (full_filename, ""),  // no extension found
    }
}

pub fn sys_time_to_date_time(sys_time: SystemTime) -> String {
    let datetime: DateTime<Utc> = sys_time.into();
    datetime.to_rfc3339()
}

/**
 * URL-encoding shared by the .trashinfo Path field and by file:// bookmark URIs,
 * so a name containing a space or '@' round-trips through other file managers.
 */
pub fn percent_encode(value: &str) -> String {
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

pub fn percent_decode(value: &str) -> String {
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
