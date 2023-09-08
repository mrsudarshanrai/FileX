use std::ffi::OsStr;

pub fn option_to_string(option: Option<&OsStr>) -> String {
    option
        .unwrap_or(OsStr::new(""))
        .to_owned()
        .to_string_lossy()
        .to_string()
}
