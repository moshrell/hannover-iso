/* Opernhaus Hannover (Laves, 1845–1852). Lokal: x Ost, y Süd, z Höhe, Gelände z = 1; Front (Portikus) zeigt nach +y.
   Grundriss nach OSM-Way 4816458 (Kreuzform): Flügelblock 81,8 × 55,6 m, Portikus-Arm 29,6 × 17 m vorn, Bühnenarm 29,6 × 11 m hinten (gesamt 83,6 m tief).
   Vorbilder: ref/oper-hbf-aegi/ (Wikimedia Commons, Quellen in quellen.txt). */
ISO.landmark('opernhaus', H => {
  const { f2, hl, vl, winA, wins, lathe, hip, saddle } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  // Maße (m)
  const W = 81.8, YF = 83.6, YW0 = 11, YW1 = 66.6;   // Gesamtbreite, Vorderkante Portikus, Flügelblock von … bis …
  const CX0 = 26.2, CX1 = 55.8, CW = CX1 - CX0;      // Mittelbau (Portikus, Zuschauerhaus, Bühne)
  const HW = 17.6, RF = Z0 + HW + .8;                // Flügelwand, Traufe darüber (Gesims)
  const ZE = Z0 + 30, ZR = ZE + 5.6;                 // Traufe und First des Mittelbaus
  const bal = len => hl(0, len, .3) + Array.from({ length: Math.floor(len / .9) }, (_, i) => vl(.45 + i * .9, .3, 1.3)).join('');
  // Flügelfassade: unten rustiziert mit Rundbogenfenstern, oben Rundbogenfenster mit Pilastern
  const wing = step => (len, h) => {
    let q = hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, 8.2) + hl(0, len, 8.8) + hl(0, len, h - .6), w = '';
    for (let v = 10; v < h - .8; v += 1.2) q += hl(0, len, v);
    const n = Math.max(1, Math.floor((len - 2) / step)), off = (len - n * step) / 2 + step / 2;
    for (let i = 0; i < n; i++) { const u = off + i * step;
      w += winA(u - 1.05, 1.9, 2.1, 5.2, 1) + winA(u - 1, 10.4, 2, 4.4, 0);
      if (i < n - 1) q += vl(u + step / 2, 1.2, 8.2); }
    return q + wins(w);
  };
  // 1) Flügelblock mit niedrigen Kupferdächern über beiden Seitenflügeln
  add({ id: 'opWing', o: .2, fp: [0, YW0, W, YW1], draw: K => {
    let s = K.box(0, YW0, Z0, W, YW1 - YW0, HW, 'st', { S: wing(4.4), E: wing(4.6), W: wing(4.6), N: wing(4.4) }, false);
    s += K.box(-.4, YW0 - .4, Z0 + HW, W + .8, YW1 - YW0 + .8, .8, 'st');
    s += hip(K, 0, YW0, CX0, YW1, RF, RF + 2.6, 'cu') + hip(K, CX1, YW0, W, YW1, RF, RF + 2.6, 'cu');
    return s;
  } });
  // 2) Bühnenarm hinten (Bühnenhaus, von unten bis zur Traufe des Mittelbaus)
  add({ id: 'opRear', o: .5, fp: [CX0, 0, CX1, YW0], draw: K => {
    const side = (l, h) => { let q = hl(0, l, .6) + hl(0, l, 1.2) + hl(0, l, h - .6), w = '';
      for (let u = 2.4; u < l - 2; u += 4.8) { w += winA(u - 1, 6, 2, 4.2, 4) + winA(u - 1, 14, 2, 4.4, 4); } return q + wins(w); };
    return K.box(CX0, 0, Z0, CW, YW0, ZE - Z0, 'st', { S: () => '', N: side, E: side, W: side }, false);
  } });
  // 3) Mittelbau über dem Flügeldach: Rundbogenfenster, Giebel mit Figurengruppe
  add({ id: 'opCenter', o: .4, fp: [CX0, YW0, CX1, YW1], above: 'opWing', draw: K => {
    const hC = ZE - RF;
    const up = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - .8), w = '';
      for (let i = 0; i < 5; i++) { const u = 4.9 + i * (len - 9.8) / 4; w += winA(u - 1.3, 2.6, 2.6, 4, 4, ' hi'); if (i < 4) q += vl(u + (len - 9.8) / 8, 1.1, h - .8); }
      return q + wins(w); };
    const sideW = (l, h) => { let q = hl(0, l, .5) + hl(0, l, 1.2) + hl(0, l, h - .8), w = ''; for (let u = 4; u < l - 2; u += 6.4) { w += winA(u - 1.2, 2.4, 2.4, 5.6, 4); q += vl(u + 3.2, 1.2, h - .8); } return q + wins(w); };
    let s = K.box(CX0, YW0, RF, CW, YW1 - YW0, hC, 'st', { S: up, E: sideW, W: sideW }, false);
    s += saddle(K, [CX0 - .3, YW1], [CX1 + .3, YW1], [0, -YW1], ZE, ZR, 'cu');
    s += K.wall([CX0, YW1], [CX1, YW1], ZE, ZE + .01, 'st', len => `<path class="st fr" d="M0 0L${f2(len / 2)} -5.6L${f2(len)} 0Z"/><path class="dt" d="M1.6 -.5L${f2(len / 2)} -4.8L${f2(len - 1.6)} -.5Z"/><path class="dt" d="M4 1.6H${f2(len - 4)}"/>`);
    const g = K.P((CX0 + CX1) / 2, YW1, ZR + .4);
    s += `<path class="brz" d="M${f2(g[0] - 2.4)} ${f2(g[1] + 1.2)}l.6 -2.4 .8 .4 .4 -2 .8 1.1 .8 -1.5 .7 1.3 1 -.9 .2 1.8 .6 .3 .1 1.8Z"/>`;
    return s;
  } });
  // 4) Portikus-Arm: Stufen, Arkadenwand, acht Säulen, Gebälk mit Terrasse
  add({ id: 'opPorch', o: .1, fp: [CX0 - 1, YW1, CX1 + 1, YF + 1.2], parent: 'opWing', side: 'S', draw: K => {
    let s = K.box(CX0 - 1, YW1, Z0, CW + 2, YF - YW1 + 1.2, 1.2, 'st', { S: l => hl(0, l, .4), E: l => hl(0, l, .4), W: l => hl(0, l, .4) });
    s += K.wall([CX0, YW1], [CX1, YW1], Z0 + 1.2, Z0 + 9.8, 'st', (len, h) => wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(len / 14 + i * len / 7 - 1.2, 1.4, 2.4, h - 1.6, 0, ' dim')).join('')));
    for (let i = 0; i < 8; i++) { const x = CX0 + 1.1 + i * (CW - 2.2) / 7;
      s += lathe(K, x, YF - 1.2, [[Z0 + 1.2, .75], [Z0 + 1.7, .6], [Z0 + 9.2, .55], [Z0 + 9.8, .8]], 'st fr', 2, [1]); }
    s += K.box(CX0, YW1, Z0 + 9.8, CW, YF - YW1, 1.2, 'st', { S: l => hl(0, l, .5), E: l => hl(0, l, .5), W: l => hl(0, l, .5) });
    s += K.wall([CX0, YF - .1], [CX1, YF - .1], Z0 + 11, Z0 + 12.3, 'st', bal) + K.wall([CX1, YF - .1], [CX1, YF - 4.4], Z0 + 11, Z0 + 12.3, 'st', bal) + K.wall([CX0, YF - 4.4], [CX0, YF - .1], Z0 + 11, Z0 + 12.3, 'st', bal);
    return s;
  } });
  // 5) Obergeschoss über dem Portikus: fünf hohe Bogenfenster, Pilaster, Balustrade
  add({ id: 'opTier', o: .3, fp: [CX0 - .8, YW1, CX1 + .8, YF - 4.4], above: 'opPorch', parent: 'opCenter', side: 'S', draw: K => {
    const zT = Z0 + 11, hT = 9.6, YT = YF - 4.6;
    const fr = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - .5), w = '';
      for (let i = 0; i < 5; i++) { const u = 4 + i * (len - 8) / 4; w += winA(u - 1.3, 1.9, 2.6, 6.2, 3, ' hi'); q += vl(u - (len - 8) / 8, 1.1, h - .5); }
      q += vl(len - (len - 8) / 8 + (len - 8) / 4 * 0 - .0, 1.1, h - .5);
      return q + wins(w); };
    const fs = (len, h) => hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - .5) + wins(winA(len / 2 - 3.4, 1.9, 2.4, 6.2, 3) + winA(len / 2 + 1, 1.9, 2.4, 6.2, 3));
    let s = K.box(CX0 - .8, YW1, zT, CW + 1.6, YT - YW1, hT, 'st', { S: fr, E: fs, W: fs });
    s += K.wall([CX0 - .8, YT], [CX1 + .8, YT], zT + hT, zT + hT + 1.3, 'st', bal) + K.wall([CX1 + .8, YT], [CX1 + .8, YW1], zT + hT, zT + hT + 1.3, 'st', bal) + K.wall([CX0 - .8, YW1], [CX0 - .8, YT], zT + hT, zT + hT + 1.3, 'st', bal);
    return s;
  } });
  return { mods: M, lc: [W / 2, YF / 2], z0: 0, top: [W / 2, 38, 40], pin: [W / 2, 40, ZR + 4], label: 'Opernhaus', h: 40, len: 83.6 };
});
