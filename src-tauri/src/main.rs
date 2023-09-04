#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;
mod helper;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            helper::get_home,
            helper::create_folder,
            files::get_all_dir,
            files::get_files_in_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
