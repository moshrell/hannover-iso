#!/usr/bin/env python3
# OSM-Gebäude nach Name suchen:  python3 tools/osm-find.py "Telemax"   → Typ, Id, Name, Lage (lat,lon), Gebäudehöhe/Etagen, Fläche in m²
import gzip, json, sys, math, os
q = sys.argv[1].lower()
d = json.load(gzip.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'osm.json.gz'), 'rt'))['elements']
for e in d:
    t = e.get('tags', {})
    if q not in t.get('name', '').lower() or not (t.get('building') or e['type'] == 'relation' and t.get('type') == 'multipolygon'): continue
    pts = [(g['lat'], g['lon']) for g in e.get('geometry', [])] if e['type'] == 'way' else []
    if pts:
        la = sum(p[0] for p in pts) / len(pts); lo = sum(p[1] for p in pts) / len(pts)
        A = abs(sum((pts[i][1] * pts[(i + 1) % len(pts)][0] - pts[(i + 1) % len(pts)][1] * pts[i][0]) for i in range(len(pts)))) / 2 * 111320 * 110540 * math.cos(math.radians(la)) 
        pos = '%.5f,%.5f  ~%d m²' % (la, lo, A)
    else: pos = '(Relation: Teile über Mitglieder)'
    print(e['type'][0] + str(e['id']), t.get('name'), pos, 'h=' + t.get('height', '?'), 'Etagen=' + t.get('building:levels', '?'), t.get('building', ''))
