#!/usr/bin/env python3
"""Markuskirche Hannover-List: Bauteile (von Hand aus Umriss w44834907 + Google-Earth-Kadern) → kompakte Daten für landmarks/markuskirche.js.
OSM kennt nur den Gesamtumriss (building:church, w44834907, © OpenStreetMap-Mitwirkende, ODbL); Höhen/Dachformen sind Schätzungen nach den Kadern.
Aufruf: python3 ref/markuskirche/gen/gen-mk.py  → parts.json und TEILE.md.
Arbeitsrahmen (u,v): u entlang der Kirchenlängsachse (19,2° gegen Ost, Chor/Apsis bei +u), v nach links (NNW-Seite = Giebelreihe). Dann in Karten-Welt (x Ost, y Süd, gedreht um ALPHA) relativ zum Ankerpunkt."""
import sys, os, math, json
from shapely.geometry import Polygon, box
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
ACLAT, ACLON, E = 52.3883, 9.7523, 90.0
CX, CY = proj(ACLAT, ACLON)
AX = math.radians(19.17)
KXA = math.cos(math.radians(ACLAT)) * 111320
def uv(u, v):
    x, y = u * math.cos(AX) - v * math.sin(AX), u * math.sin(AX) + v * math.cos(AX)   # Ost, Nord (m) relativ zum Anker
    return proj(ACLAT + y / KY, ACLON + x / KXA)
def poly(pts): return Polygon([uv(*p) for p in pts])
def rect(u0, u1, v0, v1): return [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]
def octagon(cu, cv, r): return [(cu + r * math.cos(math.pi / 8 + k * math.pi / 4), cv + r * math.sin(math.pi / 8 + k * math.pi / 4)) for k in range(8)]
SH = {'flat': 0, 'pyramidal': 1, 'gabled': 2, 'hipped': 3, 'dome': 4}
DORM = [(-11.5, 3.5), (-3.5, 3.5), (5.5, 3.5)]          # Mitte u, halbe Breite der drei Giebel an der NNW-Seite
hall = box(-20, -9, 15, 15)
for cu, hw in DORM: hall = hall.difference(box(cu - hw, 7, cu + hw, 15.5))
TOWER = (-3.6, 2.6, -16.3, -10.2)
tw = box(TOWER[0], TOWER[2], TOWER[1], TOWER[3])
def P(pg, **k): return dict(pg=pg, **k)
def upg(g): return Polygon([uv(*p) for p in g.exterior.coords[:-1]])
parts = []
def add(id, ring_uv, z0, zw, shape='flat', rh=0, mc=0, sw=0, name=''):
    pg = Polygon([uv(*p) for p in ring_uv]) if not hasattr(ring_uv, 'exterior') else upg(ring_uv)
    parts.append(dict(id=id, pg=pg, z0=z0, zw=zw, h=zw + rh, shape=SH[shape], rh=rh, mc=mc, sw=sw, area=pg.area))
add('hall', hall, 0, 11, 'gabled', 12.5)
for i, (cu, hw) in enumerate(DORM): add('giebel%d' % (i + 1), rect(cu - hw, cu + hw, 7, 15.3), 0, 11, 'gabled', 11)
add('anbau-sw', rect(-18, -12, -12.2, -9), 0, 7, 'gabled', 3)
add('anbau-se', rect(5.2, 15, -9.8, -9), 0, 6)
add('chor-o', [(15, -8), (21, -6), (23.5, -2.5), (24, 2.4), (20, 9.5), (22.5, 11), (22.8, 14), (21, 15.7), (15, 15.5)], 0, 11, 'gabled', 9)
add('turm', rect(TOWER[0], TOWER[1], TOWER[2], TOWER[3]), 0, 46)
add('helm', octagon((TOWER[0] + TOWER[1]) / 2, (TOWER[2] + TOWER[3]) / 2, 3.5), 46, 46, 'pyramidal', 24)
# Überlappungen im Grundriss: wo sich die Höhenbereiche schneiden, behält das höhere Teil die Fläche
def prio(p): return (round(p['zw'], 1), p['area'])
for a in parts:
    for b in parts:
        if a is b or not (a['z0'] < b['zw'] - 1e-6 and b['z0'] < a['zw'] - 1e-6): continue
        if prio(a) >= prio(b) or not a['pg'].intersects(b['pg']): continue
        g = a['pg'].difference(b['pg'].buffer(.05))
        if g.is_empty: a['pg'] = None; break
        if g.geom_type != 'Polygon': g = max(g.geoms, key=lambda q: q.area)
        a['pg'] = g
parts = [p for p in parts if p['pg'] is not None and p['pg'].area >= 4]
for p in parts: p['area'] = p['pg'].area
parts.sort(key=lambda p: (p['z0'], -p['area']))
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
    Pn = clean([(x - CX, y - CY) for x, y in list(pg.exterior.coords)[:-1]])
    if len(Pn) < 3: tops.append([]); continue
    tops.append([p['zw'], p['h'], p['shape'], round(p['rh'], 1), p['mc'], p['sw']] + [round(v, 1) for q in Pn for v in q])
    ring_edges = {frozenset((i, (i + 1) % len(Pn))) for i in range(len(Pn))}
    for poly_ in merge_convex(Pn, ears(Pn)):
        poly_ = poly_[::-1]
        mask = sum(1 << i for i in range(len(poly_)) if frozenset((poly_[i], poly_[(i + 1) % len(poly_)])) in ring_edges)
        out.append([round(p['z0'], 1), round(p['zw'], 1), pi, [round(v, 1) for q in poly_ for v in Pn[q]], mask]); npieces += 1
la, lo = unproj(CX, CY)
json.dump({'anchor': [round(la, 6), round(lo, 6), E], 'parts': out, 'tops': tops, 'ids': [p['id'] for p in parts]}, open(os.path.join(HERE, 'parts.json'), 'w'), separators=(',', ':'))
with open(os.path.join(HERE, 'TEILE.md'), 'w') as f:
    f.write('# Bauteile der Markuskirche (Schätzung nach Kadern, Umriss OSM w44834907)\n\nAnker (meta point): %.6f, %.6f, Kante %d m\n\n| # | Teil | von z | Wand bis | Dach | Dachhöhe |\n|---|---|---|---|---|---|\n' % (la, lo, E))
    for i, p in enumerate(parts): f.write('| %d | %s | %.1f | %.1f | %s | %.1f |\n' % (i, p['id'], p['z0'], p['zw'], ['flach', 'Pyramide', 'Satteldach', 'Walmdach', 'Kuppel'][p['shape']], p['rh']))
print(len(parts), 'Teile,', npieces, 'Stücke; Anker', round(la, 6), round(lo, 6))
