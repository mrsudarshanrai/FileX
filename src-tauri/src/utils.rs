use std::{
    ffi::OsStr,
    fs::{self},
};

pub fn option_to_string(option: Option<&OsStr>) -> String {
    option
        .unwrap_or(OsStr::new(""))
        .to_owned()
        .to_string_lossy()
        .to_string()
}

/** check if provided path metadata */
pub fn has_valid_metadata(path: &String) -> bool {
    fs::metadata(&path).is_ok()
}

/** Ensure this function is called after validating the metadata using 'metadata.is_ok()' */
pub fn is_file(path: &String) -> bool {
    fs::metadata(&path).unwrap().is_file()
}

pub fn get_full_filename_from_path(path: &String) -> String {
    let chunk = path.split("/").last().unwrap();
    chunk.to_string()
}
