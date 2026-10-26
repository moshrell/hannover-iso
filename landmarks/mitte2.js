/* Mitte, zweite Reihe — Module (Stufe „erkennbar“, Details später):
   Anzeiger-Hochhaus, NORD/LB, Museum August Kestner, Wangenheimpalais, Kreuzkirche, Neustädter Hof- und Stadtkirche,
   Leibnizhaus, Waterloosäule, Kröpcke-Uhr. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Vorbilder: ref/mitte2/ (Quellen in quellen.txt). */
(() => {
  const Z0 = 1;
  const grid = (H, len, h, step, rows, f0, cls = '') => { // Fensterraster: rows = [[v, h, f], …]
    let w = ''; const n = Math.max(1, Math.floor((len - 1) / step)), off = (len - n * step) / 2;
    for (let i = 0; i < n; i++) rows.forEach(([v, hh, f]) => { w += H.winR(off + i * step + step * .2, v, step * .6, hh, f); });
    return H.wins(w);
  };

  /* --- Anzeiger-Hochhaus (Fritz Höger 1928): Klinker, gestufter Turm, grüne Kuppel --- */
  ISO.landmark('anzeiger', H => {
    const { f2, hl, vl, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .6) + hl(0, len, h - 1); for (let u = 1.6; u < len; u += 1.6) q += vl(u, .6, h - 1);
      let w = ''; const rows = Math.floor((h - 4) / 3.3); for (let r = 0; r < rows; r++) for (let u = .8; u < len - .8; u += 3.2) w += H.winR(u + .5, 1.6 + r * 3.3, 1.8, 2.2, Math.min(4, Math.floor(r / 3)));
      return H.groupM('bk', q) + wins(w); };
    // Zinnen (spitze Pfeiler) auf der Oberkante
    const crown = n => len => { let s = ''; for (let i = 0; i <= n; i++) { const u = i * len / n; s += `<path class="bk fr" d="M${f2(u - .45)} 0V-1.6L${f2(u)} -2.6L${f2(u + .45)} -1.6V0Z"/>`; } return s; };
    add({ id: 'azBase', fp: [0, 0, 32, 32], draw: K => K.box(0, 0, Z0, 32, 32, 22, 'bk', { S: fac, E: fac, N: fac, W: fac }) });
    add({ id: 'azTower', fp: [6, 6, 26, 26], above: 'azBase', draw: K => {
      let s = K.box(6, 6, Z0 + 22, 20, 20, 24, 'bk', { S: fac, E: fac, N: fac, W: fac });
      s += K.wall([6, 26], [26, 26], Z0 + 46, Z0 + 46.01, 'bk', crown(10)) + K.wall([26, 26], [26, 6], Z0 + 46, Z0 + 46.01, 'bk', crown(10));
      const prof = []; for (let i = 0; i <= 10; i++) { const t = i / 10; prof.push([Z0 + 46 + 8 * t, 8.6 * Math.sqrt(1 - t * t) + .2]); }
      s += lathe(K, 16, 16, prof, 'cu', 8, [3, 7]);
      return s;
    } });
    return { mods: M, lc: [16, 16], z0: 0, top: [16, 16, 56], label: 'Anzeiger-Hochhaus', h: 56, len: 32 };
  });

  /* --- NORD/LB (Behnisch, 2002): Randbebauung aus Glas um einen Hof, darüber gestapelte, versetzte Glaskuben --- */
  ISO.landmark('nordlb', H => {
    const { hl, vl, wins } = H, M = [], add = m => (M.push(m), m);
    const glass = (len, h) => { let q = ''; for (let v = 3.4; v < h; v += 3.4) q += hl(0, len, v); for (let u = 2.4; u < len; u += 2.4) q += `<path class="mul" d="M${u.toFixed(2)} 0V${h.toFixed(2)}"/>`;
      let w = ''; const rows = Math.floor(h / 3.4);
      for (let r = 0; r < rows; r++) for (let u = 0; u < len - 2.4; u += 2.4) if (((u * 7 + r * 13) | 0) % 5 < 3) w += `<rect class="wn${H.vari()}" data-f="${Math.min(4, Math.floor(r / 2))}" x="${(u + .15).toFixed(2)}" y="${(r * 3.4 + .4).toFixed(2)}" width="2.1" height="2.6"/>`;
      return q + wins(w); };
    add({ id: 'nbRing', fp: [0, 0, 70, 60], draw: K => {
      let s = '';
      s += K.box(0, 0, Z0, 70, 14, 24, 'glb', { S: glass, N: glass, E: glass, W: glass });
      s += K.box(0, 14, Z0, 14, 46, 24, 'glb', { E: glass, W: glass, S: glass });
      s += K.box(56, 14, Z0, 14, 46, 24, 'glb', { E: glass, W: glass, S: glass });
      s += K.box(14, 46, Z0, 42, 14, 24, 'glb', { S: glass, N: glass });
      return s;
    } });
    const cube = (id, x, y, z, w, d, h) => add({ id, fp: [x, y, x + w, y + d], above: 'nbRing', draw: K => K.box(x, y, z, w, d, h, 'glb', { S: glass, E: glass, N: glass, W: glass }) });
    cube('nb1', 22, 18, Z0 + 24, 22, 20, 14); cube('nb2', 26, 14, Z0 + 38, 22, 20, 13); cube('nb3', 20, 20, Z0 + 51, 22, 18, 12); cube('nb4', 25, 16, Z0 + 63, 18, 16, 9);
    return { mods: M, lc: [35, 30], z0: 0, top: [34, 24, 74], label: 'NORD/LB', h: 74, len: 70 };
  });

  /* --- Wangenheimpalais (Laves): heller Putz, zwei Geschosse, Säulenvorbau mit Balkon, flaches Walmdach --- */
  ISO.landmark('wangenheim', H => {
    const { hl, vl, winR, wins, lathe, hip } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, 6.4) + hl(0, len, h - 1.4), w = '';
      const n = Math.floor((len - 2) / 4), off = (len - n * 4) / 2 + 2;
      for (let i = 0; i < n; i++) { const u = off + i * 4; w += winR(u - .9, 1.9, 1.8, 3.4, 1) + winR(u - .9, 7.6, 1.8, 3.2, 0); }
      return q + wins(w); };
    add({ id: 'wp', fp: [0, 0, 60, 24], draw: K => K.box(0, 0, Z0, 60, 24, 13, 'pl', { S: fac, E: fac, W: fac }) + hip(K, 0, 0, 60, 24, Z0 + 13, Z0 + 17, 'sl') });
    add({ id: 'wpPort', fp: [22, 24, 38, 28.5], parent: 'wp', side: 'S', draw: K => {
      let s = K.box(22, 24, Z0, 16, 4.5, .8, 'st');
      for (let i = 0; i < 4; i++) s += lathe(K, 23.6 + i * 4.27, 27.6, [[Z0 + .8, .6], [Z0 + 6, .5], [Z0 + 6.4, .7]], 'st fr', 2);
      s += K.box(22, 24, Z0 + 6.4, 16, 4.5, .9, 'st', { S: l => hl(0, l, .4) });
      s += K.wall([22, 28.5], [38, 28.5], Z0 + 7.3, Z0 + 8.5, 'st', len => hl(0, len, .2) + Array.from({ length: Math.floor(len / .8) }, (_, i) => vl(.4 + i * .8, .2, 1.2)).join(''));
      return s;
    } });
    return { mods: M, lc: [30, 13], z0: 0, top: [30, 14, 18], label: 'Wangenheimpalais', h: 18, len: 60 };
  });

  /* --- Kreuzkirche (geweiht 1333): Backsteingotik, Westturm mit hohem, grünem Helm --- */
  ISO.landmark('kreuzkirche', H => {
    const { f2, hl, vl, winG, wins, lathe, roofPlane } = H, M = [], add = m => (M.push(m), m);
    add({ id: 'kkTower', fp: [0, 5, 10, 15], parent: 'kkNave', side: 'W', draw: K => {
      const f = (len, h) => H.groupM('bk', hl(0, len, .5) + hl(0, len, 8) + hl(0, len, 16)) + wins(winG(len / 2 - .8, 2, 1.6, 4.6, 4) + winG(len / 2 - .5, 10, 1, 3.4, 2)) + H.clockSVG(len / 2, 6.6 + 1.6, 1.3);
      let s = K.box(0, 5, Z0, 10, 10, 30, 'bk', { S: f, E: f, W: f, N: f });
      return s + lathe(K, 5, 10, [[Z0 + 30, 5.6], [Z0 + 31, 4.6], [Z0 + 36, 2], [Z0 + 46, .7], [Z0 + 56, .15]], 'cu', 4, [1]) + `<path class="dt cu-d" d="${K.path([[5, 10, Z0 + 56], [5, 10, Z0 + 59]])}"/>`;
    } });
    add({ id: 'kkNave', fp: [10, 0, 46, 20], draw: K => {
      const side = (len, h) => { let q = hl(0, len, .5) + hl(0, len, h - 1.4), w = ''; for (let u = 4; u < len - 2; u += 7) { w += winG(u - 1.3, 2, 2.6, h - 4.4, 1, ' dim'); q += vl(u + 3.5, 1, h); } return H.groupM('bk', q) + wins(w); };
      let s = K.box(10, 0, Z0, 36, 20, 13, 'bk', { S: side, E: (l, h) => H.groupM('bk', hl(0, l, .5)) + wins(winG(l / 2 - 1.6, 2, 3.2, h - 4, 1, ' hi')) });
      s += roofPlane(K, [[10, 20, Z0 + 13], [46, 20, Z0 + 13], [46, 10, Z0 + 27], [10, 10, Z0 + 27]]) + roofPlane(K, [[46, 0, Z0 + 13], [10, 0, Z0 + 13], [10, 10, Z0 + 27], [46, 10, Z0 + 27]]);
      s += K.wall([46, 20], [46, 0], Z0 + 13, Z0 + 13.01, 'bk', len => `<path class="bk sd" d="M0 0L${f2(len / 2)} -14L${f2(len)} 0Z"/>`);
      return s;
    } });
    return { mods: M, lc: [24, 10], z0: 0, top: [5, 10, 59], label: 'Kreuzkirche', h: 59, len: 46 };
  });

  /* --- Neustädter Hof- und Stadtkirche St. Johannis (1670): Sandsteinturm mit barocker Kupferhaube, heller Saal mit Ziegeldach und Gauben --- */
  ISO.landmark('neustaedter', H => {
    const { f2, hl, vl, winA, winR, wins, lathe, hip, saddle } = H, M = [], add = m => (M.push(m), m);
    add({ id: 'nsTower', fp: [6, 5, 18, 17], parent: 'nsNave', side: 'W', draw: K => {
      const f = (len, h) => hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, 10) + hl(0, len, 20) + hl(0, len, 30) + wins(winA(len / 2 - 1, 2, 2, 5.6, 4) + winA(len / 2 - 1, 12, 2, 6, 3) + winA(len / 2 - .7, 22, 1.4, 5, 2)) + H.clockSVG(len / 2, 9.2 - 1.4 + 1, 1.4);
      let s = K.box(6, 5, Z0, 12, 12, 40, 'rs', { S: f, E: f, N: f, W: f }) + K.box(5.6, 4.6, Z0 + 40, 12.8, 12.8, .8, 'rs');
      s += lathe(K, 12, 11, [[Z0 + 40.8, 4.6], [Z0 + 47, 4.6]], 'rs fr', 4, [1]);
      s += lathe(K, 12, 11, [[Z0 + 47, 5], [Z0 + 48, 4.6], [Z0 + 50.5, 3.4], [Z0 + 52, 1.8], [Z0 + 53, 1.6]], 'cu', 4, [1]);
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, 12, 11, [[Z0 + 53, 2.2], [Z0 + 57, 2.2]], '')}</g>` + lathe(K, 12, 11, [[Z0 + 53, 1.6], [Z0 + 57, 1.6]], 'lant', 4);
      s += lathe(K, 12, 11, [[Z0 + 57, 2], [Z0 + 58.4, 1.6], [Z0 + 60, .9], [Z0 + 61, 1.2], [Z0 + 62.4, .6], [Z0 + 68, .12]], 'cu', 3);
      return s;
    } });
    add({ id: 'nsNave', fp: [18, 0, 66, 22], draw: K => {
      const side = (len, h) => { let q = hl(0, len, .5) + hl(0, len, h - .8), w = ''; for (let u = 4; u < len - 2; u += 5.6) w += winA(u - 1.2, 2.2, 2.4, h - 4.4, 1, ' dim'); return q + wins(w); };
      let s = K.box(18, 0, Z0, 48, 22, 14, 'pl', { S: side, E: side });
      s += hip(K, 18, 0, 66, 22, Z0 + 14, Z0 + 25);
      for (let x = 24; x < 62; x += 7) { s += K.box(x - 1, 18.6, Z0 + 16.4, 2, 1.6, 2.2, 'pl', { S: () => wins(winR(.3, .3, 1.4, 1.5, 3)) }, false) + saddle(K, [x - 1.2, 20.2], [x + 1.2, 20.2], [0, -1.6], Z0 + 18.6, Z0 + 19.8); }
      return s;
    } });
    return { mods: M, lc: [36, 11], z0: 0, top: [12, 11, 68], label: 'Neustädter Hof- und Stadtkirche', h: 68, len: 60 };
  });

  /* --- Waterloosäule (Laves 1832): 46 m, Sockel, kannelierte Säule, Plattform mit Geländer, Viktoria --- */
  ISO.landmark('waterloo', H => {
    const { f2, hl, lathe } = H, M = [];
    M.push({ id: 'ws', fp: [0, 0, 9, 9], draw: K => {
      let s = K.box(0, 0, Z0, 9, 9, 1.4, 'st') + K.box(1, 1, Z0 + 1.4, 7, 7, 5.6, 'st', { S: l => hl(0, l, .6) + hl(0, l, 4.8), E: l => hl(0, l, .6) + hl(0, l, 4.8) }) + K.box(.7, .7, Z0 + 7, 7.6, 7.6, .8, 'st');
      s += lathe(K, 4.5, 4.5, [[Z0 + 7.8, 2.2], [Z0 + 9, 1.9], [Z0 + 38, 1.6], [Z0 + 39, 2.4]], 'st fr', 6, [1]);
      s += K.box(1.8, 1.8, Z0 + 39, 5.4, 5.4, .9, 'st');
      s += lathe(K, 4.5, 4.5, [[Z0 + 39.9, 1.6], [Z0 + 41.6, 1.4]], 'st fr', 0);
      const p = K.P(4.5, 4.5, Z0 + 41.6);
      s += `<path class="brz" d="M${f2(p[0] - .7)} ${f2(p[1])}l.2 -2.6 -.9 -1.2 .9 -.3 .3 -1.4 .6 .1 .2 1.3 1.2 .7 -.6 .5 .1 2.9Z"/>`;
      return s;
    } });
    return { mods: M, lc: [4.5, 4.5], z0: 0, top: [4.5, 4.5, 47], label: 'Waterloosäule', h: 47, len: 9 };
  });

  /* --- Kröpcke-Uhr: gusseiserne Uhrensäule mit vier Zifferblättern, Treffpunkt --- */
  ISO.landmark('kroepcke', H => {
    const { f2, lathe } = H, M = [];
    M.push({ id: 'ku', fp: [0, 0, 3, 3], draw: K => {
      let s = K.box(0, 0, Z0, 3, 3, .5, 'st') + K.box(.6, .6, Z0 + .5, 1.8, 1.8, 3.4, 'iron', { S: (l, h) => `<rect class="wn hi" data-f="0" x=".25" y=".6" width="${f2(l - .5)}" height="${f2(h - 1.2)}"/>`, E: (l, h) => `<rect class="wn" data-f="0" x=".25" y=".6" width="${f2(l - .5)}" height="${f2(h - 1.2)}"/>` });
      s += K.box(.45, .45, Z0 + 3.9, 2.1, 2.1, 1.6, 'iron', { S: l => H.clockSVG(l / 2, .8, .6), E: l => H.clockSVG(l / 2, .8, .6) });
      s += lathe(K, 1.5, 1.5, [[Z0 + 5.5, 1.1], [Z0 + 6.4, .6], [Z0 + 7, .25]], 'iron', 2);
      return s;
    } });
    return { mods: M, lc: [1.5, 1.5], z0: 0, top: [1.5, 1.5, 7.5], label: 'Kröpcke-Uhr', h: 7.5, len: 3 };
  });
})();
