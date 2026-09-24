# FileX

FileX is a lightweight, native-feeling file manager for Linux, built with Tauri and Next.js. The UI runs in Next.js while file system operations are handled natively through Rust.

![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-01.jpg?raw=true)
![fileX](https://github.com/mrsudarshanrai/FileX/blob/main/public/assets/fileX-02.jpg?raw=true)

## Table of Contents

- [Design](#design)
- [Features](#features)
- [Requirements](#requirements)
- [Running In your machine](#running-in-your-machine)
- [Install](#install)
  - [Arch Linux](#arch-linux)
  - [Debian, Ubuntu, Fedora, and everything else](#debian-ubuntu-fedora-and-everything-else)
  - [Notes on building for other distros](#notes-on-building-for-other-distros)
- [License](#license)

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
- Tauri CLI, optional (`cargo install tauri-cli`) — the CLI also ships as a dev
  dependency, so `npx tauri` works without installing it globally

## Running In your machine

    git clone https://github.com/mrsudarshanrai/FileX.git

    cd FileX

    npm install

To start the development server, run:

    npx tauri dev

This will start the application in development mode.

If you installed the Tauri CLI globally, you can use it instead:

    cd src-tauri
    cargo tauri dev

Both run the same CLI. `npx` uses the version pinned in `package.json`, so it
needs no global install and cannot drift from the `tauri` crate version.

## Install

### Arch Linux

From the repo root:

    makepkg -sif

That builds the app, packages it, and installs it with `pacman` in one step. AUR
package coming soon.

### Debian, Ubuntu, Fedora, and everything else

Build the bundles:

    npx tauri build

Artifacts are written to `src-tauri/target/release/bundle/`:

| Distro                    | File                                      |
| ------------------------- | ----------------------------------------- |
| Debian, Ubuntu, Mint, Pop | `deb/filex_<version>_amd64.deb`           |
| Fedora, openSUSE          | `rpm/filex-<version>-1.x86_64.rpm`        |
| Any (no install needed)   | `appimage/filex_<version>_amd64.AppImage` |

Then install the one you need:

    sudo apt install ./filex_<version>_amd64.deb     # Debian/Ubuntu
    sudo dnf install ./filex-<version>-1.x86_64.rpm  # Fedora

Or make the AppImage executable and run it directly:

    chmod +x filex_<version>_amd64.AppImage
    ./filex_<version>_amd64.AppImage

To build a single bundle, pass `--bundles`:

    npx tauri build --bundles deb
    npx tauri build --bundles deb,rpm,appimage

See [tauri.app/distribute](https://tauri.app/distribute/) for more.

### Notes on building for other distros

A build links against the glibc of the machine that produced it, so packages
built on a rolling distro like Arch will not run on older releases such as
Ubuntu 22.04 or Debian 12. Build releases inside a container based on the oldest
distro you intend to support.

AppImage bundling does not currently work on Arch: `linuxdeploy`'s GTK plugin
expects Debian's `/usr/lib/gdk-pixbuf-2.0/2.10.0` loader directory, which Arch no
longer ships. Building in a Debian or Ubuntu container avoids this too.

## License

By contributing to this repository, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE)
