/* Welfenschloss (Hauptgebäude der Leibniz Universität Hannover) – Modul v2, Fotos: ref/welfenschloss/ (Wikimedia, siehe quellen.txt)
   Welfengarten-Front (Südseite) = lokale +y. Koordinaten: OSM-Umriss um (cx,cy) verschoben: X = x+120, Y = y+47 (Gesamtmaß 230 × 91 m).
   Aufbau von links nach rechts (Ansicht vom Welfengarten): Westflügel · Westbau mit Portal (drei Bögen, Löwen) und Quadratturm · Mittelbau mit Arkaden-Attika ·
   Rundturm mit Spitzhelm · niedriger Flügel mit sechs großen Bogenfenstern · Ostbau mit Giebel. Sandstein, Zinnenkränze, Neugotik/Neurenaissance (Conrad Wilhelm Hase, 1857–1866).
   v2: flache Schieferdächer hinter dem Zinnenkranz (ohne Fächer-Nähte), Rustika-Sockel, Fensterverdachungen + Sohlbänke, Gurtgesimse, Eckquader,
   vorspringendes Portal mit Balustrade und zwei Löwen, Arkadenfries, Rundturm mit Gurten und Zinnenkranz, hoher Giebel mit Rundfenster, zwei Bäume vor der Front (keine Bodenplatte: auf der Karte liegt das Schloss im Park). */
(() => {
  const Z0 = 1;
  ISO.landmark('welfenschloss', H => {
    const { f2, hl, vl, arch, winA, winR, wins, lathe, gable } = H, M = [], add = m => (M.push(m), m);

    // Flaches Schieferdach hinter dem Zinnenkranz: Plateau mit vier flachen Schrägen, nur waagerechte Schiefernähte (kein Fächer)
    const roof = (K, x0, y0, x1, y1, ze, rise, ins) => {
      ins = Math.min(ins, (x1 - x0) / 2 - .5, (y1 - y0) / 2 - .5);
      const zr = ze + rise, a = [x0 + ins, y0 + ins, zr], b = [x1 - ins, y0 + ins, zr], c = [x1 - ins, y1 - ins, zr], d = [x0 + ins, y1 - ins, zr];
      const o = [[x0, y0, ze], [x1, y0, ze], [x1, y1, ze], [x0, y1, ze]], inn = [a, b, c, d];
      const lerp = (u, v, t) => u.map((q, j) => q + (v[j] - q) * t);
      let s = '';
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4, p = [o[i], o[j], inn[j], inn[i]];
        let seams = '';
        for (let k = 1; k < 3; k++) seams += `<path class="dt sl-d" d="${K.path([lerp(p[0], p[3], k / 3), lerp(p[1], p[2], k / 3)])}"/>`;
        s += K.face(p, 'sl', seams);
      }
      return s + K.face(inn, 'sl');
    };

    // ACHTUNG Wanddeko: y läuft von der Oberkante der Wand nach UNTEN (0 = Zinnenkranz, h = Fuß).
    // Zinnenkranz: dunkle Scharten im Brüstungsband unter der Oberkante
    const cren = len => { let s = ''; for (let u = .4; u < len - 1; u += 2.4) s += `<rect class="sl" x="${f2(u)}" y=".25" width="1.2" height=".85"/>`; return s; };
    // Rustika-Sockel: Quaderfugen im untersten Band (Höhe 2,6)
    const plinth = (len, h, ph = 2.6) => {
      const t = h - ph, k = ph / 3; let q = hl(0, len, t) + hl(0, len, t + k) + hl(0, len, t + 2 * k);
      for (let u = .9; u < len; u += 2.1) q += vl(u, t, t + k) + vl(u + 1.05, t + k, t + 2 * k) + vl(u, t + 2 * k, h);
      return q;
    };
    // Fensterverdachung (Bogenrahmen) + Sohlbank
    const hood = (x, y, w, h) => `<path class="dt" d="${arch(x - .4, y - .4, w + .8, h + .4)}"/><path class="dt" d="M${f2(x - .5)} ${f2(y + h + .3)}H${f2(x + w + .5)}"/>`;
    const winH = (x, y, w, h, f, cls = '') => hood(x, y, w, h) + winA(x, y, w, h, f, cls);
    const quoins = (len, h) => { let q = ''; for (let v = 3; v < h - 1.2; v += 2) q += `<path class="dt" d="M0 ${f2(v)}h1.5M${f2(len - 1.5)} ${f2(v + 1)}h1.5"/>`; return q; };

    // Geschossfassade: Reihen Bogenfenster mit Gesimsen, Sockel, Eckquadern; step = Achsabstand
    const bays = (rows, step, ww, wh, ph = 2.6) => (len, h) => {
      let q = plinth(len, h, ph) + hl(0, len, 1.5) + cren(len) + quoins(len, h), w = '';
      const n = Math.floor((len - 2) / step), off = (len - n * step) / 2 + step / 2;
      rows.forEach(([v, fl, cls]) => { q += hl(0, len, v - .6); for (let i = 0; i < n; i++) w += winH(off + i * step - ww / 2, v, ww, wh, fl, cls || ''); });
      return q + wins(w);
    };
    const plain = (len, h) => plinth(len, h) + hl(0, len, 1.5) + cren(len) + quoins(len, h);

    // --- Westflügel (niedriger, Schieferdach) ---
    add({ id: 'wsW', fp: [0, 0, 73, 38], draw: K => K.box(0, 0, Z0, 73, 38, 14, 'pl', { S: bays([[2.8, 1], [7.2, 0]], 4.6, 1.8, 3.4), E: plain, W: plain, N: plain }) + roof(K, 0, 0, 73, 38, Z0 + 14, 3, 7) });

    // --- Westbau (links vom Portal bis zum Quadratturm) ---
    add({ id: 'wsM1', fp: [73, 37, 123, 91], draw: K => {
      const f = (len, h) => {
        let q = plinth(len, h) + hl(0, len, 1.5) + hl(0, len, 6.4) + hl(0, len, 12) + cren(len) + quoins(len, h), w = '';
        for (let i = 0; i < 4; i++) { const u = 3 + i * 4.8; w += winH(u, 2.6, 1.9, 3, 2) + winH(u, 7.4, 1.9, 4, 1) + winH(u, 12.8, 1.9, 3.4, 0); }       // linker Teil: drei Reihen
        // Portalachse: drei Bögen liegen im vorspringenden Portal (wsPortal, unten); darüber zwei Fensterreihen
        for (let i = 0; i < 3; i++) { const u = 28 + i * 6.6; w += winH(u - .9, 2.6, 1.8, 3, 2) + winH(u - .9, 7.4, 1.8, 4, 1); }
        return q + wins(w);
      };
      return K.box(73, 37, Z0, 50, 54, 19, 'pl', { S: f, E: plain, W: plain, N: plain }) + roof(K, 73, 37, 123, 91, Z0 + 19, 3.4, 9);
    } });

    // --- vorspringendes Hauptportal: drei hohe Bögen, Balustrade, zwei Löwen auf Sockeln ---
    add({ id: 'wsPortal', fp: [95, 91, 117, 94.6], parent: 'wsM1', side: 'S', draw: K => {
      const f = (len, h) => {
        let q = hl(0, len, 1.5) + hl(0, len, .2), w = '';
        [3.7, 11, 18.3].forEach(u => { w += hood(u - 2, 2.8, 4, h - 2.8) + winA(u - 2, 2.8, 4, h - 2.8, 0, ' dim'); });
        [7.35, 14.65].forEach(u => { q += `<rect class="st fr" x="${f2(u - .5)}" y="2.8" width="1" height="${f2(h - 2.8)}"/>`; });
        let bd = ''; for (let u = .6; u < len; u += .8) bd += `M${f2(u)} .2v1.3`;                                                          // Balustrade
        q += `<path class="dt" d="${bd}"/>`;
        return q + wins(w);
      };
      let s = K.box(95, 91, Z0, 22, 3.6, 8.4, 'pl', { S: f, E: plain, W: plain });
      // Löwen (Sockel, Körper, Kopf) vor den Pfeilern
      [[98.6, 96], [113.2, 96]].forEach(([x, y]) => {
        s += K.box(x - 1.3, y - .6, Z0, 2.6, 2.4, 1.8, 'pl') + K.box(x - .9, y - .2, Z0 + 1.8, 1.8, 1.6, 1.1, 'pl') + K.box(x - .5, y + .6, Z0 + 2.4, .9, .8, .9, 'pl');
      });
      return s;
    } });

    // --- Quadratturm (Zinnenkranz, vier Ecktürmchen) ---
    add({ id: 'wsTower', fp: [101, 64, 113, 76], parent: 'wsM1', side: 'S', draw: K => {
      const f = (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 9.8) + hl(0, len, 15.4) + hl(0, len, 21) + cren(len) + quoins(len, h);
        let w = winH(len / 2 - .9, 17.2, 1.8, 3.2, 1) + winH(len / 2 - .9, 11.4, 1.8, 3.4, 2);
        w += winH(len / 2 - 2.6, 2.4, 1.7, 6.4, 3) + winH(len / 2 + .9, 2.4, 1.7, 6.4, 3);    // Glockenstube: zwei hohe Bögen
        return q + wins(w);
      };
      let s = K.box(101, 64, Z0 + 19, 12, 12, 24, 'pl', { S: f, E: f, W: f, N: f });
      s += K.box(100.4, 63.4, Z0 + 41.6, 13.2, 13.2, 2, 'pl', { S: (l, h) => cren(l) + hl(0, l, .3), E: (l, h) => cren(l) + hl(0, l, .3) });
      [[100.4, 63.4], [111.8, 63.4], [100.4, 74.8], [111.8, 74.8]].forEach(([x, y]) => { s += K.box(x, y, Z0 + 43.4, 1.8, 1.8, 2.4, 'pl') + lathe(K, x + .9, y + .9, [[Z0 + 45.8, 1.1], [Z0 + 47.4, .3]], 'sl', 4); });
      return s;
    } });

    // --- Mittelbau mit Arkaden-Attika ---
    add({ id: 'wsM2', fp: [123, 37, 150, 91], draw: K => {
      const f = (len, h) => {
        let q = plinth(len, h) + hl(0, len, 1.2) + hl(0, len, 4.6) + hl(0, len, 10.2) + hl(0, len, 15.6) + cren(len) + quoins(len, h), w = '';
        const n = Math.floor((len - 2) / 4.8), off = (len - n * 4.8) / 2 + 2.4;
        for (let i = 0; i < n; i++) { const u = off + i * 4.8 - .95; w += winH(u, 6.2, 1.9, 3.4, 2) + winH(u, 11.4, 1.9, 3.6, 1) + winH(u, 16.6, 1.9, 3.2, 0); }
        const m = Math.floor((len - 2) / 2.2);                                                  // Arkadenfries der Attika (oben)
        for (let i = 0; i < m; i++) w += winA(1.5 + i * 2.2, 1.9, 1, 2.2, 3, ' dim');
        for (let i = 0; i <= m; i++) q += vl(1.1 + i * 2.2, 1.2, 4.6);
        return q + wins(w);
      };
      return K.box(123, 37, Z0, 27, 54, 23, 'pl', { S: f, E: plain, N: plain }) + roof(K, 123, 37, 150, 91, Z0 + 23, 3, 7);
    } });

    // --- Rundturm mit Spitzhelm ---
    add({ id: 'wsRound', fp: [161, 57, 171, 67], parent: 'wsLow', side: 'S', draw: K => {
      let s = lathe(K, 166, 62, [[Z0 + 11, 5], [Z0 + 38, 5]], 'pl fr', 0, [0, 1]);
      // Gurte und Konsolband als Linien nur auf der sichtbaren Halbseite (Füllung würde die Fenster überdecken)
      const ring = (z, r) => { let d = '', on = false; for (let i = 0; i <= 72; i++) { const a = i / 72 * 2 * Math.PI; if (K.facing(Math.cos(a), Math.sin(a)) > 0) { const q = K.P(166 + r * Math.cos(a), 62 + r * Math.sin(a), Z0 + z); d += (on ? 'L' : 'M') + f2(q[0]) + ' ' + f2(q[1]); on = true; } else on = false; } return `<path class="dt" d="${d}"/>`; };
      [12.5, 14, 20, 26, 36.4, 37.2].forEach(z => { s += ring(z, 5.06); });
      [[18, 0], [23, 1], [29, 2], [33, 3]].forEach(([z, f]) => { [.5, 1.05, 1.6].forEach(a => { const p = K.P(166 + 5.05 * Math.cos(a), 62 + 5.05 * Math.sin(a), Z0 + z); s += `<rect class="wn" data-f="${f}" x="${f2(p[0] - .45)}" y="${f2(p[1] - 1.3)}" width=".9" height="2.6"/>`; }); });
      s += lathe(K, 166, 62, [[Z0 + 38, 5.6], [Z0 + 39.4, 5.6]], 'pl', 0);                                                         // Zinnenring
      s += lathe(K, 166, 62, [[Z0 + 39.4, 5.7], [Z0 + 41, 5.7], [Z0 + 46, 2.4], [Z0 + 52, .5], [Z0 + 56, .15]], 'sl', 8);
      return s;
    } });

    // --- niedriger Flügel mit sechs großen Bogenfenstern (Welfengarten-Seite) ---
    add({ id: 'wsLow', fp: [150, 62, 192, 91], draw: K => K.box(150, 62, Z0, 42, 29, 11, 'pl', { S: bays([[2.4, 1]], 6.2, 3.2, 6.4, 1.2), E: plain, N: plain }) + roof(K, 150, 62, 192, 91, Z0 + 11, 2.2, 5.5) });

    // --- Ostbau mit hohem Giebel und Rundfenster ---
    add({ id: 'wsE', fp: [192, 44, 222, 91], draw: K => {
      const f = (len, h) => {
        let q = plinth(len, h) + hl(0, len, 1.5) + hl(0, len, 8.2) + hl(0, len, 13.6) + cren(len) + quoins(len, h), w = '';
        [3.6, 8.4].forEach(u => { w += winH(u, 3.2, 1.9, 3.6, 2) + winH(u, 9.4, 1.9, 3.6, 1) + winH(u, 14.6, 1.9, 3.2, 0); });
        w += winH(len / 2 - 2, 8.6, 4, 9, 1, ' hi');
        [len - 8.4 - 1.9, len - 3.6 - 1.9].forEach(u => { w += winH(u, 3.2, 1.9, 3.6, 2) + winH(u, 9.4, 1.9, 3.6, 1) + winH(u, 14.6, 1.9, 3.2, 0); });
        return q + wins(w);
      };
      const g = len => `<path class="pl fr" d="M${f2(len * .12)} 0L${f2(len / 2)} -7.4L${f2(len * .88)} 0Z"/><path class="dt" d="M${f2(len * .16)} -.4L${f2(len / 2)} -7L${f2(len * .84)} -.4"/>`
        + `<circle class="wn dim" data-f="3" cx="${f2(len / 2)}" cy="-3" r="1.3"/><path class="mul" d="M${f2(len / 2 - 1.3)} -3h2.6M${f2(len / 2)} -4.3v2.6"/>`
        + `<circle class="st fr" cx="${f2(len / 2)}" cy="-7.7" r=".45"/>`;
      return K.box(192, 44, Z0, 30, 47, 21, 'pl', { S: f, E: plain, N: plain }) + roof(K, 192, 44, 222, 91, Z0 + 21, 3.2, 7.5)
        + K.wall([192, 91], [222, 91], Z0 + 21, Z0 + 21.01, 'pl', g);
    } });

    // --- Bäume im Welfengarten (vor der Südfront) ---
    const tree = (x, y, r) => add({ id: 'tree' + x, fp: [x - r, y - r, x + r, y + r], draw: K => {
      const c = K.P(x, y, Z0 + r * 2.1), t = K.P(x, y, Z0);
      return `<path class="dt" d="M${f2(t[0])} ${f2(t[1])}L${f2(c[0])} ${f2(c[1] + r)}"/><ellipse class="tree" cx="${f2(c[0])}" cy="${f2(c[1])}" rx="${f2(r * 1.2)}" ry="${f2(r * 1.05)}"/>`;
    } });
    [[40, 96, 3.4], [78, 96.5, 3.2]].forEach(([x, y, r]) => tree(x, y, r));

    return { mods: M, lc: [115, 46], z0: 0, top: [107, 61, 46], label: 'Welfenschloss', h: 56, len: 230 };
  });
})();
