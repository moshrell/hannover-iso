/* Leineschloss (Niedersächsischer Landtag) – Modul v2, nach Google-Earth-Kadern: ref/leineschloss/ (INDEX.md, README.md)
   Grundriss: OSM-Relation r1170793 (172,1 × 74,7 m), in Metern gezeichnet; Maßstab auf der Karte = 1 (len 172).
   Lokales System: x von Südwest (Leine) nach Nordost (Hannah-Arendt-Platz), y von Nordwest nach Südost, z Höhe, Gelände z = 1.
   (x = 74,7 − v, y = u der Mindest-Rechteck-Achsen des OSM-Umrisses: u-Achse Azimut 128°, v-Achse 218°.)
   Aufbau: Nordwest-Flügel („Schwanz“) · Mittelpavillon · langer Leine-Flügel (Mansarde, Loggia über dem Fluss) · Südost-Eckpavillon ·
   inneres Kranzgebäude um den Hof (flache Dächer) · Laves-Portikus (sechs Säulen) auf der Platzseite · Plenarsaal-Block (1962) mit
   dunklem Walmdach, Glasdach und Technik auf dem Dach.
   ACHTUNG Wanddeko: y läuft von der Oberkante der Wand nach UNTEN (0 = Traufe, h = Fuß). */
(() => {
  const Z0 = 1;
  ISO.landmark('leineschloss', H => {
    const { f2, hl, vl, winR, winA, wins, lathe, saddle, roofPlane, hip } = H, M = [], add = m => (M.push(m), m);

    /* ---------- Hilfen ---------- */
    // Polygon (konvex) um d nach innen versetzt
    const inset = (P, d) => {
      const n = P.length; let A = 0;
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; A += a[0] * b[1] - b[0] * a[1]; }
      const sg = A > 0 ? 1 : -1, L = [];
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
        L.push([a[0] - dy / l * sg * d, a[1] + dx / l * sg * d, dx, dy]); }
      return L.map((l, i) => { const m = L[(i + n - 1) % n], det = m[2] * l[3] - m[3] * l[2], t = ((l[0] - m[0]) * l[3] - (l[1] - m[1]) * l[2]) / det; return [m[0] + m[2] * t, m[1] + m[3] * t]; });
    };
    // Rechteck in der Reihenfolge von K.box (Außennormale = (−dy, dx))
    const rectP = (x0, y0, x1, y1) => [[x1, y0], [x0, y0], [x0, y1], [x1, y1]];
    const flat = (K, P, z, mat = 'kc') => K.face(P.map(p => [p[0], p[1], z]), mat);
    // Mansarde: steile untere Schräge, flaches Plateau
    const mansard = (K, P, ze, rise, d, mat = 'sl') => {
      const I = inset(P, d); let s = '';
      for (let i = 0; i < P.length; i++) { const j = (i + 1) % P.length;
        s += roofPlane(K, [[...P[i], ze], [...P[j], ze], [...I[j], ze + rise], [...I[i], ze + rise]], mat, 3.6); }
      return s + K.face(I.map(p => [...p, ze + rise]), mat);
    };
    // Fensterachsen entlang einer Wand der Länge len (Mitten)
    const axes = (len, step) => { const n = Math.floor((len - 1.6) / step), off = (len - n * step) / 2 + step / 2; return Array.from({ length: n }, (_, i) => off + i * step); };
    // Gauben entlang einer Traufkante a→b (Außennormale (−dy, dx)), über denselben Achsen wie die Fenster
    const dormers = (K, a, b, ze, rise, d, step, skip = []) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
      const ins = d * .42, zb = ze + rise * .42;
      let s = '';
      axes(len, step).forEach(t => {
        if (skip.some(([p, q]) => t > p && t < q)) return;
        const f = [a[0] + ux * t - nx * ins, a[1] + uy * t - ny * ins];
        const L = [f[0] - ux * .8, f[1] - uy * .8], R = [f[0] + ux * .8, f[1] + uy * .8];
        if (!K.wallVisible(L, R)) return;                                  // Gauben auf abgewandten Schrägen nicht zeichnen
        s += K.wall(L, R, zb, zb + 2.3, 'pl', (l, h) => wins(winA(.28, .3, l - .56, h - .5, 3)));
        s += saddle(K, L, R, [-nx * 1.9, -ny * 1.9], zb + 2.3, zb + 3.2, 'sl');
      });
      return s;
    };
    const BASE_ = 4;
    const quoins = (len, h, k = 2) => { let q = ''; for (let v = BASE_ + .8; v < h - 1.2; v += 1.6) q += `<path class="dt" d="M0 ${f2(v)}h${k}M${f2(len - k)} ${f2(v + .8)}h${k}"/>`; return q; };

    /* Fassade des Altbaus: Rustika-Sockel mit Segmentbogenfenstern, drei Reihen Rechteckfenster, Gurte, Traufgesims */
    const old = (o = {}) => (len, h) => {
      const step = o.step || 3.9, ww = o.ww || 1.8, skip = o.skip || [], B = 4;
      let q = hl(0, len, .5) + hl(0, len, 1.3) + hl(0, len, 5.2) + hl(0, len, 9.1) + hl(0, len, h - B) + quoins(len, h);
      for (let v = h - B + 1.3; v < h - .2; v += 1.3) q += hl(0, len, v);
      let w = '';
      for (const u of axes(len, step)) {
        if (skip.some(([a, b]) => u > a && u < b)) continue;
        w += winR(u - ww / 2, 1.9, ww, 3, 3) + winR(u - ww / 2, 5.7, ww, 3.2, 2) + winR(u - ww / 2, 9.5, ww, 3.2, 1) + winA(u - ww / 2, h - B + .6, ww, B - .7, 0);
      }
      return q + wins(w);
    };
    const blank = (len, h) => hl(0, len, .5) + hl(0, len, 1.3);

    /* ---------- Hof (Boden) ---------- */
    const COURT = [[52.9, 81.1], [22, 80.3], [21.6, 101.6], [52.5, 102.4]];

    /* ---------- Nordwest-Flügel („Schwanz“, leicht schräg): Eckpavillon im Nordwesten + Körper; drei Geschosse + Mansarde ---------- */
    const WT = 16.8, WP = 17.4;
    const TB = [[27, 13], [10.2, 13], [3.3, 48.5], [17.5, 50.9]];            // Körper (Wände nach außen)
    const TP = [[29, 5.2], [12.8, 0], [10.2, 13], [27, 13]];                  // NW-Eckpavillon
    add({ id: 'tail', fp: [3.3, 13, 27, 48.2], draw: K => {
      let s = K.wall(TB[0], TB[1], Z0, Z0 + WT, 'pl', blank) + K.wall(TB[1], TB[2], Z0, Z0 + WT, 'pl', old()) + K.wall(TB[2], TB[3], Z0, Z0 + WT, 'pl', blank) + K.wall(TB[3], TB[0], Z0, Z0 + WT, 'pl', old());
      s += mansard(K, TB, Z0 + WT, 5.2, 2.4);
      return s + dormers(K, TB[1], TB[2], Z0 + WT, 5.2, 2.4, 3.9) + dormers(K, TB[3], TB[0], Z0 + WT, 5.2, 2.4, 3.9);
    } });
    add({ id: 'nwPav', fp: [10, 0, 29, 13], draw: K => {
      let s = K.wall(TP[0], TP[1], Z0, Z0 + WP, 'pl', old({ step: 3.9 })) + K.wall(TP[1], TP[2], Z0, Z0 + WP, 'pl', old({ step: 3.9 })) + K.wall(TP[2], TP[3], Z0, Z0 + WP, 'pl', blank) + K.wall(TP[3], TP[0], Z0, Z0 + WP, 'pl', old({ step: 3.9 }));
      s += mansard(K, TP, Z0 + WP, 6.4, 3);
      return s + dormers(K, TP[0], TP[1], Z0 + WP, 6.4, 3, 3.9) + dormers(K, TP[1], TP[2], Z0 + WP, 6.4, 3, 3.9) + dormers(K, TP[3], TP[0], Z0 + WP, 6.4, 3, 3.9);
    } });

    /* ---------- Mittelpavillon (springt zur Leine vor) und Südost-Eckpavillon ---------- */
    const pav = (id, x0, y0, x1, y1) => add({ id, fp: [x0, y0, x1, y1], draw: K => {
      const P = rectP(x0, y0, x1, y1), f = old({ step: 3.9, ww: 1.8 });
      let s = K.box(x0, y0, Z0, x1 - x0, y1 - y0, WP, 'pl', { W: f, S: f, E: f, N: blank }, false);
      s += mansard(K, P, Z0 + WP, 6.4, 3);
      return s + dormers(K, P[1], P[2], Z0 + WP, 6.4, 3, 3.9) + dormers(K, P[2], P[3], Z0 + WP, 6.4, 3, 3.9);
    } });
    pav('midPav', .2, 48.2, 17.5, 60.7);
    pav('endPav', 0, 123.3, 19.5, 137.5);

    /* ---------- Langer Leine-Flügel (Mansarde) + niedrige Loggia über dem Fluss ---------- */
    add({ id: 'sw', fp: [6, 60.7, 21.6, 123.3], draw: K => {
      const P = rectP(6, 60.7, 21.6, 123.3), lg = [[28, 44]];
      let s = K.box(6, 60.7, Z0, 15.6, 62.6, 17, 'pl', { W: old({ skip: lg }), E: old(), N: blank, S: blank }, false);
      s += mansard(K, P, Z0 + 17, 5.2, 2.4);
      return s + dormers(K, P[1], P[2], Z0 + 17, 5.2, 2.4, 3.9) + dormers(K, P[3], P[0], Z0 + 17, 5.2, 2.4, 3.9);
    } });
    add({ id: 'loggia', fp: [2.4, 89.7, 6, 104.3], parent: 'sw', side: 'W', draw: K => {
      const h0 = 9.4;
      const lg = (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 1.1) + `<rect class="lv" x=".8" y="1.6" width="${f2(len - 1.6)}" height="3.3"/>`;
        for (let i = 0; i <= 6; i++) q += `<rect class="pl" x="${f2(.8 + i * (len - 1.6 - .6) / 6)}" y="1.6" width=".6" height="3.3"/>`;
        q += hl(0, len, 5.2);
        for (let v = 6.4; v < h - .2; v += 1.2) q += hl(0, len, v);
        let w = ''; for (let i = 0; i < 4; i++) w += winA(1.6 + i * (len - 3.2 - 1.8) / 3, h - 3.6, 1.8, 3.3, 0);
        return q + wins(w);
      };
      return K.box(2.4, 89.7, Z0, 3.6, 14.6, h0, 'pl', { W: lg, S: blank, N: blank }, false) + flat(K, rectP(2.4, 89.7, 6, 104.3), Z0 + h0, 'kc');
    } });

    /* ---------- Inneres Kranzgebäude: Nordwest-Querflügel + Nordost-Flügel (Platzfassade), flache Dächer ---------- */
    add({ id: 'ne', fp: [21.6, 65.6, 74.3, 102.4], draw: K => {
      const WB = 15.4, WN = 16.4, FW = 15;
      // Nordwest-Querflügel (grau, flaches Dach) und Nordost-Flügel
      let s = K.box(21.6, 65.6, Z0, 52.7, 14.7, WB, 'pl', { N: old(), E: blank, S: blank, W: blank }, false) + flat(K, rectP(21.6, 65.6, 74.3, 80.3), Z0 + WB);
      s += K.box(52.9, 80.3, Z0, 21.4, 22.1, WN, 'pl', { W: old(), N: blank, S: old(), E: blank }, false) + flat(K, rectP(52.9, 80.3, 74.3, 102.4), Z0 + WN);
      // Platzfassade (Laves-Flügel) über beide Teile: Fenster sitzen auf durchgehenden Achsen
      s += K.wall([74.35, 102.2], [74.35, 65.6], Z0, Z0 + WN, 'pl', (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 1.3) + hl(0, len, 5.2) + hl(0, len, 9.1) + hl(0, len, h - 4) + quoins(len, h);
        for (let v = h - 2.7; v < h - .2; v += 1.3) q += hl(0, len, v);
        let w = '';
        for (const u of axes(len - 4.6, 3.9).map(a => a + 2.3)) {
          w += winR(u - .85, 1.9, 1.7, 3, 3) + winR(u - .85, 5.7, 1.7, 3.2, 2) + winR(u - .85, 9.4, 1.7, 3.1, 1) + winA(u - .85, h - 3.4, 1.7, 3, 0); }
        return q + wins(w);
      });
      // Haustechnik auf dem Dach
      s += K.box(60, 84, Z0 + WN, 6, 3.2, 1.4, 'kc', {}, true) + K.box(66.5, 92, Z0 + WN, 3, 4, 1.1, 'kc', {}, true) + K.box(28, 67.5, Z0 + WB, 4, 3, 1.2, 'kc', {}, true);
      return s;
    } });

    /* ---------- Foyer-Zone (Glasdach) zwischen Hof und Plenarsaal ---------- */
    const WD = 12.5;
    add({ id: 'foyer', fp: [21.6, 102.4, 67.8, 137.5], draw: K => {
      let s = K.box(21.6, 102.4, Z0, 46.2, 35.1, WD, 'kc', { E: blank, W: blank, N: blank, S: blank }, false);
      s += flat(K, rectP(21.6, 102.4, 67.8, 137.5), Z0 + WD);
      s += `<path class="kr" d="${K.path([[21.6, 102.4, Z0 + WD], [67.8, 102.4, Z0 + WD], [67.8, 137.5, Z0 + WD], [21.6, 137.5, Z0 + WD]])}Z"/>`;
      return s;
    } });
    add({ id: 'glass', fp: [36, 113, 64, 129], above: 'foyer', draw: K => {
      const z0 = Z0 + WD, x0 = 36, x1 = 64, y0 = 113, y1 = 129, i = 2.2, zt = z0 + 1.6;
      const B = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], I = [[x0 + i, y0 + i], [x1 - i, y0 + i], [x1 - i, y1 - i], [x0 + i, y1 - i]];
      let s = '';
      const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      const planes = [[B[0], B[1], I[1], I[0]], [B[1], B[2], I[2], I[1]], [B[2], B[3], I[3], I[2]], [B[3], B[0], I[0], I[3]]];
      planes.forEach(p => { let m = ''; for (let k = 1; k < 4; k++) { const a = lerp(p[0], p[1], k / 4), b = lerp(p[3], p[2], k / 4); m += `<path class="dt" d="${K.path([[...a, z0 + .2], [...b, zt]])}"/>`; }
        s += K.face(p.map((q, j) => [...q, j < 2 ? z0 + .2 : zt]), 'glb', m); });
      s += K.face(I.map(p => [...p, zt]), 'glb');
      for (let k = 1; k < 6; k++) { const y = I[0][1] + (I[3][1] - I[0][1]) * k / 6; s += `<path class="dt" d="${K.path([[I[0][0], y, zt], [I[1][0], y, zt]])}"/>`; }
      return s;
    } });

    /* ---------- Plenarsaal-Block (weiße Fassade, tiefes Flachdach, dunkles Walmdach des Saals) ---------- */
    const WE = 14.2, HX = 15.7, HY0 = 137.5, HX1 = 67.6, HY1 = 172.1;
    add({ id: 'hall', fp: [HX, HY0, HX1, HY1], draw: K => {
      // Südostseite: fünf hohe Fenster über verglastem Sockel; Südwestseite: Fensterbänder; Nordostseite: geschlossene Betonwand
      const se = (len, h) => {
        let q = hl(0, len, .6) + hl(0, len, h - 3.7), w = '';
        const n = 5, st = (len - 4) / n;
        for (let i = 0; i < n; i++) { const u = 2 + i * st + st * .2; w += winR(u, 1.5, st * .6, 7.8, 2); q += vl(u - .35, 1.1, 9.8) + vl(u + st * .6 + .35, 1.1, 9.8); }
        for (let i = 0; i < 14; i++) w += winR(1.2 + i * (len - 2.4) / 14, h - 3.2, (len - 2.4) / 14 - .5, 2.6, 0);
        return q + wins(w);
      };
      const sw = (len, h) => {
        let q = hl(0, len, .6) + hl(0, len, h - 3.7), w = '';
        const n = Math.floor((len - 2) / 3.2);
        for (let i = 0; i < n; i++) { const u = 1.4 + i * 3.2; w += winR(u, 2, 2.2, 2.4, 2) + winR(u, 5.4, 2.2, 2.4, 1); }
        for (let i = 0; i < n; i++) w += winR(1.4 + i * 3.2, h - 3.0, 2.2, 2.4, 0);
        return q + wins(w);
      };
      const ne = (len, h) => { let q = hl(0, len, .6) + hl(0, len, h - 2.4); for (let u = 4; u < len - 1; u += 4.4) q += vl(u, .7, h - 2.4); return q; };
      let s = K.box(HX, HY0, Z0, HX1 - HX, HY1 - HY0, WE, 'kc', { S: se, W: sw, E: ne, N: blank }, false);
      const zr = Z0 + WE, R = rectP(HX, HY0, HX1, HY1);
      s += flat(K, R, zr) + `<path class="kr" d="${K.path(R.map(p => [...p, zr]))}Z"/>`;
      // Haustechnik zwischen Glasdach und Saaldach
      [[22, 139, 7, 3, 1.6], [31, 140.5, 5, 2.4, 2.2], [38.5, 139.5, 9, 2.2, 1.2], [49, 140, 6, 3.2, 1.8], [57, 139, 7, 3, 1.4], [26, 143, 12, 1.4, 1], [42, 143.4, 14, 1.4, 1]]
        .forEach(([x, y, w, d, h]) => { s += K.box(x, y, zr, w, d, h, 'kc', {}, true); });
      // dunkles Walmdach des Saals (gekappte Ecken) mit vier Oberlichtern
      const O = [[60, 151], [55, 146], [31, 146], [26, 151], [26, 163], [31, 168], [55, 168], [60, 163]];
      const Iq = O.map(p => [43 + (p[0] - 43) * .66, 157 + (p[1] - 157) * .62]), zt = zr + 5.2;
      for (let i = 0; i < O.length; i++) { const j = (i + 1) % O.length; s += roofPlane(K, [[...O[i], zr], [...O[j], zr], [...Iq[j], zt], [...Iq[i], zt]], 'sl', 3.2); }
      s += K.face(Iq.map(p => [...p, zt]), 'sl');
      [[35, 152], [35, 160], [48, 152], [48, 160]].forEach(([x, y]) => { s += K.box(x, y, zt, 3.2, 2.4, .9, 'glb', {}, true); });
      return s;
    } });

    /* ---------- Laves-Portikus (Platzseite): sechs Säulen, Gebälk, Giebel ---------- */
    add({ id: 'portico', fp: [67.8, 106, 79.7, 138], parent: 'foyer', side: 'E', draw: K => {
      let s = K.box(67.8, 107.8, Z0, 6.9, 28.4, 1.3, 'pl', { E: l => hl(0, l, .4) }, true);
      for (let i = 0; i < 5; i++) s += K.box(74.7 + i * 1.05, 106.4, Z0, 1.05, 31.2, Math.max(.06, 1.3 * (5 - i) / 5.5), 'pl');
      for (let i = 0; i < 6; i++) { const y = 110.4 + i * 4.64;
        s += lathe(K, 73.1, y, [[Z0 + 1.3, 1.05], [Z0 + 2, .86], [Z0 + 13.6, .76], [Z0 + 14.2, .98], [Z0 + 14.9, 1.2]], 'pl fr', 3, [1, 3]); }
      const zb = Z0 + 14.9;
      s += K.box(67.8, 108.2, zb, 6.9, 27.6, 1.9, 'pl', { E: l => hl(0, l, .5) + hl(0, l, 1.1) + Array.from({ length: 27 }, (_, i) => vl(.6 + i, 1.1, 1.9)).join(''), S: l => hl(0, l, .5) }, false);
      const zp = zb + 1.9;
      s += flat(K, rectP(67.8, 108.2, 74.7, 135.8), zp, 'pl');
      s += saddle(K, [74.7, 135.8], [74.7, 108.2], [-6.9, 0], zp, zp + 4.4, 'sl');
      s += K.face([[74.7, 135.8, zp], [74.7, 108.2, zp], [74.7, 122, zp + 4.4]], 'pl', `<path class="dt" d="${K.path([[74.7, 133.8, zp + .5], [74.7, 122, zp + 3.7], [74.7, 110.2, zp + .5]])}"/><path class="dt" d="${K.path([[74.7, 129, zp + .5], [74.7, 122, zp + 2.8], [74.7, 115, zp + .5]])}"/>`);
      return s;
    } });

    return { mods: M, lc: [37.33, 86.07], z0: 0, pin: [70, 72, 19], ground: K => K.poly(COURT.map(p => [p[0], p[1], Z0]), 'court'), top: [37, 86, 24], label: 'Leineschloss · Landtag', h: 24, len: 172.1 };
  });
})();
