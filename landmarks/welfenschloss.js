/* Welfenschloss (Hauptgebäude der Leibniz Universität Hannover) – Modul, Fotos: ref/welfenschloss/ (Wikimedia, siehe quellen.txt)
   Welfengarten-Front (Südseite) = lokale +y. Koordinaten: OSM-Umriss um (cx,cy) verschoben: X = x+120, Y = y+47 (Gesamtmaß 230 × 91 m).
   Aufbau von links nach rechts (Ansicht vom Welfengarten): Westflügel · Westbau mit Portal (drei Bögen, Löwen) und Quadratturm · Mittelbau mit Arkaden-Attika ·
   Rundturm mit Spitzhelm · niedriger Flügel mit sechs großen Bogenfenstern · Ostbau mit Giebel. Sandstein, Zinnenkränze, Neugotik/Neurenaissance (Conrad Wilhelm Hase, 1857–1866). */
(() => {
  const Z0 = 1;
  ISO.landmark('welfenschloss', H => {
    const { f2, hl, vl, winA, winR, wins, hip, saddle, lathe, gable } = H, M = [], add = m => (M.push(m), m);
    // Zinnenkranz: dunkle Scharten im Brüstungsband unter der Oberkante
    const cren = len => { let s = ''; for (let u = .4; u < len - 1; u += 2.4) s += `<rect class="sl" x="${f2(u)}" y=".25" width="1.2" height=".85"/>`; return s; };
    // Geschossfassade: n Reihen Bogenfenster mit Gesimsen; step = Achsabstand
    const bays = (rows, step, ww, wh, y0) => (len, h) => {
      let q = hl(0, len, .5) + hl(0, len, h - 1.2) + cren(len), w = '';
      const n = Math.floor((len - 2) / step), off = (len - n * step) / 2 + step / 2;
      rows.forEach(([v, fl, cls]) => { q += hl(0, len, v - .4); for (let i = 0; i < n; i++) w += winA(off + i * step - ww / 2, v, ww, wh, fl, cls || ''); });
      return q + wins(w);
    };
    const plain = (len, h) => hl(0, len, .5) + hl(0, len, h - 1.2) + cren(len);
    // --- Westflügel (niedriger, Schieferdach) ---
    add({ id: 'wsW', fp: [0, 0, 73, 38], draw: K => K.box(0, 0, Z0, 73, 38, 14, 'pl', { S: bays([[2, 1], [7.4, 0]], 4.6, 1.8, 3.6), E: plain, W: plain, N: plain }) + hip(K, 0, 0, 73, 38, Z0 + 14, Z0 + 15.4, 'sl') });
    // --- Westbau (links vom Portal bis zum Quadratturm) mit Hauptportal ---
    add({ id: 'wsM1', fp: [73, 37, 123, 91], draw: K => {
      const f = (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 6.4) + hl(0, len, 13.2) + hl(0, len, h - 1.2) + cren(len), w = '';
        for (let i = 0; i < 4; i++) { const u = 3 + i * 4.8; w += winA(u, 7.4, 1.9, 4.6, 1) + winA(u, 14, 1.9, 3.2, 0); }       // linker Teil: zwei Reihen
        // Portal: drei hohe Bögen, davor Löwen auf Sockeln
        [26, 32.5, 39].forEach(u => { w += winA(u - 2.4, 1, 4.8, 5.4, 2, ' dim'); q += `<rect class="st fr" x="${f2(u - 3.4)}" y="0" width="1" height="6.6"/>`; });
        for (let i = 0; i < 3; i++) { const u = 28 + i * 6.6; w += winA(u - .9, 7.4, 1.8, 4.6, 1); }
        return q + wins(w);
      };
      return K.box(73, 37, Z0, 50, 54, 19, 'pl', { S: f, E: plain, W: plain, N: plain }) + hip(K, 73, 37, 123, 91, Z0 + 19, Z0 + 19.9, 'sl');
    } });
    // --- Quadratturm (Zinnenkranz, vier Ecktürmchen) ---
    add({ id: 'wsTower', fp: [101, 64, 113, 76], parent: 'wsM1', side: 'S', draw: K => {
      const f = (len, h) => hl(0, len, .5) + hl(0, len, 8) + hl(0, len, 18) + hl(0, len, 26) + hl(0, len, h - 3.4) + cren(len) + wins(winA(len / 2 - .9, 28, 1.8, 6.6, 3) + winA(len / 2 - .9, 12, 1.8, 3.4, 2) + winA(len / 2 - .9, 3, 1.8, 3.4, 1));
      let s = K.box(101, 64, Z0 + 19, 12, 12, 24, 'pl', { S: f, E: f, W: f, N: f });
      s += K.box(100.4, 63.4, Z0 + 41.6, 13.2, 13.2, 2, 'pl', { S: (l, h) => cren(l), E: (l, h) => cren(l) });
      [[100.4, 63.4], [111.8, 63.4], [100.4, 74.8], [111.8, 74.8]].forEach(([x, y]) => { s += K.box(x, y, Z0 + 43.4, 1.8, 1.8, 2.4, 'pl') + lathe(K, x + .9, y + .9, [[Z0 + 45.8, 1.1], [Z0 + 47.4, .3]], 'sl', 4); });
      return s;
    } });
    // --- Mittelbau mit Arkaden-Attika ---
    add({ id: 'wsM2', fp: [123, 37, 150, 91], draw: K => K.box(123, 37, Z0, 27, 54, 23, 'pl', { S: (len, h) => bays([[2.2, 1], [8.8, 1], [15.4, 0]], 4.8, 1.8, 4)(len, h) + wins(Array.from({ length: Math.floor((len - 2) / 2.2) }, (_, i) => winA(1.6 + i * 2.2, h - 4.4, 1, 1.8, 2, '')).join('')), E: plain, N: plain }) + hip(K, 123, 37, 150, 91, Z0 + 23, Z0 + 23.9, 'sl') });
    // --- Rundturm mit Spitzhelm ---
    add({ id: 'wsRound', fp: [161, 57, 171, 67], parent: 'wsLow', side: 'S', draw: K => {
      let s = lathe(K, 166, 62, [[Z0 + 11, 5], [Z0 + 38, 5]], 'pl fr', 0, [0, 1]);
      [[24, 0], [30, 1], [34, 2]].forEach(([z, f]) => { const a = .9; const p = K.P(166 + 5.05 * Math.cos(a), 62 + 5.05 * Math.sin(a), Z0 + z); s += `<rect class="wn dim" data-f="${f}" x="${f2(p[0] - .5)}" y="${f2(p[1] - 1.4)}" width="1" height="2.8"/>`; });
      s += lathe(K, 166, 62, [[Z0 + 38, 5.5], [Z0 + 39.2, 5.5]], 'pl', 0);
      s += lathe(K, 166, 62, [[Z0 + 39.2, 5.7], [Z0 + 41, 5.7], [Z0 + 46, 2.4], [Z0 + 52, .5], [Z0 + 56, .15]], 'sl', 8);
      return s;
    } });
    // --- niedriger Flügel mit sechs großen Bogenfenstern (Welfengarten-Seite) ---
    add({ id: 'wsLow', fp: [150, 62, 192, 91], draw: K => K.box(150, 62, Z0, 42, 29, 11, 'pl', { S: bays([[2.2, 1]], 6.2, 3.2, 6.2), E: plain, N: plain }) + hip(K, 150, 62, 192, 91, Z0 + 11, Z0 + 11.9, 'sl') });
    // --- Ostbau mit Giebel ---
    add({ id: 'wsE', fp: [192, 44, 222, 91], draw: K => {
      const f = (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 6.6) + hl(0, len, 13.4) + hl(0, len, h - 1.2) + cren(len), w = '';
        [3.6, 8.4].forEach(u => { w += winA(u, 2.2, 1.9, 3.6, 1) + winA(u, 8, 1.9, 4, 0); });
        w += winA(len / 2 - 2, 7.8, 4, 8.6, 2, ' hi');
        [len - 8.4 - 1.9, len - 3.6 - 1.9].forEach(u => { w += winA(u, 2.2, 1.9, 3.6, 1) + winA(u, 8, 1.9, 4, 0); });
        return q + wins(w);
      };
      return K.box(192, 44, Z0, 30, 47, 21, 'pl', { S: f, E: plain, N: plain }) + hip(K, 192, 44, 222, 91, Z0 + 21, Z0 + 22.2, 'sl')
        + K.wall([192, 91], [222, 91], Z0 + 21, Z0 + 21.01, 'pl', len => `<path class="pl fr" d="M${f2(len * .3)} 0L${f2(len / 2)} -5L${f2(len * .7)} 0Z"/>`);
    } });
    return { mods: M, lc: [115, 46], z0: 0, top: [107, 61, 46], label: 'Welfenschloss', h: 56, len: 230 };
  });
})();
