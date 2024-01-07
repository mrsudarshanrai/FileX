#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_manager;
mod files;
mod folder_manager;
mod helper;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            helper::get_home,
            files::create_folder,
            files::get_all_dir,
            files::get_files_in_path,
            files::delete_path,
            files::copy_to_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
