/* Markuskirche (Hannover-List, Otto Lüer, 1902–06) – Modul.
   Grundlage: OSM-Umriss w44834907 (Gesamtgrundriss ≈ 46 × 33 m) und acht Google-Earth-Kader ref/markuskirche/foto/. Der Umriss ist ein einziges Polygon,
   daher sind Teile und Höhen von Hand angesetzt (ref/markuskirche/gen/gen-mk.py, TEILE.md): Langhaus mit steilem Satteldach, drei Giebel an der NNW-Seite,
   Chor/Querbau im Osten, Südvorbau, Westturm-Ecke mit schlankem Helm (≈ 70 m). Lokal = Karten-Welt (x Ost, y Süd, gegen die Kartendrehung), Nullpunkt = Ankerpunkt.
   Jeder Teil ist in konvexe Stücke zerlegt (Sortierung ohne Durchdringung); Dächer entstehen aus dem Teilumriss. */
(() => {
  const Z0 = 1;
  /*DATA*/const D = [[0,11,0,[17.1,-1.1,17.4,-1.3,3.7,-20.9],3],[0,11,0,[13.4,-5.7,16.9,-0.8,17.1,-1.1,3.7,-20.9],3],[0,11,0,[3.4,-10.9,13.4,-5.7,3.7,-20.9,-1.2,-17.5],12],[0,11,0,[-3.6,6.2,-0.2,11.1,9.8,4.1,6.4,-0.8],7],[0,11,0,[3.4,-10.9,-2.4,-6.9,-4.0,-5.7,-9.8,-1.7,-10.6,-1.1,-16.3,2.9,-12.6,12.5,-3.6,6.2,6.4,-0.8,13.4,-5.7],341],[0,11,0,[-25.0,-0.8,-11.2,18.8,-9.2,17.4,-12.6,12.5],7],[0,11,0,[-16.3,2.9,-20.9,-3.7,-25.0,-0.8,-12.6,12.5],3],[0,11,0,[-9.8,-1.7,-14.3,-8.3,-15.2,-7.7,-10.6,-1.1],7],[0,11,0,[-2.4,-6.9,-7.0,-13.4,-8.6,-12.3,-4.0,-5.7],7],[0,11,1,[18.3,-15.7,10.9,-19.2,3.4,-21.3,16.9,-2.1,20.7,-7.1,20.7,-11.4],61],[0,11,1,[10.9,-19.2,12.1,-21.9,10.7,-24.5,8.2,-24.9,3.4,-21.3],15],[0,11,2,[-9.1,17.4,-7.4,20.0,1.7,13.7,-3.6,6.3],7],[0,11,2,[-3.6,6.3,-12.6,12.5,-9.1,17.4],3],[0,11,3,[9.9,4.1,10.4,4.9,16.8,0.4,17.0,-0.6,13.4,-5.7],15],[0,11,3,[13.4,-5.7,6.5,-0.8,9.9,4.1],3],[0,11,4,[-1.3,-17.4,-1.4,-17.7,-7.1,-13.7],3],[0,11,4,[-2.4,-7.0,3.3,-10.9,-1.3,-17.4,-7.1,-13.7],11],[0,11,5,[-8.6,-12.3,-8.8,-12.5,-14.5,-8.5],3],[0,11,5,[-9.7,-1.8,-4.1,-5.7,-8.6,-12.3,-14.5,-8.5],11],[0,11,6,[-15.2,-7.7,-15.3,-8.0,-21.1,-3.9],3],[0,11,6,[-16.3,2.8,-10.6,-1.2,-15.2,-7.7,-21.1,-3.9],11],[0,44,7,[8.1,5.9,2.3,10.0,6.3,15.7,12.1,11.7],15],[0,7,8,[-21.1,9.9,-16.0,17.3,-13.6,15.6,-18.7,8.2],15],[0,15,9,[17.1,-1.1,16.9,0.5,17.7,1.7,19.2,2.0,20.5,1.1,20.8,-0.4,19.9,-1.7,18.4,-1.9],255],[44,44,10,[4.1,8.8,3.6,11.6,5.2,13.9,8.0,14.4,10.3,12.8,10.8,10.0,9.2,7.7,6.4,7.2],255]], T = [[11,24.5,2,13.5,0,0,3.7,-20.9,17.4,-1.3,17.1,-1.1,16.9,-0.8,13.4,-5.7,6.4,-0.8,9.8,4.1,-0.2,11.1,-3.6,6.2,-12.6,12.5,-9.2,17.4,-11.2,18.8,-25.0,-0.8,-20.9,-3.7,-16.3,2.9,-10.6,-1.1,-15.2,-7.7,-14.3,-8.3,-9.8,-1.7,-4.0,-5.7,-8.6,-12.3,-7.0,-13.4,-2.4,-6.9,3.4,-10.9,-1.2,-17.5],[11,20,2,9,0,0,20.7,-7.1,16.9,-2.1,3.4,-21.3,8.2,-24.9,10.7,-24.5,12.1,-21.9,10.9,-19.2,18.3,-15.7,20.7,-11.4],[11,19.5,2,8.5,0,1,1.7,13.7,-7.4,20.0,-9.1,17.4,-12.6,12.5,-3.6,6.3],[11,19.5,2,8.5,0,1,17.0,-0.6,16.8,0.4,10.4,4.9,9.9,4.1,6.5,-0.8,13.4,-5.7],[11,19.5,2,8.5,0,0,-1.4,-17.7,-1.3,-17.4,3.3,-10.9,-2.4,-7.0,-7.1,-13.7],[11,19.5,2,8.5,0,0,-8.8,-12.5,-8.6,-12.3,-4.1,-5.7,-9.7,-1.8,-14.5,-8.5],[11,19.5,2,8.5,0,0,-15.3,-8.0,-15.2,-7.7,-10.6,-1.2,-16.3,2.8,-21.1,-3.9],[44,44,0,0,0,0,6.3,15.7,2.3,10.0,8.1,5.9,12.1,11.7],[7,12,2,5,0,1,-13.6,15.6,-16.0,17.3,-21.1,9.9,-18.7,8.2],[15,20,1,5,1,0,19.9,-1.7,20.8,-0.4,20.5,1.1,19.2,2.0,17.7,1.7,16.9,0.5,17.1,-1.1,18.4,-1.9],[44,70,1,26,0,0,9.2,7.7,10.8,10.0,10.3,12.8,8.0,14.4,5.2,13.9,3.6,11.6,4.1,8.8,6.4,7.2]], IDS = ["hall", "chor-o", "sgiebel1", "sgiebel2", "giebel3", "giebel2", "giebel1", "turm", "anbau-w", "erker", "helm"];/*END*/
  ISO.landmark('markuskirche', H => {
    const { f2, rnd } = H;
    const P = D.map((d, n) => {
      const v = []; for (let i = 0; i < d[3].length; i += 2) v.push([d[3][i], d[3][i + 1]]);
      const cx = v.reduce((a, p) => a + p[0], 0) / v.length, cy = v.reduce((a, p) => a + p[1], 0) / v.length;
      return { n, z0: d[0], z1: d[1], part: d[2], v, m: d[4], cx, cy };
    });
    const ring = t => { const r = []; for (let i = 6; i < t.length; i += 2) r.push([t[i], t[i + 1]]); return r; };
    const PART = T.map(t => { const r = ring(t); return { zw: t[0], h: t[1], shape: t[2], rh: t[3], mc: t[4], sw: t[5], r, minx: Math.min(...r.map(q => q[0])), maxx: Math.max(...r.map(q => q[0])), miny: Math.min(...r.map(q => q[1])), maxy: Math.max(...r.map(q => q[1])) }; });
    const fp = [Math.min(...PART.map(p => p.minx)), Math.min(...PART.map(p => p.miny)), Math.max(...PART.map(p => p.maxx)), Math.max(...PART.map(p => p.maxy))];
    // Teil B steht auf Teil A (B beginnt dort, wo A endet, und beide Grundrisse überlappen) → alle Stücke von A vor allen Stücken von B
    const SP = {};   // "a>b": Teil a liegt unter Teil b
    const stackInit = () => {
      for (const A of P) for (const B of P) {
        if (A.part === B.part || SP[A.part + '>' + B.part]) continue;
        if (B.z0 >= PART[A.part].zw - 1e-6 && B.z0 > A.z0 + 1e-6 && sepSide(A.v, B.v, 1, 1) === 2) SP[A.part + '>' + B.part] = 1;
      }
    };
    const stack = (A, B) => SP[A.part + '>' + B.part] ? 1 : SP[B.part + '>' + A.part] ? -1 : 0;

    /* ---------- Sortierung: konvexe Stücke, trennende Gerade → was näher am Betrachter liegt, kommt später ---------- */
    function sepSide(A, B, vx, vy) {            // -1: A vor B zeichnen, 1: B vor A, 0: keine trennende Gerade / egal
      const test = (X, Y) => {
        for (let i = 0; i < X.length; i++) {
          const a = X[i], b = X[(i + 1) % X.length], nx = a[1] - b[1], ny = b[0] - a[0];   // Außennormale wie K.wall: (−dy, dx)
          const ref = nx * a[0] + ny * a[1];
          if (Y.every(q => nx * q[0] + ny * q[1] >= ref - 1e-6)) return [nx, ny];             // Y liegt ganz außerhalb von X
        }
        return null;
      };
      let n = test(A, B);
      if (n) return (n[0] * vx + n[1] * vy) > 1e-6 ? -1 : (n[0] * vx + n[1] * vy) < -1e-6 ? 1 : 0;   // B hinter A-Kante … s.u.
      n = test(B, A);
      if (n) return (n[0] * vx + n[1] * vy) > 1e-6 ? 1 : (n[0] * vx + n[1] * vy) < -1e-6 ? -1 : 0;
      return 2;                                   // überlappend
    }
    stackInit();
    const order = K => {
      const [vx, vy] = K.view, n = P.length, before = Array.from({ length: n }, () => new Set()), indeg = new Array(n).fill(0), sBefore = Array.from({ length: n }, () => new Set()), sIndeg = new Array(n).fill(0);
      const dep = p => p.cx * vx + p.cy * vy;
      const add = (a, b) => { if (!before[a].has(b)) { before[a].add(b); indeg[b]++; } };
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = P[i], B = P[j];
        if (A.part !== B.part) { const r = stack(A, B); if (r) { const [a, b] = r > 0 ? [i, j] : [j, i]; add(a, b); if (!sBefore[a].has(b)) { sBefore[a].add(b); sIndeg[b]++; } continue; } }
        if (A.z1 <= B.z0 + 1e-6 && A.z0 < B.z0) { // B steht auf A (oder höher): erst A – gilt nur, wenn sich die Grundrisse berühren
          const s = sepSide(A.v, B.v, vx, vy); if (s === 2) { add(i, j); continue; }
        }
        if (B.z1 <= A.z0 + 1e-6 && B.z0 < A.z0) { const s = sepSide(A.v, B.v, vx, vy); if (s === 2) { add(j, i); continue; } }
        const s = sepSide(A.v, B.v, vx, vy);
        if (s === -1) add(i, j); else if (s === 1) add(j, i);
        else if (s === 2) { const da = dep(A), db = dep(B); if (da < db) add(i, j); else if (db < da) add(j, i); }
      }
      const out = [], ready = [];
      for (let i = 0; i < n; i++) if (!indeg[i]) ready.push(i);
      const done = new Set();
      while (out.length < n) {
        if (!ready.length) {                       // Zyklus: das am weitesten hinten liegende Stück zuerst
          let best = -1; for (let i = 0; i < n; i++) if (!done.has(i) && sIndeg[i] <= 0 && (best < 0 || dep(P[i]) < dep(P[best]))) best = i;
          indeg[best] = 0; ready.push(best);
        }
        ready.sort((a, b) => dep(P[a]) - dep(P[b]));
        const i = ready.shift(); if (done.has(i)) continue; done.add(i); out.push(i); sBefore[i].forEach(j => sIndeg[j]--);
        before[i].forEach(j => { if (!done.has(j) && --indeg[j] <= 0 && !ready.includes(j)) ready.push(j); });
      }
      return out.map(i => P[i]);
    };


    /* ---------- Fassaden (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ---------- */
    const rect = (x, y, w, h) => `M${f2(x)} ${f2(y)}h${f2(w)}v${f2(h)}h${f2(-w)}z`;
    const archP = (x, y, w, h) => `M${f2(x)} ${f2(y + h)}V${f2(y + w / 2)}A${f2(w / 2)} ${f2(w / 2)} 0 0 1 ${f2(x + w)} ${f2(y + w / 2)}V${f2(y + h)}z`;
    const disc = (cx, cy, r) => `M${f2(cx - r)} ${f2(cy)}a${f2(r)} ${f2(r)} 0 1 0 ${f2(2 * r)} 0a${f2(r)} ${f2(r)} 0 1 0 ${f2(-2 * r)} 0z`;
    function windows(len, h, o) {
      const { fh, bay, ww, wh, sill, mx } = o, acc = {}, rows = Math.floor((h - (o.top || mx)) / fh);
      if (rows < 1 || len < ww + 2 * mx) return '';
      const nb = Math.max(1, Math.floor((len - 2 * mx + (bay - ww)) / bay)), off = (len - (nb * bay - (bay - ww))) / 2;
      for (let r = 0; r < rows; r++) {
        const yb = h - r * fh - sill, f = Math.min(4, 1 + Math.floor(4 * r / rows));
        if (yb - wh < .3) continue;
        for (let b = 0; b < nb; b++) {
          const q = rnd(), c = q < o.pOff ? ' off' : q < o.pOff + o.pDim ? ' dim' : q < o.pOff + o.pDim + o.pHi ? ' hi' : '';
          const key = f + c; (acc[key] = acc[key] || []).push((o.arch ? archP : rect)(off + b * bay, yb - wh, ww, wh));
        }
      }
      return Object.entries(acc).map(([k, v]) => { const [f, ...c] = k.split(' '); return `<path class="wn${c.length ? ' ' + c.join(' ') : ''}" data-f="${f}" d="${v.join('')}"/>`; }).join('');
    }
    const vlines = (len, h, step) => { let d = ''; for (let u = step / 2; u < len; u += step) d += `M${f2(u)} 0V${f2(h)}`; return `<path class="dt" d="${d}"/>`; };
    const hlines = (len, ys) => ys.length ? `<path class="dt" d="${ys.map(y => `M0 ${f2(y)}H${f2(len)}`).join('')}"/>` : '';
    const LIT = { pOff: .50, pDim: .26, pHi: .08 };
    const NAVE = { fh: 8.4, bay: 5.2, ww: 2.0, wh: 5.6, sill: 2.2, mx: 2.0, arch: 1, ...LIT };
    const GABL = { fh: 4.6, bay: 3.4, ww: 1.5, wh: 3.4, sill: 1.0, mx: 1.4, arch: 1, ...LIT };
    const TURM = { fh: 9, bay: 3.4, ww: 1.2, wh: 4.4, sill: 1.5, mx: 1.4, arch: 1, pOff: .55, pDim: .2, pHi: .05 };
    const SMALL = { fh: 7.4, bay: 3.6, ww: 1.6, wh: 4, sill: 1.6, mx: 1.2, arch: 1, ...LIT };
    const path = (c, d, f) => `<path class="${c}"${f ? ` data-f="${f}"` : ''} d="${d}"/>`;
    function deco(p) {
      const id = IDS[p.part];
      return (len, h) => {
        if (len < 2.2 || h < 1) return '';
        if (id === 'turm') {   // Portal unten, Uhr, hohe Spitzbogenfenster
          let s = windows(len, h - 5.6, TURM) + hlines(len, [h - 13, h - 3.2]);
          if (len > 4) s += path('wn hi', disc(len / 2, 6.2, 1.15), 4) + path('wn dim', archP(len / 2 - 1.3, h - 5.2, 2.6, 5.2), 1);
          return s;
        }
        if (id.startsWith('sgiebel')) {   // Südgiebel: Rose, Bogenfenster, Portal
          let s = path('wn dim', disc(len / 2, 2.6, 1.5), 4) + path('dt', disc(len / 2, 2.6, 1.9)) + windows(len, h - 3.8, GABL);
          return s + hlines(len, [h - 4.4]);
        }
        if (id.startsWith('giebel')) return windows(len, h, GABL) + hlines(len, [2.2]);
        if (id === 'hall') return windows(len, h, NAVE) + hlines(len, [h - 1.4]);
        if (id === 'anbau-w') return path('wn dim', archP(len / 2 - 1.2, h - 3.4, 2.4, 3.4), 1) + hlines(len, [h - 1]);
        return windows(len, h, SMALL) + hlines(len, [h - 1.2]);
      };
    }

    /* ---------- Dächer ---------- */
    const MATS = ['sl', 'cu', 'rs'];
    function roof(K, q) {
      const { zw, h, shape, rh, mc, r } = q, z = Z0 + zw, zt = Z0 + h, mat = MATS[mc];
      const cx = r.reduce((a, p) => a + p[0], 0) / r.length, cy = r.reduce((a, p) => a + p[1], 0) / r.length;
      if (shape === 0) return K.poly(r.map(p => [p[0], p[1], zt]), 'pl tp');
      if (shape === 1) { let s = ''; for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; s += K.face([[a[0], a[1], z], [b[0], b[1], z], [cx, cy, zt]], mat); } return s; }
      if (shape === 4) {
        let R = 0; r.forEach(p => R += Math.hypot(p[0] - cx, p[1] - cy)); R /= r.length;
        const N = 28, KS = 6, pt = (k, i) => { const ph = k / KS * Math.PI / 2, a = i / N * 2 * Math.PI; return [cx + R * Math.cos(ph) * Math.cos(a), cy + R * Math.cos(ph) * Math.sin(a), z + rh * Math.sin(ph)]; };
        let s = '';
        for (let i = 0; i < N; i++) {       // ein Streifen je Rippe (Meridian): wenig Pfade, Rippenoptik wie beim Original
          const L = [], R2 = [];
          for (let k = 0; k <= KS; k++) { L.push(pt(k, i)); R2.push(pt(k, i + 1)); }
          s += K.face([...L, ...R2.slice(0, KS).reverse()], mat);
        }
        return s;
      }
      // Sattel-/Walmdach auf dem Hüllrechteck: First entlang der längeren Seite (q.sw dreht um 90°)
      let bi = 0, bl = 0; r.forEach((p, i) => { const n = r[(i + 1) % r.length], l = Math.hypot(n[0] - p[0], n[1] - p[1]); if (l > bl) { bl = l; bi = i; } });
      const e0 = r[bi], e1 = r[(bi + 1) % r.length];
      let ux = (e1[0] - e0[0]) / bl, uy = (e1[1] - e0[1]) / bl;
      const ext = (ux, uy) => { let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9; r.forEach(p => { const u = (p[0] - e0[0]) * ux + (p[1] - e0[1]) * uy, v = -(p[0] - e0[0]) * uy + (p[1] - e0[1]) * ux; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); }); return [u0, u1, v0, v1]; };
      let [u0, u1, v0, v1] = ext(ux, uy);
      if (u1 - u0 < v1 - v0) { [ux, uy] = [-uy, ux]; [u0, u1, v0, v1] = ext(ux, uy); }
      if (q.sw) { [ux, uy] = [-uy, ux]; [u0, u1, v0, v1] = ext(ux, uy); }
      const vx = -uy, vy = ux;
      const W = (u, v, zz) => [e0[0] + u * ux + v * vx, e0[1] + u * uy + v * vy, zz], vm = (v0 + v1) / 2, hw = (v1 - v0) / 2;
      const hip = shape === 3 && (u1 - u0) > 2 * hw ? hw : 0;
      const A = W(u0, v0, z), B = W(u1, v0, z), C = W(u1, v1, z), Dd = W(u0, v1, z), R0 = W(u0 + hip, vm, zt), R1 = W(u1 - hip, vm, zt);
      let s = K.face([A, B, R1, R0], mat) + K.face([C, Dd, R0, R1], mat);
      s += hip ? K.face([B, C, R1], mat) + K.face([Dd, A, R0], mat) : K.face([B, C, R1], 'pl') + K.face([Dd, A, R0], 'pl');
      if (shape === 2 && mc === 0) {   // grüne Kupferkante (Ortgang) am zugewandten Giebelende
        const e = K.facing(ux, uy) > 0 ? [B, R1, C] : K.facing(-ux, -uy) > 0 ? [Dd, R0, A] : null;
        if (e) s += `<path class="cu-d" fill="none" stroke-width="1.4" d="${K.path(e)}"/>`;
      }
      return s;
    }

    /* ---------- Zeichnen ---------- */
    const draw = K => {
      // Reihenfolge für den einen Kartenblick: Teile von hinten nach vorn (Tiefe des Teilschwerpunkts), je Teil erst Wände (hinten → vorn), dann Dach.
      // Das Satteldach des Langhauses überdeckt so die niedrigeren Nordgiebel, Südgiebel/Turm/Chor stehen davor.
      const [vx, vy] = K.view, dep = (x, y) => x * vx + y * vy;
      const info = PART.map((q, i) => { const ps = P.filter(p => p.part === i); const cx = q.r.reduce((a, p) => a + p[0], 0) / q.r.length, cy = q.r.reduce((a, p) => a + p[1], 0) / q.r.length; return { i, ps, d: dep(cx, cy), z0: Math.min(...ps.map(p => p.z0)) }; });
      info.sort((a, b) => (a.z0 - b.z0 > 20 ? 1 : b.z0 - a.z0 > 20 ? -1 : a.d - b.d));
      let s = '';
      info.forEach(({ i, ps }) => {
        ps.slice().sort((a, b) => dep(a.cx, a.cy) - dep(b.cx, b.cy)).forEach(p => {
          if (p.z1 - p.z0 > .05) for (let k = 0; k < p.v.length; k++) if (p.m >> k & 1) s += K.wall(p.v[k], p.v[(k + 1) % p.v.length], Z0 + p.z0, Z0 + p.z1, 'pl', deco(p));
        });
        s += roof(K, PART[i]);
      });
      return s;
    };
    const M = [{ id: 'markuskirche', fp, draw }];
    return { mods: M, lc: [0, 0], z0: 0, top: [-15, -9, Z0 + 72], label: 'Markuskirche', h: 70, len: 60 };
  });
})();
