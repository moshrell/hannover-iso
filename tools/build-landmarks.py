#!/usr/bin/env python3
# Erzeugt aus den Einzeldateien die gemeinsamen Ladedateien (nur der Integrations-Chat ruft das auf; sie werden mit eingecheckt):
#   landmarks/meta.js  = window.LMETA  (aus landmarks/meta/*.json: Titel, Texte, Rang, Pin-Verhalten)
#   landmarks/all.js   = alle landmarks/*.js hintereinander (Module)
import json, glob, os
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'landmarks')
meta = {}
for f in sorted(glob.glob(os.path.join(root, 'meta', '*.json'))):
    m = json.load(open(f)); meta[os.path.basename(f)[:-5]] = {k: v for k, v in m.items() if k not in ('osm', 'h', 'face', 'point')}
meta = dict(sorted(meta.items(), key=lambda kv: (kv[1].get('rank', 90), kv[0])))
open(os.path.join(root, 'meta.js'), 'w').write('// GENERIERT von tools/build-landmarks.py aus landmarks/meta/*.json – nicht von Hand ändern\nwindow.LMETA=' + json.dumps(meta, ensure_ascii=False, separators=(',', ':')) + ';\n')
files = [f for f in sorted(glob.glob(os.path.join(root, '*.js'))) if os.path.basename(f) not in ('all.js', 'meta.js')]
out = '// GENERIERT von tools/build-landmarks.py aus landmarks/*.js – nicht von Hand ändern\n'
for f in files: out += '\n;/* ===== ' + os.path.basename(f) + ' ===== */\n' + open(f).read() + '\n'
open(os.path.join(root, 'all.js'), 'w').write(out)
print('meta', len(meta), 'Module-Dateien', len(files), [os.path.basename(f) for f in files])
