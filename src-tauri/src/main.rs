#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod entry;
mod file_manager;
mod folder_manager;
mod helper;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            helper::get_home,
            entry::create_folder,
            entry::get_all_dir,
            entry::get_files_in_path,
            entry::delete_path,
            entry::copy_to_path,
            entry::open_file,
            entry::get_properties,
            entry::calculate_directory_size,
            entry::rename
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
