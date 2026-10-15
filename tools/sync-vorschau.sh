#!/bin/sh
# Kopiert die Karte in den privaten Vorschau-Ordner der Website (kravets-site muss daneben liegen).
set -e
cd "$(dirname "$0")/.."
D=${1:-../kravets-site}/public/vorschau/karte-ksn0
mkdir -p "$D/core" "$D/landmarks" "$D/data"
cp karte.html "$D/index.html"; cp karte.css karte.js "$D/"
cp core/iso-core.js core/iso.css "$D/core/"; cp landmarks/*.js "$D/landmarks/"; cp data/mitte.js "$D/data/"
echo "→ $D"
