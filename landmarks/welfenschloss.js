/* Welfenschloss (Hauptgebäude der Leibniz Universität Hannover) – Modul v3, Fotos: ref/welfenschloss/ (Wikimedia + Kader, siehe quellen.txt, INDEX.md)
   Grundriss aus dem OSM-Umriss (relation 2743600), in die Längsachse gedreht und auf (0,0) verschoben: x = Länge (≈ Ost), y = Tiefe, Welfengarten-Front = y ≈ 91 (lokale +y).
   Aufbau: breiter Hauptbau (x 73–222, y 23–91) mit drei Innenhöfen (OSM-Löcher) und dem Lichthof (Glasdach), niedriger Westflügel, Nordost-Anbau,
   vier Ecktürme am Hauptbau (nur der vorne rechts hat einen Spitzhelm), Mittelturm vor der Südfront mit Zinnenkranz und vier Ecktürmchen, Portalvorbau (Bögen, Löwen).
   Sandstein, Zinnenkränze, flache Schieferdächer; Neugotik (Entwurf Christian Heinrich Tramm, 1857–1866). Alles selbst gezeichnet. */
(() => {
  const Z0 = 1;                                // Gelände
  ISO.landmark('welfenschloss', H => {
    const { f2, hl, vl, arch, winA, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const area = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0);
    const hole = p => area(p) > 0 ? p : p.slice().reverse();       // Wandnormalen zeigen in den Hof (siehe K.wall)

    // Wanddeko: y läuft von der Oberkante nach UNTEN. Alle Linien einer Wand werden zu EINEM Pfad gesammelt (leichtes SVG, wenige Knoten)
    const hD = (x0, x1, y) => `M${f2(x0)} ${f2(y)}H${f2(x1)}`, vD = (x, y0, y1) => `M${f2(x)} ${f2(y0)}V${f2(y1)}`;
    const DT = d => d ? `<path class="dt" d="${d}"/>` : '';
    const cren = len => { let d = ''; for (let u = .4; u < len - 1; u += 2.4) d += `M${f2(u)} .25h1.2v.85h-1.2Z`; return `<path class="sl" d="${d}"/>`; };
    const plinthD = (len, h, ph = 2.6) => {
      const t = h - ph, k = ph / 3; let q = hD(0, len, t) + hD(0, len, t + k) + hD(0, len, t + 2 * k);
      for (let u = .9; u < len; u += 2.1) q += vD(u, t, t + k) + vD(u + 1.05, t + k, t + 2 * k) + vD(u, t + 2 * k, h);
      return q;
    };
    const quoinsD = (len, h) => { let q = ''; for (let v = 3; v < h - 1.2; v += 2) q += `M0 ${f2(v)}h1.5M${f2(len - 1.5)} ${f2(v + 1)}h1.5`; return q; };
    // Fenster einer Wand sammeln: leuchtendes Glas einzeln (data-f / Klassen fürs Licht), Rahmen, Sprossen und Kappen je als ein gemeinsamer Pfad
    const winAcc = () => { const a = { wn: '', dt: '', mul: '' }; a.add = (x, y, w, h, f, cls = '', hoodOn = true) => {
      a.wn += `<path class="wn${cls || H.vari()}" data-f="${f}" d="${arch(x, y, w, h)}"/>`;
      a.mul += `M${f2(x + w / 2)} ${f2(y + w * .1)}V${f2(y + h)}M${f2(x)} ${f2(y + w / 2 + (h - w / 2) * .35)}H${f2(x + w)}`;
      if (hoodOn) a.dt += `${arch(x - .4, y - .4, w + .8, h + .4)}M${f2(x - .5)} ${f2(y + h + .3)}H${f2(x + w + .5)}M${f2(x + w / 2 - .35)} ${f2(y - .45)}h.7l-.15 .7h-.4Z`;
      return a; }; a.out = () => wins(a.wn) + DT(a.dt) + (a.mul ? `<path class="mul" d="${a.mul}"/>` : ''); return a; };
    const plain = (len, h) => DT(plinthD(len, h) + hD(0, len, 1.5) + quoinsD(len, h)) + cren(len);
    // Geschossfassade: Reihen Bogenfenster; step = Achsabstand
    const bays = (rows, step, ww, wh, arc) => (len, h) => {
      let d = plinthD(len, h) + hD(0, len, 1.5) + quoinsD(len, h); const A = winAcc();
      const n = Math.floor((len - 2) / step), off = (len - n * step) / 2 + step / 2;
      rows.forEach(([v, fl]) => { d += hD(0, len, v - .6); for (let i = 0; i < n; i++) A.add(off + i * step - ww / 2, v, ww, wh, fl); });
      if (arc) { const m = Math.floor((len - 2) / 2.2); for (let i = 0; i < m; i++) A.add(1.2 + i * 2.2, 1.9, 1, 1.9, 3, ' dim', false); }
      return DT(d) + cren(len) + A.out();
    };
    const roofP = (K, x0, y0, x1, y1, z) => K.poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], 'sl tp');
    const slab = (x0, y0, x1, y1, h, deco) => K => K.box(x0, y0, Z0, x1 - x0, y1 - y0, h, 'pl', deco, false) + roofP(K, x0, y0, x1, y1, Z0 + h);

    // --- hinten: Westende, Nordost-Anbau, Westflügel (alle niedriger als der Hauptbau) ---
    add({ id: 'wsStrip', fp: [0, 0, 12, 36], draw: slab(0, 0, 12, 36, 12, { S: plain, E: plain }) });
    add({ id: 'wsNE', fp: [182, 0, 240, 23], draw: K => {
      const hp = hole([[188, 10], [188, 21], [203, 21], [203, 10]]);
      let s = K.poly(hp.map(p => [p[0], p[1], Z0]), 'court');
      hp.forEach((p, i) => { const q = hp[(i + 1) % 4]; s += K.wall([p[0], p[1]], [q[0], q[1]], Z0, Z0 + 15, 'pl', plain); });
      s += K.box(182, 0, Z0, 58, 23, 15, 'pl', { S: bays([[3, 1]], 5, 1.9, 4), E: plain }, false);
      return s + `<path class="sl tp" fill-rule="evenodd" d="${K.path([[182, 0, Z0 + 15], [240, 0, Z0 + 15], [240, 23, Z0 + 15], [182, 23, Z0 + 15]])}Z${K.path(hp.slice().reverse().map(p => [p[0], p[1], Z0 + 15]))}Z"/>`;
    } });
    add({ id: 'wsW', fp: [12, 23, 73, 38], draw: slab(12, 23, 73, 38, 14, { S: bays([[2.8, 1], [7.2, 0]], 4.6, 1.8, 3.4), E: plain }) });

    // --- Hauptbau: drei Höfe (OSM-Löcher) und Lichthof mit Glasdach ---
    const HO = [
      [[178.5, 38.1], [178.8, 60.9], [184.0, 60.9], [184.0, 59.9], [190.9, 59.8], [191.1, 67.7], [184.2, 67.8], [184.1, 66.9], [178.9, 66.9], [179.0, 72.6], [179.1, 79.2], [182.6, 79.2], [182.6, 78.3], [187.8, 78.2], [187.7, 74.7], [190.1, 71.8], [193.7, 71.7], [196.2, 74.5], [196.2, 78.1], [205.5, 77.9], [205.4, 72.2], [203.5, 72.3], [203.2, 51.2], [206.0, 51.1], [205.9, 41.9], [205.8, 37.7], [188.6, 38.0]],
      [[90.3, 38.9], [90.6, 59.3], [108.8, 59.0], [116.0, 58.9], [115.7, 41.4], [115.7, 39.0], [104.8, 39.0], [104.7, 45.0], [96.2, 45.0], [96.2, 38.9]],
      [[90.7, 71.5], [90.8, 80.5], [94.5, 80.5], [94.5, 78.7], [96.4, 77.3], [100.3, 77.3], [101.6, 78.6], [101.7, 80.3], [108.9, 80.2], [116.2, 80.1], [116.2, 75.2], [110.0, 75.3], [110.0, 71.2], [108.9, 71.2]],
    ].map(hole);
    const ZW = 11, ZC = 20;                    // Höhe der Seitenflügel / des Mittelbaus über Z0
    const GI = [126, 36, 169, 64], ZG = Z0 + ZC + 1.5, ZR = Z0 + ZC + 7.5;   // Lichthof-Öffnung, Glasdach, Rand des Ringdaches
    const wingDeco = { S: bays([[2.8, 1], [7.2, 0]], 4.8, 1.9, 3.4), E: bays([[3, 1]], 6, 1.9, 3.4) };
    const wing = (x0, x1, hs) => K => {
      let s = '';
      hs.forEach(h => {
        s += K.poly(h.map(p => [p[0], p[1], Z0]), 'court');
        h.forEach((p, i) => { const q = h[(i + 1) % h.length]; s += K.wall([p[0], p[1]], [q[0], q[1]], Z0, Z0 + ZW, 'pl', plain); });
      });
      s += K.box(x0, 23, Z0, x1 - x0, 68, ZW, 'pl', wingDeco, false);
      const ring = (pp, z) => K.path(pp.map(a => [a[0], a[1], z])) + 'Z';
      return s + `<path class="sl tp" fill-rule="evenodd" d="${ring([[x0, 23], [x1, 23], [x1, 91], [x0, 91]], Z0 + ZW)}${hs.map(h => ring(h.slice().reverse(), Z0 + ZW)).join('')}"/>`
        + `<path class="dt sl-d" d="${K.path([[x0 + 2, 30, Z0 + ZW], [x1 - 2, 30, Z0 + ZW]])}${K.path([[x0 + 2, 85, Z0 + ZW], [x1 - 2, 85, Z0 + ZW]])}"/>`;
    };
    add({ id: 'wsWL', fp: [73, 23, 116, 91], draw: wing(73, 116, [HO[1], HO[2]]) });
    // Mittelbau: hohe Fassade, Ringdach um den Lichthof (Glasdach, Backsteinschacht)
    add({ id: 'wsMid', fp: [116, 23, 179, 91], draw: K => {
      const [gx0, gy0, gx1, gy1] = GI, zt = Z0 + ZC;
      let s = K.poly([[gx0, gy0, ZG], [gx1, gy0, ZG], [gx1, gy1, ZG], [gx0, gy1, ZG]], 'glb tp');
      const nb = Math.round((gx1 - gx0) / 4), ym = (gy0 + gy1) / 2;
      s += K.face([[gx0, gy1, ZG], [gx1, gy1, ZG], [gx1, ym, ZG + 3.5], [gx0, ym, ZG + 3.5]], 'gl', Array.from({ length: nb - 1 }, (_, k) => `<path class="dt" d="${K.path([[gx0 + (k + 1) * (gx1 - gx0) / nb, gy1, ZG], [gx0 + (k + 1) * (gx1 - gx0) / nb, ym, ZG + 3.5]])}"/>`).join(''));
      s += K.face([[gx0, gy0, ZG], [gx1, gy0, ZG], [gx1, ym, ZG + 3.5], [gx0, ym, ZG + 3.5]], 'gl');
      const bw = (A, B) => K.wall(A, B, ZG, ZR, 'bk', (l, h) => { const W2 = winAcc(); for (let k = 0; k < Math.floor(l / 4.5); k++) W2.add(1.5 + k * 4.5, .6, 1.5, h - 1.2, 2, '', false); return DT(hD(0, l, h * .5)) + W2.out(); });
      s += bw([gx0, gy0], [gx1, gy0]); // Nordwand des Schachtes (nach Süden gerichtet)
      s += K.wall([gx0, gy1], [gx0, gy0], ZG, ZR, 'bk', plain);
      // Ringdach: vier flache Schrägen vom Rand (Traufe) zum Schachtrand
      const o = [[116, 23], [179, 23], [179, 91], [116, 91]], inn = [[gx0, gy0], [gx1, gy0], [gx1, gy1], [gx0, gy1]];
      const seam = (p, q) => `<path class="dt sl-d" d="${K.path([p, q])}"/>`;
      for (let i = 0; i < 4; i++) { const j = (i + 1) % 4, P = [[...o[i], zt], [...o[j], zt], [...inn[j], ZR], [...inn[i], ZR]]; const m = (u, v, t) => u.map((c, k) => c + (v[k] - c) * t); s += K.face(P, 'sl', seam(m(P[0], P[3], .5), m(P[1], P[2], .5))); }
      s += K.box(116, 23, Z0, 63, 68, ZC, 'pl', { S: bays([[5.2, 2], [10.6, 1], [15.8, 0]], 4.8, 1.9, 3.6, true), E: bays([[5.2, 1], [10.6, 0]], 6, 1.9, 3.6, true) }, false);
      return s;
    } });
    add({ id: 'wsWR', fp: [179, 23, 222, 91], draw: wing(179, 222, [HO[0]]) });

    // --- vier Ecktürme am Mittelbau (nur der rechts in der Mitte mit Spitzhelm) ---
    const tow = (id, x, y, pointed) => add({ id, fp: [x, y, x + 10, y + 10], above: 'wsMid', draw: K => {
      const f = (len, h) => { const A = winAcc().add(len / 2 - .9, 4, 1.8, 6.5, 1).add(len / 2 - .9, h * .5 + 2.4, 1.8, 5, 2); return DT(hD(0, len, 1) + hD(0, len, h * .5) + quoinsD(len, h)) + cren(len) + A.out(); };
      const hh = pointed ? 11 : 13, z0 = Z0 + ZC;
      let s = K.box(x, y, z0, 10, 10, hh, 'pl', { S: f, E: f, N: f, W: f });
      const z = z0 + hh;
      s += K.box(x - .5, y - .5, z, 11, 11, 1.6, 'pl', { S: l => cren(l), E: l => cren(l) }, !pointed);
      if (pointed) s += lathe(K, x + 5, y + 5, [[z + 1.6, 7.4], [z + 5, 6], [z + 11, 2.2], [z + 16, .5], [z + 20, .12]], 'sl', 8);
      return s;
    } });
    tow('wsTBL', 117, 23, false); tow('wsTML', 117, 50, false); tow('wsTBR', 168, 23, false); tow('wsTMR', 168, 50, true);

    // --- Portalvorbau mit drei Bögen und zwei Löwen, Mittelturm darüber ---
    add({ id: 'wsPortal', fp: [136, 91, 160, 95], above: 'wsMid', draw: K => {
      const f = (len, h) => {
        let d = hD(0, len, 1.5) + hD(0, len, .2); const A = winAcc();
        [4, 12, 20].forEach(u => A.add(u - 2, 2.8, 4, h - 2.8, 0, ' dim'));
        for (let u = .6; u < len; u += .8) d += `M${f2(u)} .2v1.3`;
        return DT(d) + A.out();
      };
      let s = K.box(136, 91, Z0, 24, 3.6, 8.6, 'pl', { S: f, E: plain, W: plain });
      [[139.4, 96], [156.6, 96]].forEach(([x, y]) => { s += K.box(x - 1.3, y - .6, Z0, 2.6, 2.4, 1.8, 'pl') + K.box(x - .9, y - .2, Z0 + 1.8, 1.8, 1.6, 1.1, 'pl') + K.box(x - .5, y + .6, Z0 + 2.4, .9, .8, .9, 'pl'); });
      return s;
    } });
    add({ id: 'wsTower', fp: [142, 80, 154, 92], above: 'wsPortal', draw: K => {
      const f = (len, h) => {
        const A = winAcc().add(len / 2 - .9, 17, 1.8, 3.4, 1).add(len / 2 - 2.6, 2.4, 1.7, 6.2, 3).add(len / 2 + .9, 2.4, 1.7, 6.2, 3).add(len / 2 - .9, 11, 1.8, 3.6, 2);
        return DT(hD(0, len, .5) + hD(0, len, 9.4) + hD(0, len, 15.8) + quoinsD(len, h)) + cren(len) + A.out();
      };
      let s = K.box(142, 80, Z0 + ZC, 12, 12, 18, 'pl', { S: f, E: f, W: f, N: f });
      const z = Z0 + ZC + 18;
      s += K.box(141.4, 79.4, z, 13.2, 13.2, 1.8, 'pl', { S: l => cren(l) + DT(hD(0, l, .3)), E: l => cren(l) + DT(hD(0, l, .3)) });
      [[141.4, 79.4], [152.8, 79.4], [141.4, 90.8], [152.8, 90.8]].forEach(([x, y]) => { s += K.box(x, y, z + 1.8, 1.8, 1.8, 2.4, 'pl') + lathe(K, x + .9, y + .9, [[z + 4.2, 1.1], [z + 5.8, .3]], 'sl', 4); });
      return s;
    } });

    // --- Bäume im Welfengarten ---
    const tree = (x, y, r) => add({ id: 'tree' + x, fp: [x - r, y - r, x + r, y + r], draw: K => {
      const c = K.P(x, y, Z0 + r * 2.1), t = K.P(x, y, Z0);
      return `<path class="dt" d="M${f2(t[0])} ${f2(t[1])}L${f2(c[0])} ${f2(c[1] + r)}"/><ellipse class="tree" cx="${f2(c[0])}" cy="${f2(c[1])}" rx="${f2(r * 1.2)}" ry="${f2(r * 1.05)}"/>`;
    } });
    [[40, 99, 3.4], [112, 99, 3.2], [190, 99, 3.4]].forEach(([x, y, r]) => tree(x, y, r));

    // pin: über der Mitte des Hauptbaus (Lichthof), knapp über den Ecktürmen – nicht über dem Westende
    return { mods: M, lc: [120, 47], z0: 0, top: [148, 86, 44], pin: [146, 56, Z0 + ZC + 20], label: 'Welfenschloss', h: 44, len: 240 };
  });
})();
