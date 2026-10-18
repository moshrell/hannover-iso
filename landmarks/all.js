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


;/* ===== christuskirche.js ===== */
/* Christuskirche Hannover (Nordstadt) – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Turm im Westen (x klein), Chor im Osten.
   Grundriss aus dem OSM-Umriss (way 7655778, um 4,9° gedreht: lange Achse = x), Höhen und Ornamente nach den Fotos in ref/christuskirche/ (Wikimedia Commons, Quellen in quellen.txt).
   Architekt Conrad Wilhelm Hase, 1859–1864, neugotischer Backsteinbau mit Sandsteinzier (Fialen, Wimperge, Maßwerk). Alles selbst gezeichnet, nichts kopiert.
   Sichtbar sind in der Karte nur Süd- und Ostseiten; West- (Portalvorhalle, Rose) und Nordseiten sind nur in groben Zügen vorhanden, siehe ref/christuskirche/README.md. */
ISO.landmark('christuskirche', H => {
  const { f2, hl, vl, wins, garch, niche, louvre, groupM, clockSVG, roofPlane } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const Zh = z => Z0 + z;                    // Höhe über Gelände -> lokales z
  const YC = 17.7;                           // Mittelachse des Schiffs
  // Höhen (m über Gelände), geschätzt aus den Fotos (Maßstab: Portalbreite / Strebepfeilerabstand aus OSM)
  const AE = 14.5, NE = 21, NR = 28.5, TE = 19.5, TR = 30, CE = 15.7, CR = 23.5, TA = 33, TB = 42.5, SP0 = 42.5, TIP = 70;

  /* ---------- Hilfen ---------- */
  const shadeK = (K, nx, ny) => { const co = (K.view[0] + K.view[1]) / 2, si = (K.view[0] - K.view[1]) / 2; return ny * co + nx * si >= nx * co - ny * si ? 'fr' : 'sd'; };
  const crs = (len, h, z0, z1, step) => { let d = ''; for (let z = z0; z < z1; z += step) d += `M0 ${f2(h - z)}H${f2(len)}`; return `<path class="dt" d="${d}"/>`; };
  const band = (sh, len, h, z, t = .3) => `<rect class="st ${sh}" x="0" y="${f2(h - z - t)}" width="${f2(len)}" height="${f2(t)}"/>`;
  const arcade = (len, h, z0, z1, pitch) => { let d = ''; for (let u = pitch * .5; u + pitch * .8 <= len; u += pitch) d += garch(u, h - z1, pitch * .72, z1 - z0); return `<path class="dt" d="${d}"/>`; };
  // Spitzbogenfenster (Rahmen aus Rollschicht + Fenster mit Pfosten, Querriegeln und Maßwerkkreis); Wandkoordinaten: u Mitte, z Höhe ab Wandfuß
  const lan = (h, u, zb, zt, w, f = 1, n = 2) => {
    const y = h - zt, hh = zt - zb, x = u - w / 2; let d = '';
    for (let k = 1; k < n; k++) d += `M${f2(x + w * k / n)} ${f2(y + w * .55)}V${f2(y + hh)}`;
    d += `M${f2(x)} ${f2(y + hh * .6)}H${f2(x + w)}M${f2(x)} ${f2(y + hh * .8)}H${f2(x + w)}`;
    return {
      fr: `<path class="dt" d="${garch(x - .35, y - .35, w + .7, hh + .35)}"/><path class="dt" d="${garch(x - .8, y - .8, w + 1.6, hh + .8)}"/>`,
      wn: `<path class="wn" data-f="${f}" d="${garch(x, y, w, hh)}"/><path class="mul" d="${d}"/><circle class="mul" cx="${f2(u)}" cy="${f2(y + w * .62)}" r="${f2(w * .17)}"/>`,
    };
  };
  const oc = (cx, cy, r, f = 3) => {
    let d = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; d += `M${f2(cx + r * .3 * Math.cos(a))} ${f2(cy + r * .3 * Math.sin(a))}L${f2(cx + r * Math.cos(a))} ${f2(cy + r * Math.sin(a))}`; }
    return {
      fr: `<circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .3)}"/><circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .62)}"/>`,
      wn: `<circle class="wn" data-f="${f}" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}"/><path class="mul" d="${d}"/><circle class="mul" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * .3)}"/>`,
    };
  };
  // steiler Backsteingiebel mit Sandsteinrand, Krabben und Kreuzblume (Wandkoordinaten: Giebelfuß y = 0, nach oben negativ)
  const gab = (len, rise, sh, extra = '') => {
    const um = len / 2, L = Math.hypot(um, rise), nx = rise / L, ny = um / L; let s = `<path class="bk ${sh}" d="M0 0L${f2(um)} ${f2(-rise)}L${f2(len)} 0Z"/>`;
    s += `<path class="st ${sh}" d="M0 0L${f2(um)} ${f2(-rise)}L${f2(um)} ${f2(-rise + .95)}L.4 0ZM${f2(len)} 0L${f2(um)} ${f2(-rise)}L${f2(um)} ${f2(-rise + .95)}L${f2(len - .4)} 0Z"/>`;
    let cr = ''; for (let t = .12; t < .95; t += .95 / Math.max(3, Math.round(L / 1.1))) { const x = um * t, y = -rise * t; cr += `<circle class="st ${sh}" cx="${f2(x - nx * .32)}" cy="${f2(y - ny * .32)}" r=".2"/><circle class="st ${sh}" cx="${f2(len - x + nx * .32)}" cy="${f2(y - ny * .32)}" r=".2"/>`; }
    s += cr + `<path class="st ${sh}" d="M${f2(um - .22)} ${f2(-rise + .2)}h.44v-1.1h-.44Z"/><path class="dt" d="M${f2(um)} ${f2(-rise - 1.1)}v-.9M${f2(um - .35)} ${f2(-rise - 1.7)}h.7"/>`;
    return s + extra;
  };
  // Fiale: quadratischer Schaft + Pyramidenhelm
  const pin = (K, cx, cy, zb, zt, w, mat = 'bk', cap = 'st') => {
    const a = w / 2, ch = w * 2.6, zs = zt - ch, c = [[cx - a, cy - a], [cx + a, cy - a], [cx + a, cy + a], [cx - a, cy + a]];
    let s = K.box(cx - a, cy - a, zb, w, w, zs - zb, mat, {}, false);
    for (let i = 0; i < 4; i++) s += K.face([[...c[i], zs], [...c[(i + 1) % 4], zs], [cx, cy, zt]], cap);
    return s;
  };
  // Strebepfeiler: Stufen [Oberkante z, Einzug], Sandstein-Abdeckungen, Fialen oben
  const pier = (K, x0, y0, x1, y1, stages, top) => {
    let s = '', zp = Z0, r = [x0, y0, x1, y1];
    stages.forEach(([zt, ins], i) => {
      const q = [x0 + ins, y0 + ins, x1 - ins, y1 - ins];
      s += K.box(q[0], q[1], zp, q[2] - q[0], q[3] - q[1], zt - zp, 'bk', {}, false);
      const nq = stages[i + 1] ? [x0 + stages[i + 1][1], y0 + stages[i + 1][1], x1 - stages[i + 1][1], y1 - stages[i + 1][1]] : null;
      if (nq) {
        s += K.face([[q[0], q[3], zt], [q[2], q[3], zt], [nq[2], nq[3], zt + .5], [nq[0], nq[3], zt + .5]], 'st');
        s += K.face([[q[2], q[3], zt], [q[2], q[1], zt], [nq[2], nq[1], zt + .5], [nq[2], nq[3], zt + .5]], 'st');
        zp = zt;
      } else { zp = zt; r = q; }
    });
    if (top) s += top(K, r, zp);
    return s;
  };
  const crown = (K, r, z, zt, w = .9) => pin(K, (r[0] + r[2]) / 2, (r[1] + r[3]) / 2, z, zt, w);

  /* ---------- Turm (Westseite, 10,6 x 12 m, mit Spitzhelm) ---------- */
  const TX0 = 5.8, TX1 = 17.8, TY0 = 12.5, TY1 = 23.1, TCX = 11.8, TCY = 17.8;
  add({ id: 'tower', fp: [TX0, TY0, TX1, TY1], draw: K => {
    const A = sh => (len, h) => {
      const cl = sh === 'fr' ? clockSVG(len / 2, h - 30.9, 1.45) : '';
      return groupM('bk', crs(len, h, 14, 25.4, 1.3) + `<rect class="st ${sh}" x="0" y="${f2(h - TA)}" width=".5" height="${f2(TA - 14)}"/><rect class="st ${sh}" x="${f2(len - .5)}" y="${f2(h - TA)}" width=".5" height="${f2(TA - 14)}"/>`
        + band(sh, len, h, 25.6) + arcade(len, h, 26.3, 28.4, 1.25) + band(sh, len, h, 28.6, .25) + band(sh, len, h, TA - .6, .6) + cl);
    };
    // Glockengeschoss (schmaler): Schallluke mit Jalousien, zwei Blendnischen, Eckfialen
    const B = sh => (len, h) => {
      const c = len / 2;
      return groupM('bk', `<path class="dt" d="${garch(c - 1.15, 1.0, 2.3, 7.4)}M${f2(c - 1.6)} 1.2"/>` + `<path class="dt" d="${garch(c - 1.55, .6, 3.1, 7.8)}"/>`
        + louvre(c - .8, 1.3, 1.6, 7.0) + niche(c - 3.0, 2.4, .9, 5.6) + niche(c + 2.1, 2.4, .9, 5.6) + band(sh, len, h, 0, .45) + band(sh, len, h, h - .45, .45));
    };
    let s = K.box(TX0, TY0, Zh(0), TX1 - TX0, TY1 - TY0, TA, 'bk', { S: A('fr'), E: A('sd') }, true);
    const bx = 7.2, by = 13.2, bw = 9.2;
    s += K.box(bx, by, Zh(TA), bw, bw, TB - TA, 'bk', { S: B('fr'), E: B('sd') }, true);
    // Fialencluster auf den Ecken des Unterbaus
    [[6.5, 13.2], [17.1, 13.2], [6.5, 22.4], [17.1, 22.4]].forEach(([x, y]) => { s += pin(K, x, y, Zh(TA), Zh(TA + 5.4), .9); });
    // Spitzhelm: Achteck (Flächen zu den Himmelsrichtungen), dunkler Stein mit Bändern, Krabben an den Graten, Luken, Kreuz
    const R0 = 3.6, zb = Zh(SP0), zt = Zh(TIP), rr = z => R0 * (zt - z) / (zt - zb);
    const V = (k, z) => { const a = (22.5 + 45 * k) * Math.PI / 180; return [TCX + rr(z) * Math.cos(a), TCY + rr(z) * Math.sin(a), z]; };
    for (let k = 0; k < 8; k++) {
      let ex = ''; const a = V(k, zb), b = V((k + 1) % 8, zb);
      for (let z = zb + 2.4; z < zt - 2; z += 3.3) ex += `<path class="dt" d="${K.path([V(k, z), V((k + 1) % 8, z)])}"/>`;
      s += K.face([a, b, [TCX, TCY, zt]], 'rs', ex);
    }
    for (let k = 0; k < 8; k++) {   // Krabben (kleine Knollen) an den acht Graten
      const a = (22.5 + 45 * k) * Math.PI / 180; if (K.facing(Math.cos(a), Math.sin(a)) <= 0) continue;
      for (let z = zb + 1.7; z < zt - 1.5; z += 1.65) { const p = K.P(...V(k, z)); s += `<circle class="rs fr" cx="${f2(p[0])}" cy="${f2(p[1])}" r="${f2(.07 + .16 * (zt - z) / (zt - zb))}"/>`; }
    }
    // Dachluken (Lukarnen) auf den Flächen nach Süden und Osten
    [[Math.PI / 2, 53], [Math.PI / 2, 60.5], [0, 53], [0, 60.5]].forEach(([ang, z]) => {
      if (K.facing(Math.cos(ang), Math.sin(ang)) <= 0) return;
      const r0 = rr(z) * Math.cos(Math.PI / 8), cx = TCX + r0 * Math.cos(ang), cy = TCY + r0 * Math.sin(ang), w = .42 - (z - 53) * .012, t = ang ? [1, 0] : [0, -1];
      const p = (du, zz) => K.P(cx + t[0] * du, cy + t[1] * du, Zh(zz)).map(f2).join(' ');
      s += `<path class="lv" d="M${p(-w, z)}L${p(w, z)}L${p(w, z + 1.1)}L${p(0, z + 1.9)}L${p(-w, z + 1.1)}Z"/>`;
    });
    const tp = K.P(TCX, TCY, zt);
    s += `<path class="dt" d="M${f2(tp[0])} ${f2(tp[1])}v-2.4M${f2(tp[0] - .75)} ${f2(tp[1] - 1.6)}h1.5"/><circle class="rs fr" cx="${f2(tp[0])}" cy="${f2(tp[1] - .1)}" r=".32"/>`;
    // vier Wimperge am Glockengeschoss (Süd mit Quadrat-Vierpass, Ost entsprechend)
    const ext = (len, rise) => `<circle class="dt" cx="${f2(len / 2)}" cy="${f2(-rise * .42)}" r=".7"/><path class="dt" d="M${f2(len / 2 - .45)} ${f2(-rise * .42)}h.9M${f2(len / 2)} ${f2(-rise * .42 - .45)}v.9"/>`;
    s += K.wall([bx + 1.7, by + bw], [bx + bw - 1.7, by + bw], Zh(TB - .3), Zh(TB - .3) + .01, 'bk', len => groupM('bk', gab(len, 5.2, 'fr', ext(len, 5.2))));
    s += K.wall([bx + bw, by + bw - 1.7], [bx + bw, by + 1.7], Zh(TB - .3), Zh(TB - .3) + .01, 'bk', len => groupM('bk', gab(len, 5.2, 'sd', ext(len, 5.2))));
    // Eckfialen am Glockengeschoss
    [[bx + .6, by + .6], [bx + bw - .6, by + .6], [bx + .6, by + bw - .6], [bx + bw - .6, by + bw - .6]].forEach(([x, y]) => { s += pin(K, x, y, Zh(TB - 2), Zh(TB + 6.2), 1.1); });
    return s;
  } });

  /* ---------- Maße (m über Gelände), aus ref/christuskirche/platz.jpg (Südansicht), sued.jpg und ansicht_2.jpg abgeleitet ---------- */
  const AW = 16, AG = 5.5;                    // Seitenschiff-Wand (bis Giebelfuß), Quergiebel-Höhe
  const RN = 27.5, RT = 27.5, TW = 19.5, GT = 10.7, CW = 16, CG = 4.6, CRI = 26.5;   // Dachfirst Schiff/Querhaus, Querhauswand (Giebelfuß), Querhausgiebel, Chorwand, Chorgiebel, Chorfirst
  const SLO = (y0, z0, y1, z1) => (z1 - z0) / (y1 - y0);
  const stoneTop = (K, x, y, w, zb, zt) => pin(K, x, y, Zh(zb), Zh(zt), w);

  /* ---------- Westvorhalle (10,6 m breit, zweigeschossig-hoher Giebel, Portal nach Westen – von SO nur die Südwand zu sehen) ---------- */
  add({ id: 'porch', fp: [1.0, 12.5, 5.8, 23.1], draw: K => {
    const P = (len, h) => groupM('bk', crs(len, h, 2.4, 15.5, 1.5) + band('fr', len, h, 2.3, .3) + band('fr', len, h, 15.4, .6)
      + `<path class="dt" d="${garch(len / 2 - .9, h - 12, 1.8, 7.5)}"/>`);
    let s = K.box(1.0, 12.5, Zh(0), 4.8, 10.6, 16, 'bk', { S: P }, false);
    s += roofPlane(K, [[1.0, 23.1, Zh(16)], [5.8, 23.1, Zh(16)], [5.8, 17.8, Zh(25)], [1.0, 17.8, Zh(25)]], 'sl');
    s += pin(K, 1.5, 23.0, Zh(14), Zh(21), 1.0) + pin(K, 5.3, 23.0, Zh(16), Zh(22), 1.0);
    return s;
  } });

  /* ---------- südliches Seitenschiff: Sockel, drei Joche mit Spitzbogenfenster + Quergiebel mit Okulus, Strebepfeiler, Schieferdach ---------- */
  const AY = 28.7, BAYS = [[5.8, 8.2], [8.2, 16.5], [16.5, 24.0], [24.0, 31.3]], PIERS = [8.2, 16.5, 24.0];
  add({ id: 'aisle', fp: [5.8, 23.1, 31.3, AY], draw: K => {
    let s = '';
    // Hauptdach: eine große Schieferfläche vom Schiffsfirst (y = YC) bis zur Seitenschiffwand, im Westen nur bis zum Turm
    const zr = (y) => AW + (AY - y) * SLO(YC, RN, AY, AW) * -1;   // z auf der Dachfläche bei y
    s += roofPlane(K, [[17.8, AY, Zh(AW)], [31.3, AY, Zh(AW)], [31.3, YC, Zh(RN)], [17.8, YC, Zh(RN)]], 'sl', 2.2);
    s += roofPlane(K, [[5.8, AY, Zh(AW)], [17.8, AY, Zh(AW)], [17.8, 23.1, Zh(zr(23.1))], [5.8, 23.1, Zh(zr(23.1))]], 'sl', 2.2);
    BAYS.forEach(([x0, x1], b) => {   // Quergiebeldach (nur die nach Osten gerichtete Fläche ist sichtbar)
      if (b === 0) return; const xm = (x0 + x1) / 2, yb = AY - 3.7;
      s += K.face([[x1 - .6, AY, Zh(AW)], [xm, AY, Zh(AW + AG)], [xm, yb, Zh(AW + AG)]], 'sl');
    });
    BAYS.forEach(([x0, x1], b) => {
      const w = x1 - x0, len = w;
      const D = (l, h) => {
        let d = crs(l, h, 2.6, AW - .6, 1.5) + band('fr', l, h, 2.3, .3) + band('fr', l, h, AW - .35, .35);
        let ex = '';
        if (b > 0) { const ww = Math.min(2.6, w - 3.0), l1 = lan(h, l / 2, 5.4, 15.2, ww, 1, 2); ex = l1.fr + l1.wn; }
        else d += `<path class="dt" d="${garch(l / 2 - .5, h - 9.5, 1.0, 6.4)}"/>`;
        return groupM('bk', d + ex);
      };
      s += K.wall([x0, AY], [x1, AY], Zh(0), Zh(AW), 'bk', D);
      if (b > 0) {
        const gl = w - 1.5, ox = x0 + .75, oc1 = oc(gl / 2, -AG * .42, .62, 3);
        s += K.wall([ox, AY], [ox + gl, AY], Zh(AW), Zh(AW) + .01, 'bk', l => groupM('bk', gab(l, AG, 'fr', oc1.fr + oc1.wn)));
      }
    });
    PIERS.forEach(x => { s += pier(K, x - .7, AY, x + .7, AY + 1.2, [[8, 0], [AW - .4, .2]], (K2, r, zp) => pin(K2, (r[0] + r[2]) / 2, (r[1] + r[3]) / 2, zp, Zh(AW + 5.2), .8)); });
    return s;
  } });

  /* ---------- Querhaus (Kreuzung/Nordarm hinten, Südarm vorn mit Portal, Rose, Frieze, Stufenpfeilern) ---------- */
  const TX0b = 31.3, TX1b = 41.8, TXM = (TX0b + TX1b) / 2, TYS = 34.0;
  add({ id: 'cross', fp: [TX0b, 0.1, TX1b, 28.5], draw: K => {
    const E = (l, h) => groupM('bk', crs(l, h, 2.4, TW - 1, 1.5) + band('sd', l, h, 2.3, .3) + band('sd', l, h, TW - .5, .5));
    let s = K.box(TX0b, 0.1, Zh(0), TX1b - TX0b, 28.4, TW, 'bk', { E: E }, false);
    s += roofPlane(K, [[TX1b, .1, Zh(TW)], [TX1b, 28.5, Zh(TW)], [TXM, 28.5, Zh(RT)], [TXM, .1, Zh(RT)]], 'sl', 2.2);
    return s;
  } });
  add({ id: 'arm', fp: [TX0b, 28.5, TX1b, TYS], parent: 'cross', side: 'S', above: 'choir', draw: K => {
    const wl = 8.2, wx0 = 32.6;
    const SD = (l, h) => {
      const w1 = lan(h, l / 2, 7.4, 15.4, 2.9, 1, 3);
      const door = `<path class="dt" d="${garch(l / 2 - 1.3, h - 4.4, 2.6, 4.4)}"/><path class="dt" d="${garch(l / 2 - 1.05, h - 4.1, 2.1, 4.1)}M${f2(l / 2)} ${f2(h - 4.1)}V${f2(h)}"/>`;
      const hood = `<path class="dt" d="${garch(l / 2 - 2.2, h - 7.6, 4.4, 7.6)}"/><path class="dt" d="${garch(l / 2 - 1.8, h - 7.0, 3.6, 7.0)}"/><path class="st fr" d="M${f2(l / 2 - 2.3)} ${f2(h - 7.5)}L${f2(l / 2)} ${f2(h - 9.6)}L${f2(l / 2 + 2.3)} ${f2(h - 7.5)}L${f2(l / 2 + 1.9)} ${f2(h - 7.5)}L${f2(l / 2)} ${f2(h - 9.6)}L${f2(l / 2 - 1.9)} ${f2(h - 7.5)}Z"/>`
        + `<rect class="st fr" x="${f2(l / 2 - 2.65)}" y="${f2(h - 5.2)}" width=".5" height="1.3"/><rect class="st fr" x="${f2(l / 2 + 2.15)}" y="${f2(h - 5.2)}" width=".5" height="1.3"/>`;
      return groupM('bk', crs(l, h, 2.4, TW - 2.1, 1.5) + band('fr', l, h, 2.3, .3) + door + hood + w1.fr + w1.wn
        + arcade(l, h, TW - 1.9, TW - .8, .6) + band('fr', l, h, TW - 2.0, .3) + band('fr', l, h, TW - .75, .3));
    };
    // Ostwand des Südarms (sichtbar, schmal): schlicht
    const E2 = (l, h) => groupM('bk', crs(l, h, 2.4, TW - 1, 1.5) + band('sd', l, h, 2.3, .3) + band('sd', l, h, TW - .5, .5));
    let s = roofPlane(K, [[TX1b, 28.5, Zh(TW)], [TX1b, TYS, Zh(TW)], [TXM, TYS, Zh(RT)], [TXM, 28.5, Zh(RT)]], 'sl', 2.2);
    s += K.box(TX0b, 28.5, Zh(0), TX1b - TX0b, TYS - 28.5, TW, 'bk', { E: E2 }, false);
    s += K.wall([wx0, TYS], [wx0 + wl, TYS], Zh(0), Zh(TW), 'bk', SD);
    const rose = oc(wl / 2, -2.0, 1.4, 3);
    s += K.wall([wx0, TYS], [wx0 + wl, TYS], Zh(TW), Zh(TW) + .01, 'bk', l => groupM('bk', gab(l, GT, 'fr', rose.fr + rose.wn)));
    [31.3, 40.8].forEach(x => { s += pier(K, x, TYS - .2, x + 1.4, TYS + 1.4, [[6, 0], [12, .15], [TW - .5, .3]], (K2, r, zp) => {
      const cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2; return pin(K2, cx, cy, zp, Zh(TW + 4.2), .9) + pin(K2, cx - .35, cy - .5, zp, Zh(TW + 6.2), .6); }); });
    return s;
  } });

  /* ---------- Chorhaus: Langjoch + Vielecks-Apsis, Fensterfacetten mit Wimpergen, Strebepfeiler, Schieferdach mit Wetterfahne ---------- */
  const PG = [[41.8, 28.5], [46.2, 28.4], [51.8, 27.6], [54.6, 24.6], [57.4, 20.5], [57.4, 14.9], [54.6, 10.8], [51.8, 7.8], [46.2, 7.0], [41.8, 6.7]];
  add({ id: 'choir', fp: [41.8, 6.7, 60.4, 28.5], draw: K => {
    const dep = (x, y) => K.depth(x, y);
    const fac = [];
    for (let i = 0; i < PG.length - 1; i++) {
      const a = PG[i], b = PG[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), n = [-dy / l, dx / l];
      if (K.facing(n[0], n[1]) <= 0) continue; fac.push({ a, b, l, n, c: dep((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) });
    }
    fac.sort((p, q) => p.c - q.c);
    const verts = PG.slice(1, -1).map(v => ({ v, c: dep(v[0], v[1]) })).sort((p, q) => p.c - q.c);
    let s = '';
    fac.forEach(f => {
      const sh = shadeK(K, f.n[0], f.n[1]);
      const D = (l, h) => { const w = Math.min(2.4, l - 2.4), lw = lan(h, l / 2, 5.4, 14.9, w, 1, 2);
        return groupM('bk', crs(l, h, 2.6, CW - .6, 1.5) + band(sh, l, h, 2.3, .3) + band(sh, l, h, CW - .35, .35) + lw.fr + lw.wn); };
      s += K.wall(f.a, f.b, Zh(0), Zh(CW), 'bk', D);
    });
    verts.forEach(o => { const [x, y] = o.v; s += K.box(x - .6, y - .6, Zh(0), 1.2, 1.2, CW, 'bk', {}, false); });
    // Dach: Satteldach über dem Langjoch, Walm-Fächer über der Apsis
    const yS = YC, zR = Zh(CRI), eve = Zh(CW), Ar = [51.8, YC, zR];
    const roof = [];
    roof.push({ p: [[41.8, 28.5, eve], [46.2, 28.4, eve], [46.2, YC, zR], [41.8, YC, zR]], c: dep(44, 25) });
    roof.push({ p: [[46.2, 28.4, eve], [51.8, 27.6, eve], [51.8, YC, zR], [46.2, YC, zR]], c: dep(49, 25) });
    for (let i = 2; i < PG.length - 2; i++) { const a = PG[i], b = PG[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
      if (K.facing(-dy / l, dx / l) > 0) roof.push({ p: [[a[0], a[1], eve], [b[0], b[1], eve], Ar], c: dep((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) }); }
    roof.sort((p, q) => p.c - q.c).forEach(r => { s += r.p.length === 4 ? roofPlane(K, r.p, 'sl', 2.2) : K.face(r.p, 'sl'); });
    // Wimperge + Fialen
    fac.forEach(f => {
      const sh = shadeK(K, f.n[0], f.n[1]), gl = f.l - 1.1, k = .55 / f.l, ax = f.a[0] + (f.b[0] - f.a[0]) * k, ay = f.a[1] + (f.b[1] - f.a[1]) * k;
      const bx = f.a[0] + (f.b[0] - f.a[0]) * (1 - k), by = f.a[1] + (f.b[1] - f.a[1]) * (1 - k), o2 = oc(gl / 2, -CG * .45, .5, 3);
      s += K.wall([ax, ay], [bx, by], Zh(CW), Zh(CW) + .01, 'bk', l => groupM('bk', gab(l, CG, sh, o2.fr + o2.wn)));
    });
    verts.forEach(o => { const [x, y] = o.v; s += pin(K, x, y, Zh(CW - .2), Zh(CW + 5.4), .95); });
    // Wetterfahne am Ende des Dachfirsts
    const q = K.P(Ar[0], Ar[1], zR); s += `<path class="dt" d="M${f2(q[0])} ${f2(q[1])}v-3.4M${f2(q[0] - .5)} ${f2(q[1] - 2.8)}h1"/><circle class="rs fr" cx="${f2(q[0])}" cy="${f2(q[1] - 3.4)}" r=".28"/>`;
    return s;
  } });

  return { mods: M, lc: [30.15, YC], z0: 0, top: [TCX, TCY, 72], label: 'Christuskirche', h: 72, len: 60 };
});


;/* ===== clemens.js ===== */
/* Basilika St. Clemens (Hannover) – Modul v1, Fotos: ref/clemens/ (Wikimedia Commons, siehe quellen.txt).
   Lokal: x = Ost, y = Süd, z = Höhe, Gelände z = 0. Maße aus dem OSM-Umriss (way 357786647) verschoben: x = x_Ost + 20, y = 18 − y_Nord; Kirchenachse y = 18,4.
   Hauptfront (Portal) = Ostseite (+x, Platz an der Basilika); die beiden Glockentürme stehen an den Westecken, der Chor (Apsis) schließt im Westen.
   Aufbau (Giusti 1712–1718, Kuppel und Türme 1947–1957 von Otto Fiederling): Kreuzblock aus Sandstein mit Orange-Putzfeldern (Portalvorbau mit Dreiecksgiebel,
   abgeschrägte Ecken, Nischen, Rautenfries, vier Eckfiguren) · niedrigere Seitenarme mit Lisenen und Gurtbändern · Tambour mit 8 Fensterpaaren, Kupferkuppel mit Rippen,
   offene Laterne mit Glockenhaube, Kugel und Kreuz · zwei quadratische Glockentürme mit je zwei Schallarkaden pro Seite und flachem Kupferdach mit Mini-Laterne.
   Materialien (nach der Lichtpalette der Karte): pl = heller Sandstein/Putz (Front, Pfeiler, Tambour, Schilder), gb = Orange-Putz (Wandfelder, Seitenarme, Türme), cu = patiniertes Kupfer. */
(() => {
  const AY = 18.4;                       // Kirchenachse (y)
  const ZW = 14.5, ZC = 18, ZF = 13.6;   // Traufe der Seitenarme, Oberkante Kreuzblock, Hauptgesims der Front
  const DC = [22, AY];                   // Mittelpunkt von Tambour und Kuppel
  ISO.landmark('clemens', H => {
    const { f2, hl, vl, arch, garch, winA, wins, lathe, hip, roofPlane } = H, M = [], add = m => (M.push(m), m);

    /* ---------- Hilfen ---------- */
    const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const seg = (a, b, u0, u1) => { const L = dist(a, b); return [lerp(a, b, u0 / L), lerp(a, b, u1 / L)]; };
    const sw = (K, a, b, u0, u1, z0, z1, mat, deco) => { const [p, q] = seg(a, b, u0, u1); return K.wall(p, q, z0, z1, mat, deco); };
    // Dekor frei auf eine Wand legen (u entlang, y nach unten ab ztop); nur sichtbar, wenn die Wand sichtbar ist
    const onWall = (K, a, b, ztop, inner) => {
      if (!K.wallVisible(a, b)) return '';
      const L = dist(a, b);
      return K.g(K.plane([a[0], a[1], ztop], [(b[0] - a[0]) / L, (b[1] - a[1]) / L, 0], [0, 0, -1]), inner);
    };
    const line = d => `<path class="dt" d="${d}"/>`;
    // Quaderlagen (Sandstein), optional mit versetzten Stoßfugen
    const ashlar = (len, h, step = 1, joints = true) => {
      let d = '', i = 0;
      for (let y = step; y < h - .05; y += step, i++) {
        d += `M0 ${f2(y)}H${f2(len)}`;
        if (joints) for (let u = (i % 2 ? .9 : 1.7); u < len - .3; u += 1.6) d += `M${f2(u)} ${f2(y - step)}V${f2(y)}`;
      }
      return line(d);
    };
    // Eckquader im Wechsel lang/kurz (Lisene, Eckpfeiler)
    const quoin = (len, h, step = .9) => {
      let d = '', i = 0;
      for (let y = step; y < h - .05; y += step, i++) { d += `M0 ${f2(y)}H${f2(len)}`; d += `M${f2(i % 2 ? len * .34 : len * .68)} ${f2(y - step)}V${f2(y)}`; }
      return line(d);
    };
    // Rautenfries (Metopen mit Rauten) zwischen zwei Gesimslinien
    const rhombi = (len, y0, y1, step = 1.9) => {
      const yc = (y0 + y1) / 2, hh = (y1 - y0) * .36, ww = hh * 1.15, n = Math.max(1, Math.round(len / step)), st = len / n;
      let d = `M0 ${f2(y0)}H${f2(len)}M0 ${f2(y1)}H${f2(len)}`;
      for (let i = 0; i < n; i++) { const u = (i + .5) * st; d += `M${f2(u - ww)} ${f2(yc)}L${f2(u)} ${f2(yc - hh)}L${f2(u + ww)} ${f2(yc)}L${f2(u)} ${f2(yc + hh)}Z`; }
      return line(d);
    };
    const plaque = (u, y, w, h) => `<rect class="pl tp" x="${f2(u)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>${line(`M${f2(u - .22)} ${f2(y - .22)}h${f2(w + .44)}v${f2(h + .44)}h${f2(-w - .44)}Z`)}`;
    const gold = (u, y, w, h) => `<rect class="gb" x="${f2(u)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>${line(`M${f2(u - .2)} ${f2(y - .2)}h${f2(w + .4)}v${f2(h + .4)}h${f2(-w - .4)}Z`)}`;
    // Muschelnische im Rahmen
    const nicheShell = (u, y, w, h) => {
      const cx = u + w / 2, r = w / 2, yc = y + r;
      let d = `M${f2(u - .45)} ${f2(y + h + .35)}V${f2(yc)}A${f2(r + .45)} ${f2(r + .45)} 0 0 1 ${f2(u + w + .45)} ${f2(yc)}V${f2(y + h + .35)}Z`;
      d += `M${f2(u - .75)} ${f2(y + h + .35)}h${f2(w + 1.5)}`;
      for (let k = 1; k <= 4; k++) { const a = Math.PI * k / 5; d += `M${f2(cx)} ${f2(yc + .1)}L${f2(cx - r * Math.cos(a))} ${f2(yc - r * Math.sin(a))}`; }
      return line(d) + `<path class="dt" d="${garch(u, y, w, h)}"/>`;
    };
    // Fenster/Blenden im Wandsystem (data-f: Stockwerk fürs Abendlicht)
    const wA = (x, y, w, h, f, cls = '') => `<path class="dt" d="${arch(x - .35, y - .35, w + .7, h + .35)}"/>` + winA(x, y, w, h, f, cls);

    /* ---------- Kreuzblock (Kern und Portalvorbau), Sandstein + Putzfelder ---------- */
    const A_ = { sw: [13.2, AY + 9.1], se: [39.5, AY + 9.1], fs: [42.4, AY + 6.4], fn: [42.4, AY - 6.4], ne: [39.5, AY - 9.1], nw: [13.2, AY - 9.1] };
    // Feldwand mit Pfeilern: Orange-Feld mit Nische, zwei Schildern, Rautenfries und Attika. len = Wandlänge, pw = Pfeilerbreite
    const bayWall = (K, a, b, pw) => {
      const L = dist(a, b), pb = L - 2 * pw, nw = Math.min(2.1, pb - 1.1);
      const stone = (len, h) => ashlar(len, h, 1.1, false) + hl(0, len, .3) + hl(0, len, .65) + hl(0, len, ZC - ZF + .3) + rhombi(len, ZC - 12.0, ZC - 13.3 + .3, 1.9) + hl(0, len, ZC - 1.3) + hl(0, len, ZC - 1.55);
      let s = K.wall(a, b, 0, ZC, 'pl', stone);
      // Orange-Feld unten (Nische) und oben (Attika-Schild)
      s += sw(K, a, b, pw, L - pw, 1.3, 11.6, 'gb', (len, h) => plaque(len / 2 - 1.2, h - 1.1 - .2, 2.4, 1.0) + nicheShell(len / 2 - nw / 2, 2.0, nw, h - 4.6) + plaque(len / 2 - 1.2, 0.5, 2.4, .9));
      s += sw(K, a, b, pw, L - pw, ZF + .8, ZC - .5, 'gb', (len, h) => plaque(len / 2 - 1.2, h / 2 - .55, 2.4, 1.1));
      // senkrechte Quaderstreifen der Pfeiler
      s += sw(K, a, b, 0, pw, 0, ZC, 'pl', (len, h) => quoin(len, h, .85));
      s += sw(K, a, b, L - pw, L, 0, ZC, 'pl', (len, h) => quoin(len, h, .85));
      return s;
    };
    // Hauptfront (Ost): Portal mit Rundbogen, Pilasterpaare, Inschrift, Rautenfries, Gesims
    const front = K => {
      const a = A_.fs, b = A_.fn, L = 12.8, c = L / 2;
      const deco = (len, h) => {
        let q = ashlar(len, h, 1.05, true) + hl(0, len, .3) + hl(0, len, .62) + rhombi(len, 1.0 + 0, 2.35, 1.9).replace('M0 1.00H', 'M0 .9H');
        // Pilaster (vier Streifen) mit Kapitell- und Sockelmarken
        [[.0, 1.25], [1.45, 2.95], [L - 2.95, L - 1.45], [L - 1.25, L]].forEach(([u0, u1]) => { q += vl(u0, 2.4, h - 1.3) + vl(u1, 2.4, h - 1.3) + hl(u0, u1, 2.65) + hl(u0, u1, h - 1.55); });
        q += hl(0, len, h - 1.3) + hl(0, len, h - 1.05);
        // Portal: Gewändebogen mit Keilsteinen, Tür dunkel, Mittelfuge
        const ox = c - 1.8, ow = 3.6, ot = ZF - 7.6, oh = 7.6 - .8, cy = ot + ow / 2;
        q += `<path class="dt" d="${arch(c - 2.7, ot - .9, 5.4, oh + .9 + .1)}"/><path class="dt" d="${arch(c - 2.25, ot - .45, 4.5, oh + .5)}"/>`;
        let d = ''; for (let k = 0; k <= 8; k++) { const t = Math.PI * k / 8, r1 = ow / 2, r2 = ow / 2 + .9; d += `M${f2(c + r1 * Math.cos(t))} ${f2(cy - r1 * Math.sin(t))}L${f2(c + r2 * Math.cos(t))} ${f2(cy - r2 * Math.sin(t))}`; }
        q += line(d) + `<path class="lv" d="${arch(ox, ot, ow, oh)}"/>` + line(`M${f2(c)} ${f2(cy + .3)}V${f2(ot + oh)}M${f2(ox + .3)} ${f2(ot + 3.1)}H${f2(c - .15)}M${f2(c + .15)} ${f2(ot + 3.1)}H${f2(ox + ow - .3)}M${f2(ox + .3)} ${f2(ot + 5.2)}H${f2(c - .15)}M${f2(c + .15)} ${f2(ot + 5.2)}H${f2(ox + ow - .3)}`);
        q += `<circle class="gb" cx="${f2(c)}" cy="${f2(ot - .55)}" r=".28"/>`;
        // Inschriftentafel über dem Portal
        q += gold(c - 1.9, ZF - 11.3, 3.8, 1.2);
        return q;
      };
      let s = K.wall(a, b, 0, ZF, 'pl', deco);
      // Dreiecksgiebel mit Fenster, Kupferdach dahinter
      const pz = ZF, pa = ZC - .5, e0 = AY + 7.1, e1 = AY - 7.1, X = 42.4;
      const rs = [[X, e0, pz], [X, AY, pa], [X - 6.2, AY, pa], [X - 6.2, e0 - .4, pz]], rn = [[X, AY, pa], [X, e1, pz], [X - 6.2, e1 + .4, pz], [X - 6.2, AY, pa]];
      // Rückwand über dem Vorbau (x=X-6.2): Kernkörper steigt bis ZC, Giebeldächer lehnen daran; Eckzonen bekommen ein flaches Kupferdach auf ZF
      const XB = X - 6.2;
      s += K.poly([[XB, AY + 9.1, ZF], [39.5, AY + 9.1, ZF], [X, AY + 6.4, ZF], [X, e0, ZF], [XB, e0 - .4, ZF]], 'cu') + K.poly([[XB, e1 + .4, ZF], [X, e1, ZF], [X, AY - 6.4, ZF], [39.5, AY - 9.1, ZF], [XB, AY - 9.1, ZF]], 'cu');
      s += K.wall([XB, AY + 9.1], [XB, AY - 9.1], ZF, ZC, 'pl', (l, h) => ashlar(l, h, 1.1, false) + hl(0, l, .35) + hl(0, l, h - .4));
      s += K.face(rs, 'cu') + K.face(rn, 'cu');
      s += K.face([[X, e1, pz], [X, e0, pz], [X, AY, pa]], 'pl', `<path class="dt" d="${K.path([[X, e0, pz], [X, AY, pa], [X, e1, pz]])}"/><path class="dt" d="${K.path([[X, e0 - .7, pz + .35], [X, AY, pa - .6], [X, e1 + .7, pz + .35]])}"/>`);
      s += onWall(K, [X, AY + 1.3], [X, AY - 1.3], ZF + 3.7, wins(winA(0, 0, 2.6, 3.2, 3, ' dim')) + line(`M-.35 3.3h3.3`));
      // Freitreppe
      for (let k = 0; k < 4; k++) s += K.box(X, AY - 5.7, 0, (4 - k) * .95, 11.4, (k + 1) * .42, 'pl', {}, true);
      return s;
    };
    add({ id: 'cross', fp: [13.2, AY - 9.1, 42.4, AY + 9.1], draw: K => {
      const q = A_;
      let s = '';
      // Seitenwände
      s += bayWall(K, [31.4, AY + 9.1], q.se, 1.3);                                  // Südflanke des Vorbaus
      s += bayWall(K, q.ne, [31.4, AY - 9.1], 1.3);                                   // Nordflanke (verdeckt)
      s += bayWall(K, q.se, q.fs, .8);                                                // abgeschrägte Ecke SO
      s += bayWall(K, q.fn, q.ne, .8);                                                // abgeschrägte Ecke NO
      // Kernblock: obere Zone der Südwand über dem Seitenarm (Gesims, Orange-Feld, Eckpfeiler)
      const kernS = (len, h) => ashlar(len, h, 1.1, false) + hl(0, len, .3) + hl(0, len, .6) + hl(0, len, h - .5);
      s += K.wall(q.sw, [31.4, AY + 9.1], ZW - .5, ZC, 'pl', kernS);
      s += sw(K, q.sw, [31.4, AY + 9.1], 1.4, 16.8, ZW + .9, ZC - .5, 'gb', (len, h) => plaque(len / 2 - 1.8, h / 2 - .45, 3.6, .9));
      s += K.wall([13.2, AY - 9.1], [13.2, AY + 9.1], 0, ZC, 'pl', (l, h) => ashlar(l, h, 1.1, false));
      s += front(K);
      // Oberseite: flaches Kupferdach rund um den Tambour (Nähte quer)
      const ring = [[13.2, AY + 9.1, ZC], [36.2, AY + 9.1, ZC], [36.2, AY - 9.1, ZC], [13.2, AY - 9.1, ZC]];
      let seams = '';
      for (let dy = -8.5; dy <= 8.6; dy += 2.1) { const ax = Math.abs(dy), xm = 36.2; seams += K.path([[13.2, AY + dy, ZC], [xm, AY + dy, ZC]]); }
      s += K.poly(ring, 'cu') + `<path class="dt cu-d" d="${seams}"/>`;
      // hintere Eckfiguren (stehen hinter dem Tambour)
      s += statue(K, 14.4, AY + 8.2) + statue(K, 14.4, AY - 8.2);
      return s;
    } });

    // Eckfigur: Sockel, Körper, Kopf (Sandstein)
    function statue(K, x, y, z = ZC) {
      const hd = K.P(x, y, z + 2.55);
      return K.box(x - .55, y - .55, z, 1.1, 1.1, .9, 'pl', {}, true)
        + lathe(K, x, y, [[z + .9, .55], [z + 1.6, .5], [z + 2.4, .32]], 'pl fr', 0)
        + `<circle class="pl fr" cx="${f2(hd[0])}" cy="${f2(hd[1])}" r=".3"/>`;
    }

    /* ---------- Seitenarme (Süd und Nord): Orange-Putz mit Lisenen, Gurtbändern und Fenstergruppe ---------- */
    const armWall = (west, group) => (len, h) => {
      let q = hl(0, len, h - .5) + hl(0, len, h - .95) + hl(0, len, h - 1.6) + hl(0, len, h - 2.0);       // Traufgesims
      q += hl(0, len, 1.45) + hl(0, len, 1.2) + hl(0, len, h - 7.0) + hl(0, len, h - 8.2) + hl(0, len, 6.3);  // Gurtbänder, Sockel
      let w = '';
      if (group) {                                                                                           // große Bogenblende mit zwei Fenstern, nahe dem Turm
        const x0 = west + 1.2, bw = 3.5; w += `<path class="dt" d="${arch(x0 - .35, 3.0, bw + .7, 6.2)}"/>` + winA(x0 + .15, 3.5, 1.35, 5.2, 1) + winA(x0 + bw - 1.5, 3.5, 1.35, 5.2, 1);
        w += winA(x0 + 1.0 + bw + 1.2, h - 5.4, 1.1, 3.0, 0, ' dim');
      }
      return q + wins(w);
    };
    const lisene = (K, a, b, u, w) => sw(K, a, b, u, u + w, 0, ZW, 'pl', (len, h) => quoin(len, h, .85));
    add({ id: 'armS', fp: [13.2, AY + 9.1, 29.1, AY + 13.2], draw: K => {
      const a = [13.2, AY + 13.2], b = [29.1, AY + 13.2];
      let s = K.wall(a, b, 0, ZW, 'gb', armWall(0, true));
      [0, 5.25, 10.5].forEach(u => { s += lisene(K, a, b, u, 1.3); });
      s += sw(K, a, b, 15.9 - 1.3, 15.9, 0, ZW, 'pl', (len, h) => quoin(len, h, .85));
      s += K.wall(b, [29.1, AY + 11.4], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5) + hl(0, l, h - .95));
      s += K.wall([29.1, AY + 11.4], [31.4, AY + 9.1], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5) + hl(0, l, h - .95) + quoin(.9, h, .85));
      // Traufgesims und flaches Kupferdach, an den Kernblock anlehnend
      s += K.box(13.0, AY + 13.2, ZW - .45, 16.3, .55, .45, 'pl', {}, true);
      s += roofPlane(K, [[13.2, AY + 13.2, ZW], [29.1, AY + 13.2, ZW], [29.1, AY + 9.1, ZW + .7], [13.2, AY + 9.1, ZW + .7]], 'cu', 2.6);
      s += K.face([[29.1, AY + 11.4, ZW], [31.4, AY + 9.1, ZW], [31.4, AY + 9.1, ZW + .7], [29.1, AY + 9.1, ZW + .7]], 'cu');
      return s;
    } });
    add({ id: 'armN', fp: [13.2, AY - 13.2, 29.1, AY - 9.1], draw: K => {
      const a = [29.1, AY - 13.2], b = [13.2, AY - 13.2];
      let s = K.wall(a, b, 0, ZW, 'gb', armWall(0, true));
      s += K.wall([29.1, AY - 9.1], [29.1, AY - 13.2], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5));
      s += roofPlane(K, [[13.2, AY - 13.2, ZW], [29.1, AY - 13.2, ZW], [29.1, AY - 9.1, ZW + .7], [13.2, AY - 9.1, ZW + .7]], 'cu', 2.6);
      return s;
    } });

    /* ---------- Chor (Apsis) im Westen: nur Rückseite, aus Fotos als Putzwand mit Bogenfenstern ---------- */
    add({ id: 'apse', fp: [1.4, AY - 5.6, 13.2, AY + 5.6], draw: K => {
      const w = [[13.2, AY - 5.6], [5.0, AY - 5.6], [1.4, AY - 3.4], [1.4, AY + 3.4], [5.0, AY + 5.6], [13.2, AY + 5.6]];
      let s = '';
      for (let i = 0; i < w.length - 1; i++) {
        const a = w[i + 1], b = w[i];
        s += K.wall(a, b, 0, ZW, 'gb', (len, h) => hl(0, len, h - .5) + hl(0, len, h - .95) + hl(0, len, 1.2) + wins(len > 3 ? winA(len / 2 - .7, 3.4, 1.4, 6.5, 1) : ''));
      }
      s += roofPlane(K, [[1.4, AY - 3.4, ZW], [13.2, AY - 5.6, ZW], [13.2, AY + 5.6, ZW], [1.4, AY + 3.4, ZW]], 'cu', 2.6);
      return s;
    } });

    /* ---------- Glockentürme (Südwest und Nordwest) ---------- */
    const tower = (id, y0) => add({ id, fp: [5.0, y0, 13.2, y0 + 8.8], draw: K => {
      const TZ = 21.4, x0 = 5.0, w = 8.2, d = 8.8, cx = x0 + w / 2, cy = y0 + d / 2;
      const face = len => {
        let q = '';
        for (let y = .85, i = 0; y < TZ; y += .85, i++) { q += `M0 ${f2(y)}h1.05M${f2(len - 1.05)} ${f2(y)}h1.05M${f2(i % 2 ? .5 : .9)} ${f2(y - .85)}V${f2(y)}M${f2(len - (i % 2 ? .5 : .9))} ${f2(y - .85)}V${f2(y)}`; }
        q = line(q) + hl(0, len, .45) + hl(0, len, .75);
        const yb = TZ - 15.2;                                            // Gurtgesims unter der Glockenstube
        q += hl(0, len, yb) + hl(0, len, yb - .35);
        let wn = winA(len / 2 - .55, TZ - 12.4 + 0, 1.1, 3.2, 1, ' dim');
        wn += winA(len / 2 - .55, TZ - 6.3 + 0, 1.1, 2.6, 2, ' dim');
        const lv = (u) => `<path class="dt" d="${arch(u - 1.3, 2.4, 2.6, 5.0)}"/><path class="lv" d="${arch(u - 1.0, 2.7, 2.0, 4.7)}"/>` + [0, 1, 2, 3, 4].map(k => `<path class="dt" d="M${f2(u - .9)} ${f2(3.9 + k * .75)}H${f2(u + .9)}"/>`).join('');
        return q + lv(len * .29) + lv(len * .71) + wins(wn);
      };
      let s = K.box(x0, y0, 0, w, d, TZ, 'gb', { S: (l, h) => face(l), E: (l, h) => face(l), N: (l, h) => face(l), W: (l, h) => face(l) }, false);
      // Gesims, Kupferdach mit Mini-Laterne, Kugel und Kreuz
      s += K.box(x0 - .45, y0 - .45, TZ, w + .9, d + .9, .5, 'pl', {}, true);
      s += hip(K, x0 - .4, y0 - .4, x0 + w + .4, y0 + d + .4, TZ + .5, TZ + 1.7, 'cu');
      s += lathe(K, cx, cy, [[TZ + 1.9, 1.1], [TZ + 3.1, 1.0], [TZ + 3.4, 1.15], [TZ + 4.1, .9], [TZ + 4.9, .3]], 'cu', 3, [1]);
      const bp = K.P(cx, cy, TZ + 5.15);
      s += `<circle class="cu" cx="${f2(bp[0])}" cy="${f2(bp[1])}" r=".3"/>` + line(K.path([[cx, cy, TZ + 5.3], [cx, cy, TZ + 6.6]]) + K.path([[cx - .45, cy, TZ + 6.0], [cx + .45, cy, TZ + 6.0]]));
      return s;
    } });
    tower('towerS', AY + 6.0);
    tower('towerN', AY - 14.8);
    // Mini-Häuschen am Fuß des Südturms (Foto a_2/a_3), mit Satteldach
    add({ id: 'hut', fp: [13.2, AY + 13.2, 15.2, AY + 15.0], draw: K => K.box(13.4, AY + 13.2, 0, 1.8, 1.8, 2.6, 'pl', { S: (l, h) => hl(0, l, .4) }, false)
      + K.face([[13.4, AY + 13.2, 2.6], [13.4, AY + 15.0, 2.6], [14.3, AY + 15.0, 3.5], [14.3, AY + 13.2, 3.5]], 'sl') + K.face([[15.2, AY + 13.2, 2.6], [14.3, AY + 13.2, 3.5], [14.3, AY + 15.0, 3.5], [15.2, AY + 15.0, 2.6]], 'sl')
      + K.wall([13.4, AY + 15.0], [15.2, AY + 15.0], 2.6, 2.61, 'pl', () => `<path class="pl fr" d="M0 0L.9 -.9L1.8 0Z"/>`) });

    /* ---------- Tambour, Kuppel, Laterne ---------- */
    add({ id: 'dome', above: 'cross', fp: [13.3, AY - 9.0, 31.4, AY + 9.0], draw: K => {
      const [cx, cy] = DC, R = 7.4, Z1 = ZC, Z2 = 26.0, z3 = 26.9;
      let s = lathe(K, cx, cy, [[Z1, R + .35], [Z1 + .7, R + .35], [Z1 + .9, R]], 'pl', 0) + lathe(K, cx, cy, [[Z1 + .9, R], [Z2, R]], 'pl', 0);
      // acht Fensterpaare in Bogenblenden, jeweils auf den Achsen (Foto n01: Paar mittig zur Hauptachse)
      for (let k = 0; k < 8; k++) {
        const a0 = k * Math.PI / 4, ca = Math.cos(a0), sa = Math.sin(a0);
        if (K.facing(ca, sa) <= .05) continue;
        const o = [cx + R * ca + 1.95 * sa, cy + R * sa - 1.95 * ca];       // Anfang der Blende (tangential −1,95 m)
        s += K.g(K.plane([o[0], o[1], Z2 - 1.1], [-sa, ca, 0], [0, 0, -1]),
          `<path class="dt" d="${arch(0, 0, 3.9, 5.9)}"/>` + wins(winA(.45, .55, 1.2, 4.7, 3, ' hi') + winA(2.25, .55, 1.2, 4.7, 3, ' hi')) + line('M1.95 .6V5.9'));
      }
      // Kranzgesims unter der Kuppel
      s += lathe(K, cx, cy, [[Z2, R + .5], [Z2 + .45, R + .8], [z3, R + .45]], 'pl', 0);
      // Kupferkuppel (leicht überhöht) mit dichten Rippen
      const prof = [[z3, R + .05], [z3 + .5, R - .1], [z3 + 1.5, R - .55], [z3 + 2.8, R - 1.4], [z3 + 4.2, R - 2.6], [z3 + 5.5, R - 4.2], [z3 + 6.6, R - 5.8], [z3 + 7.4, R - 7.0]];
      s += lathe(K, cx, cy, prof, 'cu', 20);
      // Laterne: Sockel, offene Arkadenlaterne (leuchtet), Gesims, geschweifte Haube, Kugel, Kreuz
      const zl = z3 + 7.3;
      s += lathe(K, cx, cy, [[zl - .1, 2.9], [zl + .3, 3.0], [zl + .8, 2.5]], 'cu', 0);
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[zl + .8, 2.7], [zl + 4.4, 2.7]], '')}</g>`;
      s += lathe(K, cx, cy, [[zl + .8, 2.2], [zl + 4.4, 2.2]], 'lant', 8);
      s += lathe(K, cx, cy, [[zl + 4.4, 2.85], [zl + 4.75, 2.7], [zl + 5.2, 2.2], [zl + 5.9, 1.55], [zl + 6.8, 1.05], [zl + 7.9, .7], [zl + 9.1, .45], [zl + 10.3, .25]], 'cu', 4);
      const bz = zl + 10.7, bp = K.P(cx, cy, bz);
      s += `<circle class="cu" cx="${f2(bp[0])}" cy="${f2(bp[1])}" r=".55"/>` + line(K.path([[cx, cy, bz + .5], [cx, cy, bz + 3.0]]) + K.path([[cx - .6, cy, bz + 2.2], [cx + .6, cy, bz + 2.2]]));
      // vordere Eckfiguren (stehen vor dem Tambour)
      s += statue(K, 30.0, AY + 8.2) + statue(K, 30.0, AY - 8.2) + statue(K, 37.8, AY + 8.0, ZF) + statue(K, 37.8, AY - 8.0, ZF);
      return s;
    } });

    return { mods: M, lc: [21.9, AY], z0: 0, top: [22, AY, 50], label: 'Basilika St. Clemens', h: 47, len: 41 };
  });
})();


;/* ===== hauptbahnhof.js ===== */
/* Hauptbahnhof Hannover mit Ernst-August-Denkmal – Modul. Lokal: x Ost, y Süd (Front zum Ernst-August-Platz = +y), z Höhe, Gelände z = 1.
   Fotos: ref/hauptbahnhof/ (Wikimedia Commons, Quellen in quellen.txt). Zeichnung nach den Fotos, nichts kopiert; ohne Logos (DB, Läden).
   Empfangsgebäude 1876–1879 (Hubert Stier), gelber Backstein mit Sandsteingliederung: Mittelbau mit zwei Eckrisaliten (Uhren), drei großen Bogenfenstern
   mit Archivolten und Medaillons, darüber drei Arkadengruppen zu je fünf Bögen, Rundbogenfries und durchbrochene Brüstung; unten Sockel aus Naturstein
   mit drei Portalen unter Glasvordächern. Niedrige Seitenflügel (oben Bogenfenster in Dreiergruppen, unten Ladenfront), flache Metalldächer.
   Davor das Reiterstandbild Ernst Augusts (Albert Wolff, 1861): Pferd blickt zur Stadt (+y), Schwanz zum Bahnhof. */
ISO.landmark('hauptbahnhof', H => {
  const { f2, hl, vl, winR, winA, wins, hip, roofPlane } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  // rote Backsteinbänder (dünne dunkle Linien)
  const band = (len, ys) => ys.map(y => `<path class="dt rb" d="M0 ${f2(y)}H${f2(len)}"/>`).join('');
  // Bogenfries: kleine Rundbögen im Raster (Oberkante y, Höhe 2r)
  const arcs = (u0, u1, y, pitch, r) => { let d = ''; for (let u = u0; u + pitch <= u1 + 1e-6; u += pitch) d += `M${f2(u + (pitch - 2 * r) / 2)} ${f2(y + r)}a${f2(r)} ${f2(r)} 0 0 1 ${f2(2 * r)} 0`; return `<path class="dt" d="${d}"/>`; };
  // Sandsteinring um ein Bogenfenster (Mitte u, Kämpfer spring, Innenradius r0, Außenradius r1, Unterkante bottom)
  const ring = (u, spring, r0, r1, bottom) => `<path class="st fr" fill-rule="evenodd" d="M${f2(u - r1)} ${f2(bottom)}V${f2(spring)}A${f2(r1)} ${f2(r1)} 0 0 1 ${f2(u + r1)} ${f2(spring)}V${f2(bottom)}Z`
    + `M${f2(u - r0)} ${f2(bottom)}V${f2(spring)}A${f2(r0)} ${f2(r0)} 0 0 1 ${f2(u + r0)} ${f2(spring)}V${f2(bottom)}Z"/>`;
  // großes Bogenfenster mit Strahlenrosette im Bogen (Foto: Speichenfächer), Kämpferlinie, drei Pfosten
  const bigArch = (u, apex, gw, bottom, f) => {
    const spring = apex + gw;
    let s = `<path class="wn" data-f="${f}" d="M${f2(u - gw)} ${f2(bottom)}V${f2(spring)}A${f2(gw)} ${f2(gw)} 0 0 1 ${f2(u + gw)} ${f2(spring)}V${f2(bottom)}Z"/>`;
    let d = `M${f2(u)} ${f2(apex)}V${f2(bottom)}M${f2(u - gw)} ${f2(spring)}H${f2(u + gw)}M${f2(u - gw)} ${f2(spring + (bottom - spring) * .62)}H${f2(u + gw)}M${f2(u - gw * .5)} ${f2(spring)}V${f2(bottom)}M${f2(u + gw * .5)} ${f2(spring)}V${f2(bottom)}`;
    for (let i = 1; i < 6; i++) { const a = Math.PI * i / 6; d += `M${f2(u)} ${f2(spring)}L${f2(u + gw * Math.cos(a))} ${f2(spring - gw * Math.sin(a))}`; }
    d += `M${f2(u - gw * .45)} ${f2(spring)}A${f2(gw * .45)} ${f2(gw * .45)} 0 0 1 ${f2(u + gw * .45)} ${f2(spring)}`;
    return s + `<path class="mul" d="${d}"/>`;
  };
  // Bahnsteighallen hinter dem Empfangsgebäude
  add({ id: 'hbHalls', o: .6, fp: [0, -54, 140, -2], draw: K => {
    let s = '';
    for (let i = 0; i < 3; i++) { const y0 = -54 + i * 17, y1 = y0 + 15;
      s += roofPlane(K, [[0, y1, Z0 + 9], [140, y1, Z0 + 9], [140, (y0 + y1) / 2, Z0 + 13], [0, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += roofPlane(K, [[140, y0, Z0 + 9], [0, y0, Z0 + 9], [0, (y0 + y1) / 2, Z0 + 13], [140, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += K.wall([140, y1], [140, y0], Z0 + 9, Z0 + 9.01, 'gb', len => `<path class="gb sd" d="M0 0L${f2(len / 2)} -4L${f2(len)} 0Z"/>`); }
    return s;
  } });
  // Seitenflügel (13 m): oben Bogenfenster in Dreiergruppen mit Säulchen, unten verglaste Ladenfront unter dem Vordach
  const wingF = (len, h) => {
    let q = band(len, [8.5]) + hl(0, len, .35) + hl(0, len, 2.5) + hl(0, len, 7.7) + hl(0, len, 8.0) + arcs(0, len, 1.0, 1.1, .45), w = '';
    const n = Math.max(1, Math.floor(len / 8.4)), g0 = (len - n * 8.4) / 2 + (8.4 - 5.5) / 2;
    for (let g = 0; g < n; g++) for (let i = 0; i < 3; i++) {
      const x = g0 + g * 8.4 + i * 2.1;
      w += winA(x, 3.5, 1.3, 4.0, 1);
      if (i < 2) q += vl(x + 1.3 + .4, 4.7, 7.5);
    }
    for (let u = 1; u < len - 3; u += 4) w += `<rect class="wn dim" data-f="0" x="${f2(u + .4)}" y="9" width="3.2" height="${f2(h - 9.8)}"/>`;
    return q + wins(w);
  };
  add({ id: 'hbWW', o: .3, fp: [0, 0, 42, 26], draw: K => K.box(0, 0, Z0, 42, 26, 13, 'gb', { S: wingF, W: wingF }) + K.box(-.3, -.3, Z0 + 13, 42.6, 26.6, .7, 'st') + hip(K, 0, 0, 42, 26, Z0 + 13.7, Z0 + 16.3, 'sl') });
  add({ id: 'hbWE', o: .3, fp: [98, 0, 140, 26], draw: K => K.box(98, 0, Z0, 42, 26, 13, 'gb', { S: wingF, E: wingF }) + K.box(97.7, -.3, Z0 + 13, 42.6, 26.6, .7, 'st') + hip(K, 98, 0, 140, 26, Z0 + 13.7, Z0 + 16.3, 'sl') });
  // Mittelbau: Natursteinsockel (4,4 m) + Backsteingeschosse bis 30 m über Gelände, flaches Dach
  add({ id: 'hbCenter', o: .4, fp: [42, -4, 98, 30], draw: K => {
    const AC = [13.4, 28, 42.6], GW = 3.9, BOT = 25.2, APEX = 14.6, SPR = APEX + GW;   // Wandkoordinaten: v nach unten ab Oberkante (z = 30)
    const plinth = (len, h) => {
      let q = hl(0, len, 1.1) + hl(0, len, 2.2) + hl(0, len, 3.3), w = '';
      AC.forEach(u => { w += winR(u - 3.2, .7, 6.4, h - .7, 0); });                           // drei Portale, abends hell
      return q + wins(w);
    };
    const front = (len, h) => {
      let q = band(len, [22.4, 23.0]) + `<path class="dt rb" d="M7 6.3H${f2(len - 7)}"/>` + hl(0, len, 11.3) + hl(0, len, 11.9) + hl(0, len, 10.5), w = '';
      // Eckrisalite: Sandstein-Eckstreifen und Lisenen, oben die Uhr
      q += `<rect class="st fr" x="0" y="0" width=".7" height="${f2(h)}"/><rect class="st fr" x="${f2(len - .7)}" y="0" width=".7" height="${f2(h)}"/>`;
      [1.5, 5.5, len - 5.5, len - 1.5].forEach(u => { q += vl(u, 7, h); });
      q += vl(7, 0, h) + vl(len - 7, 0, h);
      // drei große Bogenfenster mit Archivolten, Doppelsäulchen und Medaillons in den Zwickeln
      AC.forEach(u => {
        q += ring(u, SPR, GW + .15, GW + 1.5, BOT);
        q += `<path class="dt" d="M${f2(u - GW - 2.1)} ${f2(BOT)}V${f2(SPR)}A${f2(GW + 2.1)} ${f2(GW + 2.1)} 0 0 1 ${f2(u + GW + 2.1)} ${f2(SPR)}V${f2(BOT)}"/>`;
        [-1, 1].forEach(sg => { q += vl(u + sg * (GW + .5), SPR, BOT) + vl(u + sg * (GW + 1.0), SPR, BOT);
          q += `<circle class="dt" cx="${f2(u + sg * (GW + 1.5))}" cy="${f2(SPR - GW - 1.05)}" r=".8"/><path class="dt" d="M${f2(u + sg * (GW + 1.5) - .4)} ${f2(SPR - GW - 1.05)}l.4 -.45l.4 .45l-.4 .45Z"/>`; });
        w += bigArch(u, APEX, GW, BOT, 1);
        // Arkadengruppe darüber: fünf Bögen mit Säulchen
        for (let i = 0; i < 5; i++) { const x = u - 4.35 + i * 1.9 + .35; w += winA(x, 6.3, 1.1, 3.9, 2); if (i < 4) q += vl(x + 1.1 + .4, 7.4, 10.2); }
        q += hl(u - 4.9, u + 4.9, 5.7);
      });
      // Rundbogenfries mit kleinen Schlitzfenstern, darüber durchbrochene Brüstung und Gesims
      q += hl(0, len, 4.9) + hl(0, len, 2.1) + arcs(.4, len - .4, 2.5, 1.4, .5) + arcs(0, len, .2, .9, .4) + hl(0, len, .08);
      for (let u = 7.8; u < len - 7; u += 4.2) w += winA(u, 2.7, .6, 1.8, 3);
      return q + wins(w) + H.clockSVG(3.5, 7.4, 1.35) + H.clockSVG(len - 3.5, 7.4, 1.35);
    };
    const side = (len, h) => band(len, [5.5, 6.1]) + hl(0, len, 1.9) + arcs(0, len, .2, .9, .4) + wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(4 + i * (len - 8) / 6 - .7, 6.5, 1.4, 5.5, 1)).join(''));
    let s = K.box(42, -4, Z0, 56, 34, 4.4, 'rs', { S: plinth }, false);
    s += K.box(42, -4, Z0 + 4.4, 56, 34, 25.6, 'gb', { S: front, E: side, W: side });
    s += K.box(41.6, -4.4, Z0 + 30, 56.8, 34.8, .8, 'st');                                    // Kranzgesims
    // Akroterien (Greifen) auf den Eckrisaliten
    [[42.2, 28.2], [96.2, 28.2], [42.2, -3.4], [96.2, -3.4]].forEach(([x, y]) => { s += K.box(x, y, Z0 + 30.8, 1.6, 1.2, 1.4, 'st') + K.box(x + .3, y + .2, Z0 + 32.2, 1.0, .8, .9, 'st'); });
    return s + hip(K, 42, -4, 98, 30, Z0 + 30.8, Z0 + 33.4, 'sl');
  } });
  // Vordächer aus grünem Glas: durchgehend vor dem Mittelbau (über den Portalen) und über den Ladenfronten der Flügel
  add({ id: 'hbCanopy', o: .1, fp: [0, 26, 140, 34], parent: 'hbCenter', side: 'S', draw: K =>
    K.box(0, 26, Z0 + 5.6, 42, 3.6, .5, 'gl') + K.box(98, 26, Z0 + 5.6, 42, 3.6, .5, 'gl') + K.box(44, 30, Z0 + 4.4, 52, 3.6, .5, 'gl') });
  // Ernst-August-Denkmal: Natursteinsockel (Fuß, Sockelkörper, Gesims, Inschriftfeld „Dem Landesvater sein treues Volk“, Platte) und Reiterfigur als Schattenriss nach dem Foto
  add({ id: 'hbStatue', o: .8, fp: [66, 52, 74, 61.5], obj: false, draw: K => {
    const lines = (len, h) => `<path class="dt" d="M${f2(len * .2)} ${f2(h * .32)}H${f2(len * .8)}M${f2(len * .4)} ${f2(h * .52)}H${f2(len * .6)}M${f2(len * .27)} ${f2(h * .72)}H${f2(len * .73)}"/>`
      + `<rect class="dt" x="${f2(len * .1)}" y="${f2(h * .12)}" width="${f2(len * .8)}" height="${f2(h * .76)}"/>`;
    const panel = (len, h) => `<rect class="dt" x="${f2(len * .2)}" y="${f2(h * .2)}" width="${f2(len * .6)}" height="${f2(h * .6)}"/><circle class="dt" cx="${f2(len / 2)}" cy="${f2(h / 2)}" r="${f2(Math.min(len, h) * .22)}"/>`;
    let s = K.box(66, 52.4, Z0, 5.2, 8.8, .5, 'rs')                                          // Fuß
      + K.box(66.4, 52.8, Z0 + .5, 4.4, 8.0, 2.6, 'rs', { E: (l, h) => hl(0, l, h * .5), S: (l, h) => hl(0, l, h * .5) })
      + K.box(66.2, 52.6, Z0 + 3.1, 4.8, 8.4, .6, 'rs')                                      // Gesims
      + K.box(66.6, 53.0, Z0 + 3.7, 4.0, 7.6, 2.8, 'rs', { E: lines, S: panel })             // Sockelkörper mit Inschrift (Ostseite = lange Seite zum Betrachter)
      + K.box(66.2, 52.6, Z0 + 6.5, 4.8, 8.4, .7, 'rs')                                      // Kranz
      + K.box(66.5, 52.9, Z0 + 7.2, 4.2, 7.8, .4, 'st');                                     // Deckplatte
    const Zt = Z0 + 7.6, k = .0112, T = ([x, y]) => [(x - 462) * k, (y - 803) * k];
    // Schattenriss (Foto-Umriss, Pixel → Meter): Pferd im Schritt, linkes Vorderbein gehoben, Reiter in Husarenuniform mit Tschako und Federbusch, Schweif nach hinten
    const OUT = [[462,437],[470,424],[486,382],[495,332],[498,306],[508,298],[520,308],[536,300],[560,291],[590,286],[608,298],[632,312],[652,322],[674,332],[686,352],
      [700,372],[708,332],[716,288],[722,262],[717,246],[719,233],[722,218],[725,200],[731,177],[728,160],[738,112],[760,68],[772,72],[776,112],[766,166],[790,172],[796,200],[793,228],
      [797,247],[826,270],[848,312],[858,360],[862,410],[860,438],[900,436],[930,436],[944,430],
      [975,424],[1018,436],[1046,478],[1070,538],[1100,608],[1123,672],[1096,654],[1068,596],[1036,540],[1004,500],[968,486],[954,520],[952,560],
      [972,610],[990,650],[993,720],[992,772],[997,794],[950,802],[958,780],[958,730],[950,690],[930,650],[912,628],
      [902,640],[880,676],[838,722],[808,744],[806,770],[812,800],[786,803],[784,770],[798,716],[824,676],[848,630],[846,606],
      [800,608],[740,610],[700,602],[668,600],[652,640],[646,700],[642,760],[648,797],[618,803],[620,770],[622,700],[626,640],[632,612],[614,606],
      [580,600],[548,606],[520,612],[500,626],[488,650],[500,690],[522,722],[540,742],[552,754],[526,760],[504,736],[484,700],[466,664],[464,636],[476,612],[510,590],[548,566],[552,530],[548,494],[528,478],[500,478],[486,470],[470,452]];
    // innere Linien (Patina): Zügel, Schabracke, Mantel, Säbel, Reiterbein, Schweifsträhne
    const DET = ['M690 388Q600 452 494 456', 'M800 452L842 522L884 604L838 572L768 540', 'M798 252Q842 320 858 440', 'M728 420L746 628', 'M736 470L652 506L668 608', 'M1018 440Q1060 520 1100 620'];
    const pt = ([x, y]) => T([x, y]).map(f2).join(' ');
    const dPath = d => d.replace(/([MLQ])([^MLQ]+)/g, (m, c, r) => { const n = r.trim().split(/[ ,]+/).map(Number), o = []; for (let i = 0; i < n.length; i += 2) o.push(pt([n[i], n[i + 1]])); return c + o.join(' '); });
    const fig = (x, cls, extra) => K.facing(1, 0) > 0 ? K.g(K.plane([x, 60.6, Zt], [0, -1, 0], [0, 0, -1]), `<path class="${cls}" d="M${OUT.map(pt).join('L')}Z"/>${extra || ''}`) : '';
    s += fig(68.25, 'iron sd');                                                              // Rückseite der Figur (Tiefe)
    s += fig(68.6, 'brz', `<path class="gz" d="${DET.map(dPath).join('')}"/>`);
    return s;
  } });
  return { mods: M, lc: [70, 13], z0: 0, top: [70, 13, 39], label: 'Hauptbahnhof', h: 39, len: 140 };
});


;/* ===== landesmuseum.js ===== */
/* Niedersächsisches Landesmuseum (Hubert Stier, 1897–1902) – Modul v2, Fotos: ref/landesmuseum/ (Wikimedia, siehe quellen.txt)
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
    add({ id: 'fL', fp: [12, 46.4, 31, 63.4], draw: K => K.box(12, 46.4, Z0, 19, 17, HW, 'pl', { S: wingS(4.6), E: plain, N: plain, W: plain }) + saddleX(K, 12, 46.4, 31, 63.4, Z0 + HW, Z0 + HW + 1.7) });
    add({ id: 'fR', fp: [50.8, 46.4, 71, 63.4], draw: K => K.box(50.8, 46.4, Z0, 20.2, 17, HW, 'pl', { S: wingS(4.6), E: plain, N: plain, W: plain }) + saddleX(K, 50.8, 46.4, 71, 63.4, Z0 + HW, Z0 + HW + 1.7) });
    // Seitenflügel und Rückflügel
    add({ id: 'sW', fp: [0, 0, 18, 46.4], draw: K => K.box(0, 0, Z0, 18, 46.4, HW, 'pl', sides) + hipC(K, 0, 0, 18, 46.4, Z0 + HW, Z0 + HW + 3.2) });
    add({ id: 'sE', fp: [59, 0, 83, 46.4], draw: K => K.box(59, 0, Z0, 24, 46.4, HW, 'pl', sides) + hipC(K, 59, 0, 83, 46.4, Z0 + HW, Z0 + HW + 3.6) });
    add({ id: 'rear', fp: [18, 0, 59, 19.2], draw: K => K.box(18, 0, Z0, 41, 19.2, HW, 'pl', sides) + hipC(K, 18, 0, 59, 19.2, Z0 + HW, Z0 + HW + 3.4) });

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
      return K.box(31, 34.3, Z0, 19.8, 30.5, HR, 'pl', { S: f, E: plain, N: plain, W: plain }) + hipC(K, 31, 34.3, 50.8, 64.8, Z0 + HR, Z0 + HR + 4.6, 'sl', 2)
        + urn(K, 31.8, 63.9, Z0 + HR) + urn(K, 50.0, 63.9, Z0 + HR);
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
        + (K.wallVisible([x, 64.8], [x + 12, 64.8]) ? gablePed(K, x) : '') + urn(K, x + .6, 64.2, Z0 + HP) + urn(K, x + 11.4, 64.2, Z0 + HP);
    } });
    pav('pW', 0); pav('pE', 71);
    return { mods: M, ground, lc: [41.45, 33.1], z0: 0, top: [41, 50, 30], label: 'Landesmuseum', h: 30, len: 83 };
  });
})();


;/* ===== mitte.js ===== */
/* Mitte — Module: Opernhaus (Laves, 1845–1852), Aegidienkirche (Mahnmal-Ruine).
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
   Anzeiger-Hochhaus, NORD/LB, Museum August Kestner, Wangenheimpalais, Kreuzkirche, Neustädter Hof- und Stadtkirche,
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


;/* ===== sprengel.js ===== */
/* Sprengel Museum Hannover – Modul (eine Datei pro Gebäude). Fotos: ref/sprengel/ (Wikimedia Commons, Quellen in quellen.txt), Notizen: ref/sprengel/README.md.
   Lokales System = Mindestrechteck des OSM-Umrisses (w560955703), 236 × 72 m; lokal +x = Richtung Kurt-Schwitters-Platz (NNW), −y = Seite zum Maschsee/Rudolf-von-Bennigsen-Ufer.
   Der gesamte Bau liegt um −4,08° gegen dieses Rechteck gedreht; alle Wände sind im Gebäudesystem (u, v) rechtwinklig. u = Längsachse (0 = Südostende der Erweiterung 2015),
   v quer (0 = Seite zum See). E(u, v) rechnet in das Modulsystem um. Seiten: N = −v (See), S = +v (Stadt), W = −u (Südostende), E = +u (Kurt-Schwitters-Platz).
   Bauteile: Erweiterungsbau 2015 (Meili Peter, anthrazitfarbener Ortbeton, auskragendes Obergeschoss über zurückgesetztem Glassockel), Altbau 1979 (Trint/Quast) mit Erweiterung 1992:
   helle Aluminium-Paneele, Sichtbetonscheiben, gepflasterte Bastion, Eingangsvordach. */
(() => {
  const TH = -4.08 * Math.PI / 180, CT = Math.cos(TH), ST = Math.sin(TH);
  const E = (u, v) => [CT * u - ST * v, 5.3 + ST * u + CT * v];
  ISO.landmark('sprengel', H => {
    const { f2, hl, vl, winR, wins } = H, M = [], add = m => (M.push(m), m);
    const WNg = (x, y, w, h, f, cls = '') => `<rect class="wn${cls}" data-f="${f}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>`;
    const R = (x, y, w, h, cls) => `<rect class="${cls}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>`;

    // Quader im Gebäudesystem: Seiten N (−v), W (−u), S (+v), E (+u); deco je Seite (len, h)
    const box = (K, u0, v0, u1, v1, z0, z1, mat, deco = {}, top = true) => {
      const P = (u, v) => E(u, v);
      let s = K.wall(P(u1, v0), P(u0, v0), z0, z1, mat, deco.N) + K.wall(P(u0, v0), P(u0, v1), z0, z1, mat, deco.W)
        + K.wall(P(u0, v1), P(u1, v1), z0, z1, mat, deco.S) + K.wall(P(u1, v1), P(u1, v0), z0, z1, mat, deco.E);
      if (top) s += K.poly([[...P(u0, v0), z1], [...P(u1, v0), z1], [...P(u1, v1), z1], [...P(u0, v1), z1]], mat + ' tp');
      return s;
    };
    const flat = (K, u0, v0, u1, v1, z, mat) => K.poly([[...E(u0, v0), z], [...E(u1, v0), z], [...E(u1, v1), z], [...E(u0, v1), z]], mat);
    const fpOf = (u0, v0, u1, v1, m = 0) => { // achsparalleles Rechteck im Modulsystem, das ganz im gedrehten Quader liegt
      const c = [E(u0, v0), E(u1, v0), E(u1, v1), E(u0, v1)], xs = c.map(p => p[0]), ys = c.map(p => p[1]);
      const x0 = Math.max(xs[0], xs[3]), x1 = Math.min(xs[1], xs[2]), y0 = Math.max(ys[0], ys[1]), y1 = Math.min(ys[2], ys[3]);
      return [x0 + m, y0 + m, x1 - m, y1 - m];
    };

    // ---------- Erweiterungsbau 2015: Sockel (Glas) + auskragender Oberbau (anthrazitfarbener Ortbeton mit Relief) ----------
    // Wandmaß Oberbau: 9,0 m (Oberkante Brüstung = 0). Zeilen: Sturz 0–1,5, Feldreihe oben 1,5–4,1, Gürtel 4,1–5,0, Feldreihe unten 5,0–7,6, polierter Sockelstreifen 7,6–9,0.
    const Z_B = 3.4, Z_T = 12.4, Z_R = 14.0;
    const fieldRow = (x0, x1, v0, v1, wd, gap = .5) => { // Betonfelder mit Fugen, Breite wd
      let q = '', x = x0; const n = Math.max(1, Math.round((x1 - x0) / wd)), w = (x1 - x0) / n;
      for (let i = 0; i < n; i++) { q += R(x + gap / 2, v0, w - gap, v1 - v0, 'sl sd') + `<path class="dt sl-d" d="M${f2(x + gap / 2)} ${f2(v0)}H${f2(x + w - gap / 2)}V${f2(v1)}H${f2(x + gap / 2)}Z"/>`; x += w; }
      return q;
    };
    const extWall = (len, h, o) => { // o: {wx:[x0,x1] Fensterband(e), ...}
      let q = R(0, 7.6, len, 1.4, 'kc fr') + hl(0, len, 1.5) + hl(0, len, 4.1) + hl(0, len, 5.0) + hl(0, len, 7.6);
      const segs = o.gaps || [];
      const cut = (x0, x1, rowTop, rowBot, wd) => { // Feldreihe mit Aussparungen für Fenster
        let a = x0; const sorted = segs.filter(g => g[2] <= rowTop && g[3] >= rowBot - .01).sort((m, n) => m[0] - n[0]);
        let s2 = '';
        sorted.concat([[x1, x1]]).forEach(g => { if (g[0] - a > 1.2) s2 += fieldRow(a, g[0], rowTop, rowBot, wd); a = g[1]; });
        return s2;
      };
      q += cut(.6, len - .6, 1.5, 4.1, o.wu || 9.4) + cut(.6, len - .6, 5.0, 7.6, o.wl || 6.2);
      let w = '';
      (o.win || []).forEach(([x0, x1, v0, v1, f]) => { w += WNg(x0, v0, x1 - x0, v1 - v0, f) + `<path class="mul" d="M${f2((x0 + x1) / 2)} ${f2(v0)}V${f2(v1)}M${f2(x0)} ${f2((v0 + v1) / 2)}H${f2(x1)}"/>`; });
      return q + wins(w);
    };
    // Fenstergruppe an der Südostseite (zweigeschossig) und Einzelfenster an der Seeseite
    const extN = (len, h) => extWall(len, h, { gaps: [[8.5, 12.7, 1.5, 7.6]], win: [[9.0, 12.2, 1.9, 3.9, 2], [9.0, 12.2, 5.2, 7.4, 1]] });
    const extS = (len, h) => extWall(len, h, { gaps: [], win: [] });
    const extW = (len, h) => extWall(len, h, { gaps: [[8.2, 17.6, 1.5, 7.6]], win: [[8.4, 17.4, 1.7, 4.0, 2], [8.4, 17.4, 5.1, 7.5, 1]], wu: 6, wl: 5 });
    const extE = (len, h) => extWall(len, h, { gaps: [], win: [] });
    add({ id: 'ext', fp: fpOf(0, 0, 74.9, 24.1), draw: K => {
      const g = (len, h) => { let q = '', w = ''; for (let u = 0; u < len - 1; u += 3.2) w += WNg(u + .25, .35, 2.7, h - .7, 0, u % 6.4 < 3.2 && ((u * 5) | 0) % 3 ? ' dim' : '');
        for (let u = 3.2; u < len; u += 3.2) q += `<path class="dt" d="M${f2(u)} 0V${f2(h)}"/>`; return wins(w) + q; };
      let s = box(K, 2.4, 2.4, 74.9, 21.7, 0, Z_B, 'glb', { N: g, W: g, S: g }, false);
      s += box(K, 0, 0, 74.9, 24.1, Z_B, Z_T, 'sl', { N: extN, W: extW, S: extS, E: extE });
      // Dachaufbauten (Oberlichter, weiß verkleidet), zurückgesetzt hinter der Brüstung
      // zehn Dachlaternen (Oberlichter) in zwei Reihen, flach und zurückhaltend
      for (let i = 0; i < 10; i++) { const u = 5 + i * 6.8, r = i % 2 ? 4 : 0; s += box(K, u, 7 + r, u + 4.6, 16 + r, Z_T, Z_T + 1.1, 'kc', {}); }
      return s;
    } });

    // ---------- Altbau 1979: helle Aluminiumpaneele über Glassockel ----------
    const panelWall = (len, h) => { let q = '', w = ''; for (let y = 2.2; y < h - .5; y += 1.6) q += hl(0, len, y);
      for (let x = 0; x < len; x += 9) q += `<path class="dt" d="M${f2(x)} 0V${f2(h)}"/>`;
      if (h > 6) for (let x = 5; x < len - 5; x += 7) w += WNg(x, h - 3.2, 3.2, 1.6, (x * 3 | 0) % 4);
      return R(0, 0, len, h, 'pl') + q + wins(w); };
    const finWall = (len, h) => R(0, 0, len, h, 'kc') + hl(0, len, 1.5);
    add({ id: 'hall', fp: fpOf(76, 2, 200, 46, 1), draw: K => {
      let s = box(K, 76, 2, 200, 46, 0, 9, 'pl', { N: panelWall, W: panelWall, S: panelWall, E: panelWall });
      s += box(K, 84, 8, 168, 34, 9, 11.4, 'pl', { N: panelWall, W: panelWall, S: panelWall, E: panelWall });
      for (let i = 0; i < 9; i++) { const u = 90 + i * 8.5; s += box(K, u, 12, u + 6, 14, 11.4, 12.2, 'glb', {}); s += box(K, u, 24, u + 6, 26, 11.4, 12.2, 'glb', {}); }
      return s; } });
    add({ id: 'wing', fp: fpOf(201, 4, 226, 30, 1), draw: K => {
      const g = (len, h) => { let w = ''; for (let u = 0; u < len - 1; u += 3) w += WNg(u + .2, .5, 2.6, h - 1, (u | 0) % 5); return R(0, 0, len, h, 'sl') + wins(w); };
      return box(K, 201, 4, 226, 30, 0, 5, 'sl', { N: g, W: g, S: g, E: g }); } });
    add({ id: 'plaza', fp: fpOf(190, 46, 236, 71, 0), draw: K => flat(K, 190, 46, 236, 71, 1.2, 'ter') + box(K, 196, 56, 200, 60, 1.2, 9, 'kc', { N: finWall, W: finWall, S: finWall, E: finWall }) });
    add({ id: 'canopy', fp: fpOf(203, 36, 227, 50, 0), draw: K => {
      let s = ''; [[204, 37], [204, 48], [226, 37], [226, 48]].forEach(([u, v]) => { s += box(K, u - .5, v - .5, u + .5, v + .5, 1.2, 7, 'kc', {}); });
      return s + box(K, 203, 36, 227, 50, 7, 8.2, 'pl', { N: finWall, W: finWall, S: finWall, E: finWall }); } });

    return { mods: M, lc: [118.05, 35.9], z0: 0, top: [118, 36, 14], label: 'Sprengel Museum Hannover', h: 14, len: 236 };
  });
})();


;/* ===== welfenschloss.js ===== */
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

