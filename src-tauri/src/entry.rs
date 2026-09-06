use crate::file_manager::File;
use crate::file_manager::FileProperties;
use crate::folder_manager::CreateFolderResponse;
use crate::folder_manager::Folder;
use crate::helper;
use crate::utils;
use crate::trash;
use crate::bookmarks;
use serde::Serialize;
use std::path::Path;
use std::sync::OnceLock;
use std::time::Duration;
use tauri::Emitter;
use tokio::sync::Semaphore;
use tokio::time;

fn copy_semaphore() -> &'static Semaphore {
  static SEM: OnceLock<Semaphore> = OnceLock::new();
  SEM.get_or_init(|| Semaphore::new(2))
}

fn thumbnail_semaphore() -> &'static Semaphore {
  static SEM: OnceLock<Semaphore> = OnceLock::new();
  SEM.get_or_init(|| Semaphore::new(4))
}

#[tauri::command]
pub fn get_files_in_path(path: &str) -> Result<Vec<helper::Files>, String> {
  if trash::is_trash_files_dir(path) {
    return trash::list_trash();
  }
  helper::get_files(path.to_string())
}

#[derive(Serialize)]
pub struct InitialData {
  pub home_path: String,
  pub trash_path: String,
  pub dirs: Vec<helper::Files>,
  pub places: Vec<helper::Place>,
  pub bookmarks: Vec<helper::Place>,
}

#[tauri::command]
pub fn get_initial_data() -> Result<InitialData, String> {
  let home_path = helper::get_home();
  let dirs = helper::get_files(home_path.clone())?;
  let places = helper::get_places();

  let trash_path = trash::trash_files_dir().to_string_lossy().to_string();

  let bookmarks = bookmarks::list_bookmarks();

  Ok(InitialData { home_path, trash_path, dirs, places, bookmarks })
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

#[tauri::command]
pub fn list_bookmarks() -> Vec<helper::Place> {
  bookmarks::list_bookmarks()
}

#[tauri::command]
pub fn add_bookmark(path: String) -> Result<(), String> {
  bookmarks::add_bookmark(path)
}

/** Move File/Folder to the freedesktop trash */
#[tauri::command]
pub fn move_to_trash(paths: Vec<String>) -> Vec<trash::TrashOutcome> {
  trash::move_to_trash(paths)
}

/** Put trashed items back where they came from */
#[tauri::command]
pub fn restore_from_trash(paths: Vec<String>) -> Vec<trash::RestoreOutcome> {
  trash::restore_from_trash(paths)
}

/** Permanently remove specific items from the trash */
#[tauri::command]
pub fn purge_trash(paths: Vec<String>) -> Vec<trash::TrashOutcome> {
  trash::purge_trash(paths)
}

#[tauri::command]
pub fn empty_trash() -> Result<(), String> {
  trash::empty_trash()
}

#[derive(Clone, Serialize, Debug)]
pub struct CopyDonePayload {
  pub operation_id: Option<String>,
  pub success: bool,
  pub message: String,
  pub from: String,
  pub to: String,
  pub destination_path: Option<String>,
}

/** Copy File/Folder (runs in background and emits 'copy_done') */
#[tauri::command]
pub async fn copy_to_path(
  app: tauri::AppHandle,
  from: String,
  to: String,
  operation_id: Option<String>
) -> Result<(), String> {
  if !(File::has_valid_metadata(&from) && File::has_valid_metadata(&to)) {
    return Err(String::from("Not a valid path"));
  }

  let app_handle = app.clone();

  tokio::spawn(async move {
    let _permit = copy_semaphore().acquire().await.unwrap();

    let (success, message, destination_path) = if File::is_file(&from) && !File::is_file(&to) {
      let (from, to) = (from.clone(), to.clone());
      match tokio::task::spawn_blocking(move || File::copy(&from, &to)).await {
        Ok(Ok(path)) => (true, String::from("File copied"), Some(path)),
        _ => (false, String::from("Failed to copy file"), None),
      }
    } else {
      let dest_path = format!("{}/{}", to, utils::get_full_filename_from_path(&from));
      let (from, dest_path_clone) = (from.clone(), dest_path.clone());
      match tokio::task::spawn_blocking(move || Folder::copy(&from, &dest_path_clone)).await {
        Ok(Ok(_)) => (true, String::from("Folder copied"), Some(dest_path)),
        _ => (false, String::from("Failed to copy folder"), None),
      }
    };

    let payload = CopyDonePayload {
      operation_id,
      success,
      message,
      from,
      to,
      destination_path,
    };

    let _ = app_handle.emit("copy_done", payload);
  });

  Ok(())
}

/** Move File/Folder (runs in background and emits 'copy_done') */
#[tauri::command]
pub async fn move_to_path(
  app: tauri::AppHandle,
  from: String,
  to: String,
  operation_id: Option<String>
) -> Result<(), String> {
  if !(File::has_valid_metadata(&from) && File::has_valid_metadata(&to)) {
    return Err(String::from("Not a valid path"));
  }

  let app_handle = app.clone();

  tokio::spawn(async move {
    let _permit = copy_semaphore().acquire().await.unwrap();

    let (success, message, destination_path) = if File::is_file(&from) && !File::is_file(&to) {
      let (from, to) = (from.clone(), to.clone());
      match tokio::task::spawn_blocking(move || File::move_to(&from, &to)).await {
        Ok(Ok(path)) => (true, String::from("File moved"), Some(path)),
        _ => (false, String::from("Failed to move file"), None),
      }
    } else {
      let dest_path = format!("{}/{}", to, utils::get_full_filename_from_path(&from));
      let (from, dest_path_clone) = (from.clone(), dest_path.clone());
      match tokio::task::spawn_blocking(move || Folder::move_to(&from, &dest_path_clone)).await {
        Ok(Ok(path)) => (true, String::from("Folder moved"), Some(path)),
        _ => (false, String::from("Failed to move folder"), None),
      }
    };

    let payload = CopyDonePayload {
      operation_id,
      success,
      message,
      from,
      to,
      destination_path,
    };

    let _ = app_handle.emit("copy_done", payload);
  });

  Ok(())
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
    app_handle.emit("calculate_directory_size", payload).unwrap();
  });
}

#[tauri::command]
pub async fn rename(path: String, new_name: String) -> String {
  File::rename(path, new_name).await
}

#[tauri::command]
pub fn get_disk_usage() -> Option<helper::DiskUsage> {
  helper::get_disk_usage(&helper::get_home())
}

#[tauri::command]
pub async fn get_thumbnail(path: String) -> Option<String> {
  let _permit = thumbnail_semaphore().acquire().await.ok()?;
  tokio::task::spawn_blocking(move || crate::thumbnail::generate_thumbnail(&path)).await.ok()?
}
