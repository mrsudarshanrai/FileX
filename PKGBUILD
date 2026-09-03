# Maintainer: mrsudarshanrai <rrraishati@gmail.com>
#
# Builds FileX from this checkout and installs it:
#
#   makepkg -sif
#
# It runs the Tauri build, then repacks the .deb it produces
# so the installed layout is identical to the one Debian/Ubuntu users get.

pkgname=filex
# Read straight from the Tauri config so the two can't drift. pkgver forbids
# hyphens, so 1.0.0-beta.1 becomes 1.0.0_beta.1.
_appver=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
  "$(dirname "${BASH_SOURCE[0]}")/src-tauri/tauri.conf.json" | head -1)
pkgver=${_appver//-/_}
pkgrel=1
pkgdesc="Yet Another File Manager"
arch=('x86_64' 'aarch64')
url="https://github.com/mrsudarshanrai/FileX"
license=('MIT')
depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme'
  'libsoup3' 'pango' 'webkit2gtk-4.1')
# Node and Rust are intentionally not listed as they are commonly installed via
# nvm/rustup rather than pacman, so declaring them here would force a redundant system install.
# See the Requirements section in the README.
provides=('filex')
conflicts=('filex')
options=('!strip' '!emptydirs')
install=filex.install

build() {
  cd "$startdir"
  npm install
  npx tauri build --bundles deb
}

package() {
  local deb
  deb=$(ls -t "$startdir"/src-tauri/target/release/bundle/deb/*.deb 2>/dev/null | head -1)
  [ -n "$deb" ] || {
    echo "no .deb found" >&2
    return 1
  }

  bsdtar -xOf "$deb" data.tar.gz | bsdtar -xf - -C "$pkgdir"
}
