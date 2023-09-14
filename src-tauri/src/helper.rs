use crate::utils;
use serde::Serialize;
use std::{
    env,
    fs::{self, Metadata},
    path::PathBuf,
};

#[tauri::command]
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
}

pub fn get_files(path: String) -> Result<Vec<Files>, String> {
    let mut dirs: Vec<Files> = Vec::new();

    for (_, entry) in fs::read_dir(path).unwrap().enumerate() {
        let entry = entry.unwrap();
        let path = entry.path();
        let extension = utils::option_to_string(path.extension());
        let is_dir = path.is_dir();
        let file_info = entry.file_type();
        let folder_name = utils::option_to_string(path.file_name());
        let is_visible = !folder_name.starts_with(".");

        let file = Files {
            path,
            is_dir,
            extension,
            folder_name,
            is_visible,
        };
        dirs.push(file);
    }
    Ok(dirs)
}

/** delete folder  */
pub fn delete_file(path: &String) -> std::io::Result<()> {
    fs::remove_file(path)?;
    Ok(())
}

/** delete folder  */
pub fn delete_folder(path: &String) -> std::io::Result<()> {
    fs::remove_dir_all(path)?;
    Ok(())
}
/** copy file */
pub async fn copy_file(from: &String, to: &String) -> std::io::Result<()> {
    fs::copy(from, to)?;
    Ok(())
}

/** Ensure this function is called after validating the metadata using 'metadata.is_ok()' */
pub fn get_metadata(path: &String) -> Metadata {
    fs::metadata(&path).unwrap()
}

// pub fn get_file_type(file_path: &str) {
//     let output = Command::new("xdg-mime")
//         .arg("query")
//         .arg("filetype")
//         .arg(file_path)
//         .output()
//         .expect("Failed to execute command");

//     if !output.status.success() {
//         let error_message = String::from_utf8_lossy(&output.stderr);
//         println!("Error querying default application: {}", error_message);
//     } else {
//         let default_app = String::from_utf8_lossy(&output.stdout);
//         println!("default application: {:?}", default_app);
//     }
// }

// #[tauri::command]
// pub fn openA(path: String) {
//     open::that(path).unwrap();
// }
