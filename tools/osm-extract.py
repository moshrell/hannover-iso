#!/usr/bin/env python3
"""OSM-PBF (z. B. BBBike-Auszug Hannover) → JSON im Format einer Overpass-Antwort „out body geom“ (wie data/q.txt),
damit data/prep.py unverändert bleibt. Overpass ist aus der Cloud nicht erreichbar, BBBike schon.
Aufruf: python3 tools/osm-extract.py Hannover.osm.pbf S,W,N,E out.json.gz"""
import sys, json, gzip, osmium
src, bb, out = sys.argv[1], [float(v) for v in sys.argv[2].split(',')], sys.argv[3]
S, W, N, E = bb
inb = lambda lat, lon: S <= lat <= N and W <= lon <= E
def want_way(t):
    return ('building' in t or 'highway' in t or t.get('natural') == 'water' or t.get('waterway') == 'river'
            or t.get('leisure') == 'park' or t.get('landuse') == 'grass')
def want_rel(t): return 'building' in t or t.get('natural') == 'water' or t.get('leisure') == 'park'

class Rels(osmium.SimpleHandler):
    def __init__(s): super().__init__(); s.rels = []; s.need = set()
    def relation(s, r):
        t = dict(r.tags)
        if not want_rel(t): return
        mem = [(m.type, m.ref, m.role) for m in r.members]
        s.rels.append((r.id, t, mem)); s.need.update(ref for ty, ref, _ in mem if ty == 'w')
rh = Rels(); rh.apply_file(src)

class Ways(osmium.SimpleHandler):
    def __init__(s, need): super().__init__(); s.need = need; s.out = []; s.geo = {}
    def node(s, n):
        if n.tags.get('natural') == 'tree' and n.location.valid() and inb(n.location.lat, n.location.lon):
            s.out.append({'type': 'node', 'id': n.id, 'lat': round(n.location.lat, 7), 'lon': round(n.location.lon, 7), 'tags': dict(n.tags)})
    def way(s, w):
        t = dict(w.tags); hit = want_way(t); mem = w.id in s.need
        if not (hit or mem): return
        try: g = [{'lat': round(n.location.lat, 7), 'lon': round(n.location.lon, 7)} for n in w.nodes]
        except osmium.InvalidLocationError: return
        if mem: s.geo[w.id] = g
        if hit and any(inb(p['lat'], p['lon']) for p in g): s.out.append({'type': 'way', 'id': w.id, 'tags': t, 'geometry': g})
wh = Ways(rh.need); wh.apply_file(src, locations=True)

els = wh.out
for rid, t, mem in rh.rels:
    ms = [{'type': 'way', 'ref': ref, 'role': role, 'geometry': wh.geo[ref]} for ty, ref, role in mem if ty == 'w' and ref in wh.geo]
    if any(inb(p['lat'], p['lon']) for m in ms for p in m['geometry']): els.append({'type': 'relation', 'id': rid, 'tags': t, 'members': ms})
json.dump({'elements': els}, gzip.open(out, 'wt'), separators=(',', ':'))
from collections import Counter
c = Counter(('building' if 'building' in e.get('tags', {}) else e['type']) for e in els)
print(len(els), dict(c), file=sys.stderr)
