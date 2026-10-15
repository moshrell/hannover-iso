#!/bin/sh
# Kopiert die Kachelkarte + Detailansichten in den privaten Vorschau-Ordner der Website (kravets-site daneben).
set -e
cd "$(dirname "$0")/.."
D=${1:-../kravets-site}/public/vorschau/karte-ksn0
find "$D" -mindepth 1 ! -name .htaccess -exec rm -rf {} + 2>/dev/null || true
mkdir -p "$D"
cp karte.html "$D/index.html"; cp karte.css karte.js embed.js rathaus.html rathaus.css rathaus.js altstadt.html altstadt.css altstadt.js "$D/"
cp -r tiles "$D/tiles"; rm -f "$D/tiles/meta.json"
cat > "$D/.htaccess" <<'H'
# Entwurf Hannover-Karte (privat): eigene Sicherheitsregeln, nicht in Suchmaschinen
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'"
  Header always set X-Robots-Tag "noindex, nofollow"
  Header set Cache-Control "no-cache"
  <If "%{REQUEST_URI} =~ m#/tiles/#">
    Header set Cache-Control "public, max-age=3600"
  </If>
</IfModule>
H
echo "→ $D"; du -sh "$D"
