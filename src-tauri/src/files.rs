use std::fs::{self};

use crate::helper;
use crate::utils;

#[tauri::command]
pub fn get_files_in_path(path: &str) -> Result<Vec<helper::Files>, String> {
    helper::get_files(path.to_string())
}

#[tauri::command]
pub fn get_all_dir() -> Result<Vec<helper::Files>, String> {
    helper::get_files(helper::get_home())
}

/**
 * Create new folder
 * creates a new folder called Untitled Folder in the path provided,
 * if folder name exisit , it will create new Untitled Folder<with folder count>
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

/** */
/**
 * Delete File/Folder
 */
#[tauri::command]
pub fn delete_path(path: String) -> String {
    let path_metadata = fs::metadata(&path);

    match path_metadata {
        Ok(metadata) => {
            if metadata.is_file() {
                match helper::delete_file(&path) {
                    Ok(_) => String::from("File deleted"),
                    Err(_) => String::from("Failed to delete file"),
                }
            } else {
                match helper::delete_folder(&path) {
                    Ok(_) => String::from("Folder deleted"),
                    Err(_) => String::from("Failed to delete folder"),
                }
            }
        }
        Err(_) => String::from("Invalid path"),
    }
}

/**
 * Copy File/Folder
 */

#[tauri::command]
pub fn copy_to_path(from: String, to: String) -> String {
    if utils::has_valid_metadata(&from) && utils::has_valid_metadata(&to) {
        if utils::is_file(&from) && !utils::is_file(&to) {
            let new_destination_path =
                format!("{}/{}", &to, utils::get_full_filename_from_path(&from));
            match helper::copy_file(&from, &new_destination_path) {
                Ok(_) => String::from("File copied"),
                Err(_) => String::from("Failed to copy"),
            }
        } else {
            String::from("Not a valid")
        }
    } else {
        String::from("Not a valid path")
    }
}
