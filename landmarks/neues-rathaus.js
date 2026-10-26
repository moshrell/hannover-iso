/* Neues Rathaus Hannover (1901–1913) — Modul für die Karte. Lokal: x Ost (0…130), y Süd (0 Nordflügel … 66 Südflügel), z Höhe; Gelände z = 3. */
ISO.landmark('neuesRathaus', H => {
  const { f2, rnd, vari, arch, hl, vl, winR, winA, wins, gable, lathe, hip, saddle, roofPlane } = H;
  const Z0 = 3, EA = 25, RG = EA + 10;
  /* Grundriss nach dem OSM-Umriss (r313173), lokal: Körper x 1,5…128, y 0…62; Höfe x 12,7…34,4 und 95,3…117,4, y 12,2…50,3 */
  const X0 = 1.5, X1 = 128, YN = 12.2, YS = 50.3, YB = 62, CW0 = 12.7, CW1 = 34.4, CE0 = 95.3, CE1 = 117.4;
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
  add({ id: 'north', fp: [X0, 0, X1, YN], draw: K => K.box(X0, 0, Z0, X1 - X0, YN, EA - Z0, 'st', { N: facadeFn(4.3), S: facadeCourt, E: facadeFn(4.3), W: facadeFn(4.3) })
      + hip(K, X0, 0, X1, YN, EA, RG) + roofGables(K, 'N') });
  add({ id: 'south', fp: [X0, YS, X1, YB], draw: K => K.box(X0, YS, Z0, X1 - X0, YB - YS, EA - Z0, 'st', { S: facadeFn(4.3), N: facadeCourt, E: facadeFn(4.3), W: facadeFn(4.3) })
      + hip(K, X0, YS, X1, YB, EA, RG) + roofGables(K, 'S') });
  add({ id: 'west', fp: [X0, YN, CW0, YS], draw: K => K.box(X0, YN, Z0, CW0 - X0, YS - YN, EA - Z0, 'st', { W: facadeFn(4.3), E: facadeCourt }) + hip(K, X0, YN - 3, CW0, YS + 3, EA, RG) });
  add({ id: 'east', fp: [CE1, YN, X1, YS], draw: K => K.box(CE1, YN, Z0, X1 - CE1, YS - YN, EA - Z0, 'st', { E: facadeFn(4.3), W: facadeCourt }) + hip(K, CE1, YN - 3, X1, YS + 3, EA, RG) });
  add({ id: 'center', fp: [CW1, YN, CE0, YS], draw: K => K.box(CW1, YN, Z0, CE0 - CW1, YS - YN, EA - Z0, 'st', { E: facadeCourt, W: facadeCourt }) + mansard(K, CW1, YN, CE0, YS, EA, EA + 8, 7) + glassRoof(K) });
  // Mansarddach: steile rote Flanken, oben flaches Schieferdeck (um den Kuppelturm)
  function mansard(K, x0, y0, x1, y1, ze, zt, ins) {
    const a = [x0, y0, ze], b = [x1, y0, ze], c = [x1, y1, ze], d = [x0, y1, ze];
    const a2 = [x0 + ins, y0 + ins, zt], b2 = [x1 - ins, y0 + ins, zt], c2 = [x1 - ins, y1 - ins, zt], d2 = [x0 + ins, y1 - ins, zt];
    return roofPlane(K, [a, b, b2, a2]) + roofPlane(K, [b, c, c2, b2]) + roofPlane(K, [c, d, d2, c2]) + roofPlane(K, [d, a, a2, d2]) + K.face([a2, b2, c2, d2], 'sl');
  }
  // Glasdach neben dem Kuppelfuß (Ostseite)
  function glassRoof(K) {
    const x = 78, y = 25, w = 8, d = 8, z = EA + 8;
    const a = [x, y, z], b = [x + w, y, z], c = [x + w, y + d, z], e = [x, y + d, z], t = [x + w / 2, y + d / 2, z + 4];
    return K.box(x, y, z, w, d, 1.2, 'glb', {}, false) + K.face([[x, y, z + 1.2], [x + w, y, z + 1.2], t], 'glb') + K.face([[x + w, y, z + 1.2], [x + w, y + d, z + 1.2], t], 'glb') + K.face([[x + w, y + d, z + 1.2], [x, y + d, z + 1.2], t], 'glb') + K.face([[x, y + d, z + 1.2], [x, y, z + 1.2], t], 'glb');
  }

  // Zwerchhäuser mit Volutengiebeln auf den Dächern (Süd- und Nordseite)
  function roofGables(K, side) {
    const xs = side === 'S' ? [31, 85] : [20, 34, 92, 106];
    let s = '';
    xs.forEach(x => {
      const w = 12, yF = side === 'S' ? YB : 0, back = side === 'S' ? [0, -5.5] : [0, 5.5];
      const L = side === 'S' ? [x, yF] : [x + w, yF], R = side === 'S' ? [x + w, yF] : [x, yF];
      if (!K.wallVisible(L, R)) return;
      s += saddle(K, L, R, back, EA + 1, EA + 12);
      s += K.wall(L, R, EA, EA + .01, 'st', (len) => gable(len, 12, wins(winA(len / 2 - 2.7, -7, 2.3, 3.8, 3) + winA(len / 2 + .4, -7, 2.3, 3.8, 3)) + `<circle class="dt" cx="${f2(len / 2)}" cy="-9.6" r=".9"/>`));
    });
    // kleine Gauben dazwischen
    const gx = side === 'S' ? [20, 24, 104, 108, 52, 60, 70, 114] : [44, 52, 78, 86];
    gx.forEach(x => {
      const y = side === 'S' ? YB - 5.5 : 2.5;
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
  add({ id: 'risS', fp: [47.5, 62, 81.5, 66.5], parent: 'south', side: 'S', draw: K => {
    let s = saddle(K, [47.5, 66.5], [81.5, 66.5], [0, -14], 30, 46);
    s += `<g class="flood"><rect transform="${K.plane([45.5, 68.5, 30], [1, 0, 0], [0, 0, -1])}" width="38" height="27" fill="url(#hallglow)"/></g>`;
    s += K.box(47.5, 62, Z0, 34, 4.5, 30 - Z0, 'st', { S: () => {
      let q = hl(0, 34, .6) + hl(0, 34, 1.4) + hl(0, 34, 7.4) + hl(0, 34, 8) + hl(0, 34, 18.6) + hl(0, 34, 19.2);
      for (let v = 20.6; v < 27; v += 1.4) q += hl(0, 34, v);
      [3.4, 10.9, 17.9, 25.4, 31.6].forEach(u => { q += vl(u - .3, 8, 18.6) + vl(u + .3, 8, 18.6); });
      let w = [3.4, 9.7, 16, 22.3, 28.6].map(u => winR(u, 2.4, 2.2, 4, 2)).join('');
      w += [5, 12.5, 19.5, 27].map(u => winA(u - 1.6, 9.2, 5.6, 9, 1, ' hi')).join('');
      w += [6.2, 14.6, 23].map(u => winA(u, 19.8, 4.8, 7.2, 0)).join('');
      return q + `<path class="dt" d="M2 18.2H32M2 17H32"/>` + wins(w);
    }, E: (l) => hl(0, l, .6) + hl(0, l, 8), W: (l) => hl(0, l, .6) + hl(0, l, 8) });
    s += K.wall([47.5, 66.5], [81.5, 66.5], 30, 30.01, 'st', () => gable(34, 17, `<circle class="dt" cx="17" cy="-8.6" r="3.6"/>` + wins(`<circle class="wn hi" data-f="4" cx="17" cy="-8.6" r="2.7"/>` + winA(8.4, -6.4, 2.6, 4.4, 4) + winA(23, -6.4, 2.6, 4.4, 4) + winA(16, -15.6, 2, 3, 4))));
    return s;
  } });
  // Südseite: Freitreppe, Terrasse wird im Gelände gezeichnet
  // Seitentürme mit Kupferhauben (Südfassade)
  const sideTower = x => K => {
    let t = K.box(x, 62, Z0, 10, 5, 34 - Z0, 'st', { S: () => { let q = hl(0, 10, 9) + hl(0, 10, 16.4) + hl(0, 10, 17); for (let v = 18.4; v < 31; v += 1.4) q += hl(0, 10, v);
      return q + wins(winA(3.6, 2, 2.8, 5.5, 2) + winA(3.6, 10.2, 2.8, 5.4, 1) + winA(3.8, 23, 2.4, 4.6, 0)); } });
    const belfry = () => `${hl(0, 10, 1)}${hl(0, 10, 9.4)}${hl(0, 10, 10)}${vl(.8, 1, 22)}${vl(9.2, 1, 22)}` + wins(winA(1.6, 2.4, 2.8, 6.2, 4) + winA(5.6, 2.4, 2.8, 6.2, 4) + winA(3.4, 12, 3.2, 6, 3));
    t += K.box(x, 57.5, 34, 10, 10, 22, 'st', { S: belfry, N: belfry, E: belfry, W: belfry });
    t += K.box(x - .6, 56.9, 56, 11.2, 11.2, 1.3, 'st');
    t += lathe(K, x + 5, 62.5, [[57.3, 5.2], [58.6, 5.4], [60.2, 4.6], [61.8, 2.6], [62.8, 1.6]], 'cu', 5, [1]);
    t += lathe(K, x + 5, 62.5, [[62.8, 1.7], [66, 1.7]], 'cu', 3);
    t += lathe(K, x + 5, 62.5, [[66, 2.1], [67, 1.9], [69, .8], [70.5, .4]], 'cu', 3);
    return t + `<path class="dt cu-d" d="${K.path([[x + 5, 62.5, 70.5], [x + 5, 62.5, 78]])}"/>`;
  };
  add({ id: 'twW', fp: [19.5, 62, 29.5, 67], parent: 'south', side: 'S', draw: sideTower(19.5) });
  add({ id: 'twE', fp: [100, 62, 110, 67], parent: 'south', side: 'S', draw: sideTower(100) });

  // Eckpavillons mit Giebeln (Süd und Nord)
  const pavilion = (x, side) => K => {
    const yF = side === 'S' ? YB : -2, y0 = side === 'S' ? YB - 4 : -2, dp = side === 'S' ? 4 : 2;
    const L = side === 'S' ? [x, yF] : [x + 14, yF], R = side === 'S' ? [x + 14, yF] : [x, yF];
    let t = saddle(K, L, R, side === 'S' ? [0, -9] : [0, 9], EA, EA + 13);
    t += K.box(x, y0, Z0, 14, dp, EA - Z0, 'st', { [side]: (l, h) => facadeMain(l, h, 4.6), E: l => hl(0, l, .6), W: l => hl(0, l, .6) });
    t += K.wall(L, R, EA, EA + .01, 'st', () => gable(14, 14, wins(winA(4.2, -8, 2.2, 4, 3) + winA(7.6, -8, 2.2, 4, 3) + winA(6, -12.4, 2, 2.4, 4))));
    return t;
  };
  add({ id: 'pSW', fp: [X0, YB - 4, X0 + 14, YB], parent: 'south', side: 'S', draw: pavilion(X0, 'S') });
  add({ id: 'pSE', fp: [X1 - 14, YB - 4, X1, YB], parent: 'south', side: 'S', draw: pavilion(X1 - 14, 'S') });
  add({ id: 'pNW', fp: [X0, -2, X0 + 14, 0], parent: 'north', side: 'N', draw: pavilion(X0, 'N') });
  add({ id: 'pNE', fp: [X1 - 14, -2, X1, 0], parent: 'north', side: 'N', draw: pavilion(X1 - 14, 'N') });

  // Ost- und Westseite: Mittelrisalite mit Giebel
  const sideRis = side => K => {
    const x = side === 'E' ? X1 : X0 - 1.5, xf = side === 'E' ? X1 + 1.5 : X0 - 1.5, y0 = 22.6, w = 17;
    const L = side === 'E' ? [xf, y0 + w] : [xf, y0], R = side === 'E' ? [xf, y0] : [xf, y0 + w];
    let t = saddle(K, L, R, side === 'E' ? [-8, 0] : [8, 0], EA, EA + 12);
    t += K.box(x, y0, Z0, 1.5, w, EA - Z0, 'st', { [side]: (l, h) => facadeMain(l, h, 4.2), N: l => hl(0, l, .6), S: l => hl(0, l, .6) });
    t += K.wall(L, R, EA, EA + .01, 'st', () => gable(w, 14, wins(winA(w / 2 - 3, -8, 2.4, 4.4, 3) + winA(w / 2 + .6, -8, 2.4, 4.4, 3)) + `<circle class="dt" cx="${f2(w / 2)}" cy="-11" r="1.3"/>`));
    return t;
  };
  add({ id: 'risE', fp: [X1, 22.6, X1 + 1.5, 39.6], parent: 'east', side: 'E', draw: sideRis('E') });
  add({ id: 'risW', fp: [X0 - 1.5, 22.6, X0, 39.6], parent: 'west', side: 'W', draw: sideRis('W') });

  // Nordseite (Trammplatz): Eingangsrisalit mit Loggia, Welscher Haube und zwei Achtecktürmen (Maße: OSM-Umriss)
  add({ id: 'risN', fp: [55, -8.6, 74.5, 0], parent: 'north', side: 'N', draw: K => {
    const RW = 19.5;
    let s = K.box(55, -8.6, Z0, RW, 8.6, 30 - Z0, 'st', { N: () => {
      let q = hl(0, RW, .6) + hl(0, RW, 1.4) + hl(0, RW, 7.6) + hl(0, RW, 8.2) + hl(0, RW, 18.4) + hl(0, RW, 19);
      for (let v = 20.4; v < 27; v += 1.4) q += hl(0, RW, v);
      // Loggia: drei Bögen zwischen vier Säulen
      let w = [4.25, 9.75, 15.25].map(u => winA(u - 1.8, 9.2, 3.6, 8.4, 1, ' hi')).join('');
      [1.5, 7, 12.5, 18].forEach(u => { q += `<rect class="st fr" x="${f2(u - .45)}" y="9" width=".9" height="9.4"/>`; });
      w += [3.2, 8.7, 14.2].map(u => winR(u, 2.4, 2.2, 4, 2)).join('');
      w += winA(6.2, 20, 7, 7, 0, ' hi') + winA(1.6, 20.8, 3.4, 6, 0) + winA(14.6, 20.8, 3.4, 6, 0);
      return q + `<path class="dt" d="M1 18H18.5M1 17.2H18.5"/>` + wins(w);
    }, E: l => hl(0, l, .6) + hl(0, l, 8.2), W: l => hl(0, l, .6) + hl(0, l, 8.2) });
    s += lathe(K, 64.8, -4.3, [[30, 9.4], [31.2, 9.5], [34, 8.2], [36.6, 5], [38.4, 3.2]], 'cu', 6, [1]);
    s += lathe(K, 64.8, -4.3, [[38.4, 1.8], [41.4, 1.8]], 'lant', 4);
    s += lathe(K, 64.8, -4.3, [[41.4, 2.2], [42.4, 1.9], [44, .7]], 'cu', 3);
    return s + `<path class="dt cu-d" d="${K.path([[64.8, -4.3, 44], [64.8, -4.3, 49]])}"/>`;
  } });
  const octo = cx => K => {
    const cy = -4, r = 4, z1 = 38;
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
  add({ id: 'octW', fp: [43, -8, 51, 0], parent: 'north', side: 'N', draw: octo(47) });
  add({ id: 'octE', fp: [78.3, -8, 86.3, 0], parent: 'north', side: 'N', draw: octo(82.3) });

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


  const ground = K => K.box(-7, -11, 0, 144, 88, Z0, 'ter', {}, true) + `<rect class="court" transform="${K.TOP(CW0, YN, Z0)}" width="${CW1 - CW0}" height="${YS - YN}"/><rect class="court" transform="${K.TOP(CE0, YN, Z0)}" width="${CE1 - CE0}" height="${YS - YN}"/>`;
  return { mods: M, lc: [65, 33], z0: 0, ground, top: [65, 35, 99], label: 'Neues Rathaus', h: 99, len: 132 };
});
