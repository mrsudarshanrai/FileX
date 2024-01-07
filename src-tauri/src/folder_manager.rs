use crate::file_manager::File;
use async_recursion::async_recursion;
use std::fs::{self};
pub struct Folder;

impl Folder {
    /** create folder  */
    pub fn create(folder_path: String) {
        let mut attempt = 1;
        let folder_name_suffix = "Untitled Folder";
        let mut full_folder_path = format!("{}{}", &folder_path, folder_name_suffix);

        // check if folder exist
        while fs::metadata(&full_folder_path).is_ok() {
            attempt += 1;
            full_folder_path = format!("{}{} {}", folder_path, folder_name_suffix, attempt);
        }
        // Create the folder
        if let Err(err) = fs::create_dir_all(&full_folder_path) {
            println!("Failed to create folder: {}", err);
        } else {
            println!("Folder created successfully at: {}", full_folder_path);
        }
    }

    /** delete folder  */
    pub fn delete(path: &String) -> std::io::Result<()> {
        fs::remove_dir_all(path)?;
        Ok(())
    }

    /** copy folder */
    #[async_recursion]
    pub async fn copy(from: &String, to: &String) -> std::io::Result<()> {
        fs::create_dir_all(to)?;

        for entry in fs::read_dir(from)? {
            let entry = entry?;
            let entry_path = entry.path();
            let entry_dest_path = format!("{}/{}", to, entry.file_name().to_string_lossy());
            if entry_path.is_dir() {
                Self::copy(&entry_path.to_string_lossy().to_string(), &entry_dest_path).await?
            } else {
                let file_dest_path = entry_dest_path.rsplitn(2, "/").nth(1).unwrap();
                File::copy(
                    &entry_path.to_string_lossy().to_string(),
                    &file_dest_path.to_string(),
                )
                .await?
            }
        }
        Ok(())
    }
}
