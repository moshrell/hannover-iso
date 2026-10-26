#!/bin/sh
# Video (Google-Earth-Umrundung) → Einzelbilder + Übersichtsblatt.
# Aufruf: sh tools/frames.sh <video.mp4> <ausgabeordner> [bilder_pro_sekunde=0.4] [breite=1600]
# Ergebnis: <ausgabeordner>/k_01.jpg … (oben 7 % Suchleiste und unten 4 % Statusleiste abgeschnitten) und <ausgabeordner>/blatt_1.jpg … (je 16 Bilder, 4×4, verkleinert)
set -e
v="$1"; o="$2"; fps="${3:-0.4}"; w="${4:-1600}"
[ -f "$v" ] || { echo "Video nicht gefunden: $v" >&2; exit 1; }
mkdir -p "$o"
ffmpeg -v error -y -i "$v" -vf "crop=iw:ih*0.89:0:ih*0.07,fps=$fps,scale=$w:-2" -q:v 2 "$o/k_%02d.jpg"
n=$(ls "$o"/k_*.jpg | wc -l); i=0; b=1
while [ $i -lt $n ]; do
  ffmpeg -v error -y -start_number $((i+1)) -i "$o/k_%02d.jpg" -frames:v 16 -vf "scale=640:-2,tile=4x4" -q:v 3 "$o/blatt_$b.jpg"
  i=$((i+16)); b=$((b+1))
done
echo "$n Bilder, $((b-1)) Blatt/Blätter in $o"
