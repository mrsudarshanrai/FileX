# FileX

This project is a Linux file manager built using Next.js and Tauri. While the frontend is developed in Next.js, the backend and system interactions are handled using Rust and Tauri. The primary goal of this project was to explore Tauri and learn Rust for me.

![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-01.jpg?raw=true)
![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-02.jpg?raw=true)
## Current Stage: Development

FileX is currently under development. While core functionalities are implemented, it's not yet ready for production use. Further development is needed for stability, performance optimization, and additional features.

## Features (Current Status)
- Basic File Listing: Lists files and directories in the current directory.
- Directory Navigation: Allows users to navigate between directories.
- File Creation: Supports creating new files.
- File Deletion: Enables users to delete files.
- File Renaming: Provides functionality to rename files.
- File Copying: Implements basic file copying.
- File Properties: Displays detailed information about selected files.


## Requirements

- Node.js (v14 or higher)
- Rust
- [Tauri requirments](https://tauri.app/v1/guides/getting-started/prerequisites)
- Tauri CLI (`yarn global add tauri`)

## Running In your machine

    https://github.com/mrsudarshanrai/FileX.git](https://github.com/mrsudarshanrai/FileX.git

    cd FileX

    yarn install

To start the development server, run:

    yarn tauri dev
    
This will start the application in development mode.

## Build and Run
[https://tauri.app/v1/guides/building/](https://tauri.app/v1/guides/building/)
```
yarn tauri build
```
linux build `.deb` and `.AppImage`

## License

By contributing to this repository, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE)
