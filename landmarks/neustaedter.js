/* Neustädter Hof- und Stadtkirche St. Johannis (Hannover, 1666–1670, Entwurf Girolamo Sartorio) – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1.
   Grundriss aus dem OSM-Umriss (way 29173386, um 11° gedreht: lange Achse = x): Westturm (x 0–9,4), querer Westbau mit zwei Giebelrisaliten (x 8–16,4, y 0–31,2),
   einschiffiger Saal (x 16,4–51,9, 21 m breit) mit hohem Ziegeldach und zwei Reihen Gauben, etwas schmalerer Chor im Osten (x 51,9–59,1).
   Turm (1691–1700): grauer Sandsteinschaft, achteckiges Glockengeschoss mit Uhren, kupferne Welsche Haube mit Laterne und Spitze.
   Höhen (Turm ≈ 72 m, Traufe 10 m, First 17 m) nur nach den Google-Earth-Kadern geschätzt, siehe ref/neustaedter/README.md. */
(() => {
  const Z0 = 1;
  ISO.landmark('neustaedter', H => {
    const { f2, hl, vl, winA, winR, wins, lathe, saddle, roofPlane, clockSVG } = H, M = [], add = m => (M.push(m), m);
    // Maße (m über Gelände)
    const NX0 = 16.4, NX1 = 51.9, NY0 = 4.9, NY1 = 26.1, NYM = 15.5;      // Saal
    const NE = 10, NR = 17;                                               // Traufe / First Saal
    const BX0 = 8, BX1 = 16.4, BY1 = 31.2, BE = 9, BR = 14;             // Westbau (Quergiebel)
    const CX0 = 51.9, CX1 = 59.1, CY0 = 7.7, CY1 = 22.7, CE = 8.5, CR = 13.2; // Chor
    const TX0 = 0, TY0 = 10.5, TW = 9.4, TD = 9.8, TS = 40;               // Turm: Schaft bis TS
    const TCX = TX0 + TW / 2, TCY = TY0 + TD / 2;

    /* ---------- Westturm ---------- */
    add({ id: 'nsTower', fp: [TX0, TY0, TX0 + TW, TY0 + TD], parent: 'nsBlock', side: 'W', draw: K => {
      const f = (len, h) => hl(0, len, .8) + hl(0, len, 2.4) + hl(0, len, h - 12.2) + hl(0, len, h - 23.4) + hl(0, len, .5) + hl(0, len, h - .7)
        + wins(winA(len / 2 - 1, 2.2, 2, 5.4, 4) + winA(len / 2 - 1, 12.4, 2, 5.6, 3) + winA(len / 2 - .8, 24.6, 1.6, 5, 2) + winR(len / 2 - .35, 19.4, .7, 1.8, 2));
      let s = K.box(TX0, TY0, Z0, TW, TD, TS, 'rs', { S: f, E: f, N: f, W: f });
      s += K.box(TX0 - .4, TY0 - .4, Z0 + TS, TW + .8, TD + .8, .9, 'st');
      // achteckiges Glockengeschoss (Kupfer, dunkel) mit Zifferblättern
      const R = 3.5, zb = Z0 + TS + .9, zt = Z0 + 49.5, ang = i => Math.PI / 8 + i * Math.PI / 4;
      for (let i = 0; i < 8; i++) {
        const a0 = ang(i), a1 = ang(i + 1), am = (a0 + a1) / 2;
        s += K.face([[TCX + R * Math.cos(a0), TCY + R * Math.sin(a0), zb], [TCX + R * Math.cos(a1), TCY + R * Math.sin(a1), zb], [TCX + R * Math.cos(a1), TCY + R * Math.sin(a1), zt], [TCX + R * Math.cos(a0), TCY + R * Math.sin(a0), zt]], 'bk');
      }
      [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2, nx = Math.cos(a), ny = Math.sin(a);
        if (K.facing(nx, ny) > 1e-6) { const p = K.P(TCX + R * .93 * nx, TCY + R * .93 * ny, zb + 4.6); s += clockSVG(p[0], p[1], 1.3); } });
      // Welsche Haube: Wulst, Einschnürung, Laterne, Spitze
      s += lathe(K, TCX, TCY, [[zt, R], [zt + .6, 4.0], [zt + 2.2, 3.8], [zt + 4.2, 3.0], [zt + 5.8, 1.9], [zt + 6.5, 1.6]], 'bk', 4, [1]);
      s += lathe(K, TCX, TCY, [[zt + 6.5, 1.9], [zt + 7.2, 2.1], [zt + 8.2, 2.0], [zt + 9.2, 1.3], [zt + 9.7, 1.1]], 'bk', 4);
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, TCX, TCY, [[zt + 9.7, 1.5], [zt + 12.2, 1.5]], '')}</g>` + lathe(K, TCX, TCY, [[zt + 9.7, 1.1], [zt + 12.2, 1.1]], 'lant', 4);
      s += lathe(K, TCX, TCY, [[zt + 12.2, 1.4], [zt + 12.9, 1.2], [zt + 14, .8], [zt + 16, .65], [zt + 18, .45], [zt + 20, .25], [zt + 22.5, .08]], 'bk', 3);
      return s;
    } });

    /* ---------- Querer Westbau: Quergiebel mit Satteldach (First Nord–Süd), Giebel nach Norden und Süden ---------- */
    add({ id: 'nsBlock', fp: [BX0, 0, BX1, BY1], parent: 'nsNave', side: 'W', draw: K => {
      const wl = len => { let w = ''; for (const u of [1.8, len - 3.8]) w += winA(u, 2.2, 2, 5, 1); return hl(0, len, .5) + hl(0, len, 8.4) + wins(w); };
      const wlong = len => hl(0, len, .5) + hl(0, len, 8.4) + wins(winA(3, 2.4, 2, 4.8, 1) + winA(len - 5, 2.4, 2, 4.8, 1) + winA(len / 2 - 1, 2.4, 2, 4.8, 1));
      let s = K.box(BX0, 0, Z0, BX1 - BX0, BY1, BE, 'pl', { S: wl, N: wl, W: wlong, E: wlong }, false);
      const zE = Z0 + BE, zR = Z0 + BR, xm = (BX0 + BX1) / 2;
      s += roofPlane(K, [[BX0, 0, zE], [BX0, BY1, zE], [xm, BY1, zR], [xm, 0, zR]]) + roofPlane(K, [[BX1, BY1, zE], [BX1, 0, zE], [xm, 0, zR], [xm, BY1, zR]]);
      s += K.face([[BX0, 0, zE], [BX1, 0, zE], [xm, 0, zR]], 'pl') + K.face([[BX1, BY1, zE], [BX0, BY1, zE], [xm, BY1, zR]], 'pl');
      return s;
    } });

    /* ---------- Saal (Hallenkirche): Wand aus hellem Putz/Sandstein, steiles Ziegeldach, zwei Gaubenreihen ---------- */
    add({ id: 'nsNave', fp: [NX0, NY0, NX1, NY1], draw: K => {
      const side = len => { let w = '', d = ''; const n = 8, pitch = len / n; for (let k = 0; k < n; k++) { const u = pitch * (k + .5); w += winA(u - 1, 2.9, 2, 5.3, 1) + winR(u - .45, .8, .9, 1.4, 1); }
        return hl(0, len, .5) + hl(0, len, 1.6) + hl(0, len, NE - .8) + vl(0, 0, NE) + vl(len, 0, NE) + wins(w) + d; };
      const endW = len => hl(0, len, .5) + hl(0, len, NE - .8) + wins(winA(len / 2 - 1, 2.2, 2, 6.3, 1));
      let s = K.box(NX0, NY0, Z0, NX1 - NX0, NY1 - NY0, NE, 'pl', { S: side, N: side, E: endW, W: endW }, false);
      const zE = Z0 + NE, zR = Z0 + NR, A = [NX0 + 4, NYM, zR], B = [NX1 - 10.4, NYM, zR];
      const NW = [NX0, NY0, zE], NEc = [NX1, NY0, zE], SE = [NX1, NY1, zE], SW = [NX0, NY1, zE];
      s += roofPlane(K, [NW, NEc, B, A], 'tl', 2.6) + roofPlane(K, [SE, SW, A, B], 'tl', 2.6) + K.face([NEc, SE, B], 'tl') + K.face([SW, NW, A], 'tl');
      // Gauben: zwei Reihen auf jeder Seite (S: Front nach Süden, N: nach Norden)
      const dorm = (x, t, sideS) => {
        const y = sideS ? NY1 - t * (NY1 - NYM) : NY0 + t * (NYM - NY0), z = zE + t * (zR - zE) - .35;
        const box = K.box(x - 1, sideS ? y - 1.6 : y, z, 2, 1.6, 2.2, 'pl', { S: () => wins(winR(.35, .35, 1.3, 1.5, 3)) }, false);
        return box + saddle(K, [x - 1.2, sideS ? y : y + 1.6], [x + 1.2, sideS ? y : y + 1.6], [0, sideS ? -1.8 : 1.8], z + 2.2, z + 3.4);
      };
      for (let x = NX0 + 4.4; x < NX1 - 5; x += 3.6) s += dorm(x, .5, true); // eine Reihe, nur Südseite (die Nordseite liegt im festen Blickwinkel hinter dem First)
      // Zierspitze (kupfern) an der Nordostecke des Daches
      s += lathe(K, NX1 - .8, NY0 + .8, [[zE - .5, .35], [zE + 1.8, .3], [zE + 3.2, .08]], 'cu', 0);
      return s;
    } });

    /* ---------- Chor: etwas schmaler und niedriger, Walmdach ---------- */
    add({ id: 'nsChancel', fp: [CX0, CY0, CX1, CY1], parent: 'nsNave', side: 'E', draw: K => {
      const side = len => hl(0, len, .5) + hl(0, len, CE - .8) + wins(winA(len / 2 - 1, 1.9, 2, 5.6, 1));
      const front = len => { let w = ''; for (const u of [2.6, len / 2 - 1, len - 4.6]) w += winA(u, 1.9, 2, 5.6, 1); return hl(0, len, .5) + hl(0, len, CE - .8) + wins(w); };
      let s = K.box(CX0, CY0, Z0, CX1 - CX0, CY1 - CY0, CE, 'pl', { S: side, N: side, E: front }, false);
      const zE = Z0 + CE, zR = Z0 + CR, ym = (CY0 + CY1) / 2, A = [CX0 + 1.5, ym, zR], B = [CX1 - 3.6, ym, zR];
      const P = [[CX0, CY0, zE], [CX1, CY0, zE], [CX1, CY1, zE], [CX0, CY1, zE]];
      s += roofPlane(K, [P[0], P[1], B, A], 'tl', 2.4) + roofPlane(K, [P[2], P[3], A, B], 'tl', 2.4) + K.face([P[1], P[2], B], 'tl') + K.face([P[3], P[0], A], 'tl');
      return s;
    } });

    return { mods: M, lc: [29.5, 15.6], z0: 0, top: [TCX, TCY, 73], label: 'Neustädter Hof- und Stadtkirche', h: 73, len: 59 };
  });
})();
