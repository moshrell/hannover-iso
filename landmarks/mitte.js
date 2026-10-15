/* Mitte — Module: Opernhaus (Laves, 1845–1852), Hauptbahnhof mit Ernst-August-Denkmal, Aegidienkirche (Mahnmal-Ruine).
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

/* === Hauptbahnhof: gelber Backstein mit roten Bändern, Mittelbau mit drei großen Bogenfenstern und Uhren, Seitenflügel, Bahnsteighallen; davor Ernst-August-Denkmal === */
ISO.landmark('hauptbahnhof', H => {
  const { f2, hl, vl, winR, winA, wins, hip, saddle, roofPlane } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const band = (len, ys) => ys.map(y => `<path class="dt rb" d="M0 ${f2(y)}H${f2(len)}"/>`).join('');
  // Bahnsteighallen hinter dem Empfangsgebäude
  add({ id: 'hbHalls', o: .6, fp: [0, -54, 140, -2], draw: K => {
    let s = '';
    for (let i = 0; i < 3; i++) { const y0 = -54 + i * 17, y1 = y0 + 15;
      s += roofPlane(K, [[0, y1, Z0 + 9], [140, y1, Z0 + 9], [140, (y0 + y1) / 2, Z0 + 13], [0, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += roofPlane(K, [[140, y0, Z0 + 9], [0, y0, Z0 + 9], [0, (y0 + y1) / 2, Z0 + 13], [140, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += K.wall([140, y1], [140, y0], Z0 + 9, Z0 + 9.01, 'gb', len => `<path class="gb sd" d="M0 0L${f2(len / 2)} -4L${f2(len)} 0Z"/>`); }
    return s;
  } });
  const wingF = (len, h) => {
    let q = band(len, [.6, 1.2, 6.6, 7.2]) + hl(0, len, h - .5), w = '';
    const n = Math.floor((len - 2) / 3.6), off = (len - n * 3.6) / 2 + 1.8;
    for (let i = 0; i < n; i++) { const u = off + i * 3.6; w += winA(u - 1, 1.8, 2, 3.8, 1); }
    // Erdgeschoss: verglaste Ladenfront unter Vordach
    for (let u = 1; u < len - 3; u += 4) w += `<rect class="wn dim" data-f="0" x="${f2(u + .4)}" y="7.8" width="3.2" height="${f2(h - 8.6)}"/>`;
    return q + wins(w);
  };
  add({ id: 'hbWW', o: .3, fp: [0, 0, 50, 26], draw: K => K.box(0, 0, Z0, 50, 26, 13, 'gb', { S: wingF, W: wingF }) + hip(K, 0, 0, 50, 26, Z0 + 13, Z0 + 17, 'sl') });
  add({ id: 'hbWE', o: .3, fp: [90, 0, 140, 26], draw: K => K.box(90, 0, Z0, 50, 26, 13, 'gb', { S: wingF, E: wingF }) + hip(K, 90, 0, 140, 26, Z0 + 13, Z0 + 17, 'sl') });
  add({ id: 'hbCenter', o: .4, fp: [50, -4, 90, 30], draw: K => {
    const front = (len, h) => {
      let q = band(len, [.6, 1.4, 4.6, 5.2, 21.8, 22.4]) + hl(0, len, h - .8), w = '';
      // Bogengalerie unter dem Gesims
      for (let i = 0; i < 12; i++) w += winA(4.6 + i * 2.6, 1.8, 1.6, 2.4, 3);
      // drei große Bogenfenster mit Sprossen
      // drei große Bogenfenster (Mitte der Fassade), darunter Portale
      const a0 = 9.4, a1 = h - 7.2;
      [7, 20, 33].forEach(u => { w += `<path class="wn" data-f="1" d="M${f2(u - 3.8)} ${f2(a1)}V${f2(a0 + 3.8)}A3.8 3.8 0 0 1 ${f2(u + 3.8)} ${f2(a0 + 3.8)}V${f2(a1)}Z"/>`;
        q += `<path class="mul" d="M${f2(u)} ${f2(a0)}V${f2(a1)}M${f2(u - 3.8)} ${f2(a0 + 6)}H${f2(u + 3.8)}M${f2(u - 1.9)} ${f2(a0 + .6)}V${f2(a1)}M${f2(u + 1.9)} ${f2(a0 + .6)}V${f2(a1)}"/><path class="dt" d="M${f2(u - 4.6)} ${f2(a0 + 3.8)}A4.6 4.6 0 0 1 ${f2(u + 4.6)} ${f2(a0 + 3.8)}"/>`;
        w += winA(u - 1.8, h - 6.2, 3.6, 5.4, 0, ' dim'); });
      q += band(len, [a1 + .4, a1 + 1]);
      // Eckpfeiler mit Uhren
      q += `<rect class="gb fr" x="0" y="0" width="3.2" height="${f2(h)}"/><rect class="gb fr" x="${f2(len - 3.2)}" y="0" width="3.2" height="${f2(h)}"/>`;
      return q + wins(w) + H.clockSVG(1.6, 3.2, 1.1) + H.clockSVG(len - 1.6, 3.2, 1.1);
    };
    const side = (len, h) => band(len, [.6, 1.4, 4.6, 5.2]) + wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(4 + i * (len - 8) / 6 - 1, 7, 2, 6, 1)).join(''));
    let s = K.box(50, -4, Z0, 40, 34, 30, 'gb', { S: front, E: side, W: side });
    s += K.box(49.6, -4.4, Z0 + 30, 40.8, 34.8, .8, 'gb');
    return s + hip(K, 50, -4, 90, 30, Z0 + 30.8, Z0 + 38, 'sl');
  } });
  // Vordach über den Seitenflügeln (grünes Glas)
  add({ id: 'hbCanopy', o: .1, fp: [0, 26, 140, 30], parent: 'hbCenter', side: 'S', draw: K =>
    K.box(0, 26, Z0 + 6.4, 50, 3.6, .6, 'gl') + K.box(90, 26, Z0 + 6.4, 50, 3.6, .6, 'gl') } );
  // Ernst-August-Denkmal (Reiterstandbild auf Sockel), Figur als Schattenriss in der Fläche
  add({ id: 'hbStatue', o: .8, fp: [67, 54, 73, 60], obj: false, draw: K => {
    let s = K.box(66.5, 54.5, Z0, 7, 4.5, 1.2, 'st') + K.box(67.4, 55.2, Z0 + 1.2, 5.2, 3, 6.4, 'st', { S: l => hl(0, l, .6) + hl(0, l, 5.6), E: l => hl(0, l, .6) + hl(0, l, 5.6) });
    const horse = [[6.8, -3.4], [7.4, -1.6], [6.6, -2.6], [6.2, -2.2], [6.3, 0], [5.8, 0], [5.6, -1.8], [5, -1.9], [4.9, 0], [4.4, 0], [4.5, -2], [2.6, -2], [2.4, 0], [1.9, 0], [2, -2.1], [1.6, -2.4],
      [.9, -1.4], [.6, -1.7], [1.2, -2.8], [.9, -3.6], [.2, -4.4], [0, -4.1], [.4, -5], [1, -5.2], [1.4, -4.6], [2.4, -3.6], [2.9, -3.7], [3, -5.6], [3.3, -6.4], [3.2, -6.9], [3.4, -7.9], [3.6, -6.9], [3.8, -6.3], [3.9, -5.5], [4.2, -4.4], [4.9, -3.5], [5.6, -3.6], [6.2, -3.5]];
    s += K.wall([67.4, 56.7], [72.6, 56.7], Z0 + 7.6, Z0 + 7.61, 'brz', () => `<path class="brz" d="M${horse.map(([x, y]) => f2(x * .74) + ' ' + f2(y * .74)).join('L')}Z"/>`);
    return s;
  } });
  return { mods: M, lc: [70, 13], z0: 0, top: [70, 13, 39], label: 'Hauptbahnhof', h: 39, len: 140 };
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
