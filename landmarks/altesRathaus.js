/* Altes Rathaus (Hannover) – Modul, aus altstadt.js herausgelöst (v1, wird nach Google-Earth-Video neu gezeichnet). Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
ISO.landmark('altesRathaus', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Altes Rathaus (Backsteingotik, Schaugiebel, Zwerchhäuser) === */
  const AR = { ea: 15.5, rg: 32 };
  add({ id: 'arMain', b: 'ar', o: .4, fp: [52, 46, 98, 60], draw: K => {
    const south = (len, h) => {
      let q = hl(0, len, .5) + frieze(len, 4.6) + frieze(len, 9) + hl(0, len, h - .8), w = '';
      for (let i = 0; i < 10; i++) {
        const u = 2.3 + i * 4.6;
        q += `<path class="dt" d="M${f2(u - 1.7)} 1.6A1.9 1.2 0 0 1 ${f2(u + 1.7)} 1.6"/><path class="dt" d="M${f2(u - 1.7)} 6.2A1.9 1.2 0 0 1 ${f2(u + 1.7)} 6.2"/>`;
        w += winR(u - 1.5, 1.8, 1.3, 2.6, 2) + winR(u + .2, 1.8, 1.3, 2.6, 2) + winR(u - 1.5, 6.4, 1.3, 2.4, 1) + winR(u + .2, 6.4, 1.3, 2.4, 1);
        w += winG(u - 1.6, 10.2, 3.2, h - 10.2, 0, ' dim');
      }
      return groupM('bk', q + wins(w));
    };
    const east = (len, h) => {
      let q = hl(0, len, .5) + frieze(len, 4.6) + frieze(len, 9), w = '';
      [2.2, 4.8, 7.4, 10, 12.6].forEach(u => { w += winR(u - 1.1, 1.8, 1, 2.6, 2) + winR(u, 1.8, 1, 2.6, 2) + winR(u - 1.1, 6.2, 1, 2.4, 1) + winR(u, 6.2, 1, 2.4, 1); });
      w += winG(5.2, 10, 3.6, h - 10.4, 0, ' hi');
      q += `<path class="dt" d="${garch(1, 10.6, 2.6, h - 10.6)}"/><path class="dt" d="${garch(10.4, 10.6, 2.6, h - 10.6)}"/>`;
      return groupM('bk', q + wins(w));
    };
    let s = K.box(52, 46, Z0, 46, 14, AR.ea - Z0, 'bk', { S: south, E: east, N: south, W: east }, false);
    s += roofPlane(K, [[52, 60, AR.ea], [98, 60, AR.ea], [98, 53, AR.rg], [52, 53, AR.rg]]);
    s += roofPlane(K, [[98, 46, AR.ea], [52, 46, AR.ea], [52, 53, AR.rg], [98, 53, AR.rg]]);
    // Zwerchhäuser mit kleinen Treppengiebeln
    [62, 73, 84].forEach(x => {
      s += saddle(K, [x - 3.2, 60], [x + 3.2, 60], [0, -5.5], AR.ea + 1, AR.ea + 9.5);
      s += K.wall([x - 3.2, 60], [x + 3.2, 60], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', sgable(6.4, 11, 1, 'bk', 'fr', 2, 3)));
    });
    // Schaugiebel im Osten
    s += K.wall([98, 60], [98, 46], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', frieze(14, -.4) + sgable(14, 25, 3, 'bk', 'sd', 3, 3)));
    s += K.wall([52, 46], [52, 60], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', frieze(14, -.4) + sgable(14, 21, 3, 'bk', 'sd', 2, 3)));
    return s;
  } });

  return { mods: M, lc: [75, 53], z0: 0, top: [98, 53, 42], label: 'Altes Rathaus', h: 42, len: 46 };
});
