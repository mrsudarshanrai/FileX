pkgname=filex
pkgver=0.1.0
pkgrel=1
pkgdesc="Yet Another File Manager"
arch=('x86_64' 'aarch64')
url="https://github.com/mrsudarshanrai/FileX"
license=('MIT')
depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'libsoup' 'pango' 'webkit2gtk-4.1')
options=('!strip' '!emptydirs')
install=${pkgname}.install
source=("filex_0.1.0_amd64.deb")
sha256sums=('SKIP')

package() {
  tar -xvf data.tar.gz -C "${pkgdir}"
}
