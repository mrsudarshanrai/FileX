use crate::utils;
use async_recursion::async_recursion;
use std::fs::{self, Metadata};
pub struct File;

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
}
