/* Altes Rathaus (Hannover) – Modul v2, nach Google-Earth-Kadern ref/altesRathaus/foto/v_01…v_11 (siehe ref/altesRathaus/INDEX.md).
   Lokales System = Mindestrechteck des OSM-Umrisses (w5121356), 54,4 × 35,7 m, Achsen um 49° gegen Ost gedreht:
   lokal +x = Südostende (Richtung Karmarschstraße), lokal x = 0 = Nordwestseite zum Marktplatz / zur Marktkirche; y = 0 = Nordostseite, +y = Südwestseite.
   Aufbau (Backsteingotik, Treppengiebel): Nordwestbau (x 0–22, First parallel zur Marktfront, Treppengiebel zu NO und SW) · Mittelteil mit glasüberdachtem Hof,
   NO-Flügel (rotes Dach) und SW-Flügel (graues Flachdach mit Klimageräten) · Südostbau (x 38–54,4, First parallel zur SO-Stirnseite, Mittelgiebel zur Stirnseite, Treppengiebel zur SW-Seite).
   Auf den Kadern verdeckt ein Gerüst Teile der SO-Fassade: dort Gliederung nach der Marktfront, siehe README. */
(() => {
  const Z0 = 1;
  ISO.landmark('altesRathaus', H => {
    const { f2, hl, winR, winG, wins, frieze, groupM, sgable, roofPlane } = H, M = [], add = m => (M.push(m), m);
    const LX = 54.4, LY = 35.7;          // Umriss lokal
    const EA = 14;                       // Traufe
    const GL = 8;                        // Glasdach über dem Hof
    const FL = 17;                       // Flachdach SW-Flügel
    const RG_NW = 26, RG_NO = 19.5, RG_SO = 22;   // Firsthöhen
    const XS = 38, XR = 44.5;          // Südostbau beginnt bei x = XS, sein First (parallel zur SO-Stirnwand) liegt bei x = XR
    // Schattierung wie die Wand (Normale nx, ny), für Treppengiebel
    const shade = (K, nx, ny) => (ny * K.view[0] - nx * K.view[1]) >= 0 ? 'fr' : 'sd';

    // Backsteinfassade: unten Arkade (Spitzbögen), darüber Fensterreihen zwischen Zierbändern (Wandkoordinaten: v nach unten ab Traufe)
    const brick = step => (len, h) => {
      const n = Math.max(1, Math.round(len / step)), st = len / n, arc = h - 4.3;
      let q = hl(0, len, .5) + hl(0, len, h - .8), w = '';
      for (let i = 0; i < n; i++) {
        const u = st * (i + .5);
        w += winG(u - 1.5, arc, 3, h - arc, 0, ' dim');
      }
      for (let y = 1.8, k = 0; y + 2.6 < arc - .6; y += 4.6, k++) {
        q += frieze(len, y + 2.8);
        for (let i = 0; i < n; i++) {
          const u = st * (i + .5);
          q += `<path class="dt" d="M${f2(u - 1.7)} ${f2(y - .2)}A1.9 1.2 0 0 1 ${f2(u + 1.7)} ${f2(y - .2)}"/>`;
          w += winR(u - 1.5, y, 1.3, 2.6, 2 + (k > 0 ? 0 : 1)) + winR(u + .2, y, 1.3, 2.6, 2);
        }
      }
      return groupM('bk', q + wins(w));
    };
    // Zwerchhaus der Marktfront: Wandstück über der Traufe mit zwei Fenstern
    const zw = (len, h) => groupM('bk', hl(0, len, .4) + wins(winG(len * .5 - 1.9, 1.3, 1.5, h - 1.7, 3) + winG(len * .5 + .4, 1.3, 1.5, h - 1.7, 3)));
    // Hofwand über dem Glasdach: eine Reihe hoher Rundbogenfenster
    const court = (len, h) => {
      const n = Math.max(1, Math.round(len / 3.2)), st = len / n;
      let q = hl(0, len, .5) + hl(0, len, h - .6), w = '';
      for (let i = 0; i < n; i++) w += winG(st * (i + .5) - .9, 1, 1.8, h - 1.8, 1);
      return groupM('bk', q + wins(w));
    };

    // ---------- Nordwestbau: Marktfront nach NW (hier verdeckt), Treppengiebel zur SW-Seite ----------
    add({ id: 'arNW', b: 'ar', o: .4, fp: [0, 0, 22, LY], draw: K => {
      let s = '';
      s += K.wall([0, LY], [22, LY], Z0, EA, 'bk', brick(4.4));
      s += K.wall([22, LY], [22, 0], GL, EA, 'bk', court);
      s += roofPlane(K, [[22, LY, EA], [22, 0, EA], [11, 0, RG_NW], [11, LY, RG_NW]]);
      // zwei Dachflächenfenster in der SO-Dachfläche (Kader v_06)
      const zr = x => RG_NW - (x - 11) / 11 * (RG_NW - EA);
      [[13.5, 17, 7.5, 12], [13.5, 17, 23, 27.5]].forEach(([x0, x1, y0, y1]) => { s += K.poly([[x0, y0, zr(x0)], [x0, y1, zr(x0)], [x1, y1, zr(x1)], [x1, y0, zr(x1)]], 'gl'); });
      s += K.wall([0, LY], [22, LY], EA, EA + .01, 'bk', () => groupM('bk', frieze(22, -.4) + sgable(22, RG_NW - EA, 4, 'bk', shade(K, 0, 1), 3, 3)));
      // Nordostseite (Kader v_01, v_03, v_10): Arkade, zwei Fensterreihen, Treppengiebel
      s += K.wall([22, 0], [0, 0], Z0, EA, 'bk', brick(4.4));
      s += K.wall([22, 0], [0, 0], EA, EA + .01, 'bk', () => groupM('bk', frieze(22, -.4) + sgable(22, RG_NW - EA, 4, 'bk', shade(K, 0, -1), 3, 3)));
      // Nordwest-Dachfläche (zur Marktkirche) und Marktfront (Kader v_07–v_09): Arkade, drei Zwerchhäuser bei ≈ 22 %, 52 %, 80 % der Breite
      s += roofPlane(K, [[0, LY, EA], [0, 0, EA], [11, 0, RG_NW], [11, LY, RG_NW]]);
      s += K.wall([0, 0], [0, LY], Z0, EA, 'bk', brick(4.46));
      [.22, .52, .8].forEach(t => {
        const y0 = t * LY - 3.2;
        s += K.wall([0, y0], [0, y0 + 6.4], EA, EA + 4.5, 'bk', zw);
        s += K.wall([0, y0], [0, y0 + 6.4], EA + 4.5, EA + 4.51, 'bk', () => groupM('bk', sgable(6.4, 6.2, 2, 'bk', shade(K, -1, 0), 1, 4)));
      });
      return s;
    } });

    // ---------- Mittelteil: NO-Flügel, Hof mit Glasdach, SW-Flügel ----------
    add({ id: 'arMid', b: 'ar', o: .4, fp: [22, 0, XS, LY], draw: K => {
      let s = '';
      // NO-Flügel: rotes Dach, First in x-Richtung
      s += K.wall([22, 9], [XS, 9], GL, EA, 'bk', court);
      s += roofPlane(K, [[22, 9, EA], [XS, 9, EA], [XS, 4.5, RG_NO], [22, 4.5, RG_NO]]);
      // zwei Gauben in der SW-Dachfläche des NO-Flügels (Kader v_04)
      const zn = y => EA + (9 - y) / 4.5 * (RG_NO - EA);
      [[27, 29.8], [33, 35.8]].forEach(([x0, x1]) => { s += K.poly([[x0, 6.8, zn(6.8)], [x0, 5.6, zn(5.6)], [x1, 5.6, zn(5.6)], [x1, 6.8, zn(6.8)]], 'gl'); });
      // NO-Wand und NO-Dachfläche des NO-Flügels (Kader v_01, v_03)
      s += K.wall([XS, 0], [22, 0], Z0, EA, 'bk', brick(4));
      s += roofPlane(K, [[XS, 0, EA], [22, 0, EA], [22, 4.5, RG_NO], [XS, 4.5, RG_NO]]);
      // Hof mit Glasdach
      s += K.poly([[22, 9, GL], [XS, 9, GL], [XS, 26, GL], [22, 26, GL]], 'gl');
      for (let y = 11; y < 26; y += 2) s += `<path class="dt" d="${K.path([[22, y, GL], [XS, y, GL]])}"/>`;
      for (let x = 25; x < XS; x += 3) s += `<path class="dt" d="${K.path([[x, 9, GL], [x, 26, GL]])}"/>`;
      // SW-Flügel: Backsteinwand, graues Flachdach mit Klimageräten
      s += K.wall([22, LY], [XS, LY], Z0, FL, 'bk', brick(4));
      s += K.wall([XS, 26], [22, 26], GL, FL, 'bk', court);       // Hofseite des SW-Flügels (sichtbar bei Blick von Nordost / Nordwest)
      s += K.wall([XS, 9], [XS, 26], GL, EA, 'bk', court);        // Hofseite des Südostbaus
      s += K.face([[22, 26, FL], [XS, 26, FL], [XS, LY, FL], [22, LY, FL]], 'sl');
      [[24.5, 28.4], [27.6, 28.4], [30.7, 28.4], [24.5, 31.4], [30.7, 31.4]].forEach(([x, y]) => { s += K.box(x, y, FL, 2.4, 1.6, 1.1, 'pl', {}, true); });
      return s;
    } });

    // ---------- Südostbau: First parallel zur SO-Stirnwand, Mittelgiebel zur Stirnseite, Treppengiebel zur SW-Seite ----------
    add({ id: 'arSE', b: 'ar', o: .4, fp: [XS, 0, LX, LY], draw: K => {
      let s = '';
      s += K.wall([XS, LY], [LX, LY], Z0, EA, 'bk', brick(4.1));
      s += K.wall([LX, LY], [LX, 0], Z0, EA, 'bk', brick(4.5));
      s += roofPlane(K, [[LX, LY, EA], [LX, 0, EA], [XR, 0, RG_SO], [XR, LY, RG_SO]]);
      s += K.wall([XS, LY], [LX, LY], EA, EA + .01, 'bk', () => groupM('bk', frieze(LX - XS, -.4) + sgable(LX - XS, RG_SO - EA + .8, 3, 'bk', shade(K, 0, 1), 2, 3)));
      // Nordostseite des Südostbaus (Kader v_01, v_03): Arkade, Fensterreihen, Treppengiebel
      s += K.wall([LX, 0], [XS, 0], Z0, EA, 'bk', brick(4.1));
      s += roofPlane(K, [[XS, 0, EA], [XS, LY, EA], [XR, LY, RG_SO], [XR, 0, RG_SO]]);
      s += K.wall([LX, 0], [XS, 0], EA, EA + .01, 'bk', () => groupM('bk', frieze(LX - XS, -.4) + sgable(LX - XS, RG_SO - EA + .8, 3, 'bk', shade(K, 0, -1), 2, 3)));
      s += K.wall([LX, 26.85], [LX, 8.85], EA, EA + .01, 'bk', () => groupM('bk', frieze(18, -.4) + sgable(18, 11, 4, 'bk', shade(K, 1, 0), 3, 3)));
      return s;
    } });

    return { mods: M, lc: [LX / 2, LY / 2], z0: 0, top: [LX, LY / 2, RG_SO], pin: [LX / 2, LY / 2, 25], label: 'Altes Rathaus', h: RG_SO, len: LX };
  });
})();
