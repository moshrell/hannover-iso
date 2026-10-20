# OSM → lokale Meter (x Ost, y Süd), Sortierung für die Iso-Ansicht, Ausgabe data/mitte.js
# Aufruf: python3 prep.py osm.json.gz mitte.js   (osm.json.gz = tools/osm-extract.py aus dem BBBike-PBF für data/bbox.json → all; früher Overpass mit q.txt)
import json, math, sys, collections
src, out = sys.argv[1], sys.argv[2]
import gzip
d = json.load(gzip.open(src, 'rt') if src.endswith('.gz') else open(src))
LAT0, LON0 = 52.3710, 9.7375
KX = math.cos(math.radians(LAT0)) * 111320; KY = 110540
C, S = math.cos(math.pi / 6), .5
# Welt so gedreht, dass das Neue Rathaus achsparallel steht (wie die Studie rathaus.html); Winkel aus dessen OSM-Umriss
ALPHA = -0.2757948
ROT = [math.cos(ALPHA), math.sin(ALPHA)]
def proj(g):
    c, s_ = ROT
    out = []
    for p in g:
        x, y = (p['lon'] - LON0) * KX, -(p['lat'] - LAT0) * KY
        out.append((x * c - y * s_, x * s_ + y * c))
    return out
def area(p): return sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p))) / 2
def dp(pts, eps):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]; dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1e-9
    i, dm = 0, 0
    for k in range(1, len(pts) - 1):
        dd = abs(dy * pts[k][0] - dx * pts[k][1] + b[0] * a[1] - b[1] * a[0]) / L if L > 1e-6 else math.hypot(pts[k][0] - a[0], pts[k][1] - a[1])
        if dd > dm: i, dm = k, dd
    if dm > eps: return dp(pts[:i + 1], eps)[:-1] + dp(pts[i:], eps)
    return [a, b]
def ring(g):
    p = proj(g)
    if len(p) > 1 and p[0] == p[-1]: p = p[:-1]
    if len(p) < 3: return None
    q = dp(p + [p[0]], .5)[:-1]
    if len(q) < 3: return None
    return q
def outer(e):
    if e['type'] == 'way': return [ring(e['geometry'])] if 'geometry' in e else []
    # Relation: äußere Ringe (Wege zusammensetzen)
    segs = [m['geometry'] for m in e.get('members', []) if m.get('role') == 'outer' and 'geometry' in m]
    rings, cur = [], []
    key = lambda p: (round(p['lat'], 7), round(p['lon'], 7))
    while segs:
        if not cur: cur = segs.pop(0)[:]
        if key(cur[0]) == key(cur[-1]): rings.append(ring(cur)); cur = []; continue
        for i, s in enumerate(segs):
            if key(s[0]) == key(cur[-1]): cur += s[1:]; segs.pop(i); break
            if key(s[-1]) == key(cur[-1]): cur += s[::-1][1:]; segs.pop(i); break
        else: rings.append(ring(cur)); cur = []
    if cur: rings.append(ring(cur))
    return rings
# Hauptachse + Mitte der Wahrzeichen (minimales Rechteck)
def hull(pts):
    pts = sorted(set(pts))
    if len(pts) < 3: return pts
    cr = lambda o, a, b: (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) > 1 and cr(lo[-2], lo[-1], p) <= 0: lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) > 1 and cr(up[-2], up[-1], p) <= 0: up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]
def mar(pts):
    h = hull(pts); best = None
    for i in range(len(h)):
        a, b = h[i], h[(i + 1) % len(h)]; th = math.atan2(b[1] - a[1], b[0] - a[0]); c, s = math.cos(-th), math.sin(-th)
        q = [(x * c - y * s, x * s + y * c) for x, y in h]; xs = [p[0] for p in q]; ys = [p[1] for p in q]
        A = (max(xs) - min(xs)) * (max(ys) - min(ys))
        if best is None or A < best[0]:
            cx, cy = (max(xs) + min(xs)) / 2, (max(ys) + min(ys)) / 2; c2, s2 = math.cos(th), math.sin(th)
            best = (A, th, max(xs) - min(xs), max(ys) - min(ys), cx * c2 - cy * s2, cx * s2 + cy * c2)
    return best
DEF_H = {'house': 9, 'garage': 3, 'garages': 3, 'shed': 3, 'kiosk': 3.5, 'hut': 3, 'church': 22, 'apartments': 16, 'residential': 15, 'office': 18, 'retail': 11, 'commercial': 16, 'hotel': 20, 'parking': 12, 'service': 4, 'industrial': 8, 'terrace': 10}
def num(v):
    try: return float(str(v).replace(',', '.').split()[0])
    except: return None
# Wahrzeichen: OSM-Ids, Punkt-Lage, Höhe und Ausrichtung stehen je Gebäude in landmarks/meta/<name>.json (jeder Chat pflegt nur sein eigenes)
import glob, os
META = {}
for f in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'landmarks', 'meta', '*.json'))):
    META[os.path.basename(f)[:-5]] = json.load(open(f))
LM_IDS = {i: n for n, m in META.items() for i in m.get('osm', [])}
LM_POINTS = {n: tuple(m['point']) for n, m in META.items() if m.get('point')}   # ohne eigenen OSM-Umriss: (lat, lon, Kantenlänge m)
B, LM = [], {}
for e in d['elements']:
    t = e.get('tags', {})
    if 'building' not in t or e['type'] == 'node': continue
    if t['building'] in ('roof', 'construction') : continue
    eid = e['type'][0] + str(e['id'])
    for r in outer(e):
        if not r or abs(area(r)) < 6: continue
        if area(r) < 0: r = r[::-1]
        # Höhe: height = First (inkl. Dach); sonst Geschosse × 3,3 m bis zur Traufe + Dach obendrauf
        shape = t.get('roof:shape', '')
        kind = 1 if shape in ('gabled', 'gambrel', 'double_saltbox') else 2 if shape in ('hipped', 'half-hipped', 'pyramidal', 'mansard', 'quadruple_saltbox') else 0
        hT, lv = num(t.get('height')), num(t.get('building:levels'))
        rhT = num(t.get('roof:height'))
        h = hT or (lv * 3.3 + .6 if lv else DEF_H.get(t['building'], 13))
        h = max(3, min(h, 120))
        if eid in LM_IDS: LM.setdefault(LM_IDS[eid], []).append(r); continue
        mat = 'b' if t['building'] in ('church',) or t.get('building:material') == 'brick' else ''
        b = {'p': r, 'h': round(h, 1), 'm': mat, 'id': eid, 'rf': None}
        if kind:
            A_, th, w, dd, cx, cy = mar(r)
            if abs(area(r)) / A_ > .78 and min(w, dd) >= 4:
                rh = rhT or min(9, max(2.5, .5 * min(w, dd) * (1 if kind == 1 else .8)))
                he = (h - rh) if hT else h - .6
                if not hT: h = he + rh
                if he >= 2.5:
                    if w < dd: th += math.pi / 2; w, dd = dd, w     # First entlang der Längsseite
                    if t.get('roof:orientation') == 'across': th += math.pi / 2; w, dd = dd, w
                    b['h'] = round(h, 1); b['rf'] = [kind, round(he, 1), round(rh, 1), round(cx, 1), round(cy, 1), round(th, 4), round(w, 1), round(dd, 1)]
        B.append(b)
LMI = {}
for k, (la, lo, e) in LM_POINTS.items():
    x, y = proj([{'lat': la, 'lon': lo}])[0]; LM[k] = [[(x - e / 2, y - e / 2), (x + e / 2, y - e / 2), (x + e / 2, y + e / 2), (x - e / 2, y + e / 2)]]
for k, rs in LM.items():
    pts = [p for r in rs for p in r]
    A, th, w, hh, cx, cy = mar(pts)
    LMI[k] = {'th': th, 'w': w, 'd': hh, 'cx': cx, 'cy': cy, 'hull': hull(pts)}
    print(k, 'theta %.1f°' % math.degrees(th), 'size %.0f x %.0f' % (w, hh), 'c %.0f,%.0f' % (cx, cy), file=sys.stderr)
# Ausrichtung einzelner Module nach der Wirklichkeit: ('street', lokale Front, Straßenname) bzw. ('compass', lokale Richtung, Kompassvektor Ost/Süd)
FACE = {n: (m['face'][0], tuple(m['face'][1]), tuple(m['face'][2]) if isinstance(m['face'][2], list) else m['face'][2]) for n, m in META.items() if m.get('face')}
_sp = {}
def street_pt(name, v):
    if name not in _sp:
        best = None
        for e in d['elements']:
            if e.get('tags', {}).get('name') == name and 'highway' in e.get('tags', {}) and 'geometry' in e:
                for q in proj(e['geometry']):
                    dd = math.hypot(q[0] - v['cx'], q[1] - v['cy'])
                    if best is None or dd < best[0]: best = (dd, q)
        _sp[name] = best[1]
    return _sp[name]
def phi_of(k, v):
    tl = v['th'] if v['w'] >= v['d'] else v['th'] + math.pi / 2   # reale Längsachse
    long_y = k in ('leineschloss', 'opernhaus')
    if k not in ('neuesRathaus', 'marktkirche', 'altesRathaus', 'leineschloss', 'hauptbahnhof', 'aegidienkirche'):
        norm = lambda a: (a + math.pi) % (2 * math.pi) - math.pi
        if k == 'opernhaus': return 0.0       # frei auf dem Opernplatz: genau wie in der Detailansicht
        # Modul-Längsachse (lokal x) liegt auf der echten Längsachse; nur die Richtung der Front wird gewählt
        cs = [tl, tl + math.pi] if max(v['w'], v['d']) / min(v['w'], v['d']) >= 1.2 else [tl + i * math.pi / 2 for i in range(4)]
        rot = lambda ph, x, y: (x * math.cos(ph) - y * math.sin(ph), x * math.sin(ph) + y * math.cos(ph))
        if k in FACE:
            kind, a, b = FACE[k]                 # 'street': lokale Front (a) zur benannten Straße; 'compass': lokale Richtung a nach Kompassrichtung b (x Ost, y Süd)
            if kind == 'street':
                tx, ty = street_pt(b, v); tx -= v['cx']; ty -= v['cy']
            else:
                tx, ty = b[0] * ROT[0] - b[1] * ROT[1], b[0] * ROT[1] + b[1] * ROT[0]
            return max(cs, key=lambda ph: sum(p * q for p, q in zip(rot(ph, *a), (tx, ty))))
        return min((norm(c_) for c_ in cs), key=abs)   # sonst: kleinste Drehung (wie Detailansicht)
    cands = [tl - math.pi / 2, tl + math.pi / 2] if long_y else [tl, tl + math.pi]
    if max(v['w'], v['d']) / min(v['w'], v['d']) < 1.2: cands = [tl + i * math.pi / 2 for i in range(4)]   # fast quadratisch: alle vier Richtungen erlaubt
    rot = lambda ph, x, y: (x * math.cos(ph) - y * math.sin(ph), x * math.sin(ph) + y * math.cos(ph))
    score = {
        'neuesRathaus': lambda ph: rot(ph, 0, 1)[1],                         # Teichseite nach Süden
        'marktkirche': lambda ph: -rot(ph, -1, 0)[0],                    # Turm nach Westen
        'altesRathaus': lambda ph: sum(rot(ph, 0, 1)),                       # Arkadenseite zum Betrachter
        'leineschloss': lambda ph: -rot(ph, -1, 0)[0] + rot(ph, -1, 0)[1],           # Flussseite (lokal -x) nach Südwesten
        'opernhaus': lambda ph: math.cos(ph),                                          # wie in der Detailansicht (Drehung nahe 0)
        'hauptbahnhof': lambda ph: rot(ph, 0, 1)[1],                                   # Front zum Ernst-August-Platz (Süden)
        'aegidienkirche': lambda ph: -rot(ph, -1, 0)[0],                               # Turm nach Westen
    }.get(k, lambda ph: math.cos(ph))                                                  # neue Wahrzeichen: wie in der Detailansicht
    return max(cands, key=score)
# Freiräume vor Wahrzeichen (lokale Koordinaten relativ zur Modulmitte: x quer, y nach vorn): Ernst-August-Platz vor dem Hauptbahnhof
CLEAR = {'hauptbahnhof': (-80, 80, 14, 110)}
def in_clear(px, py):
    for k, (x0, x1, y0, y1) in CLEAR.items():
        v = LMI.get(k)
        if not v: continue
        ph = phi_of(k, v); c, s_ = math.cos(ph), math.sin(ph); dx, dy = px - v['cx'], py - v['cy']
        rx, ry = dx * c + dy * s_, -dx * s_ + dy * c
        if x0 <= rx <= x1 and y0 <= ry <= y1: return True
    return False
def in_clear_poly(pts): return sum(in_clear(*q) for q in pts) * 2 >= len(pts)   # mindestens die Hälfte der Ecken im Freiraum
# Häuser, deren Mitte im Rechteck eines Wahrzeichens liegt, entfallen (sonst überdecken Reste des OSM-Komplexes das Modul)
def inside_mar(px, py, v, pad=2):
    c, s_ = math.cos(-v['th']), math.sin(-v['th']); dx, dy = px - v['cx'], py - v['cy']
    u, w_ = dx * c - dy * s_, dx * s_ + dy * c
    return abs(u) <= v['w'] / 2 + pad and abs(w_) <= v['d'] / 2 + pad
def cen(r): return sum(p[0] for p in r) / len(r), sum(p[1] for p in r) / len(r)
_n = len(B); B = [b for b in B if not any(inside_mar(*cen(b['p']), v) for v in LMI.values()) and not in_clear(*cen(b['p'])) and not in_clear_poly(b['p'])]
print('entfernt im Bereich der Wahrzeichen:', _n - len(B), file=sys.stderr)
# Straßen, Wasser, Parks, Bäume
RD = collections.defaultdict(list); WA, PK, TR = [], [], []
for e in d['elements']:
    t = e.get('tags', {})
    if e['type'] == 'node' and t.get('natural') == 'tree': x, y = proj([e])[0]; TR.append((round(x, 1), round(y, 1))); continue
    if 'highway' in t and e['type'] == 'way' and 'geometry' in e:
        hw = t['highway']
        if t.get('area') == 'yes' or hw == 'platform':
            r = ring(e['geometry'])
            if r: RD['area'].append(r)
            continue
        if hw in ('corridor', 'elevator', 'construction', 'bus_stop') or t.get('tunnel') in ('yes', 'building_passage') or t.get('layer', '0').startswith('-') or t.get('indoor') == 'yes': continue
        cls = {'primary': 'a', 'secondary': 'a', 'tertiary': 'b', 'tertiary_link': 'b', 'busway': 'b', 'residential': 'c', 'unclassified': 'c', 'living_street': 'c', 'service': 'd', 'pedestrian': 'p'}.get(hw, 'f')
        p = dp(proj(e['geometry']), .4); RD[cls].append(p); continue
    if t.get('natural') == 'water' and t.get('water') in ('river', 'lake', 'pond', 'basin', None, 'canal'):
        for r in outer(e):
            if r: WA.append(r)
        continue
    if t.get('leisure') == 'park' or t.get('landuse') == 'grass':
        for r in outer(e):
            if r: PK.append(r)
# Ausschnitt begrenzen
import os
_bb = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'bbox.json')
if os.path.exists(_bb):   # Ausschnitt = ganze Stadt aus data/bbox.json (gedrehtes Rechteck → achsparallele Hülle)
    _S, _W, _N, _E = json.load(open(_bb))['all']
    _c = proj([{'lat': la, 'lon': lo} for la in (_S, _N) for lo in (_W, _E)])
    X0, X1 = math.floor(min(p[0] for p in _c)) - 60, math.ceil(max(p[0] for p in _c)) + 60
    Y0, Y1 = math.floor(min(p[1] for p in _c)) - 60, math.ceil(max(p[1] for p in _c)) + 60
else:
    X0, X1, Y0, Y1 = -4500, 2100, -3500, 2820
inb = lambda p: X0 <= p[0] <= X1 and Y0 <= p[1] <= Y1
B = [b for b in B if any(inb(p) for p in b['p'])]
TR = [t for t in TR if inb(t) and not in_clear(*t) and not any(inside_mar(*t, v, 1) for v in LMI.values())]   # keine Bäume auf Dächern der Wahrzeichen
# ---------- Sortierung (Malerverfahren) ----------
items = [{'k': 'b', 'i': i, 'hull': hull([tuple(p) for p in b['p']]), 'h': b['h']} for i, b in enumerate(B)]
LMH = {n: m.get('h', 20) for n, m in META.items()}
for k, v in LMI.items(): items.append({'k': 'l', 'i': k, 'hull': v['hull'], 'h': LMH[k]})
for ti, (x, y) in enumerate(TR): items.append({'k': 't', 'i': ti, 'hull': [(x - 2, y - 2), (x + 2, y - 2), (x + 2, y + 2), (x - 2, y + 2)], 'h': 11})
for it in items:
    hp = it['hull']; xs = [(x - y) * C for x, y in hp]; ys = [(x + y) * S for x, y in hp]
    it['sb'] = (min(xs), max(xs), min(ys) - it['h'], max(ys)); it['dep'] = sum(x + y for x, y in hp) / len(hp)
def sep(A, B):
    # trennende Achse; liefert -1 (A hinten), 1 (B hinten), 0 (unklar)
    for poly in (A, B):
        for i in range(len(poly)):
            a, b = poly[i], poly[(i + 1) % len(poly)]; n = (b[1] - a[1], a[0] - b[0])
            pa = [n[0] * x + n[1] * y for x, y in A]; pb = [n[0] * x + n[1] * y for x, y in B]
            ln = math.hypot(*n) or 1; eps = .05 * ln
            if max(pa) <= min(pb) + eps: v = n[0] + n[1]; return -1 if v > 1e-9 else (1 if v < -1e-9 else 0)
            if max(pb) <= min(pa) + eps: v = n[0] + n[1]; return 1 if v > 1e-9 else (-1 if v < -1e-9 else 0)
    return 0
G = 40; grid = collections.defaultdict(list)
for idx, it in enumerate(items):
    x0, x1, y0, y1 = it['sb']
    for gx in range(int(x0 // G), int(x1 // G) + 1):
        for gy in range(int(y0 // G), int(y1 // G) + 1): grid[(gx, gy)].append(idx)
edges = collections.defaultdict(set); indeg = [0] * len(items); seen = set()
for cell in grid.values():
    for a in range(len(cell)):
        for b in range(a + 1, len(cell)):
            i, j = cell[a], cell[b]
            if (i, j) in seen: continue
            seen.add((i, j))
            A, Bb = items[i], items[j]
            if A['sb'][1] <= Bb['sb'][0] or Bb['sb'][1] <= A['sb'][0] or A['sb'][3] <= Bb['sb'][2] or Bb['sb'][3] <= A['sb'][2]: continue
            r = sep(A['hull'], Bb['hull'])
            if r == 0: r = -1 if A['dep'] < Bb['dep'] else 1
            u, v = (i, j) if r == -1 else (j, i)
            if v not in edges[u]: edges[u].add(v); indeg[v] += 1
import heapq
pq = [(items[i]['dep'], i) for i in range(len(items)) if indeg[i] == 0]; heapq.heapify(pq); order = []; done = [False] * len(items)
while len(order) < len(items):
    if not pq:  # Zyklus: vordersten Rest freigeben
        rest = min((items[i]['dep'], i) for i in range(len(items)) if not done[i]); indeg[rest[1]] = 0; heapq.heappush(pq, rest)
    _, i = heapq.heappop(pq)
    if done[i]: continue
    done[i] = True; order.append(i)
    for v in edges[i]:
        indeg[v] -= 1
        if indeg[v] == 0 and not done[v]: heapq.heappush(pq, (items[v]['dep'], v))
seq = [items[i]['i'] if items[i]['k'] == 'b' else ('L:' + items[i]['i'] if items[i]['k'] == 'l' else -1 - items[i]['i']) for i in order]
R = lambda v: round(v, 1)
flat = lambda r: [R(c) for p in r for c in p]
data = {
    'attr': '© OpenStreetMap-Mitwirkende (ODbL)',
    'ext': [X0, X1, Y0, Y1],
    'b': [[flat(b['p']), b['h'], b['m']] + ([b['rf']] if b['rf'] else []) for b in B],
    'lm': {k: {'phi': round(phi_of(k, v), 4), 'w': R(v['w']), 'd': R(v['d']), 'cx': R(v['cx']), 'cy': R(v['cy'])} for k, v in LMI.items()},
    'seq': seq,
    'rd': {k: [flat(p) for p in v] for k, v in RD.items()},
    'wa': [flat(r) for r in WA], 'pk': [flat(r) for r in PK], 'tr': [c for t in TR for c in t],
}
js = 'window.MITTE=' + json.dumps(data, separators=(',', ':')) + ';\n'
open(out, 'w').write('// Daten: © OpenStreetMap-Mitwirkende, ODbL 1.0 (openstreetmap.org/copyright). Erzeugt von data/prep.py\n' + js)
print('buildings', len(B), 'trees', len(TR), 'bytes', len(js), 'edges', sum(len(v) for v in edges.values()), file=sys.stderr)
