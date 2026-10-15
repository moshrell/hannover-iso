#!/usr/bin/env python3
# Neues Gebäude anlegen:  python3 tools/new-landmark.py <name> "<Titel>" <osm-id,...|lat,lon,kante> [h]
# Beispiel:             python3 tools/new-landmark.py welfenschloss "Welfenschloss" w123456,r789 40
import sys, os, json
n, title, where = sys.argv[1], sys.argv[2], sys.argv[3]; h = float(sys.argv[4]) if len(sys.argv) > 4 else 25
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
m = {'title': title, 'fact': '', 'studio': '', 'detail': 'studio.html?lm=' + n, 'minor': False, 'h': h, 'rank': 50, 'osm': []}
if where[0] in 'wr' and where[1:].isdigit(): m['osm'] = where.split(',')
else: m['point'] = [float(v) for v in where.split(',')]
os.makedirs(os.path.join(root, 'ref', n), exist_ok=True)
json.dump(m, open(os.path.join(root, 'landmarks', 'meta', n + '.json'), 'w'), ensure_ascii=False, indent=1)
js = os.path.join(root, 'landmarks', n + '.js')
if not os.path.exists(js): open(js, 'w').write("""/* %s – Modul (eine Datei pro Gebäude). Hilfsfunktionen: core/iso-core.js; Beispiele: landmarks/mitte2.js */
(() => {
  const Z0 = 1;
  ISO.landmark('%s', H => {
    const { hl, winR, wins, hip } = H, M = [], add = m => (M.push(m), m);
    add({ id: 'body', fp: [0, 0, 40, 20], draw: K => K.box(0, 0, Z0, 40, 20, 12, 'pl', { S: (len, h) => hl(0, len, .6) + wins(winR(4, 3, 2, 3, 1)) }) + hip(K, 0, 0, 40, 20, Z0 + 12, Z0 + 16, 'sl') });
    return { mods: M, lc: [20, 10], z0: 0, top: [20, 10, 17], label: '%s', h: 17, len: 40 };
  });
})();
""" % (title, n, title))
print('angelegt: landmarks/%s.js, landmarks/meta/%s.json, ref/%s/' % (n, n, n))
