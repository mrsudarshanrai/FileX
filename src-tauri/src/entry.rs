use crate::file_manager::File;
use crate::file_manager::FileProperties;
use crate::folder_manager::CreateFolderResponse;
use crate::folder_manager::Folder;
use crate::helper;
use crate::utils;
use std::path::Path;
use std::time::Duration;
use tauri::Manager;
use tokio::time;

#[tauri::command]
pub fn get_files_in_path(path: &str) -> Result<Vec<helper::Files>, String> {
    helper::get_files(path.to_string())
}

#[tauri::command]
pub fn get_all_dir() -> Result<Vec<helper::Files>, String> {
    helper::get_files(helper::get_home())
}

/** Create new folder */
#[tauri::command]
pub fn create_folder(folder_path: String) -> Result<CreateFolderResponse, String> {
    Folder::create(folder_path)
}

/** Delete File/Folder */
#[tauri::command]
pub fn delete_path(path: String) -> String {
    match File::get_metadata(&path) {
        Ok(metadata) => {
            if metadata.is_file() {
                match File::delete(&path) {
                    Ok(_) => String::from("File deleted"),
                    Err(_) => String::from("Failed to delete file"),
                }
            } else {
                match Folder::delete(&path) {
                    Ok(_) => String::from("Folder deleted"),
                    Err(_) => String::from("Failed to delete folder"),
                }
            }
        }
        Err(_) => String::from("Invalid path"),
    }
}

/** Copy File/Folder */
#[tauri::command]
pub async fn copy_to_path(from: String, to: String) -> String {
    if File::has_valid_metadata(&from) && File::has_valid_metadata(&to) {
        if File::is_file(&from) && !File::is_file(&to) {
            let result = File::copy(&from, &to).await;
            match result {
                Ok(_) => String::from("File copied"),
                Err(_) => String::from("Failed to copy"),
            }
        } else {
            let dest_path = format!("{}/{}", to, utils::get_full_filename_from_path(&from));
            let result = Folder::copy(&from, &dest_path).await;
            match result {
                Ok(_) => String::from("Folder copied"),
                Err(_) => String::from("Failed to copy Folder"),
            }
        }
    } else {
        String::from("Not a valid path")
    }
}

#[tauri::command]
pub fn open_file(path: String) -> String {
    File::open(&path)
}

#[tauri::command]
pub async fn get_properties(path: String) -> Result<FileProperties, String> {
    File::properties(path).await
}

#[derive(Clone, serde::Serialize, Debug)]
struct DirectorySize {
    file_count: u64,
    size: u64,
}

#[tauri::command]
pub async fn calculate_directory_size(app: tauri::AppHandle, dir_path: String) {
    let mut interval = time::interval(Duration::from_secs(3));
    let mut total_size = 0;
    let mut file_count = 0;
    let app_handle = app.clone();

    interval.tick().await;
    tokio::spawn(async move {
        let path = Path::new(&dir_path);
        helper::calculate_file_size_recursive(path, &mut total_size, &mut file_count).await;
        let payload = DirectorySize {
            size: total_size,
            file_count: file_count,
        };
        app_handle
            .emit_all("calculate_directory_size", payload)
            .unwrap();
    });
}

#[tauri::command]
pub async fn rename(path: String, new_name: String) -> String {
    File::rename(path, new_name).await
}
