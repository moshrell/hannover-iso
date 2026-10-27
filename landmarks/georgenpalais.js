/* Georgenpalais (Wallmodenpalais, Wilhelm-Busch-Museum, Georgengarten) – Modul. Lokal: x Ost (Länge 80 m), y Süd (Tiefe 12,7 m), z Höhe, Gelände z = 1.
   Nordseite (y = 0) = Hofseite mit Portal und Freitreppe, Südseite (y = 12,7) = Gartenseite. Cremefarbener Putz, zwei Geschosse, rote Walmdächer mit Gauben.
   Mitte (x 25,6–54,4) mit höherem Walmdach und 3-achsigem Mittelrisalit (x 35,2–44,8: 2,5 m nach Süden, 1,5 m nach Norden); Flügel je 8 Achsen. Achsmaß 3,2 m.
   Maße: Kontur OSM w5121415 (80 × 12,7 m); Höhen/Achsen nach ref/georgenpalais/foto (siehe INDEX.md). */
(() => {
  const Z0 = 1, L = 80, D = 12.7, WH = 8.5, P = 3.2, XA = 22.4, XB = 57.6, RX0 = 35.2, RX1 = 44.8;
  ISO.landmark('georgenpalais', H => {
    const { f2, hl, vl, winR, wins, hip } = H, M = [], add = m => (M.push(m), m);
    const ze = Z0 + WH;
    // Wand: Achsen n ab Versatz off, zwei Fensterreihen; opt.door = Achsindex mit Tür im EG; opt.tall = hohe Fenster im OG
    const fac = (n, off = 0, opt = {}) => (len, h) => {
      let q = hl(0, len, .35) + hl(0, len, .9) + hl(0, len, h - 4.3) + hl(0, len, h - .02), w = '';
      for (let i = 0; i < n; i++) {
        const cx = off + (i + .5) * P, x = cx - .7;
        const door = opt.door === i;
        if (door) { w += `<rect class="lv" x="${f2(cx - .75)}" y="${f2(h - 3.3)}" width="1.5" height="2.3"/>` + `<path class="dt" d="M${f2(cx - 1.05)} ${f2(h - 3.5)}H${f2(cx + 1.05)}V${f2(h - .9)}M${f2(cx - 1.05)} ${f2(h - .9)}V${f2(h - 3.5)}"/>`; }
        else { w += winR(x, h - 3.7, 1.4, 2.5, 0); q += hl(x - .15, x + 1.55, h - 1.1); }
        const oh = opt.tall ? 3.0 : 2.5; w += winR(x, h - 7.45 + (opt.tall ? -.4 : 0), 1.4, oh, 1); q += hl(x - .15, x + 1.55, h - 7.45 + (opt.tall ? -.4 : 0) + oh + .15);
      }
      return q + wins(w);
    };
    const endWall = (len, h) => { let w = '', q = hl(0, len, .35) + hl(0, len, .9) + hl(0, len, h - 4.3);
      for (let i = 0; i < 3; i++) { const x = (len - 3 * P) / 2 + i * P + P / 2 - .7; w += winR(x, h - 3.7, 1.4, 2.5, 0) + winR(x, h - 7.45, 1.4, 2.5, 1); }
      return q + wins(w); };
    const body = (id, x0, x1, deco) => add({ id, fp: [x0, 0, x1, D], draw: K => K.box(x0, 0, Z0, x1 - x0, D, WH, 'pl', deco) });
    // senkrechte Fläche mit Normale nach außen (nx, ny)
    const vface = (K, pts, nx, ny, mat) => {
      let a = 0, b = 0;
      for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += (p[1] - q[1]) * (p[2] + q[2]); b += (p[2] - q[2]) * (p[0] + q[0]); }
      return K.face(a * nx + b * ny >= 0 ? pts : pts.slice().reverse(), mat);
    };
    const dormer = (K, x, side, yEave, slope) => { // side +1 Südhang, −1 Nordhang; yEave = y der Traufe
      const t0 = 2.3, yf = yEave - side * t0, yb = yf - side * 1.8, zf = ze + t0 * slope - .2, zb = ze + (t0 + 1.8) * slope - .2, zT = zf + 2.1;
      let s = K.wall(side > 0 ? [x - .9, yf] : [x + .9, yf], side > 0 ? [x + .9, yf] : [x - .9, yf], zf, zT, 'pl', (len, h) => wins(winR(.3, .35, len - .6, h - .6, 1)));
      s += vface(K, [[x + .9, yf, zf], [x + .9, yb, zb], [x + .9, yb, zT], [x + .9, yf, zT]], 1, 0, 'pl');
      s += vface(K, [[x - .9, yf, zf], [x - .9, yb, zb], [x - .9, yb, zT], [x - .9, yf, zT]], -1, 0, 'pl');
      s += hip(K, x - 1.1, Math.min(yf, yb) - .2, x + 1.1, Math.max(yf, yb) + .2, zT, zT + 1.2, 'tl');
      return s;
    };
    // Nordhang ist aus Südost verdeckt (Blick über den First) → nur Süd-Gauben zeichnen
    const dormers = (K, xs, yN, yS, slope) => xs.map(x => dormer(K, x, 1, yS, slope)).join('');
    const chimney = (K, x, z) => K.box(x, D / 2 - .5, z - 1, 1, 1, 3.4, 'pl', {});
    const OV = .5;
    // Körper
    body('wW', 0, XA, { N: fac(7), S: fac(7), W: endWall });
    body('wC', XA, XB, { N: fac(11), S: fac(11) });
    body('wE', XB, L, { N: fac(7), S: fac(7), E: endWall });
    // Mittelrisalit (Süd 2,5 m, Nord 1,5 m) + Freitreppe nördlich
    add({ id: 'rS', fp: [RX0, D, RX1, D + 2.5], draw: K => K.box(RX0, D, Z0, RX1 - RX0, 2.5, WH, 'pl', { S: fac(3, 0, { door: 1, tall: true }), E: (len, h) => hl(0, len, .35) + hl(0, len, h - 4.3) }, false) });
    add({ id: 'rN', fp: [RX0, -1.5, RX1, 0], draw: K => K.box(RX0, -1.5, Z0, RX1 - RX0, 1.5, WH, 'pl', { N: fac(3, 0, { door: 1, tall: true }), E: (len, h) => hl(0, len, .35) + hl(0, len, h - 4.3) }, false)
      + K.box(RX0 + 2, -3.3, Z0, 5.6, 1.8, .6, 'st', {}) + K.box(RX0 + 1.4, -4.5, Z0, 6.8, 1.2, .3, 'st', {}) });
    // Dächer: West-, Mitteltrakt, Osttrakt (hinten → vorne)
    const wz = 4.7, cz = 8.0, sw = wz / (D / 2 + OV), sc = cz / (D / 2 + OV);
    add({ id: 'dW', fp: [0, 0, XA, D], above: 'wW', draw: K => hip(K, -OV, -OV, XA + OV, D + OV, ze, ze + wz, 'tl') + dormers(K, [P * 1.5, P * 3.5, P * 5.5], -OV, D + OV, sw) + chimney(K, 6, ze + wz) + chimney(K, 15, ze + wz) });
    add({ id: 'dC', fp: [XA, 0, XB, D], above: 'wC', draw: K => {
      let s = hip(K, XA - OV, -OV, XB + OV, D + OV, ze, ze + cz, 'tl');
      // Quer-Walmdach des Risalits (Süd) und (Nord)
      const hw = (RX1 - RX0) / 2, xm = (RX0 + RX1) / 2, k = hw * 1.0;
      const yS = D + 2.5 + OV, zS = ze + 4.4;
      s += K.face([[RX0 - OV, yS, ze], [RX1 + OV, yS, ze], [xm, yS - hw - OV, zS]], 'tl');
      s += K.face([[RX1 + OV, yS, ze], [RX1 + OV, D + OV, ze], [xm, D - 4.5, zS], [xm, yS - hw - OV, zS]], 'tl');
      s += K.face([[RX0 - OV, D + OV, ze], [RX0 - OV, yS, ze], [xm, yS - hw - OV, zS], [xm, D - 4.5, zS]], 'tl');
      const yn = -1.5 - OV;
      s += K.face([[RX1 + OV, yn, ze], [RX0 - OV, yn, ze], [xm, yn + hw + OV, zS]], 'tl');
      s += K.face([[RX1 + OV, -OV, ze], [RX1 + OV, yn, ze], [xm, yn + hw + OV, zS], [xm, 4.5, zS]], 'tl');
      s += K.face([[RX0 - OV, yn, ze], [RX0 - OV, -OV, ze], [xm, 4.5, zS], [xm, yn + hw + OV, zS]], 'tl');
      s += dormers(K, [XA + 5, XA + 9, XB - 9, XB - 5], -OV, D + OV, sc);
      return s + chimney(K, 31, ze + cz) + chimney(K, 49, ze + cz);
    } });
    add({ id: 'dE', fp: [XB, 0, L, D], above: 'wE', draw: K => hip(K, XB - OV, -OV, L + OV, D + OV, ze, ze + wz, 'tl') + dormers(K, [XB + P * 1.5, XB + P * 3.5, XB + P * 5.5], -OV, D + OV, sw) + chimney(K, 66, ze + wz) + chimney(K, 74, ze + wz) });
    // Eingeschossiger Anbau am Ostende (graues Dach, in v_06/v_07 sichtbar; nicht in der OSM-Kontur)
    add({ id: 'an', fp: [L, .5, L + 5, 6.5], parent: 'wE', side: 'E', draw: K => K.box(L, .5, Z0, 5, 6, 3.4, 'pl', { E: (len, h) => hl(0, len, .4) + wins(winR(1.3, 1, 1.3, 1.8, 0) + winR(3.6, 1, 1.3, 1.8, 0)), S: (len, h) => hl(0, len, .4) + wins(winR(1.2, 1, 1.3, 1.8, 0) + winR(3.2, 1, 1.3, 1.8, 0)) }) + hip(K, L - .3, .2, L + 5.3, 6.8, Z0 + 3.4, Z0 + 4.9, 'sl') });
    return { mods: M, lc: [L / 2, D / 2], z0: 0, top: [L / 2, D / 2, Z0 + 15], label: 'Georgenpalais', h: 15, len: L };
  });
})();
