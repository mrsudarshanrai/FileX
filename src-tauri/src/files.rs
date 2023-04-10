use std::{fs::{self}, path::{PathBuf}};
use serde::Serialize;

use crate::utils;
use crate::command;

#[derive(Serialize)]
#[derive(Debug)]
pub struct Files {
    pub path:PathBuf,
    pub is_dir:bool,
    pub extension:String,
    pub folder_name:String,
    pub is_visible:bool
}
#[tauri::command]
pub fn get_files_in_path(path: &str) -> Result<Vec<Files>, String> {
    let mut dirs:Vec<Files> = Vec::new();
    
    for(_ , entry) in fs::read_dir(path).unwrap().enumerate(){
        let entry = entry.unwrap();
        let path = entry.path();
        let extension = utils::option_to_string(path.extension());
        let is_dir = path.is_dir();
        let folder_name = utils::option_to_string(path.file_name());
        let is_visible = !folder_name.starts_with(".");

        let file = Files {
            path,
            is_dir,
            extension,
            folder_name,
            is_visible
        };
        dirs.push(file);
    }
    Ok(dirs)
}

#[tauri::command]
pub fn get_all_dir() -> Result<Vec<Files>, String>{
    let home_dir =command::get_home();
    let mut dirs:Vec<Files> = Vec::new();
    
    for(_ , entry) in fs::read_dir(home_dir).unwrap().enumerate(){
        let entry = entry.unwrap();
        let path = entry.path();
        let extension = utils::option_to_string(path.extension());
        let is_dir = path.is_dir();
        let folder_name =utils::option_to_string(path.file_name());
        let is_visible = !folder_name.starts_with(".");


        let file = Files {
            path,
            is_dir,
            extension,
            folder_name,
            is_visible
        };
        dirs.push(file);
    }
    Ok(dirs)
}


