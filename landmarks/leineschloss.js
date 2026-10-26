/* Leineschloss (Niedersächsischer Landtag) – Modul, aus altstadt.js herausgelöst; Neuzeichnung nach Google-Earth-Kadern: ref/leineschloss/ */
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
