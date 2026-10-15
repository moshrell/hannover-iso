# Schneidet die Render-Blöcke in 256-px-Kacheln (512 Gerätepixel), lässt leere Kacheln weg, schreibt WebP und Poster.
import json, os, sys, glob, shutil
from PIL import Image, ImageStat
tmp, out = sys.argv[1], sys.argv[2]
meta = json.load(open(os.path.join(tmp, 'meta.json')))
shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
B, T, D = meta['block'], meta['tile'], meta['dpr']
per = B // T; tiles = {}
for f in sorted(glob.glob(os.path.join(tmp, 'L*_*_*.png'))):
    li, bx, by = map(int, os.path.basename(f)[1:-4].split('_'))
    lv = meta['levels'][li]; im = Image.open(f).convert('RGB')
    os.makedirs(os.path.join(out, str(li)), exist_ok=True)
    for j in range(per):
        for i in range(per):
            tx, ty = bx * per + i, by * per + j
            if tx * T >= lv['w'] or ty * T >= lv['h']: continue
            t = im.crop((i * T * D, j * T * D, (i + 1) * T * D, (j + 1) * T * D))
            st = ImageStat.Stat(t)
            if max(st.stddev) < 1.2: continue          # nur Hintergrund
            t.save(os.path.join(out, str(li), f'{tx}_{ty}.webp'), 'WEBP', quality=78, method=6)
            tiles.setdefault(str(li), []).append(f'{tx}_{ty}')
meta['tiles'] = tiles
import time; meta['v'] = int(time.time())
json.dump(meta, open(os.path.join(out, 'meta.json'), 'w'), separators=(',', ':'))
open(os.path.join(out, 'meta.js'), 'w').write('window.TILES=' + json.dumps(meta, separators=(',', ':')) + ';\n')
# Poster = Stufe 0 als ein Bild
lv = meta['levels'][0]; P = Image.new('RGB', (lv['w'] * D, lv['h'] * D), (10, 14, 12))
for f in glob.glob(os.path.join(tmp, 'L0_*_*.png')):
    _, bx, by = map(int, os.path.basename(f)[1:-4].split('_')); P.paste(Image.open(f).convert('RGB'), (bx * B * D, by * B * D))
P = P.crop((0, 0, lv['w'] * D, lv['h'] * D)); P.save(os.path.join(out, 'poster.webp'), 'WEBP', quality=80, method=6)
n = sum(len(v) for v in tiles.values()); size = sum(os.path.getsize(p) for p in glob.glob(os.path.join(out, '*', '*.webp')))
print('Kacheln', n, 'MB %.1f' % (size / 1e6), 'Poster KB', os.path.getsize(os.path.join(out, 'poster.webp')) // 1000)
