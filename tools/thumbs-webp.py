#!/usr/bin/env python3
# /tmp/thumbs/*.png (von tools/thumbs.mjs) → landmarks/thumbs/*.webp, längste Seite 560 px
import glob, os
from PIL import Image, ImageDraw, ImageFilter
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'landmarks', 'thumbs')
os.makedirs(out, exist_ok=True)
for f in sorted(glob.glob('/tmp/thumbs/*.png')):
    im = Image.open(f).convert('RGB'); im.thumbnail((560, 560), Image.LANCZOS)
    # Ränder weich in die Seitenfarbe auslaufen lassen (sonst zeichnet sich in der Auswahl ein Rechteck ab)
    w, h = im.size; m = Image.new('L', (w, h), 0); e = int(min(w, h) * .1)
    ImageDraw.Draw(m).rectangle([e, e, w - e, h - e], fill=255); m = m.filter(ImageFilter.GaussianBlur(e * .6))
    im = Image.composite(im, Image.new('RGB', (w, h), (10, 14, 12)), m)
    dst = os.path.join(out, os.path.basename(f)[:-4] + '.webp'); im.save(dst, 'WEBP', quality=80, method=6)
    print(os.path.basename(dst), im.size, os.path.getsize(dst) // 1024, 'KB')
