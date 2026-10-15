// GENERIERT von tools/build-landmarks.py aus landmarks/*.js – nicht von Hand ändern

;/* ===== altstadt.js ===== */
/* Altstadt Hannover — Module für die Karte: Marktkirche, Altes Rathaus, Leineschloss. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
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
ISO.landmark('leineschloss', H => {
  const { f2, rnd, vari, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, sgable, clockSVG, star, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 1;
  const M = [];
  const add = m => (M.push(m), m);
  /* === Leineschloss (Niedersächsischer Landtag): Laves-Portikus, Mansarddach, Plenarsaal === */
  const LS = { ea: 19 };
  const lsFacade = (len, h) => {
    let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, 6.1) + hl(0, len, 12) + hl(0, len, 12.6), w = '';
    for (let v = 13.6; v < h - .4; v += 1.1) q += hl(0, len, v);
    const n = Math.floor((len - 2) / 3.6), off = (len - n * 3.6) / 2 + 1.8;
    for (let i = 0; i < n; i++) { const u = off + i * 3.6;
      w += winR(u - .8, 1.9, 1.6, 3.2, 2) + winR(u - .9, 7, 1.8, 4.2, 1) + winA(u - .9, 13.6, 1.8, 3.6, 0); }
    return q + wins(w);
  };
  add({ id: 'ls', b: 'ls', o: 0, fp: [-20, 20, 6, 130], draw: K => {
    let s = K.box(-20, 20, Z0, 26, 110, LS.ea - Z0, 'st', { E: lsFacade, S: lsFacade, N: lsFacade, W: lsFacade }, false);
    s += K.box(-20.4, 19.6, LS.ea, 26.8, 110.8, .9, 'st');
    // Mansarddach: steiler unterer Teil, flacher oberer Walm
    const z0 = LS.ea + .9, z1 = z0 + 4.6, i1 = 1.6, x0 = -20, x1 = 6, y0 = 20, y1 = 130;
    const lo = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], hi = [[x0 + i1, y0 + i1], [x1 - i1, y0 + i1], [x1 - i1, y1 - i1], [x0 + i1, y1 - i1]];
    for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; s += roofPlane(K, [[...lo[i], z0], [...lo[j], z0], [...hi[j], z1], [...hi[i], z1]], 'sl', 1.4); }
    s += hip(K, x0 + i1, y0 + i1, x1 - i1, y1 - i1, z1, z1 + 2.4, 'sl');
    // Gauben Ost und Süd
    for (let y = 23.5; y < 128; y += 3.6) {
      if (y > 62 && y < 88) continue;
      s += K.box(x1 - 1.5, y - .8, z0 + .5, 1.2, 1.6, 2.4, 'st', { E: () => wins(winA(.3, .4, 1, 1.6, 3)) }, false);
      s += saddle(K, [x1 - .3, y + 1], [x1 - .3, y - 1], [-1.6, 0], z0 + 2.9, z0 + 3.8, 'sl');
    }
    for (let x = -16.4; x < 5; x += 3.6) {
      s += K.box(x - .8, y1 - 1.5, z0 + .5, 1.6, 1.2, 2.4, 'st', { S: () => wins(winA(.3, .4, 1, 1.6, 3)) }, false);
      s += saddle(K, [x - 1, y1 - .3], [x + 1, y1 - .3], [0, -1.6], z0 + 2.9, z0 + 3.8, 'sl');
    }
    return s;
  } });
  add({ id: 'lsWinter', b: 'ls', o: .1, fp: [-26, 66, -20, 84], parent: 'ls', side: 'W', draw: K => {
    const f = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.2), w = ''; for (let u = 1.2; u < len - 1; u += 2.2) { q += vl(u - .3, 1.2, h) ; w += winA(u, 2, 1.6, h - 3, 1, ' hi'); } return q + wins(w); };
    return K.box(-26, 66, Z0, 6, 18, 12, 'st', { W: f, S: f, N: f }) + K.box(-26.4, 65.6, Z0 + 12, 6.8, 18.8, .9, 'st');
  } });
  add({ id: 'lsPortico', b: 'ls', o: .2, fp: [6, 63, 20, 87], parent: 'ls', side: 'E', draw: K => {
    let s = K.box(6, 63, Z0, 8, 24, 2.2, 'st', { E: l => hl(0, l, .4) });
    for (let i = 0; i < 5; i++) s += K.box(14 + i * 1.1, 65, Z0, 1.1, 20, Math.max(.05, 2.2 * (5 - i) / 6), 'st');
    // sechs korinthische Säulen
    for (let i = 0; i < 6; i++) { const y = 64.6 + i * 4.16;
      s += lathe(K, 12.4, y, [[Z0 + 2.2, 1.05], [Z0 + 2.9, .82], [16, .72], [16.6, .95], [17.2, 1.15]], 'st fr', 3, [1, 3]); }
    s += K.box(6, 63, 17.2, 8.6, 24, 1.9, 'st', { E: l => hl(0, l, .5) + hl(0, l, 1.1) + Array.from({ length: 24 }, (_, i) => vl(.5 + i, 1.1, 1.9)).join(''), S: l => hl(0, l, .5) });
    s += saddle(K, [14.6, 87], [14.6, 63], [-8.6, 0], 19.1, 24.4, 'sl');
    s += K.wall([14.6, 87], [14.6, 63], 19.1, 19.11, 'st', len => `<path class="st sd" d="M0 0L${f2(len / 2)} -5.3L${f2(len)} 0Z"/><path class="dt" d="M1.4 -.5L${f2(len / 2)} -4.6L${f2(len - 1.4)} -.5Z"/><circle class="dt" cx="${f2(len / 2)}" cy="-2.1" r="1.1"/><path class="dt" d="M${f2(len / 2 - 4)} -.9q1.6 -1.6 2.8 -1.2M${f2(len / 2 + 4)} -.9q-1.6 -1.6 -2.8 -1.2"/>`);
    return s;
  } });
  // Plenarsaal (Glasbau, 1962 / 2017)
  add({ id: 'lsPlenum', b: 'ls', o: .1, fp: [-18, 132, 4, 146], draw: K => {
    const glass = (len, h) => { let q = '', w = ''; const n = Math.floor(len / 2.2);
      for (let i = 0; i < n; i++) { const u = (len - n * 2.2) / 2 + i * 2.2; [[.8, 3.2, 2], [4.4, 3.2, 1], [8, h - 8.6, 0]].forEach(([v, hh, f]) => { w += `<rect class="wn${vari()}" data-f="${f}" x="${f2(u + .15)}" y="${f2(v)}" width="1.9" height="${f2(hh)}"/>`; }); }
      return q + wins(w) + hl(0, len, 4.1) + hl(0, len, 7.7); };
    return K.box(-18, 132, Z0, 22, 14, 12, 'st', { E: glass, S: glass, W: glass }, true) + K.box(-18.8, 131.2, Z0 + 12, 23.6, 15.6, .8, 'sl');
  } });

  return { mods: M, lc: [-5, 83], z0: 0, top: [-7, 83, 26], label: 'Leineschloss · Landtag', h: 26, len: 126 };
});


;/* ===== mitte.js ===== */
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


;/* ===== mitte2.js ===== */
/* Mitte, zweite Reihe — Module (Stufe „erkennbar“, Details später):
   Anzeiger-Hochhaus, NORD/LB, Landesmuseum, Museum August Kestner, Wangenheimpalais, Kreuzkirche, Neustädter Hof- und Stadtkirche,
   Beginenturm, Leibnizhaus, Waterloosäule, Kröpcke-Uhr. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Vorbilder: ref/mitte2/ (Quellen in quellen.txt). */
(() => {
  const Z0 = 1;
  const grid = (H, len, h, step, rows, f0, cls = '') => { // Fensterraster: rows = [[v, h, f], …]
    let w = ''; const n = Math.max(1, Math.floor((len - 1) / step)), off = (len - n * step) / 2;
    for (let i = 0; i < n; i++) rows.forEach(([v, hh, f]) => { w += H.winR(off + i * step + step * .2, v, step * .6, hh, f); });
    return H.wins(w);
  };

  /* --- Anzeiger-Hochhaus (Fritz Höger 1928): Klinker, gestufter Turm, grüne Kuppel --- */
  ISO.landmark('anzeiger', H => {
    const { f2, hl, vl, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .6) + hl(0, len, h - 1); for (let u = 1.6; u < len; u += 1.6) q += vl(u, .6, h - 1);
      let w = ''; const rows = Math.floor((h - 4) / 3.3); for (let r = 0; r < rows; r++) for (let u = .8; u < len - .8; u += 3.2) w += H.winR(u + .5, 1.6 + r * 3.3, 1.8, 2.2, Math.min(4, Math.floor(r / 3)));
      return H.groupM('bk', q) + wins(w); };
    // Zinnen (spitze Pfeiler) auf der Oberkante
    const crown = n => len => { let s = ''; for (let i = 0; i <= n; i++) { const u = i * len / n; s += `<path class="bk fr" d="M${f2(u - .45)} 0V-1.6L${f2(u)} -2.6L${f2(u + .45)} -1.6V0Z"/>`; } return s; };
    add({ id: 'azBase', fp: [0, 0, 32, 32], draw: K => K.box(0, 0, Z0, 32, 32, 22, 'bk', { S: fac, E: fac, N: fac, W: fac }) });
    add({ id: 'azTower', fp: [6, 6, 26, 26], above: 'azBase', draw: K => {
      let s = K.box(6, 6, Z0 + 22, 20, 20, 24, 'bk', { S: fac, E: fac, N: fac, W: fac });
      s += K.wall([6, 26], [26, 26], Z0 + 46, Z0 + 46.01, 'bk', crown(10)) + K.wall([26, 26], [26, 6], Z0 + 46, Z0 + 46.01, 'bk', crown(10));
      const prof = []; for (let i = 0; i <= 10; i++) { const t = i / 10; prof.push([Z0 + 46 + 8 * t, 8.6 * Math.sqrt(1 - t * t) + .2]); }
      s += lathe(K, 16, 16, prof, 'cu', 8, [3, 7]);
      return s;
    } });
    return { mods: M, lc: [16, 16], z0: 0, top: [16, 16, 56], label: 'Anzeiger-Hochhaus', h: 56, len: 32 };
  });

  /* --- NORD/LB (Behnisch, 2002): Randbebauung aus Glas um einen Hof, darüber gestapelte, versetzte Glaskuben --- */
  ISO.landmark('nordlb', H => {
    const { hl, vl, wins } = H, M = [], add = m => (M.push(m), m);
    const glass = (len, h) => { let q = ''; for (let v = 3.4; v < h; v += 3.4) q += hl(0, len, v); for (let u = 2.4; u < len; u += 2.4) q += `<path class="mul" d="M${u.toFixed(2)} 0V${h.toFixed(2)}"/>`;
      let w = ''; const rows = Math.floor(h / 3.4);
      for (let r = 0; r < rows; r++) for (let u = 0; u < len - 2.4; u += 2.4) if (((u * 7 + r * 13) | 0) % 5 < 3) w += `<rect class="wn${H.vari()}" data-f="${Math.min(4, Math.floor(r / 2))}" x="${(u + .15).toFixed(2)}" y="${(r * 3.4 + .4).toFixed(2)}" width="2.1" height="2.6"/>`;
      return q + wins(w); };
    add({ id: 'nbRing', fp: [0, 0, 70, 60], draw: K => {
      let s = '';
      s += K.box(0, 0, Z0, 70, 14, 24, 'glb', { S: glass, N: glass, E: glass, W: glass });
      s += K.box(0, 14, Z0, 14, 46, 24, 'glb', { E: glass, W: glass, S: glass });
      s += K.box(56, 14, Z0, 14, 46, 24, 'glb', { E: glass, W: glass, S: glass });
      s += K.box(14, 46, Z0, 42, 14, 24, 'glb', { S: glass, N: glass });
      return s;
    } });
    const cube = (id, x, y, z, w, d, h) => add({ id, fp: [x, y, x + w, y + d], above: 'nbRing', draw: K => K.box(x, y, z, w, d, h, 'glb', { S: glass, E: glass, N: glass, W: glass }) });
    cube('nb1', 22, 18, Z0 + 24, 22, 20, 14); cube('nb2', 26, 14, Z0 + 38, 22, 20, 13); cube('nb3', 20, 20, Z0 + 51, 22, 18, 12); cube('nb4', 25, 16, Z0 + 63, 18, 16, 9);
    return { mods: M, lc: [35, 30], z0: 0, top: [34, 24, 74], label: 'NORD/LB', h: 74, len: 70 };
  });

  /* --- Niedersächsisches Landesmuseum (1902): Sandstein, Mittelrisalit mit drei hohen Bögen, Eckpavillons mit Kuppeln --- */
  ISO.landmark('landesmuseum', H => {
    const { f2, hl, vl, winA, wins, lathe, hip, saddle } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .6) + hl(0, len, 1.3) + hl(0, len, 9.6) + hl(0, len, 10.2), w = '';
      for (let v = 11.4; v < h - .6; v += 1.2) q += hl(0, len, v);
      const n = Math.floor((len - 2) / 4.2), off = (len - n * 4.2) / 2 + 2.1;
      for (let i = 0; i < n; i++) { const u = off + i * 4.2; w += winA(u - 1.2, 2, 2.4, 6, 1) + winA(u - 1, 11.6, 2, 4.4, 0); if (i < n - 1) q += vl(u + 2.1, 1.3, 9.6); }
      return q + wins(w); };
    // Hauptbau mit flachem Walmdach hinter der Balustrade; Eckpavillons mit Kuppeldach; Mittelrisalit mit drei Bogenfenstern, höher als die Flügel
    add({ id: 'lmMain', fp: [0, 0, 82, 30], draw: K => K.box(0, 0, Z0, 82, 30, 17, 'st', { S: fac, E: fac, W: fac, N: fac }) + saddle(K, [0, 30], [82, 30], [0, -30], Z0 + 17, Z0 + 19.6, 'sl') });
    const pav = x => add({ id: 'lmP' + x, fp: [x, -2, x + 14, 33], parent: 'lmMain', side: 'S', draw: K => {
      let s = K.box(x, -2, Z0, 14, 35, 20, 'st', { S: fac, E: fac, W: fac, N: fac }) + hip(K, x, -2, x + 14, 33, Z0 + 20, Z0 + 24, 'sl');
      return s + lathe(K, x + 7, 15, [[Z0 + 22, 2.6], [Z0 + 24.5, 2.6], [Z0 + 26, 1.9], [Z0 + 27.4, .8], [Z0 + 28.2, .3]], 'cu', 4, [1]);
    } });
    pav(0); pav(68);
    add({ id: 'lmRis', fp: [31, 30, 51, 34], parent: 'lmMain', side: 'S', draw: K => {
      const f = (len, h) => { let q = hl(0, len, .6) + hl(0, len, 1.3) + hl(0, len, h - 2.4) + vl(1.4, 1.3, h) + vl(len - 1.4, 1.3, h), w = '';
        [4.8, 10, 15.2].forEach(u => { w += winA(u - 1.8, 4.4, 3.6, 10, 2, ' hi'); });
        w += winA(len / 2 - 1.6, 1.8, 3.2, 5.4, 0, ' dim');
        return q + wins(w); };
      let s = K.box(31, 30, Z0, 20, 4, 22, 'st', { S: f, E: l => hl(0, l, .6) + hl(0, l, 19.6), W: l => hl(0, l, .6) + hl(0, l, 19.6), N: l => hl(0, l, .6) });
      s += hip(K, 31, 30, 51, 34, Z0 + 22, Z0 + 24.2, 'sl');
      return s;
    } });
    return { mods: M, lc: [41, 16], z0: 0, top: [41, 34, 28], label: 'Landesmuseum', h: 30, len: 82 };
  });

  /* --- Museum August Kestner: Würfel mit Wabenfassade aus Glasbausteinen über dunklem Sockel, rotes Band --- */
  ISO.landmark('kestner', H => {
    const { hl, wins } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => {
      let s = `<rect class="wn dim" data-f="2" x=".3" y=".6" width="${(len - .6).toFixed(2)}" height="${(h - 6.6).toFixed(2)}"/>`;
      // Waben: Raster aus Betonrahmen
      let d = ''; for (let v = .6; v <= h - 6; v += 1.6) d += `M0 ${v.toFixed(2)}H${len.toFixed(2)}`; for (let u = .3; u <= len; u += 1.6) d += `M${u.toFixed(2)} .6V${(h - 6).toFixed(2)}`;
      s += `<path class="kz" d="${d}"/><path class="kr" d="M0 ${(h * .42).toFixed(2)}H${len.toFixed(2)}"/>`;
      s += `<rect class="sl fr" x="0" y="${(h - 6).toFixed(2)}" width="${len.toFixed(2)}" height="6"/>`;
      let w = ''; for (let u = 2; u < len - 2; u += 4) w += H.winR(u, h - 4.6, 2.2, 2.6, 0);
      return wins(s + w) + hl(0, len, .3);
    };
    add({ id: 'kb', fp: [0, 0, 36, 36], draw: K => K.box(0, 0, Z0, 36, 36, 19, 'kc', { S: fac, E: fac, N: fac, W: fac }) });
    return { mods: M, lc: [18, 18], z0: 0, top: [18, 18, 21], label: 'Museum August Kestner', h: 21, len: 36 };
  });

  /* --- Wangenheimpalais (Laves): heller Putz, zwei Geschosse, Säulenvorbau mit Balkon, flaches Walmdach --- */
  ISO.landmark('wangenheim', H => {
    const { hl, vl, winR, wins, lathe, hip } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .5) + hl(0, len, 1.1) + hl(0, len, 6.4) + hl(0, len, h - 1.4), w = '';
      const n = Math.floor((len - 2) / 4), off = (len - n * 4) / 2 + 2;
      for (let i = 0; i < n; i++) { const u = off + i * 4; w += winR(u - .9, 1.9, 1.8, 3.4, 1) + winR(u - .9, 7.6, 1.8, 3.2, 0); }
      return q + wins(w); };
    add({ id: 'wp', fp: [0, 0, 60, 24], draw: K => K.box(0, 0, Z0, 60, 24, 13, 'pl', { S: fac, E: fac, W: fac }) + hip(K, 0, 0, 60, 24, Z0 + 13, Z0 + 17, 'sl') });
    add({ id: 'wpPort', fp: [22, 24, 38, 28.5], parent: 'wp', side: 'S', draw: K => {
      let s = K.box(22, 24, Z0, 16, 4.5, .8, 'st');
      for (let i = 0; i < 4; i++) s += lathe(K, 23.6 + i * 4.27, 27.6, [[Z0 + .8, .6], [Z0 + 6, .5], [Z0 + 6.4, .7]], 'st fr', 2);
      s += K.box(22, 24, Z0 + 6.4, 16, 4.5, .9, 'st', { S: l => hl(0, l, .4) });
      s += K.wall([22, 28.5], [38, 28.5], Z0 + 7.3, Z0 + 8.5, 'st', len => hl(0, len, .2) + Array.from({ length: Math.floor(len / .8) }, (_, i) => vl(.4 + i * .8, .2, 1.2)).join(''));
      return s;
    } });
    return { mods: M, lc: [30, 13], z0: 0, top: [30, 14, 18], label: 'Wangenheimpalais', h: 18, len: 60 };
  });

  /* --- Kreuzkirche (geweiht 1333): Backsteingotik, Westturm mit hohem, grünem Helm --- */
  ISO.landmark('kreuzkirche', H => {
    const { f2, hl, vl, winG, wins, lathe, roofPlane } = H, M = [], add = m => (M.push(m), m);
    add({ id: 'kkTower', fp: [0, 5, 10, 15], parent: 'kkNave', side: 'W', draw: K => {
      const f = (len, h) => H.groupM('bk', hl(0, len, .5) + hl(0, len, 8) + hl(0, len, 16)) + wins(winG(len / 2 - .8, 2, 1.6, 4.6, 4) + winG(len / 2 - .5, 10, 1, 3.4, 2)) + H.clockSVG(len / 2, 6.6 + 1.6, 1.3);
      let s = K.box(0, 5, Z0, 10, 10, 30, 'bk', { S: f, E: f, W: f, N: f });
      return s + lathe(K, 5, 10, [[Z0 + 30, 5.6], [Z0 + 31, 4.6], [Z0 + 36, 2], [Z0 + 46, .7], [Z0 + 56, .15]], 'cu', 4, [1]) + `<path class="dt cu-d" d="${K.path([[5, 10, Z0 + 56], [5, 10, Z0 + 59]])}"/>`;
    } });
    add({ id: 'kkNave', fp: [10, 0, 46, 20], draw: K => {
      const side = (len, h) => { let q = hl(0, len, .5) + hl(0, len, h - 1.4), w = ''; for (let u = 4; u < len - 2; u += 7) { w += winG(u - 1.3, 2, 2.6, h - 4.4, 1, ' dim'); q += vl(u + 3.5, 1, h); } return H.groupM('bk', q) + wins(w); };
      let s = K.box(10, 0, Z0, 36, 20, 13, 'bk', { S: side, E: (l, h) => H.groupM('bk', hl(0, l, .5)) + wins(winG(l / 2 - 1.6, 2, 3.2, h - 4, 1, ' hi')) });
      s += roofPlane(K, [[10, 20, Z0 + 13], [46, 20, Z0 + 13], [46, 10, Z0 + 27], [10, 10, Z0 + 27]]) + roofPlane(K, [[46, 0, Z0 + 13], [10, 0, Z0 + 13], [10, 10, Z0 + 27], [46, 10, Z0 + 27]]);
      s += K.wall([46, 20], [46, 0], Z0 + 13, Z0 + 13.01, 'bk', len => `<path class="bk sd" d="M0 0L${f2(len / 2)} -14L${f2(len)} 0Z"/>`);
      return s;
    } });
    return { mods: M, lc: [24, 10], z0: 0, top: [5, 10, 59], label: 'Kreuzkirche', h: 59, len: 46 };
  });

  /* --- Neustädter Hof- und Stadtkirche St. Johannis (1670): Sandsteinturm mit barocker Kupferhaube, heller Saal mit Ziegeldach und Gauben --- */
  ISO.landmark('neustaedter', H => {
    const { f2, hl, vl, winA, winR, wins, lathe, hip, saddle } = H, M = [], add = m => (M.push(m), m);
    add({ id: 'nsTower', fp: [6, 5, 18, 17], parent: 'nsNave', side: 'W', draw: K => {
      const f = (len, h) => hl(0, len, .5) + hl(0, len, 1.2) + hl(0, len, 10) + hl(0, len, 20) + hl(0, len, 30) + wins(winA(len / 2 - 1, 2, 2, 5.6, 4) + winA(len / 2 - 1, 12, 2, 6, 3) + winA(len / 2 - .7, 22, 1.4, 5, 2)) + H.clockSVG(len / 2, 9.2 - 1.4 + 1, 1.4);
      let s = K.box(6, 5, Z0, 12, 12, 40, 'rs', { S: f, E: f, N: f, W: f }) + K.box(5.6, 4.6, Z0 + 40, 12.8, 12.8, .8, 'rs');
      s += lathe(K, 12, 11, [[Z0 + 40.8, 4.6], [Z0 + 47, 4.6]], 'rs fr', 4, [1]);
      s += lathe(K, 12, 11, [[Z0 + 47, 5], [Z0 + 48, 4.6], [Z0 + 50.5, 3.4], [Z0 + 52, 1.8], [Z0 + 53, 1.6]], 'cu', 4, [1]);
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, 12, 11, [[Z0 + 53, 2.2], [Z0 + 57, 2.2]], '')}</g>` + lathe(K, 12, 11, [[Z0 + 53, 1.6], [Z0 + 57, 1.6]], 'lant', 4);
      s += lathe(K, 12, 11, [[Z0 + 57, 2], [Z0 + 58.4, 1.6], [Z0 + 60, .9], [Z0 + 61, 1.2], [Z0 + 62.4, .6], [Z0 + 68, .12]], 'cu', 3);
      return s;
    } });
    add({ id: 'nsNave', fp: [18, 0, 66, 22], draw: K => {
      const side = (len, h) => { let q = hl(0, len, .5) + hl(0, len, h - .8), w = ''; for (let u = 4; u < len - 2; u += 5.6) w += winA(u - 1.2, 2.2, 2.4, h - 4.4, 1, ' dim'); return q + wins(w); };
      let s = K.box(18, 0, Z0, 48, 22, 14, 'pl', { S: side, E: side });
      s += hip(K, 18, 0, 66, 22, Z0 + 14, Z0 + 25);
      for (let x = 24; x < 62; x += 7) { s += K.box(x - 1, 18.6, Z0 + 16.4, 2, 1.6, 2.2, 'pl', { S: () => wins(winR(.3, .3, 1.4, 1.5, 3)) }, false) + saddle(K, [x - 1.2, 20.2], [x + 1.2, 20.2], [0, -1.6], Z0 + 18.6, Z0 + 19.8); }
      return s;
    } });
    return { mods: M, lc: [36, 11], z0: 0, top: [12, 11, 68], label: 'Neustädter Hof- und Stadtkirche', h: 68, len: 60 };
  });

  /* --- Beginenturm (um 1357): runder Wehrturm aus Bruchstein mit Kegeldach --- */
  ISO.landmark('beginenturm', H => {
    const { f2, lathe } = H, M = [];
    M.push({ id: 'bt', fp: [0, 0, 10, 10], draw: K => {
      let s = lathe(K, 5, 5, [[Z0, 5], [Z0 + 19, 5]], 'rs fr', 0, [0, 1]);
      // Schießscharten und Rillen (nur sichtbare Seite)
      [[.6, 4], [1.2, 9], [.2, 14]].forEach(([a, z]) => { const p = K.P(5 + 5.05 * Math.cos(a), 5 + 5.05 * Math.sin(a), Z0 + z);
        s += `<rect class="wn dim" data-f="${Math.floor(z / 5)}" x="${f2(p[0] - .25)}" y="${f2(p[1] - 1)}" width=".5" height="2"/>`; });
      s += lathe(K, 5, 5, [[Z0 + 19, 5.4], [Z0 + 20, 5.4]], 'rs', 0);
      s += lathe(K, 5, 5, [[Z0 + 20, 5.6], [Z0 + 26, .2]], 'tl', 6);
      return s;
    } });
    return { mods: M, lc: [5, 5], z0: 0, top: [5, 5, 27], label: 'Beginenturm', h: 27, len: 10 };
  });

  /* --- Leibnizhaus: schmales Renaissance-Bürgerhaus, hoher Volutengiebel, mittlerer Erker (Utlucht) --- */
  ISO.landmark('leibnizhaus', H => {
    const { hl, vl, winR, wins, gable, saddle } = H, M = [], add = m => (M.push(m), m);
    const fac = (len, h) => { let q = hl(0, len, .5); for (let v = 3.6; v < h; v += 3.6) q += hl(0, len, v) + hl(0, len, v + .4); let w = '';
      for (let r = 0; r < 4; r++) [1.6, 4.4, len - 6.2, len - 3.4].forEach(u => { w += winR(u, 1 + r * 3.6, 1.6, 2.4, Math.min(4, 3 - r + 1)); });
      return q + wins(w); };
    add({ id: 'lh', fp: [0, 0, 20, 18], draw: K => {
      let s = K.box(0, 0, Z0, 20, 18, 16, 'st', { S: fac, E: (l, h) => hl(0, l, .5) + wins(winR(3, 2, 1.6, 2.4, 3) + winR(8, 2, 1.6, 2.4, 3)) });
      s += saddle(K, [0, 18], [20, 18], [0, -18], Z0 + 16, Z0 + 28);
      s += K.wall([0, 18], [20, 18], Z0 + 16, Z0 + 16.01, 'st', () => gable(20, 15, wins(winR(6.2, -6.4, 1.6, 2.4, 4) + winR(12.2, -6.4, 1.6, 2.4, 4) + winR(9.2, -11, 1.6, 2, 4))));
      return s;
    } });
    add({ id: 'lhErker', fp: [7, 18, 13, 20], parent: 'lh', side: 'S', draw: K => {
      const f = (len, h) => { let q = hl(0, len, .5); let w = ''; for (let r = 0; r < 3; r++) { q += hl(0, len, 3.4 + r * 3.6); w += winR(.7, 1 + r * 3.6, len - 1.4, 2.4, 4 - r); } return q + wins(w); };
      return K.box(7, 18, Z0 + 4, 6, 2, 11.5, 'st', { S: f, E: (l, h) => hl(0, l, .5), W: (l, h) => hl(0, l, .5) }) + K.box(6.8, 17.8, Z0 + 15.5, 6.4, 2.4, .8, 'st');
    } });
    return { mods: M, lc: [10, 9], z0: 0, top: [10, 18, 32], label: 'Leibnizhaus', h: 32, len: 20 };
  });

  /* --- Waterloosäule (Laves 1832): 46 m, Sockel, kannelierte Säule, Plattform mit Geländer, Viktoria --- */
  ISO.landmark('waterloo', H => {
    const { f2, hl, lathe } = H, M = [];
    M.push({ id: 'ws', fp: [0, 0, 9, 9], draw: K => {
      let s = K.box(0, 0, Z0, 9, 9, 1.4, 'st') + K.box(1, 1, Z0 + 1.4, 7, 7, 5.6, 'st', { S: l => hl(0, l, .6) + hl(0, l, 4.8), E: l => hl(0, l, .6) + hl(0, l, 4.8) }) + K.box(.7, .7, Z0 + 7, 7.6, 7.6, .8, 'st');
      s += lathe(K, 4.5, 4.5, [[Z0 + 7.8, 2.2], [Z0 + 9, 1.9], [Z0 + 38, 1.6], [Z0 + 39, 2.4]], 'st fr', 6, [1]);
      s += K.box(1.8, 1.8, Z0 + 39, 5.4, 5.4, .9, 'st');
      s += lathe(K, 4.5, 4.5, [[Z0 + 39.9, 1.6], [Z0 + 41.6, 1.4]], 'st fr', 0);
      const p = K.P(4.5, 4.5, Z0 + 41.6);
      s += `<path class="brz" d="M${f2(p[0] - .7)} ${f2(p[1])}l.2 -2.6 -.9 -1.2 .9 -.3 .3 -1.4 .6 .1 .2 1.3 1.2 .7 -.6 .5 .1 2.9Z"/>`;
      return s;
    } });
    return { mods: M, lc: [4.5, 4.5], z0: 0, top: [4.5, 4.5, 47], label: 'Waterloosäule', h: 47, len: 9 };
  });

  /* --- Kröpcke-Uhr: gusseiserne Uhrensäule mit vier Zifferblättern, Treffpunkt --- */
  ISO.landmark('kroepcke', H => {
    const { f2, lathe } = H, M = [];
    M.push({ id: 'ku', fp: [0, 0, 3, 3], draw: K => {
      let s = K.box(0, 0, Z0, 3, 3, .5, 'st') + K.box(.6, .6, Z0 + .5, 1.8, 1.8, 3.4, 'iron', { S: (l, h) => `<rect class="wn hi" data-f="0" x=".25" y=".6" width="${f2(l - .5)}" height="${f2(h - 1.2)}"/>`, E: (l, h) => `<rect class="wn" data-f="0" x=".25" y=".6" width="${f2(l - .5)}" height="${f2(h - 1.2)}"/>` });
      s += K.box(.45, .45, Z0 + 3.9, 2.1, 2.1, 1.6, 'iron', { S: l => H.clockSVG(l / 2, .8, .6), E: l => H.clockSVG(l / 2, .8, .6) });
      s += lathe(K, 1.5, 1.5, [[Z0 + 5.5, 1.1], [Z0 + 6.4, .6], [Z0 + 7, .25]], 'iron', 2);
      return s;
    } });
    return { mods: M, lc: [1.5, 1.5], z0: 0, top: [1.5, 1.5, 7.5], label: 'Kröpcke-Uhr', h: 7.5, len: 3 };
  });
})();


;/* ===== neues-rathaus.js ===== */
/* Neues Rathaus Hannover (1901–1913) — Modul für die Karte. Lokal: x Ost (0…130), y Süd (0 Nordflügel … 66 Südflügel), z Höhe; Gelände z = 3. */
ISO.landmark('neuesRathaus', H => {
  const { f2, rnd, vari, arch, hl, vl, winR, winA, wins, gable, lathe, hip, saddle } = H;
  const Z0 = 3, EA = 25, RG = 37;
  const DC = [65, 35];
  /* ---------- Fassaden (Wandkoordinaten: u nach rechts, v nach unten ab Traufe) ---------- */
  function facadeMain(len, h, step = 4.3) {
    let s = hl(0, len, .6) + hl(0, len, 1.3) + hl(0, len, 7.1) + hl(0, len, 14.5) + hl(0, len, 15.1);
    for (let v = 16.5; v < h; v += 1.4) s += hl(0, len, v);
    let w = '';
    const n = Math.max(1, Math.floor((len - 2) / step)), off = (len - n * step) / 2 + step / 2;
    for (let i = 0; i < n; i++) {
      const u = off + i * step;
      w += winR(u - 1.1, 2.3, 2.2, 3.7, 2) + winA(u - 1.25, 8.2, 2.5, 5.6, 1) + winA(u - 1.1, 16.4, 2.2, 4.6, 0);
      if (i < n - 1) s += vl(u + step / 2, 1.3, 14.5) + vl(u + step / 2 + .5, 1.3, 14.5);
    }
    return s + wins(w);
  }
  function facadeCourt(len, h) {
    let s = hl(0, len, .7) + hl(0, len, 7.2) + hl(0, len, 14.6), w = '';
    for (let u = 3; u < len - 1; u += 4.2) w += winR(u - 1, 2.6, 2, 3.4, 2) + winR(u - 1, 8.8, 2, 4.4, 1) + winR(u - 1, 16, 2, 4, 0);
    return s + wins(w);
  }
  const facadeFn = (step) => (len, h) => facadeMain(len, h, step);

  /* ---------- Baugruppen ----------
     Jede Gruppe: fp = Grundriss zum Sortieren [x0,y0,x1,y1], draw(K), optional parent + side (Anbau an Seite S/N/E/W) oder above (steht darauf) */
  const M = [];
  const add = m => (M.push(m), m);
  const N_ = { S: [0, 1], N: [0, -1], E: [1, 0], W: [-1, 0] };

  // Flügel
  add({ id: 'north', fp: [0, 0, 130, 16], draw: K => K.box(0, 0, Z0, 130, 16, EA - Z0, 'st', { N: facadeFn(4.3), S: facadeCourt, E: facadeFn(4.3), W: facadeFn(4.3) })
      + hip(K, 0, 0, 130, 16, EA, RG) + roofGables(K, 'N') });
  add({ id: 'south', fp: [0, 50, 130, 66], draw: K => K.box(0, 50, Z0, 130, 16, EA - Z0, 'st', { S: facadeFn(4.3), N: facadeCourt, E: facadeFn(4.3), W: facadeFn(4.3) })
      + hip(K, 0, 50, 130, 66, EA, RG) + roofGables(K, 'S') });
  add({ id: 'west', fp: [0, 16, 16, 50], draw: K => K.box(0, 16, Z0, 16, 34, EA - Z0, 'st', { W: facadeFn(4.3), E: facadeCourt }) + hip(K, 0, 12, 16, 54, EA, RG) });
  add({ id: 'east', fp: [114, 16, 130, 50], draw: K => K.box(114, 16, Z0, 16, 34, EA - Z0, 'st', { E: facadeFn(4.3), W: facadeCourt }) + hip(K, 114, 12, 130, 54, EA, RG) });
  add({ id: 'center', fp: [50, 16, 80, 50], draw: K => K.box(50, 16, Z0, 30, 34, EA - Z0, 'st', { E: facadeCourt, W: facadeCourt }) + hip(K, 50, 14, 80, 52, EA, RG + 2) });

  // Zwerchhäuser mit Volutengiebeln auf den Dächern (Süd- und Nordseite)
  function roofGables(K, side) {
    const xs = side === 'S' ? [34, 84] : [6, 24, 88, 106];
    let s = '';
    xs.forEach(x => {
      const w = 12, yF = side === 'S' ? 66 : 0, back = side === 'S' ? [0, -7] : [0, 7];
      const L = side === 'S' ? [x, yF] : [x + w, yF], R = side === 'S' ? [x + w, yF] : [x, yF];
      if (!K.wallVisible(L, R)) return;
      s += saddle(K, L, R, back, EA + 1, EA + 12);
      s += K.wall(L, R, EA, EA + .01, 'st', (len) => gable(len, 12, wins(winA(len / 2 - 2.7, -7, 2.3, 3.8, 3) + winA(len / 2 + .4, -7, 2.3, 3.8, 3)) + `<circle class="dt" cx="${f2(len / 2)}" cy="-9.6" r=".9"/>`));
    });
    // kleine Gauben dazwischen
    const gx = side === 'S' ? [8, 16, 48, 80, 114, 122] : [44, 52, 78, 86];
    gx.forEach(x => {
      const y = side === 'S' ? 60.5 : 2.5;
      s += K.box(x - 1.3, y, EA + 4, 2.6, 3, 3.2, 'st', side === 'S'
        ? { S: () => wins(winR(.5, .6, 1.6, 2.2, 4)) } : { N: () => wins(winR(.5, .6, 1.6, 2.2, 4)) });
      s += saddle(K, side === 'S' ? [x - 1.6, y + 3] : [x + 1.6, y], side === 'S' ? [x + 1.6, y + 3] : [x - 1.6, y], side === 'S' ? [0, -3] : [0, 3], EA + 7.2, EA + 8.8);
    });
    return s;
  }

  // Kuppelturm mit Uhren, Ecktürmchen, Kuppel, Laterne
  add({ id: 'dome', fp: [54, 24, 76, 46], above: 'center', draw: K => {
    const T = [54, 24, 22], TZ = 66;
    const tw = (x, y) => K.box(x, y, TZ - 10, 4, 4, 13, 'st', { S: () => vl(2, 2, 10), N: () => vl(2, 2, 10), E: () => vl(2, 2, 10), W: () => vl(2, 2, 10) })
      + lathe(K, x + 2, y + 2, [[TZ + 3, 2.4], [TZ + 4.5, 2.2], [TZ + 6.5, 1.3], [TZ + 7.5, .5]], 'cu', 3) + `<path class="dt cu-d" d="${K.path([[x + 2, y + 2, TZ + 7.5], [x + 2, y + 2, TZ + 10]])}"/>`;
    const face = clockFace => (len) => {
      let x = hl(0, 22, .8) + hl(0, 22, 1.8) + hl(0, 22, 12) + hl(0, 22, 26) + vl(2.5, 1.8, 30) + vl(19.5, 1.8, 30) + vl(3.1, 1.8, 30) + vl(18.9, 1.8, 30);
      let w = winA(5, 14, 4.6, 10, 3) + winA(12.4, 14, 4.6, 10, 3) + winA(4.2, 28, 2.4, 4, 2) + winA(9.8, 28, 2.4, 4, 2) + winA(15.4, 28, 2.4, 4, 2);
      if (!clockFace) w += `<circle class="wn" data-f="4" cx="11" cy="6.6" r="3.4"/>`;
      x += `<path class="dt" d="M5 25V19M17 25V19"/>`;
      return x + wins(w) + (clockFace ? H.clockSVG(11, 6.6, 3.9) : '');
    };
    // Ecktürmchen hinten zuerst (nach Blickrichtung sortiert)
    const corners = [[T[0], T[1]], [T[0] + T[2] - 4, T[1]], [T[0], T[1] + T[2] - 4], [T[0] + T[2] - 4, T[1] + T[2] - 4]]
      .map(([x, y]) => ({ x, y, d: K.depth(x + 2, y + 2) })).sort((a, b) => a.d - b.d);
    let s = corners.slice(0, 3).map(c => tw(c.x, c.y)).join('');
    s += K.box(T[0], T[1], EA - 6, T[2], T[2], TZ - (EA - 6), 'st', { S: face(true), N: face(true), E: face(false), W: face(false) });
    s += K.box(T[0] - .5, T[1] - .5, TZ, T[2] + 1, T[2] + 1, 1.4, 'st');
    const KR = 10.4;
    s += lathe(K, ...DC, [[TZ + 1.4, KR + .4], [TZ + 3.6, KR + .4]], 'st fr', 0, [1]);
    const prof = []; for (let i = 0; i <= 14; i++) { const t = i / 14; prof.push([TZ + 3.6 + 14 * t, KR * Math.pow(1 - Math.pow(t, 1.9), .62) + .25 * (1 - t)]); }
    s += lathe(K, ...DC, prof, 'cu', 9, [3, 7, 11]);
    let lk = '';
    for (let i = 0; i < 12; i++) {
      const a = Math.PI * 2 * (i + .5) / 12; if (K.facing(Math.cos(a), Math.sin(a)) < .25) continue;
      const t = .22, r = KR * Math.pow(1 - Math.pow(t, 1.9), .62) + .4, c = K.P(DC[0] + r * Math.cos(a), DC[1] + r * Math.sin(a), TZ + 3.6 + 14 * t);
      lk += `<path class="wn" data-f="4" d="M${f2(c[0] - .9)} ${f2(c[1] + 1.4)}V${f2(c[1] - .4)}A.9 .9 0 0 1 ${f2(c[0] + .9)} ${f2(c[1] - .4)}V${f2(c[1] + 1.4)}Z"/>`;
    }
    s += wins(lk);
    const LZ = TZ + 17.6;
    s += lathe(K, ...DC, [[LZ, 3.4], [LZ + .8, 3.4]], 'cu');
    s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, ...DC, [[LZ + .8, 4.6], [LZ + 5.6, 4.6]], '')}</g>`;
    s += lathe(K, ...DC, [[LZ + .8, 2.8], [LZ + 5.6, 2.8]], 'lant', 6);
    s += lathe(K, ...DC, [[LZ + 5.6, 3.2], [LZ + 6.4, 3.2], [LZ + 7.6, 2.4], [LZ + 8.6, 1.2], [LZ + 9.4, .9]], 'cu', 4);
    s += lathe(K, ...DC, [[LZ + 9.4, 1], [LZ + 12, 1]], 'cu', 2);
    s += lathe(K, ...DC, [[LZ + 12, 1.3], [LZ + 12.8, 1.1], [LZ + 13.6, .4]], 'cu');
    s += `<path class="dt cu-d" d="${K.path([[...DC, LZ + 13.6], [...DC, 98.5]])}"/>`;
    s += tw(corners[3].x, corners[3].y);
    return s;
  } });

  // Südseite: Mittelrisalit mit großem Giebel
  add({ id: 'risS', fp: [48, 66, 82, 70], parent: 'south', side: 'S', draw: K => {
    let s = saddle(K, [48, 70], [82, 70], [0, -14], 30, 46);
    s += `<g class="flood"><rect transform="${K.plane([46, 72, 30], [1, 0, 0], [0, 0, -1])}" width="38" height="27" fill="url(#hallglow)"/></g>`;
    s += K.box(48, 66, Z0, 34, 4, 30 - Z0, 'st', { S: () => {
      let q = hl(0, 34, .6) + hl(0, 34, 1.4) + hl(0, 34, 7.4) + hl(0, 34, 8) + hl(0, 34, 18.6) + hl(0, 34, 19.2);
      for (let v = 20.6; v < 27; v += 1.4) q += hl(0, 34, v);
      [3.4, 10.9, 17.9, 25.4, 31.6].forEach(u => { q += vl(u - .3, 8, 18.6) + vl(u + .3, 8, 18.6); });
      let w = [3.4, 9.7, 16, 22.3, 28.6].map(u => winR(u, 2.4, 2.2, 4, 2)).join('');
      w += [5, 12.5, 19.5, 27].map(u => winA(u - 1.6, 9.2, 5.6, 9, 1, ' hi')).join('');
      w += [6.2, 14.6, 23].map(u => winA(u, 19.8, 4.8, 7.2, 0)).join('');
      return q + `<path class="dt" d="M2 18.2H32M2 17H32"/>` + wins(w);
    }, E: (l) => hl(0, l, .6) + hl(0, l, 8), W: (l) => hl(0, l, .6) + hl(0, l, 8) });
    s += K.wall([48, 70], [82, 70], 30, 30.01, 'st', () => gable(34, 17, `<circle class="dt" cx="17" cy="-8.6" r="3.6"/>` + wins(`<circle class="wn hi" data-f="4" cx="17" cy="-8.6" r="2.7"/>` + winA(8.4, -6.4, 2.6, 4.4, 4) + winA(23, -6.4, 2.6, 4.4, 4) + winA(16, -15.6, 2, 3, 4))));
    return s;
  } });
  // Südseite: Freitreppe, Terrasse wird im Gelände gezeichnet
  // Seitentürme mit Kupferhauben (Südfassade)
  const sideTower = x => K => {
    let t = K.box(x, 64, Z0, 10, 4, 34 - Z0, 'st', { S: () => { let q = hl(0, 10, 9) + hl(0, 10, 16.4) + hl(0, 10, 17); for (let v = 18.4; v < 31; v += 1.4) q += hl(0, 10, v);
      return q + wins(winA(3.6, 2, 2.8, 5.5, 2) + winA(3.6, 10.2, 2.8, 5.4, 1) + winA(3.8, 23, 2.4, 4.6, 0)); } });
    const belfry = () => `${hl(0, 10, 1)}${hl(0, 10, 9.4)}${hl(0, 10, 10)}${vl(.8, 1, 22)}${vl(9.2, 1, 22)}` + wins(winA(1.6, 2.4, 2.8, 6.2, 4) + winA(5.6, 2.4, 2.8, 6.2, 4) + winA(3.4, 12, 3.2, 6, 3));
    t += K.box(x, 58, 34, 10, 10, 22, 'st', { S: belfry, N: belfry, E: belfry, W: belfry });
    t += K.box(x - .6, 57.4, 56, 11.2, 11.2, 1.3, 'st');
    t += lathe(K, x + 5, 63, [[57.3, 5.2], [58.6, 5.4], [60.2, 4.6], [61.8, 2.6], [62.8, 1.6]], 'cu', 5, [1]);
    t += lathe(K, x + 5, 63, [[62.8, 1.7], [66, 1.7]], 'cu', 3);
    t += lathe(K, x + 5, 63, [[66, 2.1], [67, 1.9], [69, .8], [70.5, .4]], 'cu', 3);
    return t + `<path class="dt cu-d" d="${K.path([[x + 5, 63, 70.5], [x + 5, 63, 78]])}"/>`;
  };
  add({ id: 'twW', fp: [20, 64, 30, 68], parent: 'south', side: 'S', draw: sideTower(20) });
  add({ id: 'twE', fp: [100, 64, 110, 68], parent: 'south', side: 'S', draw: sideTower(100) });

  // Eckpavillons mit Giebeln (Süd und Nord)
  const pavilion = (x, side) => K => {
    const yF = side === 'S' ? 68 : -2, y0 = side === 'S' ? 64 : -2;
    const L = side === 'S' ? [x, yF] : [x + 14, yF], R = side === 'S' ? [x + 14, yF] : [x, yF];
    let t = saddle(K, L, R, side === 'S' ? [0, -9] : [0, 9], EA, EA + 13);
    t += K.box(x, y0, Z0, 14, 4, EA - Z0, 'st', { [side]: (l, h) => facadeMain(l, h, 4.6), E: l => hl(0, l, .6), W: l => hl(0, l, .6) });
    t += K.wall(L, R, EA, EA + .01, 'st', () => gable(14, 14, wins(winA(4.2, -8, 2.2, 4, 3) + winA(7.6, -8, 2.2, 4, 3) + winA(6, -12.4, 2, 2.4, 4))));
    return t;
  };
  add({ id: 'pSW', fp: [0, 64, 14, 68], parent: 'south', side: 'S', draw: pavilion(0, 'S') });
  add({ id: 'pSE', fp: [116, 64, 130, 68], parent: 'south', side: 'S', draw: pavilion(116, 'S') });
  add({ id: 'pNW', fp: [0, -2, 14, 2], parent: 'north', side: 'N', draw: pavilion(0, 'N') });
  add({ id: 'pNE', fp: [116, -2, 130, 2], parent: 'north', side: 'N', draw: pavilion(116, 'N') });

  // Ost- und Westseite: Mittelrisalite mit Giebel
  const sideRis = side => K => {
    const x = side === 'E' ? 130 : -3, L = side === 'E' ? [133, 44] : [-3, 22], R = side === 'E' ? [133, 22] : [-3, 44];
    let t = saddle(K, L, R, side === 'E' ? [-9, 0] : [9, 0], EA, EA + 13);
    t += K.box(x, 22, Z0, 3, 22, EA - Z0, 'st', { [side]: (l, h) => facadeMain(l, h, 4.4), N: l => hl(0, l, .6), S: l => hl(0, l, .6) });
    t += K.wall(L, R, EA, EA + .01, 'st', () => gable(22, 15, wins(winA(7, -8.4, 2.4, 4.4, 3) + winA(12.6, -8.4, 2.4, 4.4, 3)) + `<circle class="dt" cx="11" cy="-11.4" r="1.4"/>`));
    return t;
  };
  add({ id: 'risE', fp: [130, 22, 133, 44], parent: 'east', side: 'E', draw: sideRis('E') });
  add({ id: 'risW', fp: [-3, 22, 0, 44], parent: 'west', side: 'W', draw: sideRis('W') });

  // Nordseite (Trammplatz): Eingangsrisalit mit Loggia, Welscher Haube und zwei Achtecktürmen
  add({ id: 'risN', fp: [51, -5, 79, 0], parent: 'north', side: 'N', draw: K => {
    let s = K.box(51, -5, Z0, 28, 5, 30 - Z0, 'st', { N: () => {
      let q = hl(0, 28, .6) + hl(0, 28, 1.4) + hl(0, 28, 7.6) + hl(0, 28, 8.2) + hl(0, 28, 18.4) + hl(0, 28, 19);
      for (let v = 20.4; v < 27; v += 1.4) q += hl(0, 28, v);
      // Loggia: vier Säulen vor dunklen Bögen
      let w = [3, 9.3, 15.6, 21.9].map(u => winA(u, 9.2, 3.6, 8.4, 1, ' hi')).join('');
      [2.2, 8.5, 14.8, 21.1, 27.4].forEach(u => { q += `<rect class="st fr" x="${f2(u - .45)}" y="9" width=".9" height="9.4"/>`; });
      w += [4, 9.6, 15.2, 20.8].map(u => winR(u, 2.4, 2.2, 4, 2)).join('');
      w += winA(10.6, 20, 6.8, 7, 0, ' hi') + winA(3.4, 20.8, 3.6, 6, 0) + winA(21, 20.8, 3.6, 6, 0);
      return q + `<path class="dt" d="M1 18H27M1 17.2H27"/>` + wins(w);
    }, E: l => hl(0, l, .6) + hl(0, l, 8.2), W: l => hl(0, l, .6) + hl(0, l, 8.2) });
    s += lathe(K, 65, -1.5, [[30, 9.6], [31.2, 9.8], [34, 8.4], [36.6, 5.2], [38.4, 3.4]], 'cu', 6, [1]);
    s += lathe(K, 65, -1.5, [[38.4, 1.8], [41.4, 1.8]], 'lant', 4);
    s += lathe(K, 65, -1.5, [[41.4, 2.2], [42.4, 1.9], [44, .7]], 'cu', 3);
    return s + `<path class="dt cu-d" d="${K.path([[65, -1.5, 44], [65, -1.5, 49]])}"/>`;
  } });
  const octo = cx => K => {
    const cy = -3, r = 4.4, z1 = 38;
    // Achteckwände, von hinten nach vorn
    const pts = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const walls = pts.map((p, i) => ({ L: p, R: pts[(i + 1) % 8] }));
    const depth = w => K.depth((w.L[0] + w.R[0]) / 2, (w.L[1] + w.R[1]) / 2);
    let s = '';
    walls.sort((a, b) => depth(a) - depth(b)).forEach(w => {
      s += K.wall(w.L, w.R, Z0, z1, 'st', (len) => hl(0, len, .6) + hl(0, len, 8) + hl(0, len, 14.6) + hl(0, len, 21)
        + wins(winA(len / 2 - .9, 2, 1.8, 4.4, 3) + winA(len / 2 - .9, 9.6, 1.8, 3.8, 2) + winA(len / 2 - .9, 16, 1.8, 3.8, 1) + winA(len / 2 - .8, 26, 1.6, 4, 0)));
    });
    s += lathe(K, cx, cy, [[z1, r + .3], [z1 + 1, r + .3]], 'st fr');
    s += lathe(K, cx, cy, [[z1 + 1, r], [z1 + 3, r * .95], [z1 + 5, r * .6], [z1 + 6.2, 1.2]], 'cu', 4, [1]);
    s += lathe(K, cx, cy, [[z1 + 6.2, 1], [z1 + 8.4, 1]], 'cu', 2);
    return s + `<path class="dt cu-d" d="${K.path([[cx, cy, z1 + 8.4], [cx, cy, z1 + 13]])}"/>`;
  };
  add({ id: 'octW', fp: [43, -7.4, 51, 1], parent: 'north', side: 'N', draw: octo(47) });
  add({ id: 'octE', fp: [79, -7.4, 87, 1], parent: 'north', side: 'N', draw: octo(83) });

  // Laternen, Bäume, Büsche als eigene Gruppen (richtig sortiert in jeder Ansicht)
  const lamp = (x, y) => add({ id: `l${x}_${y}`, fp: [x - .5, y - .5, x + .5, y + .5], obj: true, draw: K => {
    const a = K.P(x, y, Z0), b = K.P(x, y, Z0 + 5.6), c = K.P(x, y, Z0 + 6.2);
    return `<path class="pole" d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}"/><circle class="lamp-g" cx="${f2(c[0])}" cy="${f2(c[1])}" r="3.4" filter="url(#bloom)"/><circle class="lamp" cx="${f2(c[0])}" cy="${f2(c[1])}" r=".85"/>`;
  } });
  [[44, 82], [86, 82], [10, 82], [120, 82], [44, -12], [86, -12], [20, -26], [110, -26], [-10, 22], [-10, 46], [140, 22], [140, 46]].forEach(([x, y]) => lamp(x, y));
  const tree = (x, y, r) => add({ id: `t${x}_${y}`, fp: [x - r * .7, y - r * .7, x + r * .7, y + r * .7], obj: true, draw: K => {
    const a = K.P(x, y, Z0), b = K.P(x, y, Z0 + r * 1.2); let t = `<path class="trunk" d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}"/>`;
    [[0, 1.9, 1], [-.6, 1.4, .8], [.7, 1.5, .75], [0, 2.6, .7]].forEach(([dx, dz, s]) => { const c = K.P(x + dx * r, y - dx * r, Z0 + r * dz); t += `<circle class="tree" cx="${f2(c[0])}" cy="${f2(c[1])}" r="${f2(r * s)}"/>`; });
    return t;
  } });
  [[-22, 4, 7], [-24, 34, 8], [-22, 64, 7], [-24, 96, 7], [152, 4, 7], [154, 34, 8], [152, 66, 7.5], [154, 98, 7], [-20, -30, 7], [150, -30, 7]].forEach(a => tree(...a));
  const bush = (x, y, r) => add({ id: `b${x}_${y}`, fp: [x - r, y - r, x + r, y + r], obj: true, draw: K => {
    const c = K.P(x, y, Z0 + r * .8);
    return `<ellipse class="bush" cx="${f2(c[0])}" cy="${f2(c[1])}" rx="${f2(r * 1.25)}" ry="${f2(r * .95)}"/><path class="bush-d" d="M${f2(c[0] - r * .7)} ${f2(c[1] - r * .1)}q${f2(r * .7)} ${f2(-r * .6)} ${f2(r * 1.4)} 0"/>`;
  } });
  bush(38, 78, 5.2); bush(92, 78, 5.2);


  const ground = K => K.box(-14, -12, 0, 158, 96, Z0, 'ter', {}, true) + `<rect class="court" transform="${K.TOP(16, 16, Z0)}" width="34" height="34"/><rect class="court" transform="${K.TOP(80, 16, Z0)}" width="34" height="34"/>`;
  return { mods: M, lc: [65, 33], z0: 0, ground, top: [65, 35, 99], label: 'Neues Rathaus', h: 99, len: 132 };
});


;/* ===== welfenschloss.js ===== */
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

