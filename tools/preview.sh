#!/bin/sh
# Vorschau für einen Gebäude-Chat: Module + Daten neu bauen, dann das Gebäude in der Karte fotografieren.  sh tools/preview.sh <name> [Maßstab]
set -e
cd "$(dirname "$0")/.."
python3 tools/build-landmarks.py >/dev/null
(cd data && python3 prep.py osm.json.gz mitte.js 2>&1 | grep -i "$1" || true)
node tools/map-crop.mjs "$1" "${2:-1.5}"
