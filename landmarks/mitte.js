/* Mitte — Module: Opernhaus (Laves, 1845–1852), Aegidienkirche (Mahnmal-Ruine).
   Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Vorbilder: ref/oper-hbf-aegi/ (Wikimedia Commons, Quellen in quellen.txt). */

/* === Opernhaus: Sandstein, Arkaden-Vorhalle mit Terrasse, Mittelbau mit Giebel, lange Seitenflügel, Bühnenhaus === */
ISO.landmark('opernhaus', H => {
  const { f2, hl, vl, winR, winA, wins, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  // Flügelfassade: unten rustiziert mit Rundbogenfenstern, oben Rundbogenfenster mit Pilastern
  const wing = step => (len, h) => {
    let q = hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, 8.4) + hl(0, len, 9) + hl(0, len, h - .6), w = '';
    for (let v = 10.2; v < h - .8; v += 1.2) q += hl(0, len, v);
    const n = Math.max(1, Math.floor((len - 2) / step)), off = (len - n * step) / 2 + step / 2;
    for (let i = 0; i < n; i++) { const u = off + i * step;
      w += winA(u - 1.05, 1.9, 2.1, 5.2, 1) + winA(u - 1, 10.6, 2, 4.4, 0);
      if (i < n - 1) q += vl(u + step / 2, 1.2, 8.4); }
    return q + wins(w);
  };
  add({ id: 'opWing', o: .2, fp: [0, 0, 64, 84], draw: K => {
    let s = K.box(0, 0, Z0, 64, 84, 18, 'st', { S: wing(4.4), E: wing(4.4), W: wing(4.4), N: wing(4.4) }, false);
    s += K.box(-.4, -.4, Z0 + 18, 64.8, 84.8, .8, 'st');
    return s + hip(K, 0, 0, 64, 84, Z0 + 18.8, Z0 + 23, 'sl');
  } });
  const RF = Z0 + 18.8;   // Traufe der Flügel: alles darüber steht auf dem Dach
  add({ id: 'opStage', o: .5, fp: [18, 6, 46, 28], above: 'opWing', draw: K =>
    K.box(18, 6, RF, 28, 22, 12, 'st', { S: (l, h) => hl(0, l, .6) + hl(0, l, 1.2) + hl(0, l, h - .6) + wins(H.winA(l / 2 - 3, 3.4, 2, 4, 4) + H.winA(l / 2 + 1, 3.4, 2, 4, 4)), E: (l, h) => hl(0, l, .6) + hl(0, l, 1.2) + hl(0, l, h - .6) + [4, 8, 12, 16, 20].map(u => vl(u, 1.2, h - .6)).join('') }) } );
  add({ id: 'opCenter', o: .4, fp: [14, 34, 50, 72], above: 'opWing', draw: K => {
    const up = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, h - 1), w = '';
      [5, 10.6, 16.2, 21.8, 27.4].forEach(u => { w += winA(u - 1.4 + (len - 36) / 2, 2.2, 2.8, 5.6, 4, ' hi'); q += vl(u + 2.8 + (len - 36) / 2, 1.2, h - 1); });
      return q + wins(w); };
    const sideW = (l, h) => { let q = hl(0, l, .5) + hl(0, l, 1.2) + hl(0, l, h - 1), w = ''; for (let u = 4; u < l - 2; u += 5.4) { w += winA(u - 1.2, 2.4, 2.4, 5, 4); q += vl(u + 2.7, 1.2, h - 1); } return q + wins(w); };
    let s = K.box(14, 34, RF, 36, 38, 13.4, 'st', { S: up, E: sideW, W: sideW }, true);
    s += saddle(K, [14, 72], [50, 72], [0, -38], RF + 13.4, RF + 18.4, 'sl');
    s += K.wall([14, 72], [50, 72], RF + 13.4, RF + 13.41, 'st', len => `<path class="st fr" d="M0 0L${f2(len / 2)} -5.2L${f2(len)} 0Z"/><path class="dt" d="M1.6 -.5L${f2(len / 2)} -4.4L${f2(len - 1.6)} -.5Z"/><path class="dt" d="M4 1.6H${f2(len - 4)}"/>`);
    const g = K.P(32, 72, RF + 18.8);
    s += `<path class="brz" d="M${f2(g[0] - 2.2)} ${f2(g[1] + 1.2)}l.6 -2.2 .8 .4 .4 -1.8 .7 1 .7 -1.4 .6 1.2 .9 -.8 .2 1.6 .6 .3 .1 1.7Z"/>`;
    return s;
  } });
  // Mittelrisalit: unten flache Front hinter der Vorhalle, oben ein Geschoss mit sieben Bogenfenstern und Balustrade
  add({ id: 'opFront', o: .3, fp: [12, 72, 52, 84.6], above: 'opWing', draw: K => {
    const bal = len => hl(0, len, .3) + Array.from({ length: Math.floor(len / .9) }, (_, i) => vl(.45 + i * .9, .3, 1.4)).join('');
    let s = K.box(12, 84, Z0, 40, .6, 18.8, 'st', { S: (l, h) => hl(0, l, .5) + hl(0, l, 1.2) + hl(0, l, 7.4) + hl(0, l, 8) + wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(3.2 + i * 5.6, 1.8, 2.2, 4.4, 2)).join('')) }, false);
    const f = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, h - .6), w = '';
      for (let i = 0; i < 7; i++) { const u = 3 + i * (len - 6) / 6; w += winA(u - 1.1, 1.8, 2.2, 4.4, 3, ' hi'); } return q + wins(w); };
    const fs = (len, h) => hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, h - .6) + wins(winA(len / 2 - 3.6, 1.8, 2.2, 4.4, 3) + winA(len / 2 + 1.4, 1.8, 2.2, 4.4, 3));
    s += K.box(12, 72, RF, 40, 12.6, 7.4, 'st', { S: f, E: fs, W: fs });
    s += K.wall([12, 84.6], [52, 84.6], RF + 7.4, RF + 8.8, 'st', bal) + K.wall([52, 84.6], [52, 72], RF + 7.4, RF + 8.8, 'st', bal);
    return s;
  } });
  add({ id: 'opPorch', o: .1, fp: [10, 84.6, 54, 92.6], parent: 'opFront', side: 'S', draw: K => {
    let s = K.box(10, 84.6, Z0, 44, 8, 1.2, 'st');
    s += K.wall([12, 84.6], [52, 84.6], Z0 + 1.2, Z0 + 10, 'st', (len, h) => wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(3.4 + i * 5.4, 1.4, 3, h - 1.6, 0, ' dim')).join('')));
    for (let i = 0; i < 8; i++) { const x = 11.2 + i * (41.6 / 7);
      s += lathe(K, x, 91.6, [[Z0 + 1.2, .75], [Z0 + 1.7, .6], [Z0 + 9.2, .55], [Z0 + 9.8, .8]], 'st fr', 2, [1]); }
    s += K.box(10, 84.6, Z0 + 9.8, 44, 8, 1.2, 'st', { S: l => hl(0, l, .5), E: l => hl(0, l, .5), W: l => hl(0, l, .5) });
    const bal = len => hl(0, len, .3) + Array.from({ length: Math.floor(len / .9) }, (_, i) => vl(.45 + i * .9, .3, 1.3)).join('');
    s += K.wall([10, 92.6], [54, 92.6], Z0 + 11, Z0 + 12.3, 'st', bal) + K.wall([54, 92.6], [54, 84.6], Z0 + 11, Z0 + 12.3, 'st', bal);
    return s;
  } });
  return { mods: M, lc: [32, 46], z0: 0, top: [32, 72, 40], label: 'Opernhaus', h: 40, len: 93 };
});

/* === Aegidienkirche: Ruine ohne Dach (Mahnmal), Giebelreihe, offene Spitzbogenfenster, Westturm mit offener Glockenlaterne === */
ISO.landmark('aegidienkirche', H => {
  const { f2, hl, vl, winG, wins, garch, lathe } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m), WH = 15, T = 1.2;
  const bays = (len, h, inner) => {
    let q = hl(0, len, .4) + hl(0, len, h - 1.2), w = '';
    const n = Math.floor(len / 8), off = (len - n * 8) / 2 + 4;
    for (let i = 0; i < n; i++) { const u = off + i * 8; w += winG(u - 1.6, 2.6, 3.2, h - 5.2, 1, ' dim'); if (!inner && i) q += vl(u - 4, 1, h); }
    return q + wins(w);
  };
  const gables = (len, sh) => { let s = ''; const n = Math.floor(len / 8), off = (len - n * 8) / 2;
    for (let i = 0; i < n; i++) { const u = off + i * 8; s += `<path class="rs ${sh}" d="M${f2(u + .3)} 0L${f2(u + 4)} -8.6L${f2(u + 7.7)} 0Z"/><path class="dt" d="M${f2(u + 3.6)} -3.4h.8v1.4h-.8Z"/>`; }
    return s; };
  // Boden im Inneren + Innenseiten der hinteren Wände (sichtbar, weil kein Dach)
  add({ id: 'aeInner', o: .3, fp: [20, 0, 60, 22], draw: K => {
    let s = `<path class="pave" d="${K.path([[20, 0, Z0 + .05], [60, 0, Z0 + .05], [60, 22, Z0 + .05], [20, 22, Z0 + .05]])}Z"/>`;
    const shade = (l, h) => `<rect class="ishade" width="${f2(l)}" height="${f2(h)}"/>`;
    s += K.wall([20 + T, T], [60 - T, T], Z0, Z0 + WH, 'rs', (l, h) => shade(l, h) + bays(l, h, true));   // Nordwand innen
    s += K.wall([20 + T, 22 - T], [20 + T, T], Z0, Z0 + WH, 'rs', (l, h) => shade(l, h) + hl(0, l, h - 1.2)); // Westwand innen
    s += K.wall([20 + T, T], [60 - T, T], Z0 + WH, Z0 + WH + .01, 'rs', l => gables(l, 'fr'));
    return s;
  } });
  add({ id: 'aeWalls', o: .4, fp: [20, 0, 60, 22], above: 'aeInner', draw: K => {
    let s = K.box(20, 22 - T, Z0, 40, T, WH, 'rs', { S: (l, h) => bays(l, h, false) });          // Südwand
    s += K.wall([20, 22], [60, 22], Z0 + WH, Z0 + WH + .01, 'rs', l => gables(l, 'fr'));
    s += K.box(60 - T, 0, Z0, T, 22, WH, 'rs', { E: (l, h) => hl(0, l, .4) + wins(winG(l / 2 - 2, 2.6, 4, h - 4.6, 1, ' dim')) }); // Ostwand
    s += K.wall([60, 22], [60, 0], Z0 + WH, Z0 + WH + .01, 'rs', len => `<path class="rs sd" d="M0 0L${f2(len / 2)} -9L${f2(len)} 0Z"/>`);
    return s;
  } });
  add({ id: 'aeTower', o: .7, fp: [8, 4, 20, 18], parent: 'aeInner', side: 'W', draw: K => {
    const f = clock => (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, 9.4) + hl(0, len, 20) + hl(0, len, 32), w = '';
      w += winG(len / 2 - 1.1, 2.2, 2.2, 5.6, 4) + winG(len / 2 - .7, 15, 1.4, 4, 3) + winG(len / 2 - .6, 25, 1.2, 4, 2);
      return q + wins(w) + (clock ? H.clockSVG(len / 2, 11.4, 1.5) : ''); };
    let s = K.box(8, 4, Z0, 12, 14, 42, 'rs', { S: f(true), E: f(true), W: f(false), N: f(false) });
    s += K.box(7.6, 3.6, Z0 + 42, 12.8, 14.8, .9, 'rs');
    // offene Glockenlaterne (achteckig wirkend): Pfeiler, Kuppel, Spitze
    const cx = 14, cy = 11, z = Z0 + 42.9;
    s += lathe(K, cx, cy, [[z, 4.4], [z + .8, 4.4]], 'cu');
    s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[z + .8, 4.6], [z + 7.2, 4.6]], '')}</g>`;
    s += lathe(K, cx, cy, [[z + .8, 3.6], [z + 7.2, 3.6]], 'lant', 8);
    s += lathe(K, cx, cy, [[z + 7.2, 4.4], [z + 8, 4.4], [z + 9.6, 3.2], [z + 10.8, 1.2], [z + 11.4, .6]], 'cu', 4, [1]);
    return s + `<path class="dt cu-d" d="${K.path([[cx, cy, z + 11.4], [cx, cy, z + 14]])}"/>`;
  } });
  return { mods: M, lc: [34, 11], z0: 0, top: [14, 11, 57], label: 'Aegidienkirche', h: 57, len: 52 };
});
