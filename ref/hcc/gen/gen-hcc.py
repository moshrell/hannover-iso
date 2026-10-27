#!/usr/bin/env python3
"""HCC / Stadthalle Hannover: OSM-Gebäudeteile (relation r17296064, building:part) → kompakte Daten für landmarks/hcc.js.
Quelle: OSM-API (ODbL, © OpenStreetMap-Mitwirkende); stadthalle.osm = /api/0.6/relation/17296064/full.
Aufruf: python3 ref/hcc/gen/gen-hcc.py  → schreibt parts.json und TEILE.md. Koordinaten: Karten-Welt wie data/prep.py, relativ zur Ankermitte (CX, CY)."""
import sys, os, math, json
import xml.etree.ElementTree as ET
from shapely.geometry import Polygon
HERE = os.path.dirname(os.path.abspath(__file__))
LAT0, LON0 = 52.3710, 9.7375
KX = math.cos(math.radians(LAT0)) * 111320; KY = 110540
ALPHA = -0.2757948
c_, s_ = math.cos(ALPHA), math.sin(ALPHA)
def proj(la, lo):
    x, y = (lo - LON0) * KX, -(la - LAT0) * KY
    return (x * c_ - y * s_, x * s_ + y * c_)
def unproj(X, Y):
    x, y = X * c_ + Y * s_, -X * s_ + Y * c_
    return (LAT0 - y / KY, LON0 + x / KX)
ACLAT, ACLON, E = 52.37555, 9.76955, 140.0
CX, CY = proj(ACLAT, ACLON)
def num(v):
    try: return float(str(v).replace(',', '.').split()[0])
    except Exception: return None
r = ET.parse(os.path.join(HERE, 'stadthalle.osm')).getroot()
nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in r.findall('node')}
SH = {'flat': 0, 'pyramidal': 1, 'gabled': 2, 'hipped': 3, 'dome': 4}
parts = []
for w in r.findall('way'):
    t = {x.get('k'): x.get('v') for x in w.findall('tag')}
    if 'building:part' not in t: continue
    P = [proj(*nodes[n.get('ref')]) for n in w.findall('nd')]
    if P[0] == P[-1]: P = P[:-1]
    pg = Polygon(P)
    if not pg.is_valid: pg = pg.buffer(0)
    if pg.geom_type != 'Polygon' or pg.area < 12: continue
    h = num(t.get('height')) or (num(t.get('building:levels')) or 2) * 3.2
    mh = num(t.get('min_height')) or 0
    shape = SH.get(t.get('roof:shape', 'flat'), 0); rh = num(t.get('roof:height')) or 0
    if shape == 0: rh = 0
    if shape and not rh: shape = 0
    zw = h - rh
    pg = pg.simplify(.6, preserve_topology=True)
    mc = {'copper': 1, 'roof_tiles': 2}.get(t.get('roof:material', ''), 0)
    parts.append(dict(mc=mc, id='w' + w.get('id'), pg=pg, z0=mh, zw=zw, h=h, shape=shape, rh=rh, mat=t.get('roof:material', ''), name=t.get('name', ''), area=pg.area))
parts.sort(key=lambda p: (p['z0'], -p['area']))
# OSM-Teile überlappen sich im Grundriss (Foyer im Ringbau usw.): wo sich die Höhenbereiche schneiden, behält das höhere Teil (bei Gleichstand das größere)
# die Fläche, das andere wird beschnitten; übereinander gestapelte Teile (Kuppel auf Trommel) bleiben unberührt.
from shapely.geometry import MultiPolygon
def prio(p): return (round(p['zw'], 1), p['area'])
for a in parts:
    for b in parts:
        if a is b or not (a['z0'] < b['zw'] - 1e-6 and b['z0'] < a['zw'] - 1e-6): continue
        if prio(a) >= prio(b) or not a['pg'].intersects(b['pg']): continue       # a ist das niedrigere → wird beschnitten
        g = a['pg'].difference(b['pg'].buffer(.05))
        if g.is_empty: a['pg'] = None; break
        if g.geom_type != 'Polygon': g = max(g.geoms, key=lambda q: q.area)
        a['pg'] = g
parts = [p for p in parts if p['pg'] is not None and p['pg'].area >= 12]
for p in parts: p['area'] = p['pg'].area
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
    tops.append([p['zw'], p['h'], p['shape'], round(p['rh'], 1), p['mc']] + [round(v, 1) for q in P for v in q])
    ring_edges = {frozenset((i, (i + 1) % len(P))) for i in range(len(P))}
    for poly in merge_convex(P, ears(P)):
        poly = poly[::-1]
        mask = sum(1 << i for i in range(len(poly)) if frozenset((poly[i], poly[(i + 1) % len(poly)])) in ring_edges)
        out.append([round(p['z0'], 1), round(p['zw'], 1), pi, [round(v, 1) for q in poly for v in P[q]], mask]); npieces += 1
la, lo = unproj(CX, CY)
json.dump({'anchor': [round(la, 6), round(lo, 6), E], 'parts': out, 'tops': tops, 'ids': [p['id'] for p in parts]}, open(os.path.join(HERE, 'parts.json'), 'w'), separators=(',', ':'))
with open(os.path.join(HERE, 'TEILE.md'), 'w') as f:
    f.write('# Teile (OSM building:part) der Stadthalle\n\nAnker (meta point): %.6f, %.6f, Kante %d m\n\n| # | OSM-Id | von z | Wand bis | Dach | Dachhöhe | Fläche m² |\n|---|---|---|---|---|---|---|\n' % (la, lo, E))
    for i, p in enumerate(parts): f.write('| %d | %s | %.1f | %.1f | %s | %.1f | %.0f |\n' % (i, p['id'], p['z0'], p['zw'], ['flach', 'Pyramide', 'Satteldach', 'Walmdach', 'Kuppel'][p['shape']], p['rh'], p['area']))
print(len(parts), 'Teile,', npieces, 'Stücke; Anker', round(la, 6), round(lo, 6))
