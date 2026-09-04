#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod entry;
mod file_manager;
mod folder_manager;
mod helper;
mod thumbnail;
mod trash;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            entry::create_folder,
            entry::get_initial_data,
            entry::get_files_in_path,
            entry::delete_path,
            entry::move_to_trash,
            entry::restore_from_trash,
            entry::purge_trash,
            entry::empty_trash,
            entry::copy_to_path,
            entry::move_to_path,
            entry::open_file,
            entry::get_properties,
            entry::calculate_directory_size,
            entry::rename,
            entry::get_disk_usage,
            entry::get_thumbnail
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
