/* Altstadt Hannover — Module für die Karte: Marktkirche, Altes Rathaus. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
ISO.landmark('marktkirche', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Marktkirche St. Georgii et Jacobi (Backsteingotik, Turm 97 m) === */
  const MK = { ea: 19, rg: 46 };
  add({ id: 'mkTower', b: 'mk', o: .9, fp: [16, 6, 30, 20], parent: 'mkNave', side: 'W', draw: K => {
    const TZ = 64, GH = 14, cx = 23, cy = 13;
    const shaft = sh => (len, h) => {
      let q = '';
      // Sandsteinecken (Quader im Wechsel)
      for (let v = 0, i = 0; v < h - .5; v += 1.6, i++) { const w = i % 2 ? .7 : 1.3; q += `<rect class="st ${sh}" x="0" y="${f2(v)}" width="${w}" height="1.6"/><rect class="st ${sh}" x="${f2(len - w)}" y="${f2(v)}" width="${w}" height="1.6"/>`; }
      q += hl(0, len, .5) + hl(0, len, 15.6) + hl(0, len, 16.2) + hl(0, len, 30) + hl(0, len, h - 1.6);
      q += [3, 6, 9].map(u => louvre(u, 4.2, 2, 10)).join('') + louvre(6, 19.5, 2, 7.5) + louvre(6.2, 34, 1.6, 6);
      return groupM('bk', q);
    };
    let s = K.box(16, 6, Z0, 14, 14, TZ - Z0, 'bk', { S: shaft('fr'), E: shaft('sd'), N: shaft('fr'), W: shaft('sd') }, false);
    // vier Giebel: Süd mit Uhr, Ost mit Pentagramm und Uhr
    const gab = (sh, inner) => () => groupM('bk', `<path class="bk ${sh}" d="M0 0L7 ${-GH}L14 0Z"/>${hl(.6, 13.4, -.5)}` + inner);
    s += K.wall([16, 20], [30, 20], TZ, TZ + .01, 'bk', gab('fr', star(7, -8.2, 1.6, 6) + clockSVG(7, -3.6, 2)));
    s += K.wall([30, 20], [30, 6], TZ, TZ + .01, 'bk', gab('sd', star(7, -8.2, 1.6, 5) + clockSVG(7, -3.6, 2)));
    // Kreuzdach zwischen den Giebeln
    const c = [[16, 6], [30, 6], [30, 20], [16, 20]], m = [[23, 6], [30, 13], [23, 20], [16, 13]], O = [cx, cy, TZ + GH];
    const faces = [];
    for (let i = 0; i < 4; i++) { const ci = [...c[i], TZ], mA = [...m[(i + 3) % 4], TZ + GH], mB = [...m[i], TZ + GH];
      faces.push([ci, mA, O], [ci, O, mB]); }
    faces.map(f => ({ f, d: f.reduce((a, p) => a + p[0] + p[1], 0) })).sort((a, b) => a.d - b.d).forEach(({ f }) => { s += K.face(f, 'sl'); });
    // Dachreiter (verkleinerte Kopie des Turms) mit Spitzhelm
    const DZ = TZ + GH - .6;
    s += lathe(K, cx, cy, [[DZ, 2.7], [DZ + 7, 2.7]], 'sl', 4, [1]);
    s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[DZ + 2.2, 3.4], [DZ + 5.6, 3.4]], '')}</g>`;
    s += lathe(K, cx, cy, [[DZ + 2.2, 2.75], [DZ + 5.6, 2.75]], 'lant', 8);
    s += lathe(K, cx, cy, [[DZ + 7, 3.1], [DZ + 7.8, 3], [DZ + 9, 2.2], [97, .15]], 'cu', 4, [0]);
    return s + `<path class="dt cu-d" d="${K.path([[cx, cy, 97], [cx, cy, 99]])}"/><circle class="cu" cx="${f2(K.P(cx, cy, 97.4)[0])}" cy="${f2(K.P(cx, cy, 97.4)[1])}" r=".35"/>`;
  } });
  add({ id: 'mkNave', b: 'mk', o: .5, fp: [30, 0, 80, 26], draw: K => {
    const south = (len, h) => {
      let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - 1.8) + hl(0, len, h - 1.2), w = '';
      for (let i = 0; i < 5; i++) { const u = 5 + i * 10; w += winG(u - 2.1, 2.6, 4.2, 12.4, 1, ' dim'); q += `<path class="dt" d="${garch(u - 2.6, 2.1, 5.2, 13)}"/>`; }
      return groupM('bk', q + wins(w));
    };
    const plain = (len, h) => groupM('bk', hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, h - 1.8));
    let s = K.box(30, 0, Z0, 50, 26, MK.ea - Z0, 'bk', { S: south, N: south, E: plain }, false);
    // Strebepfeiler mit Sandsteinabdeckung
    [30.9, 40, 50, 60, 70, 79.1].forEach(x => {
      s += K.box(x - .9, 26, Z0, 1.8, 1.7, 14.5, 'bk', { S: (l, h) => groupM('bk', hl(0, l, 4) + hl(0, l, 9)) });
      s += K.face([[x - .9, 26, Z0 + 16.2], [x + .9, 26, Z0 + 16.2], [x + .9, 27.7, Z0 + 14.5], [x - .9, 27.7, Z0 + 14.5]], 'st');
      s += K.face([[x + .9, 26, Z0 + 16.2], [x + .9, 26, Z0 + 14.5], [x + .9, 27.7, Z0 + 14.5]], 'st');
    });
    // Ostgiebel mit Blendnischen
    s += K.wall([80, 26], [80, 0], MK.ea, MK.ea + .01, 'bk', () => groupM('bk', `<path class="bk sd" d="M0 0L13 ${-(MK.rg - MK.ea)}L26 0Z"/>` + [7, 10, 13, 16, 19].map((u, i) => niche(u - .8, -2 - [4, 9, 14, 9, 4][i] * 1.1, 1.6, [4, 9, 14, 9, 4][i] * 1.1)).join('')));
    s += roofPlane(K, [[30, 26, MK.ea], [80, 26, MK.ea], [80, 13, MK.rg], [30, 13, MK.rg]]);
    s += roofPlane(K, [[80, 0, MK.ea], [30, 0, MK.ea], [30, 13, MK.rg], [80, 13, MK.rg]]);
    return s;
  } });
  // Chor: 7/10-Polygon mit hohen Fenstern
  add({ id: 'mkChoir', b: 'mk', o: .3, fp: [80, 4, 89, 22], parent: 'mkNave', side: 'E', draw: K => {
    const c = [80, 13], r = 9, n = 5, pts = Array.from({ length: n + 1 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / n; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
    let s = '';
    const segs = pts.slice(0, -1).map((p, i) => ({ L: pts[i + 1], R: p })).map(w => ({ ...w, d: w.L[0] + w.L[1] + w.R[0] + w.R[1] })).sort((a, b) => a.d - b.d);
    // Wand von außen: L→R im Uhrzeigersinn von oben gesehen
    segs.forEach(w => { s += K.wall(w.L, w.R, Z0, MK.ea - 1, 'bk', (len, h) => groupM('bk', hl(0, len, .5) + hl(0, len, h - 1.6) + `<path class="dt" d="${garch(len / 2 - 1.9, 1.6, 3.8, 13)}"/>`) + wins(winG(len / 2 - 1.5, 2.1, 3, 12.2, 1, ' hi'))); });
    const apex = [80, 13, MK.rg - 7];
    pts.slice(0, -1).map((p, i) => [[...pts[i + 1], MK.ea - 1], [...p, MK.ea - 1], apex]).map(f => ({ f, d: f[0][0] + f[0][1] + f[1][0] + f[1][1] })).sort((a, b) => a.d - b.d).forEach(({ f }) => { s += K.face(f, 'tl'); });
    return s;
  } });

  return { mods: M, lc: [52, 13], z0: 0, top: [23, 13, 99], label: 'Marktkirche', h: 99, len: 73 };
});
ISO.landmark('altesRathaus', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Altes Rathaus (Backsteingotik, Schaugiebel, Zwerchhäuser) === */
  const AR = { ea: 15.5, rg: 32 };
  add({ id: 'arMain', b: 'ar', o: .4, fp: [52, 46, 98, 60], draw: K => {
    const south = (len, h) => {
      let q = hl(0, len, .5) + frieze(len, 4.6) + frieze(len, 9) + hl(0, len, h - .8), w = '';
      for (let i = 0; i < 10; i++) {
        const u = 2.3 + i * 4.6;
        q += `<path class="dt" d="M${f2(u - 1.7)} 1.6A1.9 1.2 0 0 1 ${f2(u + 1.7)} 1.6"/><path class="dt" d="M${f2(u - 1.7)} 6.2A1.9 1.2 0 0 1 ${f2(u + 1.7)} 6.2"/>`;
        w += winR(u - 1.5, 1.8, 1.3, 2.6, 2) + winR(u + .2, 1.8, 1.3, 2.6, 2) + winR(u - 1.5, 6.4, 1.3, 2.4, 1) + winR(u + .2, 6.4, 1.3, 2.4, 1);
        w += winG(u - 1.6, 10.2, 3.2, h - 10.2, 0, ' dim');
      }
      return groupM('bk', q + wins(w));
    };
    const east = (len, h) => {
      let q = hl(0, len, .5) + frieze(len, 4.6) + frieze(len, 9), w = '';
      [2.2, 4.8, 7.4, 10, 12.6].forEach(u => { w += winR(u - 1.1, 1.8, 1, 2.6, 2) + winR(u, 1.8, 1, 2.6, 2) + winR(u - 1.1, 6.2, 1, 2.4, 1) + winR(u, 6.2, 1, 2.4, 1); });
      w += winG(5.2, 10, 3.6, h - 10.4, 0, ' hi');
      q += `<path class="dt" d="${garch(1, 10.6, 2.6, h - 10.6)}"/><path class="dt" d="${garch(10.4, 10.6, 2.6, h - 10.6)}"/>`;
      return groupM('bk', q + wins(w));
    };
    let s = K.box(52, 46, Z0, 46, 14, AR.ea - Z0, 'bk', { S: south, E: east, N: south, W: east }, false);
    s += roofPlane(K, [[52, 60, AR.ea], [98, 60, AR.ea], [98, 53, AR.rg], [52, 53, AR.rg]]);
    s += roofPlane(K, [[98, 46, AR.ea], [52, 46, AR.ea], [52, 53, AR.rg], [98, 53, AR.rg]]);
    // Zwerchhäuser mit kleinen Treppengiebeln
    [62, 73, 84].forEach(x => {
      s += saddle(K, [x - 3.2, 60], [x + 3.2, 60], [0, -5.5], AR.ea + 1, AR.ea + 9.5);
      s += K.wall([x - 3.2, 60], [x + 3.2, 60], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', sgable(6.4, 11, 1, 'bk', 'fr', 2, 3)));
    });
    // Schaugiebel im Osten
    s += K.wall([98, 60], [98, 46], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', frieze(14, -.4) + sgable(14, 25, 3, 'bk', 'sd', 3, 3)));
    s += K.wall([52, 46], [52, 60], AR.ea, AR.ea + .01, 'bk', () => groupM('bk', frieze(14, -.4) + sgable(14, 21, 3, 'bk', 'sd', 2, 3)));
    return s;
  } });

  return { mods: M, lc: [75, 53], z0: 0, top: [98, 53, 42], label: 'Altes Rathaus', h: 42, len: 46 };
});
