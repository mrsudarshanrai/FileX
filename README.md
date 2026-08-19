# FileX

FileX is a lightweight, native-feeling file manager for Linux, built with Tauri and Next.js. The UI runs in Next.js while file system operations are handled natively through Rust.

![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-01.jpg?raw=true)
![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-02.jpg?raw=true)

## Design

- [UI plan](https://www.figma.com/design/tTXlxtuM4GGnBTlQ8woxjP/FileX)
- [Assets (file icons, icons)](https://www.figma.com/design/tTXlxtuM4GGnBTlQ8woxjP/FileX?node-id=413-3864&p=f)

## Features

- Sidebar with quick access to Home and other common places
- Directory navigation with back/forward and breadcrumb path
- Create, rename, delete, copy, and paste files and folders
- Right-click context menu for file and folder actions
- File properties (size, type, location, dates)
- Progress feedback for in-progress operations like copying

## Requirements

- Node.js (v18.18 or higher)
- Rust
- [Tauri requirements](https://tauri.app/start/prerequisites/)
- Tauri CLI (`cargo install tauri-cli`)

## Running In your machine

    git clone https://github.com/mrsudarshanrai/FileX.git

    cd FileX

    npm install

To start the development server, run:

    cd src-tauri
    cargo tauri dev

This will start the application in development mode.

## Build and Run

[https://tauri.app/distribute/](https://tauri.app/distribute/)

```
cd src-tauri
cargo tauri build
# or
cargo tauri build --bundles deb, appimage
```

linux build `.deb` and `.AppImage`. AUR package coming soon.

## License

By contributing to this repository, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE)
