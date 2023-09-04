use crate::utils;
use serde::Serialize;
use std::{env, fs, path::PathBuf};

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

/**
 * create new folder
 */
#[tauri::command]
pub fn create_folder(folder_path: String) {
    let mut attempt = 1;
    let folder_name_suffix = "Untitled Folder";
    let mut full_folder_path = format!("{} {}", &folder_path, folder_name_suffix);

    // check if folder exist
    while fs::metadata(&full_folder_path).is_ok() {
        attempt += 1;
        full_folder_path = format!("{} {} {}", folder_path, folder_name_suffix, attempt);
    }
    // Create the folder
    if let Err(err) = fs::create_dir_all(&full_folder_path) {
        println!("Failed to create folder: {}", err);
    } else {
        println!("Folder created successfully at: {}", full_folder_path);
    }
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
