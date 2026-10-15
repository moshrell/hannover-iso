/* Hauptbahnhof Hannover mit Ernst-August-Denkmal – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1.
   Vorbilder: ref/oper-hbf-aegi/ (alt), ref/hauptbahnhof/ (neu); Wikimedia Commons, Quellen in quellen.txt. */

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
  add({ id: 'hbStatue', o: .8, fp: [66, 52, 74, 61.5], obj: false, draw: K => {
    let s = K.box(66, 52.4, Z0, 5.2, 8.8, 1.2, 'st') + K.box(66.9, 53.2, Z0 + 1.2, 3.4, 7.2, 6.4, 'st', { S: l => hl(0, l, .6) + hl(0, l, 5.6), E: l => hl(0, l, .6) + hl(0, l, 5.6) });
    const horse = [[6.8, -3.4], [7.4, -1.6], [6.6, -2.6], [6.2, -2.2], [6.3, 0], [5.8, 0], [5.6, -1.8], [5, -1.9], [4.9, 0], [4.4, 0], [4.5, -2], [2.6, -2], [2.4, 0], [1.9, 0], [2, -2.1], [1.6, -2.4],
      [.9, -1.4], [.6, -1.7], [1.2, -2.8], [.9, -3.6], [.2, -4.4], [0, -4.1], [.4, -5], [1, -5.2], [1.4, -4.6], [2.4, -3.6], [2.9, -3.7], [3, -5.6], [3.3, -6.4], [3.2, -6.9], [3.4, -7.9], [3.6, -6.9], [3.8, -6.3], [3.9, -5.5], [4.2, -4.4], [4.9, -3.5], [5.6, -3.6], [6.2, -3.5]];
    // Reiter blickt zur Stadt (nach +y), Schwanz zum Bahnhof: Silhouette auf die Ostseite des Sockels (zum Betrachter), Kopf vorn
    s += K.wall([70.4, 60.5], [70.4, 53.1], Z0 + 7.6, Z0 + 7.61, 'brz', () => `<path class="brz" d="M${horse.map(([x, y]) => f2(x) + ' ' + f2(y)).join('L')}Z"/>`);
    return s;
  } });
  return { mods: M, lc: [70, 13], z0: 0, top: [70, 13, 39], label: 'Hauptbahnhof', h: 39, len: 140 };
});
