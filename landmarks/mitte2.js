/* Mitte, zweite Reihe — Module (Stufe „erkennbar“, Details später):
   Kreuzkirche, Waterloosäule, Kröpcke-Uhr. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Vorbilder: ref/mitte2/ (Quellen in quellen.txt). */
(() => {
  const Z0 = 1;
  const grid = (H, len, h, step, rows, f0, cls = '') => { // Fensterraster: rows = [[v, h, f], …]
    let w = ''; const n = Math.max(1, Math.floor((len - 1) / step)), off = (len - n * step) / 2;
    for (let i = 0; i < n; i++) rows.forEach(([v, hh, f]) => { w += H.winR(off + i * step + step * .2, v, step * .6, hh, f); });
    return H.wins(w);
  };

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
