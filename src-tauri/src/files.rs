use std::fs;

use crate::helper;

#[tauri::command]
pub fn get_files_in_path(path: &str) -> Result<Vec<helper::Files>, String> {
    helper::get_files(path.to_string())
}

#[tauri::command]
pub fn get_all_dir() -> Result<Vec<helper::Files>, String> {
    helper::get_files(helper::get_home())
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
