use crate::utils;
use async_recursion::async_recursion;
use serde::Serialize;
use std::{
    env,
    fs::{self},
    path::{Path, PathBuf},
    process::Command,
};

#[tauri::command]
pub fn get_home() -> String {
    let home_dir = match env::var("HOME") {
        Ok(val) => val,
        Err(_) => panic!("Failed to get HOME directory"),
    };

    home_dir
}

#[derive(Serialize, Debug)]
pub struct Files {
    pub path: PathBuf,
    pub is_dir: bool,
    pub extension: String,
    pub folder_name: String,
    pub is_visible: bool,
}

pub fn get_files(path: String) -> Result<Vec<Files>, String> {
    let mut dirs: Vec<Files> = Vec::new();

    for (_, entry) in fs::read_dir(path).unwrap().enumerate() {
        let entry = entry.unwrap();
        let path = entry.path();
        let extension = utils::option_to_string(path.extension());
        let is_dir = path.is_dir();
        let folder_name = utils::option_to_string(path.file_name()).trim().to_string();
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
    dirs.retain(|a| !a.folder_name.starts_with("."));
    dirs.sort_by(|a, b| {
        a.folder_name
            .to_lowercase()
            .cmp(&b.folder_name.to_lowercase())
    });
    Ok(dirs)
}

#[derive(Debug)]
pub enum XDGSearchResult {
    Found(String),
    NotFound,
}

pub fn get_file_mime_type(path: &str) -> Result<XDGSearchResult, String> {
    let mime_type = Command::new("xdg-mime")
        .arg("query")
        .arg("filetype")
        .arg(path)
        .output();
    match mime_type {
        Ok(output) => {
            if output.status.success() {
                let mime_type = String::from_utf8_lossy(&output.stdout).trim().to_string();
                Ok(XDGSearchResult::Found(mime_type))
            } else {
                Ok(XDGSearchResult::NotFound)
            }
        }
        Err(_) => Err(String::from("mime_type_not_found")),
    }
}

pub fn get_default_file_opener(mime_type: String) -> Result<XDGSearchResult, String> {
    let default_opener_output = Command::new("xdg-mime")
        .arg("query")
        .arg("default")
        .arg(mime_type)
        .output();
    match default_opener_output {
        Ok(output) => {
            if output.status.success() {
                let default_opener = String::from_utf8_lossy(&output.stdout).trim().to_string();
                if default_opener.is_empty() {
                    Ok(XDGSearchResult::NotFound)
                } else {
                    Ok(XDGSearchResult::Found(default_opener))
                }
            } else {
                Ok(XDGSearchResult::NotFound)
            }
        }
        Err(_) => Err(String::from("mime_type_not_found")),
    }
}

pub fn open_file_with_default_file_opener(path: &String) -> String {
    let res = Command::new("xdg-open").arg(path).status();
    match res {
        Ok(status) => {
            if status.success() {
                String::from("success")
            } else {
                String::from("unable_to_open_file")
            }
        }
        Err(_) => String::from("unable_to_open_file"),
    }
}

#[async_recursion]
pub async fn calculate_directory_size(directory_path: &Path) -> Result<u64, String> {
    let mut total_size: u64 = 0;

    if let Ok(entries) = fs::read_dir(directory_path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                let metadata = fs::metadata(&path).map_err(|e| e.to_string())?;
                if metadata.is_file() {
                    total_size += metadata.len();
                } else if metadata.is_dir() {
                    total_size += calculate_directory_size(&path).await?;
                }
            }
        }
    } else {
        return Err("Failed to read directory".to_string());
    }

    Ok(total_size)
}
