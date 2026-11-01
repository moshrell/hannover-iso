#!/usr/bin/env python3
"""Ihme-Zentrum: OSM-Gebäudeteile (building:part) → kompakte Daten für landmarks/ihmezentrum.js.
Die Standard-Extraktion data/osm.json.gz kennt nur Wege mit Tag "building"; der Komplex ist in OSM aber als building:part
(layer 1/2, min_height 10–15 m) gemappt. Quelle daher die OSM-API (ODbL, © OpenStreetMap-Mitwirkende).
Aufruf:  python3 ref/ihmezentrum/gen/gen-parts.py [ihme.osm]   → schreibt ref/ihmezentrum/gen/parts.json und TEILE.md
Koordinaten: Karten-Welt wie data/prep.py (x Ost, y Süd, um ALPHA gedreht), relativ zur Mitte des Ankerquadrats (CX, CY)."""
import sys, os, math, json, urllib.request
import xml.etree.ElementTree as ET
from shapely.geometry import Polygon
from shapely.ops import unary_union
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'ihme.osm')
if not os.path.exists(SRC):
    urllib.request.urlretrieve('https://api.openstreetmap.org/api/0.6/map?bbox=9.7120,52.3670,9.7240,52.3735', SRC)
LAT0, LON0 = 52.3710, 9.7375
KX = math.cos(math.radians(LAT0)) * 111320; KY = 110540
ALPHA = -0.2757948
c_, s_ = math.cos(ALPHA), math.sin(ALPHA)
def proj(la, lo):
    x, y = (lo - LON0) * KX, -(la - LAT0) * KY
    return (x * c_ - y * s_, x * s_ + y * c_)
def unproj(X, Y):
    x, y = X * c_ + Y * s_, -X * s_ + Y * c_      # Rotation zurück
    return (LAT0 - y / KY, LON0 + x / KX)
CX, CY, E = -1256.0, 390.0, 150.0                    # Ankerquadrat (meta: point), Mitte in Karten-Welt
def num(v):
    try: return float(str(v).replace(',', '.').split()[0])
    except Exception: return None
r = ET.parse(SRC).getroot()
nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in r.findall('node')}
raw = {}
for w in r.findall('way'):
    t = {x.get('k'): x.get('v') for x in w.findall('tag')}
    pts = [nodes[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nodes]
    raw[w.get('id')] = (t, pts)
# Wege mit Tag building (nicht building:part), die zum Komplex gehören (Südende, Blumenauer Straße): stehen auch in data/osm.json.gz und
# werden dort als gewöhnliche Häuser gezeichnet → in meta.osm eintragen, damit sie nicht doppelt erscheinen
ALLOW = ['137530494', '137530495', '513159239', '513159240', '513159241']
SKIP = ['560686376']          # Parkpavillon an der Ihme (Pyramidendach), gehört nicht zum Komplex
sel = []
for i, (t, pts) in raw.items():
    if not pts or ('building:part' not in t and i not in ALLOW): continue
    P = [proj(*p) for p in pts]
    if len(P) > 1 and P[0] == P[-1]: P = P[:-1]
    if len(P) < 3: continue
    pg = Polygon(P)
    if not pg.is_valid: pg = pg.buffer(0)
    if pg.is_empty or pg.geom_type != 'Polygon': continue
    c = pg.centroid; h = num(t.get('height')); mh = num(t.get('min_height')) or 0; lv = num(t.get('building:levels'))
    if not (-1500 < c.x < -1020 and 160 < c.y < 570): continue
    if not (t.get('layer') or mh >= 5 or (h and h >= 25)): continue
    if h is None: h = (lv or 4) * 3.1 + mh
    if pg.area < 14: continue
    sel.append(dict(id=i, pg=pg, h=h, mh=mh, lv=lv, name=t.get('name', ''), area=pg.area))
# Teile, die auf einem anderen Teil stehen (min_height ≥ 26): keine Stütze darunter
elev = [s for s in sel if 0 < s['mh'] <= 15]
groups = {}
for s in elev:
    mh = 15 if s['mh'] >= 14 else round(s['mh'])      # 14 und 15 m gemeinsam
    s['mh'] = mh; groups.setdefault(mh, []).append(s['pg'])
parts = []
def fix(pg, tol=.8):
    pg = pg.simplify(tol, preserve_topology=True)
    if pg.geom_type != 'Polygon': pg = max(pg.geoms, key=lambda g: g.area)
    return pg
for mh, pgs in sorted(groups.items()):
    u = unary_union([p.buffer(.2) for p in pgs]).buffer(-.1)
    for g in (u.geoms if u.geom_type == 'MultiPolygon' else [u]):
        g = fix(Polygon(g.exterior), 2.0)
        if g.area > 30: parts.append(dict(kind=0, z0=0, z1=mh, pg=g, id='podium%d' % mh))
for s in sorted(sel, key=lambda s: (s['mh'], -s['h'])):
    if s['id'] in SKIP: continue
    kind = 2 if ((s['lv'] or 0) >= 12 or (s['h'] >= 55 and s['mh'] < 26 and s['area'] > 200)) else 1
    g = fix(s['pg'])
    parts.append(dict(kind=kind, z0=s['mh'], z1=s['h'], pg=g, id='w' + s['id'], name=s['name'], lv=s['lv']))
from shapely.geometry.polygon import orient
def cross(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
def clean(P):
    """doppelte/kollineare Punkte entfernen"""
    changed = True
    while changed and len(P) > 3:
        changed = False
        for i in range(len(P)):
            a, b, c = P[i - 1], P[i], P[(i + 1) % len(P)]
            if math.hypot(b[0] - a[0], b[1] - a[1]) < .05 or abs(cross(a, b, c)) < .02 * max(1, math.hypot(c[0] - a[0], c[1] - a[1])):
                P = P[:i] + P[i + 1:]; changed = True; break
    return P
def ears(P):
    """Ohrenschnitt; P gegen den Uhrzeigersinn (mathematisch positiv) → Dreiecke als Indexlisten"""
    idx = list(range(len(P))); tris = []; guard = 0
    def inside(p, a, b, c): return cross(a, b, p) >= -1e-9 and cross(b, c, p) >= -1e-9 and cross(c, a, p) >= -1e-9
    while len(idx) > 3 and guard < 5000:
        guard += 1; cut = False
        for k in range(len(idx)):
            i0, i1, i2 = idx[k - 1], idx[k], idx[(k + 1) % len(idx)]
            a, b, c = P[i0], P[i1], P[i2]
            if cross(a, b, c) <= 1e-9: continue
            if any(inside(P[j], a, b, c) for j in idx if j not in (i0, i1, i2)): continue
            tris.append([i0, i1, i2]); idx.pop(k); cut = True; break
        if not cut: break
    if len(idx) == 3: tris.append(idx[:])
    return tris
def convex(poly, P):
    n = len(poly)
    return all(cross(P[poly[i - 1]], P[poly[i]], P[poly[(i + 1) % n]]) >= -1e-7 for i in range(n))
def merge_convex(P, tris):
    polys = [t[:] for t in tris]; merged = True
    while merged:
        merged = False
        for i in range(len(polys)):
            for j in range(i + 1, len(polys)):
                A, B = polys[i], polys[j]
                for ia in range(len(A)):
                    a, b = A[ia], A[(ia + 1) % len(A)]
                    for ib in range(len(B)):
                        if B[ib] == b and B[(ib + 1) % len(B)] == a:
                            C = A[ia + 1:] + A[:ia + 1]          # beginnt bei b, endet bei a
                            Bs = B[ib + 2:] + B[:ib + 1] if False else None
                            rest = [B[(ib + 2 + k) % len(B)] for k in range(len(B) - 2)]
                            cand = C + rest
                            if convex(cand, P):
                                polys[i] = cand; polys.pop(j); merged = True
                                break
                    if merged: break
                if merged: break
            if merged: break
    return polys
out = []; tops = []; npieces = 0
for pi, p in enumerate(parts):
    pg = orient(p['pg'], 1.0)
    P = clean([(x - CX, y - CY) for x, y in list(pg.exterior.coords)[:-1]])
    if len(P) < 3: tops.append([]); continue
    tops.append([round(v, 1) for q in P for v in q])
    ring_edges = {frozenset((i, (i + 1) % len(P))) for i in range(len(P))}
    for poly in merge_convex(P, ears(P)):
        poly = poly[::-1]                                   # Wandnormalen nach außen (K.wall): Fläche negativ
        mask = sum(1 << i for i in range(len(poly)) if frozenset((poly[i], poly[(i + 1) % len(poly)])) in ring_edges)
        out.append([p['kind'], round(p['z0'], 1), round(p['z1'], 1), pi, [round(v, 1) for q in poly for v in P[q]], mask]); npieces += 1
la, lo = unproj(CX, CY)
json.dump({'anchor': [round(la, 6), round(lo, 6), E], 'parts': out, 'tops': tops, 'ids': [p['id'] for p in parts]}, open(os.path.join(HERE, 'parts.json'), 'w'), separators=(',', ':'))
with open(os.path.join(HERE, 'TEILE.md'), 'w') as f:
    f.write('# Teile (OSM building:part) im Komplex\n\nAnker (meta point): %.6f, %.6f, Kante %d m\n\n| OSM-Id | Art | von z | bis z | Geschosse | Fläche m² |\n|---|---|---|---|---|---|\n' % (la, lo, E))
    for p in parts: f.write('| %s | %s | %.1f | %.1f | %s | %.0f |\n' % (p['id'], ['Sockel', 'Riegel/Teil', 'Turm'][p['kind']], p['z0'], p['z1'], p.get('lv') or '', p['pg'].area))
print(len(parts), 'Teile,', npieces, 'konvexe Stücke; Anker', round(la, 6), round(lo, 6), 'JSON-Größe', os.path.getsize(os.path.join(HERE, 'parts.json')))
