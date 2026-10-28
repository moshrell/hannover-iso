/* Georgenpalais (Wallmodenpalais, Wilhelm-Busch-Museum, Georgengarten) – Modul. Lokal: x Ost (Länge 80 m), y Süd (Tiefe 12,7 m), z Höhe, Gelände z = 1.
   Nordseite (y = 0) = Hofseite mit Portal und Freitreppe, Südseite (y = 12,7) = Gartenseite. Cremefarbener Putz, zwei Geschosse, rote Walmdächer mit Gauben.
   Mitte (x 25,6–54,4) mit höherem Walmdach und 3-achsigem Mittelrisalit (x 35,2–44,8: 2,5 m nach Süden, 1,5 m nach Norden); Flügel je 8 Achsen. Achsmaß 3,2 m.
   Maße: Kontur OSM w5121415 (80 × 12,7 m); Höhen/Achsen nach ref/georgenpalais/foto (siehe INDEX.md). */
(() => {
  const Z0 = 1, L = 80, D = 12.7, WH = 9.4, WW = 6.3, P = 3.2, PW = 22.4 / 9, XA = 22.4, XB = 57.6, RX0 = 35.2, RX1 = 44.8;
  ISO.landmark('georgenpalais', H => {
    const { f2, hl, vl, winR, wins, hip, roofPlane } = H, M = [], add = m => (M.push(m), m);
    const ze = Z0 + WH, zw = Z0 + WW;
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

    // Flügelfassade (je 9 Achsen, Pilasterstreifen, mittig Rundbogentür): zwei Reihen kleiner Sprossenfenster
    const wing = (len, h) => {
      const n = 9; let q = hl(0, len, .3) + hl(0, len, .8) + hl(0, len, h - .02), w = '';
      for (let i = 0; i <= n; i++) q += vl(i * PW, .8, h - .3);
      for (let i = 0; i < n; i++) {
        const cx = (i + .5) * PW;
        if (i === 4) {
          w += `<path class="lv" d="M${f2(cx - .85)} ${f2(h - .8)}V${f2(h - 3)}A.85 .85 0 0 1 ${f2(cx + .85)} ${f2(h - 3)}V${f2(h - .8)}Z"/>`;
          q += hl(cx - 1.15, cx + 1.15, h - 3.9) + vl(cx - 1.15, h - 3.9, h - .8) + vl(cx + 1.15, h - 3.9, h - .8);
        } else { w += winR(cx - .55, h - 2.5, 1.1, 1.5, 0); q += hl(cx - .7, cx + .7, h - .95); }
        if (i !== 4) w += winR(cx - .55, 1.3, 1.1, 1.45, 1);
      }
      return q + wins(w);
    };
    // Mittelbau: unten hohe Fenster mit Verdachung, oben kleine Fenster, Kranzgesims
    const mid = n => (len, h) => {
      let q = hl(0, len, .3) + hl(0, len, .8) + hl(0, len, h - .02) + hl(0, len, 1.0) + hl(0, len, h - 4.7), w = '';
      for (let i = 0; i < n; i++) {
        const cx = (i + .5) * (len / n);
        w += winR(cx - .65, h - 4.1, 1.3, 3.0, 0) + winR(cx - .55, 1.5, 1.1, 1.55, 1);
        q += hl(cx - .9, cx + .9, h - 4.3) + hl(cx - .85, cx + .85, 1.2);
      }
      return q + wins(w);
    };
    const endWall = (len, h) => { let w = '', q = hl(0, len, .3) + hl(0, len, .8) + hl(0, len, h - .02);
      for (let i = 0; i < 3; i++) { const cx = len / 2 + (i - 1) * 2.8; w += winR(cx - .55, h - 2.5, 1.1, 1.5, 0) + winR(cx - .55, 1.3, 1.1, 1.45, 1); }
      return q + wins(w); };
    const body = (id, x0, x1, deco, h = WH) => add({ id, fp: [x0, 0, x1, D], draw: K => K.box(x0, 0, Z0, x1 - x0, D, h, 'pl', deco) });
    // senkrechte Fläche mit Normale nach außen (nx, ny)
    const vface = (K, pts, nx, ny, mat) => {
      let a = 0, b = 0;
      for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += (p[1] - q[1]) * (p[2] + q[2]); b += (p[2] - q[2]) * (p[0] + q[0]); }
      return K.face(a * nx + b * ny >= 0 ? pts : pts.slice().reverse(), mat);
    };
    const dormer = (K, x, side, yEave, slope, ze = zw) => { // side +1 Südhang, −1 Nordhang; yEave = y der Traufe
      const t0 = 2.3, yf = yEave - side * t0, yb = yf - side * 1.8, zf = ze + t0 * slope - .2, zb = ze + (t0 + 1.8) * slope - .2, zT = zf + 2.1;
      let s = K.wall(side > 0 ? [x - .9, yf] : [x + .9, yf], side > 0 ? [x + .9, yf] : [x - .9, yf], zf, zT, 'pl', (len, h) => wins(winR(.3, .35, len - .6, h - .6, 1)));
      s += vface(K, [[x + .9, yf, zf], [x + .9, yb, zb], [x + .9, yb, zT], [x + .9, yf, zT]], 1, 0, 'pl');
      s += vface(K, [[x - .9, yf, zf], [x - .9, yb, zb], [x - .9, yb, zT], [x - .9, yf, zT]], -1, 0, 'pl');
      s += hip(K, x - 1.1, Math.min(yf, yb) - .2, x + 1.1, Math.max(yf, yb) + .2, zT, zT + 1.2, 'tl');
      return s;
    };
    // Nordhang ist aus Südost verdeckt (Blick über den First) → nur Süd-Gauben zeichnen
    const dormers = (K, xs, yN, yS, slope, zE) => xs.map(x => dormer(K, x, 1, yS, slope, zE)).join('');
    const chimney = (K, x, z) => K.box(x - .35, D / 2 - .35, z - .6, .7, .7, 2.0, 'pl', {});   // schlanke Schornsteinköpfe auf dem First (v_06), kein Turm
    const OV = .5;
    // Körper
    body('wW', 0, XA, { N: wing, S: wing, W: endWall }, WW);
    body('wC', XA, XB, { N: mid(11), S: mid(11) });
    body('wE', XB, L, { N: wing, S: wing, E: endWall }, WW);
    // Mittelrisalit (Süd 2,5 m, Nord 1,5 m) + Freitreppe nördlich
    // Südrisalit: dreiseitig (Mittelteil + zwei schräge Seiten), wie auf v_06
    add({ id: 'rS', fp: [RX0, D, RX1, D + 2.5], draw: K => {
      const c = 2.4, fr = (len, h) => hl(0, len, .3) + hl(0, len, .8) + hl(0, len, h - .02) + hl(0, len, h - 4.7)
        + wins(`<rect class="lv" x="${f2(len / 2 - .75)}" y="${f2(h - 3.4)}" width="1.5" height="2.5"/>` + winR(len / 2 - .55, 1.5, 1.1, 1.55, 1));
      const sd = (len, h) => hl(0, len, .3) + hl(0, len, .8) + hl(0, len, h - .02) + hl(0, len, h - 4.7)
        + wins(winR(len / 2 - .65, h - 4.1, 1.3, 3.0, 0) + winR(len / 2 - .55, 1.5, 1.1, 1.55, 1));
      const z1 = Z0 + WH;
      return K.wall([RX0, D], [RX0 + c, D + 2.5], Z0, z1, 'pl', sd) + K.wall([RX0 + c, D + 2.5], [RX1 - c, D + 2.5], Z0, z1, 'pl', fr)
        + K.wall([RX1 - c, D + 2.5], [RX1, D], Z0, z1, 'pl', sd)
        + K.box(RX0 + 3.6, D + 2.5, Z0, 2.4, 1.3, .55, 'st', {}) + K.box(RX0 + 3.0, D + 3.8, Z0, 3.6, .9, .3, 'st', {});
    } });
    add({ id: 'rN', fp: [RX0, -1.5, RX1, 0], draw: K => K.box(RX0, -1.5, Z0, RX1 - RX0, 1.5, WH, 'pl', { N: fac(3, 0, { door: 1, tall: true }), E: (len, h) => hl(0, len, .35) + hl(0, len, h - 4.3) }, false)
      + K.box(RX0 + 2, -3.3, Z0, 5.6, 1.8, .6, 'st', {}) + K.box(RX0 + 1.4, -4.5, Z0, 6.8, 1.2, .3, 'st', {}) });
    // Dächer: West-, Mitteltrakt, Osttrakt (hinten → vorne)
    const wz = 4.4, cz = 6.6, sw = wz / (D / 2 + OV), sc = cz / (D / 2 + OV);
    // Flügeldach: Walm nur am Außenende, innen stößt der First an den Mittelbau
    const wingRoof = (K, xo, xi, dir) => {
      const ym = D / 2, zr = zw + wz, y0 = -OV, y1 = D + OV, h = D / 2 + OV;
      const e0 = dir < 0 ? -OV : XB, e1 = dir < 0 ? XA : L + OV, r0 = dir < 0 ? -OV + h : XB, r1 = dir < 0 ? XA : L + OV - h;
      let s = roofPlane(K, [[e0, y0, zw], [e1, y0, zw], [r1, ym, zr], [r0, ym, zr]], 'tl', 2.2) + roofPlane(K, [[e1, y1, zw], [e0, y1, zw], [r0, ym, zr], [r1, ym, zr]], 'tl', 2.2);
      s += dir < 0 ? K.face([[e0, y1, zw], [e0, y0, zw], [r0, ym, zr]], 'tl') : K.face([[e1, y0, zw], [e1, y1, zw], [r1, ym, zr]], 'tl');
      return s;
    };
    add({ id: 'dW', fp: [0, 0, XA, D], above: 'wW', draw: K => wingRoof(K, 0, XA, -1) + dormers(K, [4.3, 11.2, 18], -OV, D + OV, sw, zw) + [8, 12, 17].map(x => chimney(K, x, zw + wz)).join('') });
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
      return s + [31, 35.5, 40, 44.5, 49].map(x => chimney(K, x, ze + cz)).join('');
    } });
    add({ id: 'dE', fp: [XB, 0, L, D], above: 'wE', draw: K => wingRoof(K, XB, L, 1) + dormers(K, [XB + 4.4, XB + 11.2, XB + 18.1], -OV, D + OV, sw, zw) + [63, 68, 72].map(x => chimney(K, x, zw + wz)).join('') });
    // Eingeschossiger Anbau am Ostende (graues Dach, in v_06/v_07 sichtbar; nicht in der OSM-Kontur)
    add({ id: 'an', fp: [L, .5, L + 5, 6.5], parent: 'wE', side: 'E', draw: K => K.box(L, .5, Z0, 5, 6, 3.4, 'pl', { E: (len, h) => hl(0, len, .4) + wins(winR(1.3, 1, 1.3, 1.8, 0) + winR(3.6, 1, 1.3, 1.8, 0)), S: (len, h) => hl(0, len, .4) + wins(winR(1.2, 1, 1.3, 1.8, 0) + winR(3.2, 1, 1.3, 1.8, 0)) }) + hip(K, L - .3, .2, L + 5.3, 6.8, Z0 + 3.4, Z0 + 4.9, 'sl') });
    return { mods: M, lc: [L / 2, D / 2], z0: 0, top: [L / 2, D / 2, Z0 + 17], pin: [L / 2, D / 2, Z0 + 18.6], label: 'Georgenpalais', h: 17, len: L };
  });
})();
