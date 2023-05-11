#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;
mod command;
mod utils;

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
            command::get_home,
            files::get_all_dir,
            files::get_files_in_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
    