/* Niedersächsisches Landesmuseum (Hubert Stier, 1897–1902) – Modul v3 (nach Google-Earth-Kadern ref/landesmuseum/foto/: Glasoberlichter statt Schieferwalm, Rotunde im Hof, Kupfer-Gauben), Fotos: ref/landesmuseum/ (Wikimedia, siehe quellen.txt)
   Lokales System = Mindestrechteck des OSM-Umrisses (r364529), 83 × 66 m: lokal +y = Hauptfassade zur Willy-Brandt-Allee, +x nach rechts im Frontfoto.
   Grundriss (OSM): Vierflügelanlage um einen Hof – Frontflügel (rechts/links vom Mittelrisalit), zwei Seitenflügel, Rückflügel; Eckpavillons mit Segmentgiebel
   und geschweiften Dächern; Mittelrisalit (nur ≈ 3 m vorgezogen) mit drei hohen Bogenfenstern und Walmdach; Sockel mit Rustika, Bogenfenster zwischen Pilastern,
   Reliefband, Balustrade mit Vasen. Sandstein. Alle Bauteile haben getrennte Grundrisse (keine Überlappung → keine Sortierfehler). */
(() => {
  const Z0 = 1;
  ISO.landmark('landesmuseum', H => {
    const { f2, hl, vl, winA, winR, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const HW = 15.5, HP = 20.5, HR = 23.6;          // Traufe Flügel / Pavillons / Risalit

    // ---------- Fassadenhilfen (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ----------
    // Balustrade mit Docken und Vasen über dem Kranzgesims
    const balustrade = (len, vases = 4.6) => {
      let s = hl(0, len, 1.0) + hl(0, len, 1.5) + hl(0, len, 2.0);
      for (let u = .5; u < len - .2; u += .8) s += vl(u, 1.0, 1.5);
      for (let u = 2.2; u < len - 1; u += vases) s += `<path class="dt" d="M${f2(u - .5)} 0V-.5L${f2(u - .3)} -1.1H${f2(u + .3)}L${f2(u + .5)} -.5V0"/>`;
      return s;
    };
    // Rustika-Sockel mit kleinen Kellerfenstern
    const plinth = (len, h, top, step = 4.6, f = 0) => {
      let s = hl(0, len, top), w = '';
      for (let v = top + 1.1; v < h - .4; v += 1.1) s += hl(0, len, v);
      for (let u = step / 2; u < len - step / 3; u += step) w += winR(u - .6, top + 1.7, 1.2, 1.5, f);
      return s + wins(w);
    };
    // Flügelfassade: Reliefband, Bogenfenster zwischen Pilastern, Sockel
    const wingS = (step = 4.6, lead = 0) => (len, h) => {
      let q = balustrade(len) + hl(0, len, 2.3) + hl(0, len, 4.3), w = '';
      const n = Math.max(1, Math.floor((len - 1.6) / step)), x0 = (len - (n - 1) * step) / 2;
      for (let i = 0; i < n; i++) {
        const u = x0 + i * step;
        w += winA(u - 1.2, 5.4, 2.4, 5.2, 1);
        q += `<path class="dt" d="M${f2(u - 1.5)} 2.7h3V4.0h-3Z"/>` + hl(u - 1.6, u + 1.6, 5.1);                  // Reliefplatte über dem Fenster
        if (i < n - 1) q += vl(u + step / 2, 2.3, 11.2);                                                           // Pilaster
      }
      q += vl(.5, 2.3, 11.2) + vl(len - .5, 2.3, 11.2) + hl(0, len, 11.2);
      return q + wins(w) + plinth(len, h, 11.7, step);
    };
    // Seiten und Rückseite (ruhiger): Bogenfenster in zwei Geschossen
    const plain = (len, h, step = 4.6) => {
      let q = balustrade(len, 5.6) + hl(0, len, 2.3), w = '';
      const n = Math.max(1, Math.floor((len - 1.6) / step)), x0 = (len - (n - 1) * step) / 2;
      for (let i = 0; i < n; i++) w += winA(x0 + i * step - 1.1, 3.6, 2.2, 5.0, 1);
      return q + hl(0, len, 9.4) + wins(w) + plinth(len, h, h - 5.6, step);
    };
    // Dächer: waagerechte Schieferreihen
    const courses = (K, p, mat, step) => {
      const dc = mat === 'tl' ? 'dt tl-d' : mat === 'cu' ? 'dt cu-d' : 'dt sl-d', iL = p.length === 4 ? 3 : 2, n = Math.max(2, Math.round(Math.hypot(p[iL][0] - p[0][0], p[iL][1] - p[0][1]) / step));
      let s = '';
      for (let i = 1; i < n; i++) { const t = i / n, A = p[0].map((q, j) => q + (p[iL][j] - q) * t), B = p[1].map((q, j) => q + (p[2][j] - q) * t); s += `<path class="${dc}" d="${K.path([A, B])}"/>`; }
      return K.face(p, mat, s);
    };
    const hipC = (K, x0, y0, x1, y1, ze, zr, mat = 'sl', step = 2) => {
      const w = x1 - x0, d = y1 - y0, alongX = w >= d, h = Math.min(w, d) / 2; let a, b;
      if (alongX) { const ym = (y0 + y1) / 2; a = [x0 + h, ym, zr]; b = [x1 - h, ym, zr]; } else { const xm = (x0 + x1) / 2; a = [xm, y0 + h, zr]; b = [xm, y1 - h, zr]; }
      const c00 = [x0, y0, ze], c10 = [x1, y0, ze], c11 = [x1, y1, ze], c01 = [x0, y1, ze];
      const pl = alongX ? [[c00, c10, b, a], [c10, c11, b], [c11, c01, a, b], [c01, c00, a]] : [[c00, c10, a], [c10, c11, b, a], [c11, c01, b], [c01, c00, a, b]];
      return pl.map(p => courses(K, p, mat, step)).join('');
    };
    // geschweiftes Pavillondach: steiler Fuß (Mansarde) + flache Haube
    const bell = (K, x0, y0, x1, y1, ze, zm, zt, ins) => {
      const a = [x0 + ins, y0 + ins], b = [x1 - ins, y1 - ins];
      const P = (x, y, z) => [x, y, z];
      const lo = [[P(x0, y0, ze), P(x1, y0, ze), P(b[0], a[1], zm), P(a[0], a[1], zm)], [P(x1, y0, ze), P(x1, y1, ze), P(b[0], b[1], zm), P(b[0], a[1], zm)],
        [P(x1, y1, ze), P(x0, y1, ze), P(a[0], b[1], zm), P(b[0], b[1], zm)], [P(x0, y1, ze), P(x0, y0, ze), P(a[0], a[1], zm), P(a[0], b[1], zm)]];
      return lo.map(p => courses(K, p, 'sl', 1.4)).join('') + hipC(K, a[0], a[1], b[0], b[1], zm, zt, 'sl', 1.6);
    };
    // flache Schieferdächer der Flügel (hinter der Balustrade nur leicht geneigt)
    const flat = (K, x0, y0, x1, y1, z) => K.face([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], 'sl');
    const saddleX = (K, x0, y0, x1, y1, ze, zr) => { const ym = (y0 + y1) / 2; return courses(K, [[x0, y1, ze], [x1, y1, ze], [x1, ym, zr], [x0, ym, zr]], 'sl', 2) + courses(K, [[x1, y0, ze], [x0, y0, ze], [x0, ym, zr], [x1, ym, zr]], 'sl', 2) + K.face([[x1, y1, ze], [x1, y0, ze], [x1, ym, zr]], 'pl') + K.face([[x0, y0, ze], [x0, y1, ze], [x0, ym, zr]], 'pl'); };
    const saddleY = (K, x0, y0, x1, y1, ze, zr) => { const xm = (x0 + x1) / 2; return courses(K, [[x1, y1, ze], [x1, y0, ze], [xm, y0, zr], [xm, y1, zr]], 'sl', 2) + courses(K, [[x0, y0, ze], [x0, y1, ze], [xm, y1, zr], [xm, y0, zr]], 'sl', 2) + K.face([[x0, y1, ze], [x1, y1, ze], [xm, y1, zr]], 'pl') + K.face([[x1, y0, ze], [x0, y0, ze], [xm, y0, zr]], 'pl'); };
    // v3: Flügeldächer = flache Dachterrasse (hinter der Balustrade) + Glasoberlicht (Kader: weiße Glasbänder), nicht Schiefer-Walm
    const deck = (K, x0, y0, x1, y1) => K.face([[x0, y0, Z0 + HW], [x1, y0, Z0 + HW], [x1, y1, Z0 + HW], [x0, y1, Z0 + HW]], 'st tp');
    const sky = (K, x0, y0, x1, y1, h = 2.8) => hipC(K, x0, y0, x1, y1, Z0 + HW, Z0 + HW + h, 'pl tp', 1.6);
    // kleine grüne Kupfer-Gauben auf den Pavillondächern
    const dormer = (K, x, y, z) => lathe(K, x, y, [[z, .95], [z + .5, .95], [z + 1.1, .6], [z + 1.45, .1]], 'cu', 0);
    // Segmentgiebel mit Rundfenster auf der Front des Pavillons (wird nach dem Dach gezeichnet, steht davor)
    const gablePed = (K, x) => K.g(K.plane([x, 64.8, Z0 + HP], [1, 0, 0], [0, 0, -1]),
      `<path class="pl fr" d="M${f2(12 * .12)} 0Q6 -5.4 ${f2(12 * .88)} 0Z"/><path class="dt" d="M${f2(12 * .17)} 0Q6 -4.3 ${f2(12 * .83)} 0"/><circle class="dt" cx="6" cy="-1.5" r=".8"/><circle class="wn dim" data-f="2" cx="6" cy="-1.5" r=".55"/>`);
    // Vase/Docke auf Ecken
    const urn = (K, x, y, z) => K.box(x - .45, y - .45, z, .9, .9, .5, 'pl') + lathe(K, x, y, [[z + .5, .55], [z + 1.5, .65], [z + 2.1, .3], [z + 2.6, .1]], 'pl fr', 0);

    // ---------- Hof (dunkel; Flügel und Risalit überdecken den Rest) ----------
    const ground = K => {
      const q = (x0, y0, x1, y1) => K.poly([[x0, y0, Z0], [x1, y0, Z0], [x1, y1, Z0], [x0, y1, Z0]], 'court');
      return q(18, 19.2, 59, 34.3) + q(18, 34.3, 31, 46.4) + q(50.8, 34.3, 59, 46.4);
    };

    // ======== FLÜGEL (OSM-Grundriss, jeder Block eigener Grundriss) ========
    const sides = { S: plain, E: plain, N: plain, W: plain };
    // Frontflügel links/rechts vom Risalit: Reliefband und Bogenfenster in Pilastern
    add({ id: 'fL', fp: [12, 46.4, 31, 63.4], draw: K => K.box(12, 46.4, Z0, 19, 17, HW, 'pl', { S: wingS(4.6), E: plain, N: plain, W: plain }) + deck(K, 12, 46.4, 31, 63.4) + sky(K, 14, 50.4, 29, 59.4) });
    add({ id: 'fR', fp: [50.8, 46.4, 71, 63.4], draw: K => K.box(50.8, 46.4, Z0, 20.2, 17, HW, 'pl', { S: wingS(4.6), E: plain, N: plain, W: plain }) + deck(K, 50.8, 46.4, 71, 63.4) + sky(K, 52.8, 50.4, 68.8, 59.4) });
    // Seitenflügel und Rückflügel
    add({ id: 'sW', fp: [0, 0, 18, 46.4], draw: K => K.box(0, 0, Z0, 18, 46.4, HW, 'pl', sides) + deck(K, 0, 0, 18, 46.4) + sky(K, 4, 3, 14, 21) + sky(K, 4, 25, 14, 43) });
    add({ id: 'sE', fp: [59, 0, 83, 46.4], draw: K => K.box(59, 0, Z0, 24, 46.4, HW, 'pl', sides) + deck(K, 59, 0, 83, 46.4) + sky(K, 64, 3, 78, 21) + sky(K, 64, 25, 78, 43) });
    add({ id: 'rear', fp: [18, 0, 59, 19.2], draw: K => K.box(18, 0, Z0, 41, 19.2, HW, 'pl', sides) + deck(K, 18, 0, 59, 19.2) + sky(K, 22, 4, 34, 15.2) + sky(K, 43, 4, 55, 15.2)
      + hipC(K, 34.5, 3, 42.5, 16.2, Z0 + HW, Z0 + HW + 2.2, 'sl', 2) + hipC(K, 36, 6, 41, 13, Z0 + HW + 2.2, Z0 + HW + 4.2, 'pl tp', 1.6) });

    // ======== MITTELRISALIT: drei hohe Bogenfenster zwischen Säulen, Walmdach, Vasen ========
    add({ id: 'ris', fp: [31, 34.3, 50.8, 64.8], draw: K => {
      const f = (len, h) => {
        let q = balustrade(len, 3.6) + hl(0, len, 2.4) + hl(0, len, 3.9) + hl(0, len, 4.1), w = '';
        const c = len / 2;
        [-4.9, 0, 4.9].forEach(d => { w += winA(c + d - 1.7, 4.8, 3.4, 7.8, 2, ' hi'); q += `<path class="dt" d="M${f2(c + d - 2.4)} 4.1h4.8"/>`; });
        [-7.35, -2.45, 2.45, 7.35].forEach(d => { q += vl(c + d - .25, 4.1, 12.9) + vl(c + d + .25, 4.1, 12.9); });   // gekuppelte Säulen
        q += hl(0, len, 12.9) + hl(0, len, 13.3) + vl(1.0, 2.4, h - 1) + vl(len - 1.0, 2.4, h - 1);
        [-4.9, 4.9].forEach(d => { w += winA(c + d - 1.3, 14.4, 2.6, 5.4, 1); });
        return q + wins(w) + plinth(len, h, 14.2, 4.9);
      };
      return K.box(31, 34.3, Z0, 19.8, 30.5, HR, 'pl', { S: f, E: plain, N: plain, W: plain }) + hipC(K, 31, 34.3, 50.8, 64.8, Z0 + HR, Z0 + HR + 3.6, 'sl', 2)
        + urn(K, 31.8, 63.9, Z0 + HR) + urn(K, 50.0, 63.9, Z0 + HR);
    } });
    // ======== ROTUNDE im Hof (hinter dem Mittelrisalit): Trommel mit Fensterreihen + flache Kupferkuppel ========
    add({ id: 'rot', fp: [35.2, 27.6, 46.6, 34.3], draw: K => {
      const cx = 40.9, cy = 33.0, R = 5.6, z0 = Z0, zt = Z0 + 16.5;
      let q = lathe(K, cx, cy, [[z0, R], [zt, R], [zt + .5, R + .45], [zt + 1.0, R + .45]], 'pl', 0, [1]);
      let w = '';
      for (let k = 0; k < 14; k++) {
        const a = Math.PI * (.08 + .84 * k / 13) + Math.PI * 0;     // nur die zum Hof (−y) gewandte Hälfte
        [[Z0 + 6.2, 2.4], [Z0 + 12.0, 2.0]].forEach(([zz, hh]) => { const da = .07, r = R + .02;
          const P = (aa, z) => [cx + r * Math.cos(aa), cy - r * Math.sin(aa), z];
          const pts = [P(a - da, zz), P(a + da, zz), P(a + da, zz + hh), P(a - da, zz + hh)];
          if (K.facing(Math.cos(a), -Math.sin(a)) > 0) w += `<path class="wn dim" data-f="2" d="${K.path(pts)}Z"/>`; });
      }
      return q + w + lathe(K, cx, cy, [[zt + 1.0, R + .1], [zt + 2.3, R - 1.2], [zt + 3.0, 2.2], [zt + 3.3, .3]], 'cu', 6);
    } });
    // flacher Eingangsvorsprung (≈ 3 m) mit Portal, Rundbögen und Stufen
    add({ id: 'step', fp: [32.7, 64.8, 49.1, 66.2], parent: 'ris', side: 'S', draw: K => K.box(32.7, 64.8, Z0, 16.4, 1.4, 5.6, 'pl', {
      S: (len, h) => hl(0, len, .5) + wins(winR(len / 2 - 1.3, 1.4, 2.6, 4.0, 0)) + vl(len / 2 - 1.3, 1.4, h) + vl(len / 2 + 1.3, 1.4, h) }) + K.box(31.7, 66.2, Z0, 18.4, 1.0, .35, 'pl') });

    // ======== ECKPAVILLONS: Segmentgiebel mit Rundfenster, geschweiftes Dach, Vasen ========
    const pav = (id, x, flip) => add({ id, fp: [x, 46.4, x + 12, 64.8], draw: K => {
      const f = (len, h) => {
        let q = balustrade(len, 3.0) + hl(0, len, 2.3) + hl(0, len, 4.3), w = '';
        [3.0, len - 3.0].forEach(u => { w += winA(u - 1.15, 5.4, 2.3, 5.2, 1); q += `<path class="dt" d="M${f2(u - 1.5)} 2.7h3V4.0h-3Z"/>`; });
        q += vl(.9, 2.3, 11.2) + vl(len - .9, 2.3, 11.2) + vl(len / 2, 2.3, 11.2) + hl(0, len, 11.2);
        w += winA(len / 2 - 1.15, 5.4, 2.3, 5.2, 1);
        return q + wins(w) + plinth(len, h, 15.2, 4);
      };
      return K.box(x, 46.4, Z0, 12, 18.4, HP, 'pl', { S: f, E: plain, N: plain, W: plain }) + bell(K, x, 46.4, x + 12, 64.8, Z0 + HP, Z0 + HP + 3.4, Z0 + HP + 5.2, 2.6)
        + [[1.9, 48.4], [10.1, 48.4], [1.9, 62.8], [10.1, 62.8], [6, 62.8]].map(([a, b]) => dormer(K, x + a, b, Z0 + HP + 1.7)).join('') + (K.wallVisible([x, 64.8], [x + 12, 64.8]) ? gablePed(K, x) : '') + urn(K, x + .6, 64.2, Z0 + HP) + urn(K, x + 11.4, 64.2, Z0 + HP);
    } });
    pav('pW', 0); pav('pE', 71);
    return { mods: M, ground, lc: [41.45, 33.1], z0: 0, top: [41, 50, 28], label: 'Landesmuseum', h: 28, len: 83 };
  });
})();
