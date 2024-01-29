use crate::{
    helper::{self, open_file_with_default_file_opener, XDGSearchResult},
    utils,
};
use async_recursion::async_recursion;
use serde::Serialize;
use std::{
    fs::{self, Metadata},
    path::Path,
};
pub struct File;

#[derive(Serialize, Debug)]
pub struct FileProperties {
    size: u64,
    is_file: bool,
    name: String,
    mime_type: String,
    location: String,
    last_modified: String,
    created: String,
    extension: String,
}

impl File {
    /** delete files */
    pub fn delete(path: &String) -> std::io::Result<()> {
        fs::remove_file(path)?;
        Ok(())
    }

    /** copy file */
    #[async_recursion]
    pub async fn copy(from: &String, to: &String) -> std::io::Result<()> {
        let full_filename = utils::get_full_filename_from_path(from);
        let mut attempt = 1;

        let (filename, file_extension) =
            utils::get_filename_and_extension_from_path(&full_filename);

        let mut new_destination_path = format!("{}/{}", to, full_filename);

        while fs::metadata(&new_destination_path).is_ok() {
            attempt += 1;
            new_destination_path =
                format!("{}/{}-{}(Copy){}", to, filename, attempt, file_extension);
        }

        fs::copy(from, &new_destination_path)?;
        Ok(())
    }

    /** get metadata */
    pub fn get_metadata(path: &String) -> Result<Metadata, std::io::Error> {
        fs::metadata(path)
    }

    /** check if provided path metadata */
    pub fn has_valid_metadata(path: &String) -> bool {
        fs::metadata(&path).is_ok()
    }

    /** Ensure this function is called after validating the metadata using 'metadata.is_ok()' */
    pub fn is_file(path: &String) -> bool {
        fs::metadata(&path).unwrap().is_file()
    }

    pub fn open(path: &String) -> String {
        if let Ok(XDGSearchResult::Found(mime_type)) = helper::get_file_mime_type(path) {
            if let Ok(XDGSearchResult::Found(_)) = helper::get_default_file_opener(mime_type) {
                open_file_with_default_file_opener(path)
            } else {
                String::from("default_opener_not_found")
            }
        } else {
            String::from("mime_type_not_found")
        }
    }

    pub async fn properties(path: String) -> Result<FileProperties, String> {
        let metadata_result = fs::metadata(&path);
        match metadata_result {
            Ok(metadata) => {
                let directory_path = Path::new(&path);
                let mut mime_type = String::from("");

                if let Ok(XDGSearchResult::Found(result)) = helper::get_file_mime_type(&path) {
                    mime_type = result;
                }

                let properties = if metadata.is_dir() {
                    let total_size = helper::calculate_directory_size(directory_path).await?;
                    FileProperties {
                        size: total_size,
                        is_file: false,
                        name: utils::option_to_string(directory_path.file_name()),
                        mime_type,
                        location: path.clone(),
                        last_modified: utils::sys_time_to_date_time(metadata.modified().unwrap()),
                        created: utils::sys_time_to_date_time(metadata.created().unwrap()),
                        extension: String::from(""),
                    }
                } else {
                    FileProperties {
                        size: metadata.len(),
                        is_file: true,
                        name: utils::option_to_string(directory_path.file_name()),
                        mime_type,
                        location: path.clone(),
                        last_modified: utils::sys_time_to_date_time(metadata.modified().unwrap()),
                        created: utils::sys_time_to_date_time(metadata.created().unwrap()),
                        extension: utils::option_to_string(directory_path.extension()),
                    }
                };
                Ok(properties)
            }
            Err(e) => Err(String::from(e.to_string())),
        }
    }
}
