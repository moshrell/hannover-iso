/* Neustädter Hof- und Stadtkirche St. Johannis (Hannover, 1666–1670, Entwurf Girolamo Sartorio zugeschrieben) – Modul, v2 (Überarbeitung nach den Google-Earth-Kadern).
   Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Grundriss aus dem OSM-Umriss (way 29173386, lange Achse = x, Mindestrechteck 59,0 × 31,1 m → fit ×1,0):
   Westturm (x 0–9,4), querer Westbau mit zwei Giebelrisaliten (x 8–16,4, y 0–31,2), einschiffiger Saal (x 16,4–51,9, 21,2 m breit) mit hohem Ziegeldach,
   Krüppelwalm im Osten und Gaubenluken in drei versetzten Reihen, etwas schmalerer und niedrigerer Chor im Osten (x 51,9–59,1).
   Turm (1691–1700): vierseitiger Sandsteinschaft mit türkisen Kupferbändern, Schieferrock, steinernes Achteck mit weißem Gesims, kupferbrauner Achtecktambour mit Uhren,
   Welsche Haube, Laterne, Zwiebel und Spitze. Höhen (Turm ≈ 72 m, Traufe 10 m, First 17 m) aus Verhältnissen der Kadern geschätzt, siehe ref/neustaedter/README.md. */
(() => {
  const Z0 = 1;
  ISO.landmark('neustaedter', H => {
    const { f2, hl, vl, winA, winR, wins, lathe, saddle, roofPlane, clockSVG } = H, M = [], add = m => (M.push(m), m);
    // Maße (m über Gelände)
    const NX0 = 16.4, NX1 = 51.9, NY0 = 4.9, NY1 = 26.1, NYM = 15.5;      // Saal
    const NE = 10, NR = 17;                                               // Traufe / First Saal
    const BX0 = 8, BX1 = 16.4, BY1 = 31.2, BE = 9, BR = 14;             // Westbau (Quergiebel)
    const CX0 = 51.9, CX1 = 59.1, CY0 = 7.7, CY1 = 22.7, CE = 8.5, CR = 13.2; // Chor
    const TX0 = 0, TY0 = 10.5, TW = 8.6, TD = 9.8, TS = 40;               // Turm: Schaft bis TS
    const TCX = TX0 + TW / 2, TCY = TY0 + TD / 2;
    const NLEN = NX1 - NX0;
    const BAYS = [1.6, 6.9, 12.2, 17.5, 22.8, 28.1];                      // Mitten der sechs hohen Bogenfenster ab Saal-Westende (Kadern v_01/v_03)
    const DOOR = 2;                                                       // Portal unter dem dritten Fenster (von Westen)

    /* ---------- Westturm ---------- */
    add({ id: 'nsTower', fp: [TX0, TY0, TX0 + TW, TY0 + TD], parent: 'nsBlock', side: 'W', draw: K => {
      const wz = (u, zb, w, hh, f, cls) => winA(u, TS - zb - hh, w, hh, f, cls);          // Fenster mit Unterkante zb über Gelände
      const face = (len, withDoor) => hl(0, len, .8) + hl(0, len, 2.2)
        + wins(wz(len / 2 - 1.6 - .7, 31, 1.4, 6.4, 4) + wz(len / 2 + 1.6 - .7, 31, 1.4, 6.4, 3) + wz(len / 2 - .9, 17.5, 1.8, 6.6, 3) + wz(len / 2 - .8, 7.2, 1.6, 5.2, 2)
          + (withDoor ? wz(len / 2 - 1.2, .4, 2.4, 5.4, 1, ' off') : wz(len / 2 - .75, 1.4, 1.5, 4, 2)));
      let s = K.box(TX0, TY0, Z0, TW, TD, TS, 'rs', { S: len => face(len, false), E: len => face(len, false), N: len => face(len, false), W: len => face(len, true) });
      // türkise Kupferbänder (Gesimse) am Schaft
      [12.2, 23.4].forEach(h => { s += K.box(TX0 - .35, TY0 - .35, Z0 + h, TW + .7, TD + .7, .55, 'cu', {}, false); });
      s += K.box(TX0 - .5, TY0 - .5, Z0 + TS, TW + 1, TD + 1, .9, 'st');
      // Schieferrock über dem Schaft (Übergang ins Achteck)
      const zk = Z0 + TS + .9, zr = zk + 1.6, rh = 3.95;
      const x0 = TX0 - .5, y0 = TY0 - .5, x1 = TX0 + TW + .5, y1 = TY0 + TD + .5, qx0 = TCX - rh, qx1 = TCX + rh, qy0 = TCY - rh, qy1 = TCY + rh;
      s += K.face([[x0, y1, zk], [x1, y1, zk], [qx1, qy1, zr], [qx0, qy1, zr]], 'sl') + K.face([[x1, y1, zk], [x1, y0, zk], [qx1, qy0, zr], [qx1, qy1, zr]], 'sl')
        + K.face([[x1, y0, zk], [x0, y0, zk], [qx0, qy0, zr], [qx1, qy0, zr]], 'sl') + K.face([[x0, y0, zk], [x0, y1, zk], [qx0, qy1, zr], [qx0, qy0, zr]], 'sl');
      // regelmäßiges Achteck: Seitenflächen von Radius ra (unten) auf rb (oben); Flächenmitten zeigen in die vier Himmelsrichtungen und diagonal
      const ang = i => Math.PI / 8 + i * Math.PI / 4, ring = (r, z) => Array.from({ length: 8 }, (_, i) => [TCX + r * Math.cos(ang(i)), TCY + r * Math.sin(ang(i)), z]);
      const oct = (ra, za, rb, zb2, mat) => { const A = ring(ra, za), B = ring(rb, zb2); let o = '';
        for (let i = 0; i < 8; i++) o += K.face([A[i], A[(i + 1) % 8], B[(i + 1) % 8], B[i]], mat);
        return o + K.face(B, mat); };
      // steinernes Achteck mit hellen Bogenfenstern und weißem Gesims
      const z1 = zr, z2 = z1 + 3.0, rs1 = 4.3;
      s += oct(rs1, z1, rs1, z2, 'rs');
      let w2 = '';
      [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2, nx = Math.cos(a), ny = Math.sin(a); if (K.facing(nx, ny) <= 1e-6) return;
        const cx = TCX + rs1 * .924 * nx, cy = TCY + rs1 * .924 * ny, tx = -ny, ty = nx, hw = .8;
        w2 += `<path class="wn" data-f="3" d="${K.path([[cx - tx * hw, cy - ty * hw, z1 + .6], [cx + tx * hw, cy + ty * hw, z1 + .6], [cx + tx * hw, cy + ty * hw, z2 - .5], [cx - tx * hw, cy - ty * hw, z2 - .5]])}Z"/>`; });
      s += wins(w2);
      s += oct(4.75, z2, 4.75, z2 + .9, 'pl');
      // Tambour (kupferbraun) mit Zifferblättern
      const z3 = z2 + .9, z4 = Z0 + 54.7, ra = 4.0, rb = 3.75;
      s += oct(ra, z3, rb, z4, 'bk');
      [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2, nx = Math.cos(a), ny = Math.sin(a);
        if (K.facing(nx, ny) > 1e-6) { const rr = (ra + rb) / 2 * .924 + .05, p = K.P(TCX + rr * nx, TCY + rr * ny, (z3 + z4) / 2 + .2); s += clockSVG(p[0], p[1], 1.45); } });
      // Welsche Haube: Schulter, Einschnürung, Laterne, Zwiebel, Spitze
      s += lathe(K, TCX, TCY, [[z4, rb], [z4 + .6, 4.4], [z4 + 1.5, 4.2], [z4 + 3.0, 3.2], [z4 + 4.1, 2.5], [z4 + 4.5, 2.2]], 'bk', 4, [1]);
      const zl = z4 + 4.5, zlt = zl + 1.6;
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, TCX, TCY, [[zl, 2.1], [zlt, 2.1]], '')}</g>` + lathe(K, TCX, TCY, [[zl, 1.75], [zlt, 1.75]], 'lant', 4);
      s += lathe(K, TCX, TCY, [[zlt, 2.1], [zlt + .6, 2.5], [zlt + 2.4, 2.6], [zlt + 4.0, 2.0], [zlt + 5.4, 1.3], [zlt + 5.9, 1.0]], 'bk', 4, [1]);
      s += lathe(K, TCX, TCY, [[zlt + 5.9, 1.1], [zlt + 6.6, .95], [zlt + 8.2, .55], [zlt + 11.2, .08]], 'bk', 3);
      return s;
    } });

    /* ---------- Querer Westbau: Quergiebel mit Satteldach (First Nord–Süd), Giebel nach Norden und Süden ---------- */
    add({ id: 'nsBlock', fp: [BX0, 0, BX1, BY1], parent: 'nsNave', side: 'W', draw: K => {
      const wl = len => { let w = ''; for (const u of [1.9, len - 3.1]) for (const y of [1.3, 4.1, 6.8]) w += winR(u, y, 1.2, 1.6, 1); return hl(0, len, .5) + hl(0, len, 8.4) + hl(0, len, 3.3) + hl(0, len, 6.1) + wins(w); };
      const wlong = len => hl(0, len, .5) + hl(0, len, 8.4) + wins(winA(3, 2.4, 1.6, 4.8, 1) + winA(len - 4.6, 2.4, 1.6, 4.8, 1) + winA(len / 2 - .8, 2.4, 1.6, 4.8, 1));
      let s = K.box(BX0, 0, Z0, BX1 - BX0, BY1, BE, 'pl', { S: wl, N: wl, W: wlong, E: wlong }, false);
      const zE = Z0 + BE, zR = Z0 + BR, xm = (BX0 + BX1) / 2;
      s += roofPlane(K, [[BX0, 0, zE], [BX0, BY1, zE], [xm, BY1, zR], [xm, 0, zR]]) + roofPlane(K, [[BX1, BY1, zE], [BX1, 0, zE], [xm, 0, zR], [xm, BY1, zR]]);
      s += K.face([[BX0, 0, zE], [BX1, 0, zE], [xm, 0, zR]], 'pl') + K.face([[BX1, BY1, zE], [BX0, BY1, zE], [xm, BY1, zR]], 'pl');
      return s;
    } });

    /* ---------- Saal: ockerfarbene Wand mit Lisenen und sechs Bogenfenstern, steiles Ziegeldach, versetzte Gaubenluken ---------- */
    add({ id: 'nsNave', fp: [NX0, NY0, NX1, NY1], draw: K => {
      // Wand-Dekor; rev = Nordwand (Wandkoordinate läuft von Osten nach Westen)
      const wall = rev => len => { let w = '', d = '';
        const U = BAYS.map(u => rev ? len - u : u);
        U.forEach((u, k) => { w += winA(u - .7, 1.2, 1.4, 3.8, 1 + k % 3);
          if (k === DOOR) w += winA(u - .8, 6.9, 1.6, 3.1, 1, ' off'); else w += winR(u - .5, 6.5, 1.0, 1.3, 1 + k % 3); });
        // Lisenen: zwischen den Fenstern und an den Ecken je zwei Linien
        const P = [0, ...U.slice(0, -1).map((u, k) => (u + U[k + 1]) / 2), len];
        P.sort((a, b) => a - b).forEach((p, i) => { const c = Math.min(Math.max(p, .45), len - .45); d += vl(c - .38, .6, NE) + vl(c + .38, .6, NE); });
        return hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, NE - .6) + hl(0, len, NE - .15) + d + wins(w); };
      const endW = len => hl(0, len, .5) + hl(0, len, NE - .6) + wins(winA(len / 2 - .8, 1.8, 1.6, 4.6, 1) + winR(len / 2 - .6, 7.2, 1.2, 1.6, 2));
      let s = K.box(NX0, NY0, Z0, NLEN, NY1 - NY0, NE, 'pl', { S: wall(false), N: wall(true), E: endW, W: endW }, false);
      const zE = Z0 + NE, zR = Z0 + NR, A = [NX0, NYM, zR], B = [NX1 - 4, NYM, zR];
      const NW = [NX0, NY0, zE], NEc = [NX1, NY0, zE], SE = [NX1, NY1, zE], SW = [NX0, NY1, zE];
      s += roofPlane(K, [NW, NEc, B, A], 'tl', 2.6) + roofPlane(K, [SE, SW, A, B], 'tl', 2.6) + K.face([NEc, SE, B], 'tl') + K.face([SW, NW, A], 'pl');
      // Gaubenluken: drei versetzte Reihen auf jeder Seite (v_01: Süd, v_05: Nord)
      const hatch = (x, t, south) => {
        const y = south ? NY1 - t * (NY1 - NYM) : NY0 + t * (NYM - NY0), z = zE + t * (zR - zE) - .3, hw = .6, dp = 1.2, hh = 1.05;
        const yb = south ? y - dp : y, tri = south ? [[x - hw, y, z + hh], [x + hw, y, z + hh], [x, y, z + hh + .55]] : [[x + hw, y + dp, z + hh], [x - hw, y + dp, z + hh], [x, y + dp, z + hh + .55]];
        const front = () => wins(winR(.18, .15, .75, .7, 3));
        const b = K.box(x - hw, yb, z, hw * 2, dp, hh, 'pl', south ? { S: front } : { N: front }, false);
        return b + saddle(K, [x - hw - .08, south ? y : y + dp], [x + hw + .08, south ? y : y + dp], [0, south ? -dp : dp], z + hh, z + hh + .55) + K.face(tri, 'pl');
      };
      const rowsS = [[.27, [18.2, 27.6, 37]], [.5, [22.9, 32.3, 41.7]], [.72, [27.6, 37, 46.4]]], rowsN = [[.27, [20.5, 29.9, 39.3]], [.5, [25.2, 34.6, 44]], [.72, [29.9, 39.3]]];
      if (K.facing(0, -1, .6) > 0) rowsN.forEach(([t, xs]) => xs.forEach(x => { s += hatch(x, t, false); }));
      if (K.facing(0, 1, .6) > 0) rowsS.forEach(([t, xs]) => xs.forEach(x => { s += hatch(x, t, true); }));
      // türkise Zierspitze an der Nordostecke des Daches
      s += lathe(K, NX1 - .8, NY0 + .8, [[zE - .5, .35], [zE + 1.8, .3], [zE + 3.2, .08]], 'cu', 0);
      return s;
    } });

    /* ---------- Chor: etwas schmaler und niedriger, Walmdach ---------- */
    add({ id: 'nsChancel', fp: [CX0, CY0, CX1, CY1], parent: 'nsNave', side: 'E', draw: K => {
      const side = len => hl(0, len, .5) + hl(0, len, CE - .8) + wins(winA(len / 2 - .8, 1.6, 1.6, 4.8, 1));
      const front = len => { let w = ''; for (const u of [2.6, len / 2 - .8, len - 4.4]) w += winA(u, 1.6, 1.6, 4.8, 1); return hl(0, len, .5) + hl(0, len, CE - .8) + wins(w); };
      let s = K.box(CX0, CY0, Z0, CX1 - CX0, CY1 - CY0, CE, 'pl', { S: side, N: side, E: front }, false);
      const zE = Z0 + CE, zR = Z0 + CR, ym = (CY0 + CY1) / 2, A = [CX0 + 1.5, ym, zR], B = [CX1 - 3.6, ym, zR];
      const P = [[CX0, CY0, zE], [CX1, CY0, zE], [CX1, CY1, zE], [CX0, CY1, zE]];
      s += roofPlane(K, [P[0], P[1], B, A], 'tl', 2.4) + roofPlane(K, [P[2], P[3], A, B], 'tl', 2.4) + K.face([P[1], P[2], B], 'tl') + K.face([P[3], P[0], A], 'tl');
      return s;
    } });

    return { mods: M, lc: [29.55, 15.6], z0: 0, top: [TCX, TCY, 73], pin: [29.55, 15.6, 20.5], label: 'Neustädter Hof- und Stadtkirche', h: 73, len: 59 };
  });
})();
