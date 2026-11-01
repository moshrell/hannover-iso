#!/usr/bin/env python3
# /tmp/vergleich-{nacht,licht}.png (tools/compare-shots.mjs) → img/vergleich-*.webp, Breite 1000 px
import os
from PIL import Image
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'img'); os.makedirs(out, exist_ok=True)
for k in ('nacht', 'licht'):
    im = Image.open(f'/tmp/vergleich-{k}.png').convert('RGB'); im.thumbnail((1000, 1000), Image.LANCZOS)
    dst = os.path.join(out, f'vergleich-{k}.webp'); im.save(dst, 'WEBP', quality=82, method=6); print(dst, im.size, os.path.getsize(dst) // 1024, 'KB')
