use std::env;

pub fn get_home()-> String{
    let home_dir = match env::var("HOME") {
        Ok(val) => val,
        Err(_) => panic!("Failed to get HOME directory"),
    };

    home_dir
}