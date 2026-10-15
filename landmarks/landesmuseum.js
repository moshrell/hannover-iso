/* Niedersächsisches Landesmuseum – Modul (eine Datei pro Gebäude). Hilfsfunktionen: core/iso-core.js. Vorbilder: ref/landesmuseum/ (Quellen in quellen.txt). */
(() => {
  const Z0 = 1;
  /* --- Niedersächsisches Landesmuseum (1902): Sandstein, Mittelrisalit mit drei hohen Bögen, Eckpavillons mit Kuppeln --- */
  ISO.landmark('landesmuseum', H => {
    const { f2, hl, vl, winA, wins, lathe, hip, saddle } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .6) + hl(0, len, 1.3) + hl(0, len, 9.6) + hl(0, len, 10.2), w = '';
      for (let v = 11.4; v < h - .6; v += 1.2) q += hl(0, len, v);
      const n = Math.floor((len - 2) / 4.2), off = (len - n * 4.2) / 2 + 2.1;
      for (let i = 0; i < n; i++) { const u = off + i * 4.2; w += winA(u - 1.2, 2, 2.4, 6, 1) + winA(u - 1, 11.6, 2, 4.4, 0); if (i < n - 1) q += vl(u + 2.1, 1.3, 9.6); }
      return q + wins(w); };
    // Hauptbau mit flachem Walmdach hinter der Balustrade; Eckpavillons mit Kuppeldach; Mittelrisalit mit drei Bogenfenstern, höher als die Flügel
    add({ id: 'lmMain', fp: [0, 0, 82, 30], draw: K => K.box(0, 0, Z0, 82, 30, 17, 'st', { S: fac, E: fac, W: fac, N: fac }) + saddle(K, [0, 30], [82, 30], [0, -30], Z0 + 17, Z0 + 19.6, 'sl') });
    const pav = x => add({ id: 'lmP' + x, fp: [x, -2, x + 14, 33], parent: 'lmMain', side: 'S', draw: K => {
      let s = K.box(x, -2, Z0, 14, 35, 20, 'st', { S: fac, E: fac, W: fac, N: fac }) + hip(K, x, -2, x + 14, 33, Z0 + 20, Z0 + 24, 'sl');
      return s + lathe(K, x + 7, 15, [[Z0 + 22, 2.6], [Z0 + 24.5, 2.6], [Z0 + 26, 1.9], [Z0 + 27.4, .8], [Z0 + 28.2, .3]], 'cu', 4, [1]);
    } });
    pav(0); pav(68);
    add({ id: 'lmRis', fp: [31, 30, 51, 34], parent: 'lmMain', side: 'S', draw: K => {
      const f = (len, h) => { let q = hl(0, len, .6) + hl(0, len, 1.3) + hl(0, len, h - 2.4) + vl(1.4, 1.3, h) + vl(len - 1.4, 1.3, h), w = '';
        [4.8, 10, 15.2].forEach(u => { w += winA(u - 1.8, 4.4, 3.6, 10, 2, ' hi'); });
        w += winA(len / 2 - 1.6, 1.8, 3.2, 5.4, 0, ' dim');
        return q + wins(w); };
      let s = K.box(31, 30, Z0, 20, 4, 22, 'st', { S: f, E: l => hl(0, l, .6) + hl(0, l, 19.6), W: l => hl(0, l, .6) + hl(0, l, 19.6), N: l => hl(0, l, .6) });
      s += hip(K, 31, 30, 51, 34, Z0 + 22, Z0 + 24.2, 'sl');
      return s;
    } });
    return { mods: M, lc: [41, 16], z0: 0, top: [41, 34, 28], label: 'Landesmuseum', h: 30, len: 82 };
  });
})();
