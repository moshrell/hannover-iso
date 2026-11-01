/* NORD/LB (Norddeutsche Landesbank, Behnisch Behnisch & Partner, 2002) – Modul v2, nach Google-Earth-Kadern: ref/nordlb/ (INDEX.md, README.md)
   Grundriss: OSM-Relation r2479829 (145,3 × 109,1 m im Mindestrechteck), in Metern gezeichnet; Maßstab auf der Karte = 1 (len 145).
   Lokales System: x nach Osten (Az. 94°), y nach Süden (Az. 184°), z Höhe, Gelände z = 1. Nordseite = Friedrichswall (lange dunkelblaue Glasfassade).
   Aufbau: Randbebauung (Nord-, West-, Süd-, Südostflügel, Ostblock) mit Gründächern um einen Hof · Kern („Windrad“) mit gestapelten, gegeneinander
   verdrehten Glaskörpern (Hochhaus, 17 Geschosse) · gläserne Schrägdächer über dem Foyer · Hof mit Rasenkeilen.
   ACHTUNG Wanddeko: y läuft von der Oberkante der Wand nach UNTEN (0 = Traufe, h = Fuß). */
(() => {
  const Z0 = 1;
  ISO.landmark('nordlb', H => {
    const { f2, hl, vl, wins, vari, rnd } = H, M = [], add = m => (M.push(m), m);
    const FL = 3.75;                                           // Geschosshöhe (m)

    /* ---------- Hilfen ---------- */
    const inset = (P, d) => {                                  // konvexes Polygon um d nach innen
      const n = P.length; let A = 0;
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; A += a[0] * b[1] - b[0] * a[1]; }
      const sg = A > 0 ? 1 : -1, L = [];
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
        L.push([a[0] - dy / l * sg * d, a[1] + dx / l * sg * d, dx, dy]); }
      return L.map((l, i) => { const m = L[(i + n - 1) % n], det = m[2] * l[3] - m[3] * l[2], t = ((l[0] - m[0]) * l[3] - (l[1] - m[1]) * l[2]) / det; return [m[0] + m[2] * t, m[1] + m[3] * t]; });
    };
    const rectP = (x0, y0, x1, y1) => [[x1, y0], [x0, y0], [x0, y1], [x1, y1]];     // Reihenfolge wie K.box (Außennormale (−dy, dx))
    const rotRect = (cx, cy, w, d, th) => [[w / 2, -d / 2], [-w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]]
      .map(([a, b]) => [cx + a * Math.cos(th) - b * Math.sin(th), cy + a * Math.sin(th) + b * Math.cos(th)]);
    const bbox = P => [Math.min(...P.map(p => p[0])), Math.min(...P.map(p => p[1])), Math.max(...P.map(p => p[0])), Math.max(...P.map(p => p[1]))];
    const pane = (x, y, w, h, f) => `<rect class="wn${vari()}" data-f="${f}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>`;

    /* Vorhangfassade: Geschossbänder, Pfosten, Fenster (nur ein Teil leuchtet – vari()) */
    const curtain = (o = {}) => (len, h) => {
      const top = o.top || 0, fl = o.fl || FL, n = Math.max(1, Math.round((h - top) / fl)), fh = (h - top) / n;
      const nb = Math.max(1, Math.round(len / (o.bay || 2.4))), bw = len / nb;
      let q = '', w = '';
      for (let r = 0; r < n; r++) {
        const y0 = top + r * fh, fi = n - 1 - r;
        q += hl(0, len, y0 + fh);
        if (o.gf && fi === 0) continue;                         // Erdgeschoss: nur Glasband
        for (let i = 0; i < nb; i++) if (rnd() < (o.d || .55)) w += pane(i * bw + bw * .2, y0 + fh * .2, bw * .6, fh * .5, Math.min(4, fi >> 1));
      }
      for (let i = 1; i < nb; i++) q += vl(i * bw, top, h);
      return q + wins(w);
    };
    const plainWall = (len, h) => { let q = ''; for (let v = FL; v < h - .5; v += FL) q += hl(0, len, v); return q; };

    /* Prisma über beliebigem (auch konkavem) Grundriss: Wände nach Tiefe sortiert, Dach darüber */
    const prism = (K, P, z0, z1, mat, deco, roof) => {
      const w = [];
      P.forEach((L, i) => { const R = P[(i + 1) % P.length]; if (K.wallVisible(L, R)) w.push({ L, R, d: K.depth((L[0] + R[0]) / 2, (L[1] + R[1]) / 2), i }); });
      w.sort((a, b) => a.d - b.d);
      let s = w.map(o => K.wall(o.L, o.R, z0, z1, mat, typeof deco === 'function' ? deco : deco && deco[o.i])).join('');
      if (roof !== false) s += K.poly(P.map(p => [p[0], p[1], z1]), roof || `${mat} tp`);
      return s;
    };
    // Gründach: Betonrand + Substrat
    const green = (K, P, z) => K.poly(P.map(p => [p[0], p[1], z]), 'kc tp') + K.poly(inset(P, .7).map(p => [p[0], p[1], z + .02]), 'park');
    const tech = (K, x, y, w, d, z, h = 1.8) => K.box(x, y, z, w, d, h, 'kc', {});

    /* ---------- Randbebauung ---------- */
    const N_H = 28, W_H = 27, W2_H = 25, S_H = 23, SE_H = 27, EA_H = 24, EB_H = 20, C_H = 17;
    // Nordflügel (Friedrichswall): lange dunkelblaue Glasfassade, 7 Geschosse
    add({ id: 'nN', fp: [.7, 0, 145.3, 14.4], draw: K => {
      const P = rectP(.7, 0, 145.3, 14.4);
      return K.box(.7, 0, Z0, 144.6, 14.4, N_H, 'glb', { S: curtain({ bay: 2.4 }), E: curtain({ bay: 2.4 }), W: curtain({ bay: 2.4 }), N: curtain({ bay: 2.4 }) }, false)
        + green(K, P, Z0 + N_H) + tech(K, 22, 3, 6, 5, Z0 + N_H) + tech(K, 96, 5, 8, 4, Z0 + N_H) + tech(K, 128, 4, 5, 5, Z0 + N_H);
    } });
    // Westflügel
    add({ id: 'nW', fp: [.7, 14.4, 18.2, 62.2], draw: K => {
      const P = rectP(.7, 14.4, 18.2, 62.2);
      return K.box(.7, 14.4, Z0, 17.5, 47.8, W_H, 'gl', { E: curtain({ bay: 2.4 }), S: curtain({ bay: 2.4 }), W: plainWall }, false) + green(K, P, Z0 + W_H) + tech(K, 5, 30, 6, 5, Z0 + W_H);
    } });
    add({ id: 'nW2', fp: [10, 62.2, 18.2, 96.6], draw: K => {
      const P = rectP(10, 62.2, 18.2, 96.6);
      return K.box(10, 62.2, Z0, 8.2, 34.4, W2_H, 'gl', { E: curtain({ bay: 2.4 }), W: plainWall }, false) + green(K, P, Z0 + W2_H);
    } });
    // Südflügel zur Straße: Glasfassade mit Bändern, oben zurückgesetztes Staffelgeschoss
    add({ id: 'nS', fp: [10, 96.6, 84, 108.1], draw: K => {
      const P = rectP(10, 96.6, 84, 108.1);
      return K.box(10, 96.6, Z0, 74, 11.5, S_H, 'gl', { S: curtain({ bay: 2.4, gf: true }), E: curtain({ bay: 2.4 }), N: curtain({ bay: 2.4 }), W: plainWall }, false)
        + K.poly(P.map(p => [p[0], p[1], Z0 + S_H]), 'kc tp')
        + K.box(14, 99.4, Z0 + S_H, 66, 6.2, 3.6, 'gl', { S: curtain({ bay: 2.4 }), E: curtain({ bay: 2.4 }) }, false) + green(K, rectP(14, 99.4, 80, 105.6), Z0 + S_H + 3.6);
    } });
    // Südostflügel: dunkelblaue Glasfassade nach Osten
    add({ id: 'nSE', fp: [84, 55.2, 103.4, 109.1], draw: K => {
      const P = rectP(84, 55.2, 103.4, 109.1);
      return K.box(84, 55.2, Z0, 19.4, 53.9, SE_H, 'glb', { S: curtain({ bay: 2.4 }), E: curtain({ bay: 2.4, fl: 3.75 }), W: curtain({ bay: 2.4 }) }, false) + green(K, P, Z0 + SE_H) + tech(K, 90, 70, 6, 6, Z0 + SE_H);
    } });
    // Ostflügel und Süd-Ostblock-Flügel: schmale Flügel um den Hof (Gründächer)
    add({ id: 'nE', fp: [131, 14.4, 145.3, 55.8], draw: K => {
      const P = rectP(131, 14.4, 145.3, 55.8);
      return K.box(131, 14.4, Z0, 14.3, 41.4, EA_H, 'glb', { S: curtain({ bay: 2.4 }), E: curtain({ bay: 2.4 }), W: curtain({ bay: 2.4 }) }, false) + green(K, P, Z0 + EA_H);
    } });
    add({ id: 'nES', fp: [103.4, 41, 131, 55.8], draw: K => {
      const P = rectP(103.4, 41, 131, 55.8);
      return K.box(103.4, 41, Z0, 27.6, 14.8, EB_H, 'glb', { S: curtain({ bay: 2.4, gf: true }), N: curtain({ bay: 2.4 }), E: curtain({ bay: 2.4 }) }, false) + green(K, P, Z0 + EB_H) + tech(K, 112, 46, 6, 5, Z0 + EB_H);
    } });

    /* ---------- Kern („Windrad“): Turmfuß, drei Arme (Ost, Süd, West), Hochhaus aus gestapelten, verdrehten Körpern ---------- */
    const TOWER_FP = [50, 26, 84, 56], BASE_H = 17;
    const bar = (id, P, z0, z1, fp, o = {}) => add({ id, fp, above: o.above, draw: K => prism(K, P, Z0 + z0, Z0 + z1, o.mat || 'glb', curtain(o), false) + green(K, P, Z0 + z1) });
    // Turmfuß (Foyer unter dem Hochhaus)
    add({ id: 'tBase', fp: TOWER_FP, draw: K => prism(K, rotRect(66, 41, 28, 26, .12), Z0, Z0 + BASE_H, 'glb', curtain({ bay: 2.4, gf: true }), 'kc tp') });
    bar('barE', rotRect(108, 34, 48, 11, .15), BASE_H, BASE_H + 6.5, [84, 26, 131, 41], { bay: 2.4 });
    bar('barS', rectP(66, 52, 82, 96.6), BASE_H, BASE_H + 5.5, [66, 52, 82, 96.6], { bay: 2.4, gf: true });
    add({ id: 'barW', fp: [18.2, 42, 50, 47], draw: K => prism(K, rotRect(34, 44.5, 32, 4, -.08), Z0 + 12, Z0 + 16, 'gl', curtain({ bay: 2, fl: 4 }), 'gl tp') });
    const tier = (id, P, z0, z1, mat, above, o = {}) => add({ id, fp: TOWER_FP, above, draw: K => prism(K, P, Z0 + z0, Z0 + z1, mat, curtain(o), 'kc tp') });
    tier('tB', rotRect(66, 39, 24, 20, .12), BASE_H, 47, 'glb', 'tBase', { bay: 2.4 });
    tier('tC', rotRect(64, 37, 20, 16, .1), 47, 65, 'glb', 'tB', { bay: 2.4 });
    tier('tD', rotRect(60, 35, 10, 9, .1), 65, 70, 'gl', 'tC', { bay: 2 });
    tier('tS', rotRect(55, 42, 7, 7, .08), BASE_H, 80, 'gl', 'tBase', { bay: 1.8, fl: 4 });
    add({ id: 'tK', fp: TOWER_FP, above: 'tS', draw: K => prism(K, rotRect(55, 42, 5, 5, .08), Z0 + 80, Z0 + 83.5, 'gl', (l, h) => hl(0, l, h / 2) + vl(l / 3, 0, h) + vl(2 * l / 3, 0, h), 'gl tp') });
    // Terrassentreppe (Stufen nach Südosten, Gründächer)
    [[75, 47, 40], [77.5, 49.5, 33], [80, 52, 26]].forEach(([cx, cy, z1], i) => add({ id: 'tT' + i, fp: TOWER_FP, above: 'tB', draw: K => {
      const P = rotRect(cx, cy, 14, 11, .12);
      return prism(K, P, Z0 + BASE_H, Z0 + z1, 'glb', curtain({ bay: 2.4 }), false) + green(K, P, Z0 + z1);
    } }));
    // gläsernes Schrägdach über dem Foyer (Südwestseite des Turmfußes)
    add({ id: 'wedge', fp: [34, 28, 52, 60], draw: K => K.face([[52, 28, Z0 + BASE_H], [54, 54, Z0 + BASE_H], [36, 60, Z0 + 1], [34, 30, Z0 + 1]], 'glb') });

    /* ---------- Hof ---------- */
    const COURT = [[18.2, 14.4], [131, 14.4], [131, 41], [103.4, 41], [103.4, 55.2], [84, 55.2], [84, 96.6], [18.2, 96.6]];
    const ground = K => K.poly(COURT.map(p => [p[0], p[1], Z0]), 'pave')
      + K.poly([[22, 62, Z0 + .1], [40, 66, Z0 + .1], [34, 88, Z0 + .1], [22, 90, Z0 + .1]], 'park')
      + K.poly([[88, 20, Z0 + .1], [126, 22, Z0 + .1], [126, 30, Z0 + .1], [90, 27, Z0 + .1]], 'park');

    return { mods: M, lc: [72.65, 54.55], z0: 0, ground, top: [60, 36, 83], label: 'NORD/LB', h: 83, len: 145.3 };
  });
})();
