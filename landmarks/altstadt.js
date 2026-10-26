/* Altstadt Hannover — Module für die Karte: Marktkirche, Leineschloss (Altes Rathaus: landmarks/altesRathaus.js). Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
ISO.landmark('marktkirche', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Marktkirche St. Georgii et Jacobi (Backsteingotik, Turm 97 m) === */
  const MK = { ea: 19, rg: 46 };
  add({ id: 'mkTower', b: 'mk', o: .9, fp: [16, 6, 30, 20], parent: 'mkNave', side: 'W', draw: K => {
    const TZ = 64, GH = 14, cx = 23, cy = 13;
    const shaft = sh => (len, h) => {
      let q = '';
      // Sandsteinecken (Quader im Wechsel)
      for (let v = 0, i = 0; v < h - .5; v += 1.6, i++) { const w = i % 2 ? .7 : 1.3; q += `<rect class="st ${sh}" x="0" y="${f2(v)}" width="${w}" height="1.6"/><rect class="st ${sh}" x="${f2(len - w)}" y="${f2(v)}" width="${w}" height="1.6"/>`; }
      q += hl(0, len, .5) + hl(0, len, 15.6) + hl(0, len, 16.2) + hl(0, len, 30) + hl(0, len, h - 1.6);
      q += [3, 6, 9].map(u => louvre(u, 4.2, 2, 10)).join('') + louvre(6, 19.5, 2, 7.5) + louvre(6.2, 34, 1.6, 6);
      return groupM('bk', q);
    };
    let s = K.box(16, 6, Z0, 14, 14, TZ - Z0, 'bk', { S: shaft('fr'), E: shaft('sd'), N: shaft('fr'), W: shaft('sd') }, false);
    // vier Giebel: Süd mit Uhr, Ost mit Pentagramm und Uhr
    const gab = (sh, inner) => () => groupM('bk', `<path class="bk ${sh}" d="M0 0L7 ${-GH}L14 0Z"/>${hl(.6, 13.4, -.5)}` + inner);
    s += K.wall([16, 20], [30, 20], TZ, TZ + .01, 'bk', gab('fr', star(7, -8.2, 1.6, 6) + clockSVG(7, -3.6, 2)));
    s += K.wall([30, 20], [30, 6], TZ, TZ + .01, 'bk', gab('sd', star(7, -8.2, 1.6, 5) + clockSVG(7, -3.6, 2)));
    // Kreuzdach zwischen den Giebeln
    const c = [[16, 6], [30, 6], [30, 20], [16, 20]], m = [[23, 6], [30, 13], [23, 20], [16, 13]], O = [cx, cy, TZ + GH];
    const faces = [];
    for (let i = 0; i < 4; i++) { const ci = [...c[i], TZ], mA = [...m[(i + 3) % 4], TZ + GH], mB = [...m[i], TZ + GH];
      faces.push([ci, mA, O], [ci, O, mB]); }
    faces.map(f => ({ f, d: f.reduce((a, p) => a + p[0] + p[1], 0) })).sort((a, b) => a.d - b.d).forEach(({ f }) => { s += K.face(f, 'sl'); });
    // Dachreiter (verkleinerte Kopie des Turms) mit Spitzhelm
    const DZ = TZ + GH - .6;
    s += lathe(K, cx, cy, [[DZ, 2.7], [DZ + 7, 2.7]], 'sl', 4, [1]);
    s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[DZ + 2.2, 3.4], [DZ + 5.6, 3.4]], '')}</g>`;
    s += lathe(K, cx, cy, [[DZ + 2.2, 2.75], [DZ + 5.6, 2.75]], 'lant', 8);
    s += lathe(K, cx, cy, [[DZ + 7, 3.1], [DZ + 7.8, 3], [DZ + 9, 2.2], [97, .15]], 'cu', 4, [0]);
    return s + `<path class="dt cu-d" d="${K.path([[cx, cy, 97], [cx, cy, 99]])}"/><circle class="cu" cx="${f2(K.P(cx, cy, 97.4)[0])}" cy="${f2(K.P(cx, cy, 97.4)[1])}" r=".35"/>`;
  } });
  add({ id: 'mkNave', b: 'mk', o: .5, fp: [30, 0, 80, 26], draw: K => {
    const south = (len, h) => {
      let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - 1.8) + hl(0, len, h - 1.2), w = '';
      for (let i = 0; i < 5; i++) { const u = 5 + i * 10; w += winG(u - 2.1, 2.6, 4.2, 12.4, 1, ' dim'); q += `<path class="dt" d="${garch(u - 2.6, 2.1, 5.2, 13)}"/>`; }
      return groupM('bk', q + wins(w));
    };
    const plain = (len, h) => groupM('bk', hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - 1.8));
    let s = K.box(30, 0, Z0, 50, 26, MK.ea - Z0, 'bk', { S: south, N: south, E: plain }, false);
    // Strebepfeiler mit Sandsteinabdeckung
    [30.9, 40, 50, 60, 70, 79.1].forEach(x => {
      s += K.box(x - .9, 26, Z0, 1.8, 1.7, 14.5, 'bk', { S: (l, h) => groupM('bk', hl(0, l, 4) + hl(0, l, 9)) });
      s += K.face([[x - .9, 26, Z0 + 16.2], [x + .9, 26, Z0 + 16.2], [x + .9, 27.7, Z0 + 14.5], [x - .9, 27.7, Z0 + 14.5]], 'st');
      s += K.face([[x + .9, 26, Z0 + 16.2], [x + .9, 26, Z0 + 14.5], [x + .9, 27.7, Z0 + 14.5]], 'st');
    });
    // Ostgiebel mit Blendnischen
    s += K.wall([80, 26], [80, 0], MK.ea, MK.ea + .01, 'bk', () => groupM('bk', `<path class="bk sd" d="M0 0L13 ${-(MK.rg - MK.ea)}L26 0Z"/>` + [7, 10, 13, 16, 19].map((u, i) => niche(u - .8, -2 - [4, 9, 14, 9, 4][i] * 1.1, 1.6, [4, 9, 14, 9, 4][i] * 1.1)).join('')));
    s += roofPlane(K, [[30, 26, MK.ea], [80, 26, MK.ea], [80, 13, MK.rg], [30, 13, MK.rg]]);
    s += roofPlane(K, [[80, 0, MK.ea], [30, 0, MK.ea], [30, 13, MK.rg], [80, 13, MK.rg]]);
    return s;
  } });
  // Chor: 7/10-Polygon mit hohen Fenstern
  add({ id: 'mkChoir', b: 'mk', o: .3, fp: [80, 4, 89, 22], parent: 'mkNave', side: 'E', draw: K => {
    const c = [80, 13], r = 9, n = 5, pts = Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / n; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
    let s = '';
    const segs = pts.slice(0, -1).map((p, i) => ({ L: pts[i + 1], R: p })).map(w => ({ ...w, d: w.L[0] + w.L[1] + w.R[0] + w.R[1] })).sort((a, b) => a.d - b.d);
    // Wand von außen: L→R im Uhrzeigersinn von oben gesehen
    segs.forEach(w => { s += K.wall(w.L, w.R, Z0, MK.ea - 1, 'bk', (len, h) => groupM('bk', hl(0, len, .5) + hl(0, len, h - 1.6) + `<path class="dt" d="${garch(len / 2 - 1.9, 1.6, 3.8, 13)}"/>`) + wins(winG(len / 2 - 1.5, 2.1, 3, 12.2, 1, ' hi'))); });
    const apex = [80, 13, MK.rg - 7];
    pts.slice(0, -1).map((p, i) => [[...pts[i + 1], MK.ea - 1], [...p, MK.ea - 1], apex]).map(f => ({ f, d: f[0][0] + f[0][1] + f[1][0] + f[1][1] })).sort((a, b) => a.d - b.d).forEach(({ f }) => { s += K.face(f, 'tl'); });
    return s;
  } });

  return { mods: M, lc: [52, 13], z0: 0, top: [23, 13, 99], label: 'Marktkirche', h: 99, len: 73 };
});
ISO.landmark('leineschloss', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Leineschloss (Niedersächsischer Landtag): Laves-Portikus, Mansarddach, Plenarsaal === */
  const LS = { ea: 19 };
  const lsFacade = (len, h) => {
    let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, 6.1) + hl(0, len, 12) + hl(0, len, 12.6), w = '';
    for (let v = 13.6; v < h - .4; v += 1.1) q += hl(0, len, v);
    const n = Math.floor((len - 2) / 3.6), off = (len - n * 3.6) / 2 + 1.8;
    for (let i = 0; i < n; i++) { const u = off + i * 3.6;
      w += winR(u - .8, 1.9, 1.6, 3.2, 2) + winR(u - .9, 7, 1.8, 4.2, 1) + winA(u - .9, 13.6, 1.8, 3.6, 0); }
    return q + wins(w);
  };
  add({ id: 'ls', b: 'ls', o: 0, fp: [-20, 20, 6, 130], draw: K => {
    let s = K.box(-20, 20, Z0, 26, 110, LS.ea - Z0, 'st', { E: lsFacade, S: lsFacade, N: lsFacade, W: lsFacade }, false);
    s += K.box(-20.4, 19.6, LS.ea, 26.8, 110.8, .9, 'st');
    // Mansarddach: steiler unterer Teil, flacher oberer Walm
    const z0 = LS.ea + .9, z1 = z0 + 4.6, i1 = 1.6, x0 = -20, x1 = 6, y0 = 20, y1 = 130;
    const lo = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], hi = [[x0 + i1, y0 + i1], [x1 - i1, y0 + i1], [x1 - i1, y1 - i1], [x0 + i1, y1 - i1]];
    for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; s += roofPlane(K, [[...lo[i], z0], [...lo[j], z0], [...hi[j], z1], [...hi[i], z1]], 'sl', 1.4); }
    s += hip(K, x0 + i1, y0 + i1, x1 - i1, y1 - i1, z1, z1 + 2.4, 'sl');
    // Gauben Ost und Süd
    for (let y = 23.5; y < 128; y += 3.6) {
      if (y > 62 && y < 88) continue;
      s += K.box(x1 - 1.5, y - .8, z0 + .5, 1.2, 1.6, 2.4, 'st', { E: () => wins(winA(.3, .4, 1, 1.6, 3)) }, false);
      s += saddle(K, [x1 - .3, y + 1], [x1 - .3, y - 1], [-1.6, 0], z0 + 2.9, z0 + 3.8, 'sl');
    }
    for (let x = -16.4; x < 5; x += 3.6) {
      s += K.box(x - .8, y1 - 1.5, z0 + .5, 1.6, 1.2, 2.4, 'st', { S: () => wins(winA(.3, .4, 1, 1.6, 3)) }, false);
      s += saddle(K, [x - 1, y1 - .3], [x + 1, y1 - .3], [0, -1.6], z0 + 2.9, z0 + 3.8, 'sl');
    }
    return s;
  } });
  add({ id: 'lsWinter', b: 'ls', o: .1, fp: [-26, 66, -20, 84], parent: 'ls', side: 'W', draw: K => {
    const f = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.2), w = ''; for (let u = 1.2; u < len - 1; u += 2.2) { q += vl(u - .3, 1.2, h) ; w += winA(u, 2, 1.6, h - 3, 1, ' hi'); } return q + wins(w); };
    return K.box(-26, 66, Z0, 6, 18, 12, 'st', { W: f, S: f, N: f }) + K.box(-26.4, 65.6, Z0 + 12, 6.8, 18.8, .9, 'st');
  } });
  add({ id: 'lsPortico', b: 'ls', o: .2, fp: [6, 63, 20, 87], parent: 'ls', side: 'E', draw: K => {
    let s = K.box(6, 63, Z0, 8, 24, 2.2, 'st', { E: l => hl(0, l, .4) });
    for (let i = 0; i < 5; i++) s += K.box(14 + i * 1.1, 65, Z0, 1.1, 20, Math.max(.05, 2.2 * (5 - i) / 6), 'st');
    // sechs korinthische Säulen
    for (let i = 0; i < 6; i++) { const y = 64.6 + i * 4.16;
      s += lathe(K, 12.4, y, [[Z0 + 2.2, 1.05], [Z0 + 2.9, .82], [16, .72], [16.6, .95], [17.2, 1.15]], 'st fr', 3, [1, 3]); }
    s += K.box(6, 63, 17.2, 8.6, 24, 1.9, 'st', { E: l => hl(0, l, .5) + hl(0, l, 1.1) + Array.from({ length: 24 }, (_, i) => vl(.5 + i, 1.1, 1.9)).join(''), S: l => hl(0, l, .5) });
    s += saddle(K, [14.6, 87], [14.6, 63], [-8.6, 0], 19.1, 24.4, 'sl');
    s += K.wall([14.6, 87], [14.6, 63], 19.1, 19.11, 'st', len => `<path class="st sd" d="M0 0L${f2(len / 2)} -5.3L${f2(len)} 0Z"/><path class="dt" d="M1.4 -.5L${f2(len / 2)} -4.6L${f2(len - 1.4)} -.5Z"/><circle class="dt" cx="${f2(len / 2)}" cy="-2.1" r="1.1"/><path class="dt" d="M${f2(len / 2 - 4)} -.9q1.6 -1.6 2.8 -1.2M${f2(len / 2 + 4)} -.9q-1.6 -1.6 -2.8 -1.2"/>`);
    return s;
  } });
  // Plenarsaal (Glasbau, 1962 / 2017)
  add({ id: 'lsPlenum', b: 'ls', o: .1, fp: [-18, 132, 4, 146], draw: K => {
    const glass = (len, h) => { let q = '', w = ''; const n = Math.floor(len / 2.2);
      for (let i = 0; i < n; i++) { const u = (len - n * 2.2) / 2 + i * 2.2; [[.8, 3.2, 2], [4.4, 3.2, 1], [8, h - 8.6, 0]].forEach(([v, hh, f]) => { w += `<rect class="wn${vari()}" data-f="${f}" x="${f2(u + .15)}" y="${f2(v)}" width="1.9" height="${f2(hh)}"/>`; }); }
      return q + wins(w) + hl(0, len, 4.1) + hl(0, len, 7.7); };
    return K.box(-18, 132, Z0, 22, 14, 12, 'st', { E: glass, S: glass, W: glass }, true) + K.box(-18.8, 131.2, Z0 + 12, 23.6, 15.6, .8, 'sl');
  } });

  return { mods: M, lc: [-5, 83], z0: 0, top: [-7, 83, 26], label: 'Leineschloss · Landtag', h: 26, len: 126 };
});
