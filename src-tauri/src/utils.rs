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
    datetime.format("%d/%m/%Y").to_string()
}
