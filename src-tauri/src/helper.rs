use std::{env, path::PathBuf, fs};
use serde::Serialize;
use crate::utils;

#[tauri::command]
pub fn get_home()-> String{
    let home_dir = match env::var("HOME") {
        Ok(val) => val,
        Err(_) => panic!("Failed to get HOME directory"),
    };

    home_dir
}

#[derive(Serialize)]
#[derive(Debug)]
pub struct Files {
    pub path:PathBuf,
    pub is_dir:bool,
    pub extension:String,
    pub folder_name:String,
    pub is_visible:bool,
}

pub fn get_files(path:String) -> Result<Vec<Files>, String> {
    let mut dirs:Vec<Files> = Vec::new();
    
    for(_ , entry) in fs::read_dir(path).unwrap().enumerate(){
        let entry = entry.unwrap();
        let path = entry.path();
        let extension = utils::option_to_string(path.extension());
        let is_dir = path.is_dir();
        let file_info = entry.file_type();
        let folder_name =utils::option_to_string(path.file_name());
        let is_visible = !folder_name.starts_with(".");


        let file = Files {
            path,
            is_dir,
            extension,
            folder_name,
            is_visible,
        };
        dirs.push(file);
    }
    Ok(dirs)

}