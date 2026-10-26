// GENERIERT von tools/build-landmarks.py aus landmarks/*.js – nicht von Hand ändern

;/* ===== aegidienkirche.js ===== */
/* Aegidienkirche Hannover (Kirchenruine, Mahnmal) – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Turm im Westen (x klein), Chor im Osten.
   Grundriss aus dem OSM-Umriss (Relation 7359339, Maße in m): Turm 8,8 × 10,3, dreischiffige Halle 36 × 21 m mit 5 Jochen (Strebepfeiler im Abstand 6–7,5 m), Polygonchor 3/8 mit 6 m Tiefe.
   Höhen und Zierformen nach den Kameraflügen in ref/aegidienkirche/foto/ (Gesimse, Uhr, Kupferaufsatz von 1958 und Laterne siehe INDEX.md). Alles selbst gezeichnet.
   Ruine: kein Dach, keine Gewölbe, keine Pfeiler im Schiff; nur die Außenwände mit Fensteröffnungen und Jochgiebeln, der Chor und der Westturm stehen. Leere Fenster sind dunkle Öffnungen (.wn.off), nicht beleuchtet. */
ISO.landmark('aegidienkirche', H => {
  const { f2, hl, vl, garch, clockSVG, lathe } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const T = 1.1;                                    // Wandstärke
  const WH = 10, GR = 5.4, CH = 8.4;                // Traufhöhe Seitenschiffwand, Giebelhöhe darüber, Chorwand
  const X0 = 8, TX1 = 16.8, TY0 = 5.4, TY1 = 15.7;  // Turm (x 8 … 16,8; y 5,4 … 15,7)
  const XE = 52.4, YN = 1.2, YS = 21.3;             // Ostende der Seitenschiffe, Außenkanten Nord-/Südwand
  const BUT = [18.5, 24.6, 30.8, 37.1, 44.2, 51.7]; // Strebepfeiler (Mitten), 5 Joche dazwischen
  const shadeK = (K, nx, ny) => { const co = (K.view[0] + K.view[1]) / 2, si = (K.view[0] - K.view[1]) / 2; return ny * co + nx * si >= nx * co - ny * si ? 'fr' : 'sd'; };
  // leere Öffnung (Spitzbogen) – dunkles Loch, kein Licht
  const hole = (u, zt, w, hh, wallH) => `<path class="wn off" data-f="1" d="${garch(u - w / 2, wallH - zt, w, hh)}"/>`;
  const shade = (l, h) => `<rect class="ishade" width="${f2(l)}" height="${f2(h)}"/>`;
  // Joch-Fenster einer Seitenschiffwand (u ab x0 der Wand)
  const bayWins = (x0, wallH) => { let s = '';
    for (let i = 0; i < 5; i++) { const a = BUT[i], b = BUT[i + 1], w = i > 2 ? 3 : 2.6; s += hole((a + b) / 2 - x0, WH - .7, w, 6.4, wallH); }
    return s; };
  const buttLines = (x0, len, h) => BUT.filter(b => b > x0 + .3 && b < x0 + len - .3).map(b => vl(b - x0, 0, h)).join('');
  // Jochgiebel auf der Wandkrone (Wandkoordinaten: Fuß y = 0, nach oben negativ); sh = Schattenklasse
  const gables = (x0, sh) => { let s = '';
    for (let i = 0; i < 5; i++) { const a = BUT[i] - x0 + .35, b = BUT[i + 1] - x0 - .35, m = (a + b) / 2;
      s += `<path class="rs ${sh}" d="M${f2(a)} 0L${f2(m)} ${f2(-GR)}L${f2(b)} 0Z"/><path class="dt" d="M${f2(a + 1.1)} -.4L${f2(m)} ${f2(-GR + .7)}L${f2(b - 1.1)} -.4"/>`
        + `<circle class="wn off" data-f="1" cx="${f2(m)}" cy="${f2(-GR * .42)}" r=".5"/>`; }
    return s; };
  // Strebepfeiler (außen, Südseite) mit kleiner Pyramide
  const pier = (K, cx, y0, d, zh) => {
    const a = .5; let s = K.box(cx - a, y0, Z0, 2 * a, d, zh, 'rs', {}, false);
    const c = [[cx - a, y0], [cx + a, y0], [cx + a, y0 + d], [cx - a, y0 + d]];
    for (let i = 0; i < 4; i++) s += K.face([[...c[i], Z0 + zh], [...c[(i + 1) % 4], Z0 + zh], [cx, y0 + d / 2, Z0 + zh + 1.3]], 'st');
    return s; };
  // Grundriss Polygonchor (außen): Ansatz an Ostwand des Schiffs, 3/8-Schluss
  const CP = [[XE, 7.4], [55.3, 7.4], [58.4, 10.3], [58.4, 13.3], [55.3, 16.2], [XE, 16.2]];
  const CI = [[XE, 8.5], [55.3, 8.5], [57.3, 10.7], [57.3, 12.9], [55.3, 15.1], [XE, 15.1]];

  /* ---------- Boden der Ruine (Schiff + Chor), dunkles Pflaster ---------- */
  const floorPts = [[TX1, YN + T], [51.3, YN + T], [51.3, 8.5], ...CI.slice(1, 5).map(p => p), [51.3, 15.1], [51.3, YS - T], [TX1, YS - T]];
  const ground = K => `<path class="pave" d="${K.path(floorPts.map(p => [p[0], p[1], Z0 + .05]))}Z"/>`;

  /* ---------- Nordwand (Innenseite sichtbar), Joche mit Giebeln ---------- */
  add({ id: 'aeN', o: .3, fp: [TX1, YN, XE - 1.1, YN + T], draw: K => {
    const L = XE - 1.1 - TX1;
    let s = K.box(TX1, YN, Z0, L, T, WH, 'rs', {
      S: (l, h) => shade(l, h) + hl(0, l, .5) + buttLines(TX1, l, h) + bayWins(TX1, h),
      E: (l, h) => '' }, true);
    s += K.wall([TX1, YN + T], [XE - 1.1, YN + T], Z0 + WH, Z0 + WH + .01, 'rs', () => gables(TX1, shadeK(K, 0, 1)));
    return s; } });

  /* ---------- Westende der Seitenschiffe (stoßen an den Turm) ---------- */
  add({ id: 'aeNw', o: .35, fp: [TX1, YN, TX1 + T, TY0], draw: K =>
    K.box(TX1, YN, Z0, T, TY0 - YN, WH, 'rs', { E: (l, h) => shade(l, h) + hl(0, l, .5) }, true) });
  add({ id: 'aeSw', o: .35, fp: [TX1, TY1, TX1 + T, YS], draw: K =>
    K.box(TX1, TY1, Z0, T, YS - TY1, WH, 'rs', { E: (l, h) => shade(l, h) + hl(0, l, .5) }, true) });

  /* ---------- Ostgiebelwände der Seitenschiffe (neben dem Chor) ---------- */
  const endWall = (id, y0, y1, fpY) => add({ id, o: .4, fp: [XE - 1.1, fpY[0], XE, fpY[1]], draw: K => {
    const wl = y1 - y0;
    let s = K.box(XE - 1.1, y0, Z0, 1.1, wl, WH, 'rs', { E: (l, h) => hl(0, l, .5) + hole(l / 2, WH - .8, 2.2, 6, h), S: (l, h) => hl(0, l, .5) }, true);
    // Giebeldreieck über der Ostwand (u läuft von Süd nach Nord)
    s += K.wall([XE, y1], [XE, y0], Z0 + WH, Z0 + WH + .01, 'rs', l => `<path class="rs ${shadeK(K, 1, 0)}" d="M.3 0L${f2(l / 2)} ${f2(-GR - .6)}L${f2(l - .3)} 0Z"/><path class="dt" d="M1.2 -.4L${f2(l / 2)} ${f2(-GR + .2)}L${f2(l - 1.2)} -.4"/>`);
    return s; } });
  endWall('aeNe', YN, 7.4, [YN, 7.4]);
  endWall('aeSe', 16.2, YS, [16.2, YS]);

  /* ---------- Südwand (Außenseite sichtbar) mit Strebepfeilern ---------- */
  add({ id: 'aeS', o: .5, fp: [TX1, YS - T, XE, YS + .9], draw: K => {
    const L = XE - TX1;
    let s = K.box(TX1, YS - T, Z0, L, T, WH, 'rs', {
      S: (l, h) => hl(0, l, .5) + hl(0, l, h * .38) + bayWins(TX1, h),
      E: (l, h) => hl(0, l, .5) }, true);
    s += K.wall([TX1, YS], [XE, YS], Z0 + WH, Z0 + WH + .01, 'rs', () => gables(TX1, shadeK(K, 0, 1)));
    BUT.forEach(b => { s += pier(K, b, YS, .9, WH + 1.6); });
    return s; } });

  /* ---------- Chor: Polygonwand, Fenster, kleiner Mittelgiebel ---------- */
  add({ id: 'aeCh', o: .45, fp: [XE, 7.4, 58.4, 16.2], draw: K => {
    const cen = [(XE + 58.4) / 2, 11.8];
    // Kante so ausrichten, dass die Wandnormale nach außen (inner = false) bzw. nach innen (inner = true) zeigt
    const edge = (A, B, inner) => {
      const nx = -(B[1] - A[1]), ny = B[0] - A[0], mx = (A[0] + B[0]) / 2 - cen[0], my = (A[1] + B[1]) / 2 - cen[1];
      return (nx * mx + ny * my > 0) === inner ? [B, A] : [A, B]; };
    const len = (A, B) => Math.hypot(B[0] - A[0], B[1] - A[1]);
    let s = '';
    // 1) Innenseite der Nordwand des Chors (blickt nach Süden, hinten)
    { const [L, R] = edge(CP[0], CP[1], true);
      s += K.wall(L, R, Z0, Z0 + CH, 'rs', (w, h) => shade(w, h) + hl(0, w, .5)); }
    // 2) Außenflächen von hinten nach vorn
    const fac = [1, 2, 3, 4].map(i => { const A = CP[i], B = CP[i + 1]; return { i, A, B, d: K.depth((A[0] + B[0]) / 2, (A[1] + B[1]) / 2) }; }).sort((p, q) => p.d - q.d);
    fac.forEach(({ i, A, B }) => {
      const [L, R] = edge(A, B, false), mid = i === 2;
      s += K.wall(L, R, Z0, Z0 + CH, 'rs', (w, h) => hl(0, w, .5) + hl(0, w, h * .5) + hole(w / 2, CH - .7, mid ? 1.5 : 1.3, 5.2, h) + (w > 2 ? vl(.4, 0, h) + vl(w - .4, 0, h) : '')); });
    // 3) Wandkrone als offenes U (der Chorbogen zum Schiff bleibt frei)
    const U = [...CP, ...CI.slice().reverse()].map(p => [p[0], p[1], Z0 + CH]);
    s += `<path class="rs tp" d="${K.path(U)}Z"/>`;
    // 4) kleiner Giebel über der Ostfläche (steht vor der Wandkrone)
    { const [L, R] = edge(CP[2], CP[3], false);
      s += K.wall(L, R, Z0 + CH, Z0 + CH + .01, 'rs', w => `<path class="rs ${shadeK(K, 1, 0)}" d="M.4 0L${f2(w / 2)} -2.8L${f2(w - .4)} 0Z"/><circle class="wn off" data-f="1" cx="${f2(w / 2)}" cy="-1.1" r=".38"/>`); }
    return s; } });

  /* ---------- Westturm: Barockfassade (1703–1711), Kupferaufsatz von 1958 ---------- */
  add({ id: 'aeTower', o: .7, fp: [X0, TY0, TX1, TY1], draw: K => {
    const cx = (X0 + TX1) / 2, cy = (TY0 + TY1) / 2, w = TX1 - X0, d = TY1 - TY0;
    const face = nx => shadeK(K, nx, 1 - nx);
    // Stufen (Höhen über Gelände): Sockel/Backstein 0–16, Sockelgesims 16–18,7, Glockengeschoss 18,7–27,5, Gesims –29,4, Uhrgeschoss –35,2, Kranzgesims –37,7
    const quoins = (len, h) => vl(.9, 0, h) + vl(len - .9, 0, h);
    const lowS = (len, h) => quoins(len, h) + hl(0, len, 2.5) + hl(0, len, 6.5) + hl(0, len, 11) + hole(len / 2, 12.6, 1.5, 4.4, h);
    const lowE = (len, h) => {
      const bk = `<rect class="bk ${shadeK(K, 1, 0)}" x="1" y=".3" width="${f2(len - 2)}" height="${f2(h - .3)}"/>`;
      return quoins(len, h) + bk + hole(len / 2, 9.4, 4.4, 9.2, h) + hole(len / 2, 14.3, 1.3, 2.8, h) + hl(1, len - 1, 3.5); };
    let s = K.box(X0, TY0, Z0, w, d, 16, 'rs', { S: lowS, E: lowE }, false);
    s += K.box(X0 - .45, TY0 - .45, Z0 + 16, w + .9, d + .9, 2.7, 'rs', {
      S: (l, h) => hl(0, l, .9) + hl(0, l, 1.8), E: (l, h) => hl(0, l, .9) + hl(0, l, 1.8) }, true);
    const belf = (len, h) => quoins(len, h) + hole(len / 2, 7.2, 2.0, 5.6, h) + vl(2.6, .4, h - .4) + vl(len - 2.6, .4, h - .4) + hl(0, len, h - 1.2);
    s += K.box(X0, TY0, Z0 + 18.7, w, d, 8.8, 'rs', { S: belf, E: belf }, false);
    s += K.box(X0 - .4, TY0 - .4, Z0 + 27.5, w + .8, d + .8, 1.9, 'rs', { S: (l, h) => hl(0, l, .6) + hl(0, l, 1.3), E: (l, h) => hl(0, l, .6) + hl(0, l, 1.3) }, true);
    const clk = (len, h) => quoins(len, h) + clockSVG(len / 2, h * .46, 1.55) + `<rect class="dt" x="${f2(len / 2 - .45)}" y="${f2(h - 2.2)}" width=".9" height=".9"/>` + hl(0, len, h - .6);
    s += K.box(X0, TY0, Z0 + 29.4, w, d, 5.8, 'rs', { S: clk, E: clk }, false);
    s += K.box(X0 - .8, TY0 - .8, Z0 + 35.2, w + 1.6, d + 1.6, 2.5, 'rs', { S: (l, h) => hl(0, l, .7) + hl(0, l, 1.6), E: (l, h) => hl(0, l, .7) + hl(0, l, 1.6) }, true);
    // Kupferaufsatz (1958): achteckiger Sockel, offene Laterne, Haube, Spitze
    const z = Z0 + 37.7;
    s += lathe(K, cx, cy, [[z, 3.5], [z + 3.3, 3.6], [z + 4.8, 2.2]], 'cu', 4, [1]);
    // Laterne: offener Rahmen, Sanduhrform (unten ausladend, Taille, oben wieder breiter); innen dunkel, darin das Glockengeschoss (schwach beleuchtet)
    s += lathe(K, cx, cy, [[z + 4.8, 2.9], [z + 5.4, 2.9]], 'cu');
    const pr = [[z + 5.4, 2.9], [z + 6.3, 2.1], [z + 9.2, 1.75], [z + 11.6, 2.0], [z + 13.6, 2.6]];
    s += lathe(K, cx, cy, pr.map(([zz, r]) => [zz, r * .92]), 'brz', 0);
    s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[z + 6, .9], [z + 12.4, .9]], '')}</g>`;
    s += lathe(K, cx, cy, [[z + 6, .6], [z + 12.4, .6]], 'lant', 0);
    const posts = []; for (let i = 0; i < 8; i++) { const a = Math.PI * 2 * (i + .5) / 8; if (K.facing(Math.cos(a), Math.sin(a)) > 0) posts.push(a); }
    posts.sort((p, q) => (Math.cos(p) + Math.sin(p)) - (Math.cos(q) + Math.sin(q)));
    posts.forEach(a => { const rr = 2.05; s += K.box(cx + rr * Math.cos(a) - .18, cy + rr * Math.sin(a) - .18, z + 5.4, .36, .36, 8.2, 'cu', {}, false); });
    s += lathe(K, cx, cy, [[z + 13.0, 2.5], [z + 13.6, 2.7]], 'cu');
    // Haube: flache Kupferhaube mit aufgebogenem Rand, kurze Spitze
    s += lathe(K, cx, cy, [[z + 13.6, 2.7], [z + 14.2, 3.6], [z + 14.8, 3.7], [z + 15.5, 3.2], [z + 16.4, 2.2], [z + 17.0, 1.2], [z + 17.4, .6]], 'cu', 4, [1, 2]);
    s += `<path class="dt cu-d" d="${K.path([[cx, cy, z + 17.4], [cx, cy, z + 19.8]])}"/>`;
    return s; } });

  return { mods: M, ground, lc: [33.2, 11.1], z0: 0, top: [12.4, 10.5, 57], label: 'Aegidienkirche', h: 57, len: 51 };
});


;/* ===== altesRathaus.js ===== */
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
      // Hof mit Glasdach
      s += K.poly([[22, 9, GL], [XS, 9, GL], [XS, 26, GL], [22, 26, GL]], 'gl');
      for (let y = 11; y < 26; y += 2) s += `<path class="dt" d="${K.path([[22, y, GL], [XS, y, GL]])}"/>`;
      for (let x = 25; x < XS; x += 3) s += `<path class="dt" d="${K.path([[x, 9, GL], [x, 26, GL]])}"/>`;
      // SW-Flügel: Backsteinwand, graues Flachdach mit Klimageräten
      s += K.wall([22, LY], [XS, LY], Z0, FL, 'bk', brick(4));
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
      s += K.wall([LX, 26.85], [LX, 8.85], EA, EA + .01, 'bk', () => groupM('bk', frieze(18, -.4) + sgable(18, 11, 4, 'bk', shade(K, 1, 0), 3, 3)));
      return s;
    } });

    return { mods: M, lc: [LX / 2, LY / 2], z0: 0, top: [LX, LY / 2, RG_SO], label: 'Altes Rathaus', h: RG_SO, len: LX };
  });
})();


;/* ===== altstadt.js ===== */
/* Altstadt Hannover — Modul für die Karte: Marktkirche (Altes Rathaus: landmarks/altesRathaus.js, Leineschloss: landmarks/leineschloss.js). Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
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


;/* ===== beginenturm.js ===== */
/* Beginenturm (um 1357, Am Hohen Ufer, Hannover) – Modul. Rest der mittelalterlichen Stadtbefestigung: runder Wehrturm aus hellem Bruchstein,
   unten leicht verbreitert, zwei Mauerbänder, kleine Scharten, Wappenstein, zwölfseitiges Ziegel-Pyramidendach; steht an der Südwestecke des Historischen Museums.
   Nach Google-Earth-Kadern ref/beginenturm/foto/ (v_01–v_04, v_06 = Rundturm; v_05 zeigt einen anderen, quadratischen Turm am Museum, nicht gezeichnet).
   Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. */
(() => {
  const Z0 = 1, C = 5, R = 4.9, TAU = Math.PI * 2;
  ISO.landmark('beginenturm', H => {
    const { f2, hull, lathe } = H, M = [];
    const vis = (K, a) => K.facing(Math.cos(a), Math.sin(a)) > 0;
    const dk = (K, a) => Math.sin(a) * K.view[0] - Math.cos(a) * K.view[1] < 0;
    const pathOf = pts => 'M' + hull(pts).map(p => p.map(f2).join(' ')).join('L') + 'Z';
    // sichtbare Schattenhälfte eines Drehkörpers (wie fr/sd bei den Kastenwänden)
    const half = (K, prof, cls) => {
      const pts = []; prof.forEach(([z, r]) => { for (let i = 0; i < 60; i++) { const a = TAU * i / 60; if (vis(K, a) && dk(K, a)) pts.push(K.P(C + r * Math.cos(a), C + r * Math.sin(a), z)); } });
      return pts.length > 2 ? `<path class="${cls} sd" d="${pathOf(pts)}"/>` : '';
    };
    // Detail an einem Punkt der Mantelfläche: Winkel a, Höhe z
    const at = (K, a, z, r) => K.P(C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z);
    M.push({ id: 'bt', fp: [0, 0, 10, 10], draw: K => {
      const wall = [[Z0, 5.3], [Z0 + 5, R + .05], [Z0 + 21, R]];
      let s = lathe(K, C, C, wall, 'rs fr', 0) + half(K, wall, 'rs');
      // zwei Mauerbänder (Rücksprünge), sichtbare Seite
      [8.2, 14.6].forEach(z => { const pts = []; for (let i = 0; i <= 48; i++) { const a = TAU * i / 48; if (vis(K, a)) pts.push([C + (R + .1) * Math.cos(a), C + (R + .1) * Math.sin(a), Z0 + z]); }
        if (pts.length > 1) s += `<path class="dt" stroke-width="1.1" d="${K.path(pts)}"/>`; });
      // Bruchsteinlagen: feine Fugenringe
      for (let z = 3; z < 21; z += 3.5) { const pts = []; for (let i = 0; i <= 48; i++) { const a = TAU * i / 48; if (vis(K, a)) pts.push([C + R * Math.cos(a), C + R * Math.sin(a), Z0 + z]); }
        if (pts.length > 1) s += `<path class="dt" opacity=".22" d="${K.path(pts)}"/>`; }
      // Scharten (v_03: eine auf der Ostseite oben, zwei unten) und Wappenstein
      [[.15, 16.5, 'dim'], [1.0, 11.3, 'dim'], [-.45, 5.2, 'dim']].forEach(([a, z, c]) => { if (!vis(K, a)) return; const p = at(K, a, z, R + .05);
        s += `<rect class="wn ${c}" data-f="${Math.floor(z / 5)}" x="${f2(p[0] - .25)}" y="${f2(p[1] - .8)}" width=".5" height="1.6"/>`; });
      const w = at(K, .95, 18.6, R + .06); if (vis(K, .95)) s += `<path class="rs sd" d="M${f2(w[0] - .7)} ${f2(w[1] - .9)}h1.4v1.1l-.7 .9l-.7 -.9z"/>`;
      // Konsolkranz unter dem Dach
      s += lathe(K, C, C, [[Z0 + 21, R + .05], [Z0 + 21.9, R + .3]], 'rs', 0);
      // Dach: zwölfseitige Pyramide, Ziegel (Biberschwanz), kleine Spitze
      const roof = [[Z0 + 21.9, R + .45], [Z0 + 22.1, R + .45], [Z0 + 27.6, .15]];
      s += lathe(K, C, C, roof, 'tl fr', 6, [1]) + half(K, roof, 'tl');
      return s;
    } });
    return { mods: M, lc: [C, C], z0: 0, top: [C, C, 28], label: 'Beginenturm', h: 27, len: 10 };
  });
})();


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
    // Schiffsdach läuft bis zur Querhausfirst weiter: Dreieck der Südfläche zwischen Schiffsfirst, Querhauswand und Kehle (sonst klafft hier ein Loch im Dach)
    const yv = AY - (TW - AW) * (AY - YC) / (RN - AW);   // y, wo die Schiffsfläche die Höhe der Querhauswand erreicht
    s += K.face([[TX0b, yv, Zh(TW)], [TXM, YC, Zh(RN)], [TX0b, YC, Zh(RN)]], 'sl');
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


;/* ===== gartenkirche.js ===== */
/* Gartenkirche St. Marien (Hannover, Mitte) – Modul. Lokal: x Ost (Längsachse), y Süd, z Höhe, Gelände z = 1. Turm im Westen (x klein), Chor im Osten.
   Grundriss nach dem OSM-Umriss (way 138392040, um 4° gedreht: lange Achse = x, Ursprung = Ecke des Umrissrechtecks), Höhen und Gliederung nach den Google-Earth-Kadern in ref/gartenkirche/foto/.
   Neugotische Hallenkirche aus Deister-Sandstein (Rudolph Eberhard Hillebrand, 1887–1891); der Turmhelm (einst fast 85 m) brannte 1943 ab und wurde nicht wiederaufgebaut: heute ein Pyramidendach.
   Sichtbar sind nur Süd- und Ostseiten; Nord- und Westseiten sind in groben Zügen vorhanden, siehe ref/gartenkirche/README.md. Alles selbst gezeichnet. */
ISO.landmark('gartenkirche', H => {
  const { f2, garch, wins, hip, roofPlane, clockSVG, louvre } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const Zh = z => Z0 + z;                                   // Höhe über Gelände -> lokales z

  /* ---------- Maße (m über Gelände), aus den Kadern geschätzt (Maßstab: Querhausbreite / Strebepfeilerabstand aus OSM) ---------- */
  const EAVE = 13.5, RIDGE = 25.5, ARM = 21.6;               // Traufe der Halle, First des Hauptdachs, First der Querhausdächer
  const YN = 8.1, YC = 16.15, YS = 24.2;                      // Nordwand, Mittelachse, Südwand der Halle
  const KZ = (RIDGE - EAVE) / (YS - YC);                      // Dachsteigung (m Höhe je m Tiefe)
  const TX0 = 1.0, TX1 = 8.7, TY0 = 11.0, TY1 = 21.0, TH = 37.0;   // Turm
  const XA = 26.1, XB = 36.3;                                 // Querhaus (West-/Ostkante)
  const YF = 27.0;                                            // Südfront des Querhaus-Südarms (Portalvorbau tritt 1 m weiter vor)
  const XC = 40.7, XE = 44.9;                                 // Ende des Chorjochs / der Apsis
  const A1 = [XC, YS], A2 = [XE, 19.7], A3 = [XE, 12.6], A4 = [XC, YN];   // Apsis: drei Seiten
  const AP = [43.1, YC, RIDGE];                               // Spitze des Apsisdachs

  /* ---------- Hilfen ---------- */
  const shadeK = (K, nx, ny) => { const co = (K.view[0] + K.view[1]) / 2, si = (K.view[0] - K.view[1]) / 2; return ny * co + nx * si >= nx * co - ny * si ? 'fr' : 'sd'; };
  const hline = (len, y) => `M0 ${f2(y)}H${f2(len)}`;
  const crs = (len, h, z0, z1, step) => { let d = ''; for (let z = z0; z < z1; z += step) d += hline(len, h - z); return `<path class="dt" d="${d}"/>`; };
  const band = (sh, len, h, z, t = .3) => `<rect class="st ${sh}" x="0" y="${f2(h - z - t)}" width="${f2(len)}" height="${f2(t)}"/>`;
  // Kragsteinfries: kurze Striche unter dem Gesims
  const corbel = (len, y, step = .8) => { let d = ''; for (let u = step / 2; u < len; u += step) d += `M${f2(u)} ${f2(y)}v.55`; return `<path class="dt" d="${d}"/>`; };
  // Spitzbogenfenster: Rahmen (fr) + leuchtendes Glas mit Pfosten, Querriegel und Maßwerkkreis (wn)
  const lan = (h, u, zb, zt, w, f = 1, n = 2) => {
    const y = h - zt, hh = zt - zb, x = u - w / 2; let d = '';
    for (let k = 1; k < n; k++) d += `M${f2(x + w * k / n)} ${f2(y + w * .62)}V${f2(y + hh)}`;
    d += `M${f2(x)} ${f2(y + hh * .6)}H${f2(x + w)}M${f2(x)} ${f2(y + hh * .8)}H${f2(x + w)}`;
    return {
      fr: `<path class="dt" d="${garch(x - .3, y - .32, w + .6, hh + .32)}"/>`,
      wn: `<path class="wn" data-f="${f}" d="${garch(x, y, w, hh)}"/><path class="mul" d="${d}"/><circle class="mul" cx="${f2(u)}" cy="${f2(y + w * .5)}" r="${f2(w * .16)}"/>`,
    };
  };
  // Rosette mit Speichen (Rad-Maßwerk): Wandkoordinaten, Mitte (cx, cy), Radius r
  const rose = (cx, cy, r, f = 2) => {
    let d = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; d += `M${f2(cx + r * .3 * Math.cos(a))} ${f2(cy + r * .3 * Math.sin(a))}L${f2(cx + r * Math.cos(a))} ${f2(cy + r * Math.sin(a))}`; }
    let pe = ''; for (let i = 0; i < 12; i++) { const a = (i + .5) * Math.PI / 6; pe += `<circle class="mul" cx="${f2(cx + r * .62 * Math.cos(a))}" cy="${f2(cy + r * .62 * Math.sin(a))}" r="${f2(r * .16)}"/>`; }
    return {
      fr: `<circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .35)}"/><circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .75)}"/>`,
      wn: `<circle class="wn" data-f="${f}" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}"/><path class="mul" d="${d}"/>${pe}<circle class="mul" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * .3)}"/><circle class="mul" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * .85)}"/>`,
    };
  };
  // Fiale: quadratischer Schaft + Pyramidenhelm
  const pin = (K, cx, cy, zb, zt, w, mat = 'st') => {
    const a = w / 2, ch = w * 2.6, zs = zt - ch, c = [[cx - a, cy - a], [cx + a, cy - a], [cx + a, cy + a], [cx - a, cy + a]];
    let s = K.box(cx - a, cy - a, zb, w, w, zs - zb, mat, {}, false);
    for (let i = 0; i < 4; i++) s += K.face([[...c[i], zs], [...c[(i + 1) % 4], zs], [cx, cy, zt]], mat);
    return s;
  };
  // Wandfläche im Raum (Wandkoordinaten: x entlang L→R, y nach unten ab Höhe zTop) für Zierteile, die über Wand und Giebel reichen
  const overlay = (K, x0, y0, x1, y1, zTop, inner) => { const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy); return K.g(K.plane([x0, y0, zTop], [dx / len, dy / len, 0], [0, 0, -1]), inner); };
  // Vieleck-Turmschaft (n Seiten), Wände einzeln (damit Fenster auf einzelne Seiten gesetzt werden können); Winkel läuft rückwärts, damit die Normalen nach außen zeigen
  const polyWall = (K, cx, cy, r, z0, z1, n, mat, deco) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI / 2 - 2 * Math.PI * i / n, a1 = Math.PI / 2 - 2 * Math.PI * (i + 1) / n;
      s += K.wall([cx + r * Math.cos(a0), cy + r * Math.sin(a0)], [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], z0, z1, mat, deco ? deco(i) : null);
    }
    return s;
  };
  const cone = (K, cx, cy, r, ze, zt, n, mat = 'sl') => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI / 2 - 2 * Math.PI * i / n, a1 = Math.PI / 2 - 2 * Math.PI * (i + 1) / n;
      s += K.face([[cx + r * Math.cos(a0), cy + r * Math.sin(a0), ze], [cx + r * Math.cos(a1), cy + r * Math.sin(a1), ze], [cx, cy, zt]], mat);
    }
    return s;
  };
  // Strebepfeiler an einer Südwand (nach +y vorspringend): zwei Stufen, Abdeckung, kleine Fiale
  const pierS = (K, cx, y0, w = .75, d = 1.05, zt = EAVE - .5) => {
    let s = K.box(cx - w / 2, y0, Zh(0), w, d, 8.2, 'st', {}, true);
    s += K.box(cx - w / 2 + .1, y0, Zh(8.2), w - .2, d - .5, zt - 8.2, 'st', {}, false);
    s += K.face([[cx - w / 2 + .1, y0 + d - .5, Zh(zt)], [cx + w / 2 - .1, y0 + d - .5, Zh(zt)], [cx + w / 2 - .1, y0, Zh(zt + 1.3)], [cx - w / 2 + .1, y0, Zh(zt + 1.3)]], 'st');
    return s;
  };

  /* ---------- Turm (West): quadratischer Schaft aus dunklem Sandstein, Glockengeschoss mit Zwillingslanzetten, Pyramidendach ---------- */
  add({ id: 'tower', fp: [TX0, TY0, TX1, TY1], draw: K => {
    const T = sh => (len, h, south) => {
      const c = len / 2;
      let d = crs(len, h, 1.2, 23.4, 1.5);
      d += `<path class="dt" d="M.75 ${f2(h)}V0M${f2(len - .75)} ${f2(h)}V0"/>`;           // Eckpfeiler (Streifen)
      d += `<path class="dt" d="${hline(len, h - 1)}${hline(len, h - 24.2)}${hline(len, h - 24.7)}"/>`;
      [9.5, 17].forEach(z => { d += `<path class="dt" d="M0 ${f2(h - z)}h.75M${f2(len - .75)} ${f2(h - z)}h.75"/>`; });   // Rücksprünge der Eckpfeiler
      // Glockengeschoss: Blendbogen mit zwei Schallöffnungen (Jalousien), Eckpfeiler setzen sich fort
      d += `<path class="dt" d="${garch(c - 2.2, h - 35.6, 4.4, 10.6)}"/>`;
      let g = louvre(c - 1.45, h - 34.6, 1.2, 8.4) + louvre(c + .25, h - 34.6, 1.2, 8.4);
      d += `<path class="dt" d="M${f2(c - 2.4)} ${f2(h - 36.2)}H${f2(c + 2.4)}"/>` + corbel(len, h - 37.0, .7);
      if (south) {
        d += `<path class="dt" d="${garch(len * .27 - .85, h - 3.4, 1.7, 3.4)}"/>`;          // Eingang an der Südseite
        d += clockSVG(c, h - 21.4, .95);
      }
      return d + g;
    };
    let s = K.box(TX0, TY0, Zh(0), TX1 - TX0, TY1 - TY0, TH, 'rs', { S: (l, h) => T('fr')(l, h, true), E: (l, h) => T('sd')(l, h, false) }, true);
    // Kranzgesims und Pyramidendach (Ziegel)
    s += K.box(TX0 - .35, TY0 - .35, Zh(TH), TX1 - TX0 + .7, TY1 - TY0 + .7, .6, 'st', {}, true);
    s += hip(K, TX0 - .35, TY0 - .35, TX1 + .35, TY1 + .35, Zh(TH + .6), Zh(TH + 4.4), 'tl');
    return s;
  } });

  /* ---------- Treppentürme am Westjoch: Südwestturm (groß) und Nordwestturm (klein), Kegeldächer aus Schiefer ---------- */
  add({ id: 'sturret', fp: [3.8, 21.5, 8.7, 26.5], draw: K => {
    const cx = 6.25, cy = 24.0, r = 2.45;
    const Wd = i => (l, h) => {
      let d = crs(l, h, 1.2, 11, 1.5) + `<path class="dt" d="${hline(l, h - 1)}${hline(l, h - 11)}${hline(l, h - 11.4)}"/>`;
      if (i === 1 || i === 2) { const w = Math.min(.8, l * .45), a = lan(h, l / 2, 3.2, 7.4, w, 1, 1), b = lan(h, l / 2, 8.2, 10.4, w * .8, 1, 1); d += a.fr + wins(a.wn) + b.fr + wins(b.wn); }
      return d;
    };
    let s = polyWall(K, cx, cy, r, Zh(0), Zh(11.4), 12, 'st', Wd);
    s += cone(K, cx, cy, r + .25, Zh(11.4), Zh(17.8), 12, 'sl');
    return s;
  } });
  add({ id: 'nturret', fp: [3.8, 5.4, 8.0, 9.8], draw: K => {
    const cx = 5.9, cy = 7.6, r = 2.0;
    return polyWall(K, cx, cy, r, Zh(0), Zh(11), 12, 'st', () => (l, h) => crs(l, h, 1.2, 10.5, 1.5)) + cone(K, cx, cy, r + .25, Zh(11), Zh(16.2), 12, 'sl');
  } });

  /* ---------- Hallenschiff: Südwand mit vier Lanzettfenstern (je zwischen zwei Strebepfeilern), steiles Schieferdach ---------- */
  const PIERS = [13.0, 17.3, 21.8, 25.5], NX0 = 8.7;
  const mainRoof = (K, x0, x1) => roofPlane(K, [[x0, YS, Zh(EAVE)], [x1, YS, Zh(EAVE)], [x1, YC, Zh(RIDGE)], [x0, YC, Zh(RIDGE)]], 'sl', 2.4);
  // kleine Dachluken (Lüftungsklappen) dicht über der Traufe, wie auf den Kadern zu sehen
  const hatch = (K, u, v) => { const z = EAVE + (YS - v) * KZ, w = .8, d = .6; return K.poly([[u - w / 2, v, Zh(z)], [u + w / 2, v, Zh(z)], [u + w / 2, v - d, Zh(z + d * KZ)], [u - w / 2, v - d, Zh(z + d * KZ)]], 'lv'); };
  add({ id: 'nave', fp: [NX0, YN, XA, YS], draw: K => {
    const W = (len, h) => {
      let d = crs(len, h, 1.2, 4.6, 1.8) + `<path class="dt" d="${hline(len, h - 1.0)}${hline(len, h - 4.9)}${hline(len, h - 5.1)}"/>`;
      let g = '';
      const cs = [10.85, 15.15, 19.55, 23.65];
      cs.forEach(c => {
        const a = lan(h, c - NX0, 5.4, 12.5, 1.9, 1, 2); d += a.fr; g += a.wn;
        d += `<path class="dt" d="M${f2(c - NX0 - .6)} ${f2(h - 4.1)}h1.2v1.2h-1.2Z"/>`;    // kleines Kellerfenster unter jeder Achse
      });
      d += band('fr', len, h, EAVE - .45, .45) + corbel(len, h - EAVE + .45, .75);
      return d + wins(g);
    };
    let s = mainRoof(K, NX0, XA) + hatch(K, 9.9, 22.7) + hatch(K, 25.1, 22.7);
    s += K.wall([NX0, YS], [XA, YS], Zh(0), Zh(EAVE), 'st', W);
    PIERS.forEach(x => { s += pierS(K, x, YS); });
    return s;
  } });

  /* ---------- Querhaus: Dach über der Vierung, Nordarm (hinten), Südarm mit Giebel, Rose und Portal ---------- */
  add({ id: 'cross', fp: [XA, YN, XB, YS], draw: K => mainRoof(K, XA, XB) });
  add({ id: 'narm', fp: [26.3, 4.4, 35.3, YN], parent: 'cross', side: 'N', draw: K => {
    const xm = 30.8, vN = 4.4, vv = YN + (ARM - EAVE) / KZ;   // Kehle auf dem Hauptdach
    let s = K.wall([35.3, YN], [35.3, vN], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .6, 1.8));
    s += K.face([[35.3, vN, Zh(EAVE)], [xm, vN, Zh(ARM)], [xm, vv, Zh(ARM)], [35.3, YN, Zh(EAVE)]], 'sl');
    return s;
  } });
  add({ id: 'arm', fp: [XA, YS, XB, 28.0], parent: 'cross', side: 'S', draw: K => {
    const len = XB - XA, um = len / 2, xm = XA + um, rise = ARM - EAVE;
    // Dachfläche des Südarms (Ostseite) auf dem Hauptdach: Kehle vom Eckpunkt der Traufe bis zum Firstpunkt
    const vv = YS - (ARM - EAVE) / KZ;
    let s = K.face([[XB, YF, Zh(EAVE)], [xm, YF, Zh(ARM)], [xm, vv, Zh(ARM)], [XB, YS, Zh(EAVE)]], 'sl');
    // Ostwand des Arms (schmaler Streifen) und Südfront bis zur Traufe
    s += K.wall([XB, YF], [XB, YS], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .5, 1.8));
    s += K.wall([XA, YF], [XB, YF], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .6, 1.8) + `<path class="dt" d="${hline(l, h - 1.0)}"/>`);
    // Giebel + Zierteile als eine Fläche (y nach unten ab Giebelspitze ARM)
    const sh = shadeK(K, 0, 1), z = zz => ARM - zz;
    let ov = `<path class="st ${sh}" d="M0 ${f2(rise)}L${f2(um)} 0L${f2(len)} ${f2(rise)}Z"/>`;
    ov += `<path class="dt" d="M0 ${f2(rise)}L${f2(um)} 0L${f2(len)} ${f2(rise)}M.45 ${f2(rise)}L${f2(um)} .75L${f2(len - .45)} ${f2(rise)}"/>`;
    const r1 = rose(um, z(10.6), 3.0, 2);
    ov += r1.fr + wins(r1.wn);
    // drei Lanzetten im Giebel (mittlere höher)
    const gl = [[um - 1.45, 15.6, 18.2], [um, 15.2, 19.3], [um + 1.45, 15.6, 18.2]].map(([c, zb, zt]) => lan(ARM, c, zb, zt, .75, 2, 1));
    gl.forEach(a => { ov += a.fr + wins(a.wn); });
    // Gesimse unter der Rose und an der Traufe
    ov += `<path class="dt" d="${hline(len, z(4.9))}${hline(len, z(EAVE))}"/>`;
    s += overlay(K, XA, YF, XB, YF, Zh(ARM), ov);
    // Portalvorbau (5 m breit, springt 1 m vor): spitzbogiges Portal unter einem Wimperg
    const px0 = 28.8, px1 = 33.8, pm = (px0 + px1) / 2, vp = YF + 1.0;
    s += K.wall([px0, vp], [px1, vp], Zh(0), Zh(5.0), 'st', (l, h) => {
      return `<path class="dt" d="${garch(l / 2 - 1.15, h - 4.1, 2.3, 4.1)}"/><path class="lv" d="${garch(l / 2 - .95, h - 3.9, 1.9, 3.9)}"/><path class="dt" d="${hline(l, h - 1)}"/>`;
    });
    s += K.wall([px1, vp], [px1, YF], Zh(0), Zh(5.0), 'st', (l, h) => crs(l, h, 1.2, 4.6, 1.8));
    const pg = shadeK(K, 0, 1);
    s += overlay(K, px0, vp, px1, vp, Zh(5.0), `<path class="st ${pg}" d="M0 0L${f2(pm - px0)} -2.4L${f2(px1 - px0)} 0Z"/><path class="dt" d="M0 0L${f2(pm - px0)} -2.4L${f2(px1 - px0)} 0"/><path class="dt" d="M${f2(pm - px0 - .4)} -.9v-.9h.8v.9"/>`);
    s += K.face([[px1, vp, Zh(5.0)], [pm, vp, Zh(7.4)], [pm, YF, Zh(7.4)], [px1, YF, Zh(5.0)]], 'sl');
    // Eckpilaster: schlanke Streben an den beiden Enden der Front, mit Fiale
    [[XA + .05, YF - .05], [XB - 1.05, YF - .05]].forEach(([x, y]) => {
      s += K.box(x, y, Zh(0), 1.0, .85, 8.6, 'st', {}, true) + K.box(x + .1, y, Zh(8.6), .8, .6, 5.2, 'st', {}, true);
      s += pin(K, x + .5, y + .5, Zh(13.7), Zh(17.6), .7);
    });
    return s;
  } });

  /* ---------- Chorjoch und Apsis (drei Seiten), Schieferdach mit Walm, Südosttürmchen ---------- */
  add({ id: 'choir', fp: [XB, YN, XC, YS], draw: K => {
    let s = mainRoof(K, XB, XC) + hatch(K, 38.4, 22.7);
    const W = (len, h) => { const a = lan(h, len / 2, 5.4, 12.5, 1.9, 1, 2); return crs(len, h, 1.2, 4.6, 1.8) + `<path class="dt" d="${hline(len, h - 1.0)}${hline(len, h - 4.9)}"/>` + a.fr + wins(a.wn) + band('fr', len, h, EAVE - .45, .45); };
    s += K.wall([XB, YS], [XC, YS], Zh(0), Zh(EAVE), 'st', W);
    return s;
  } });
  add({ id: 'apse', fp: [XC, YN, XE, YS], draw: K => {
    const dep = (x, y) => K.depth(x, y);
    // Dachfächer: Walmflächen nach Süden/Osten/Norden und die Südschräge bis zum Ende des Chorjochs
    const R1 = [XC, YC, Zh(RIDGE)], P = [AP[0], AP[1], Zh(AP[2])], e = z => Zh(EAVE);
    let s = '';
    const roof = [
      { p: [[...A1, e()], [XC, YC, Zh(RIDGE)], P], c: dep(XC + .8, 21) },
      { p: [[...A1, e()], [...A2, e()], P], c: dep(43, 21.5) },
      { p: [[...A2, e()], [...A3, e()], P], c: dep(XE, 16) },
      { p: [[...A3, e()], [...A4, e()], P], c: dep(43, 11) },
    ];
    roof.sort((a, b) => a.c - b.c).forEach(r => { s += K.face(r.p, 'sl'); });
    // Wandflächen der drei Seiten (nur sichtbare), Fenster je Seite
    const side = (a, b, n, wide) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
      const D = (l, h) => { const w = Math.min(2.3, l - 2.0), a1 = lan(h, l / 2, 5.0, 12.4, w, 1, n); return crs(l, h, 1.2, 4.4, 1.8) + `<path class="dt" d="${hline(l, h - 1.0)}${hline(l, h - 4.7)}"/>` + a1.fr + wins(a1.wn) + band(shadeK(K, nx, ny), l, h, EAVE - .45, .45); };
      return K.wall(a, b, Zh(0), Zh(EAVE), 'st', D);
    };
    s += side(A3, A4, 2) + side(A2, A3, 3) + side(A1, A2, 2);
    // Eckpfeiler mit Fialen
    [A1, A2, A3].forEach(([x, y]) => { s += K.box(x - .5, y - .5, Zh(0), 1.0, 1.0, EAVE - .4, 'st', {}, true) + pin(K, x, y, Zh(EAVE - .4), Zh(EAVE + 4.6), .8); });
    // Südosttürmchen im Winkel zwischen Chorjoch und Apsis
    const cx = 41.9, cy = 24.5, r = 1.25;
    s += polyWall(K, cx, cy, r, Zh(0), Zh(11.2), 10, 'st', i => (l, h) => crs(l, h, 1.2, 10.6, 1.5) + ((i === 1 || i === 2) ? (() => { const a = lan(h, l / 2, 4.0, 8.0, .6, 1, 1); return a.fr + wins(a.wn); })() : ''));
    s += cone(K, cx, cy, r + .22, Zh(11.2), Zh(16.0), 10, 'sl');
    return s;
  } });

  /* ---------- Nordostanbau (Sakristei/Gemeindeteil): niedriger Baukörper mit Walmdach, im Süden vom Chor verdeckt ---------- */
  add({ id: 'annex', fp: [36.3, .5, 46.1, YN], draw: K => {
    const E = (len, h) => { let d = crs(len, h, 1.0, 6.0, 1.6), g = ''; for (let u = 1.6; u < len - 1; u += 2.4) { g += `<rect class="wn" data-f="1" x="${f2(u)}" y="${f2(h - 4.8)}" width=".9" height="2.0"/>`; } return d + wins(g); };
    let s = K.box(36.3, .5, Zh(0), 9.8, YN - .5, 6.5, 'st', { E: E, S: (l, h) => crs(l, h, 1.0, 6.0, 1.6) }, false);
    s += hip(K, 36.0, .2, 46.4, YN, Zh(6.5), Zh(9.8), 'sl');
    return s;
  } });

  return { mods: M, lc: [23.77, 13.99], z0: 0, top: [4.85, 16, 42], label: 'Gartenkirche St. Marien', h: 42, len: 47.5 };
});


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


;/* ===== heinzvonheidenarena.js ===== */
/* Heinz von Heiden Arena (Stadion Hannover 96, früher HDI-Arena / Niedersachsenstadion) – Modul. Lokal: x = lange Achse (≈ Nord), y = quer (≈ Ost), z Höhe, Gelände z = 1.
   Grundriss und Kronenöffnung stammen aus dem OSM-Umriss (relation 92928, äußerer und innerer Ring, in die Hauptachse gedreht: tools-Rechnung in ref/heinzvonheidenarena/README.md),
   die zehn Treppentürme aus den kleinen OSM-Teilen (building=stadium). Höhen, Ringaufteilung des Daches, Ränge und Fassade nach den Google-Earth-Kadern in ref/heinzvonheidenarena/foto/.
   Alles selbst gezeichnet, nichts kopiert. face (meta): lokale +x-Achse zeigt auf ihre echte Richtung, damit der Umriss auf der Karte genau liegt. */
ISO.landmark('heinzvonheidenarena', H => {
  const { f2, vari, wins } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const W = 233.5, D = 203.6, C0 = [116.8, 116.4];
  // Höhen über Gelände (m): Fassade, Dachrand, Dach in der Mitte des Ringes, Dach am Rand der Öffnung, Kabelring
  const HW = 12, ZE = 14, ZM = 21, ZI = 29, ZR = 34;
  const clean = p => p.filter((q, i) => { const n = p[(i + 1) % p.length]; return Math.hypot(n[0] - q[0], n[1] - q[1]) > .05; });   // doppelte Punkte (geschlossene Ringe) entfernen
  const OUT = clean([[82.0,2.7],[73.4,4.9],[68.5,6.3],[63.5,7.7],[55.2,10.7],[50.1,12.8],[37.1,19.0],[18.5,33.3],[14.9,37.7],[6.9,49.6],[2.9,59.0],[0.0,67.6],[5.5,69.4],[7.3,70.0],[3.6,84.8],[2.1,104.7],[3.9,124.4],[8.8,143.7],[16.7,161.9],[25.2,172.8],[29.5,178.3],[47.3,190.4],[67.1,197.2],[87.6,201.5],[108.5,203.6],[129.4,203.3],[150.2,200.6],[161.5,197.9],[170.5,195.7],[190.2,188.3],[196.2,184.0],[207.5,175.8],[212.1,169.6],[219.9,159.0],[227.1,140.5],[231.5,121.0],[232.6,101.4],[230.8,84.7],[230.5,81.6],[226.4,66.9],[228.3,66.3],[233.5,64.4],[230.3,55.3],[226.2,46.4],[224.7,43.9],[220.2,37.8],[212.9,29.3],[207.0,23.8],[203.7,21.5],[196.9,17.6],[192.3,15.4],[180.6,10.4],[174.7,8.2],[171.9,7.3],[159.7,4.1],[152.0,2.3],[135.9,0.0],[122.2,-0.3],[105.1,0.0],[82.0,2.7]]);   // äußerer Ring (Dachkante/Fassade)
  const INN = clean([[98.2,68.1],[110.2,67.3],[123.5,67.1],[135.5,67.6],[147.2,69.1],[158.5,71.8],[166.9,75.8],[173.9,81.6],[179.1,89.2],[182.9,97.9],[185.2,108.3],[185.5,119.1],[183.7,130.2],[179.7,140.8],[173.2,149.6],[164.5,156.3],[148.7,161.6],[140.2,162.8],[126.1,164.1],[110.5,164.3],[96.4,163.4],[82.9,161.2],[71.8,157.6],[62.9,151.2],[56.2,142.5],[51.9,132.1],[49.1,122.8],[49.8,110.2],[51.8,99.8],[55.3,90.9],[60.3,83.2],[67.0,77.2],[75.5,72.8],[86.3,69.9],[98.2,68.1]]);   // Öffnung des Daches
  const TW = [[[69.8,3.0],[56.3,7.2],[57.6,11.5],[71.1,7.3]],[[161.9,1.6],[160.7,6.0],[174.3,9.7],[175.5,5.4]],[[220.2,33.2],[216.5,35.9],[224.8,47.4],[228.5,44.7]],[[192.5,12.4],[190.4,16.4],[202.8,23.0],[205.0,18.9]],[[39.6,14.5],[27.3,21.5],[29.5,25.5],[41.8,18.5]],[[227.7,89.3],[228.7,98.3],[235.2,97.6],[234.2,88.7]],[[222.7,142.5],[218.2,154.5],[224.0,156.9],[228.7,144.9]],[[12.5,36.2],[4.6,47.9],[8.3,50.5],[16.3,38.7]],[[50.6,190.4],[48.6,196.6],[62.4,201.3],[64.5,195.1],[53.3,191.4]],[[166.4,-5.4],[165.3,-1.9],[169.4,-0.6],[169.6,-1.3],[179.9,2.0],[181.0,-1.6],[170.7,-4.9],[170.5,-4.1]]];     // Treppentürme
  const area = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0);
  const outward = p => area(p) < 0 ? p : p.slice().reverse();    // Orientierung der Wandnormalen (siehe K.wall)
  const OUTW = outward(clean(OUT));
  // Strahl vom Mittelpunkt: Abstand zum Rand eines Polygons (größter Schnitt)
  const rayD = (poly, a) => {
    const dx = Math.cos(a), dy = Math.sin(a); let best = 0;
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length], ex = q[0] - p[0], ey = q[1] - p[1];
      const den = dx * ey - dy * ex; if (Math.abs(den) < 1e-9) continue;
      const t = ((p[0] - C0[0]) * ey - (p[1] - C0[1]) * ex) / den, u = ((p[0] - C0[0]) * dy - (p[1] - C0[1]) * dx) / den;
      if (t > 0 && u >= -1e-6 && u <= 1 + 1e-6 && t > best) best = t;
    }
    return best;
  };
  // Spielfeld mit Auslauf: Rechteck 110 x 75 m mit gerundeten Ecken
  const RRA = 55, RRB = 37.5, RRR = 10;
  const PR = (() => {
    const pts = [];
    const cs = [[RRA - RRR, RRB - RRR, 0], [-RRA + RRR, RRB - RRR, 90], [-RRA + RRR, -RRB + RRR, 180], [RRA - RRR, -RRB + RRR, 270]];
    cs.forEach(([cx, cy, a0]) => { for (let j = 0; j <= 6; j++) { const a = (a0 + 90 * j / 6) * Math.PI / 180; pts.push([C0[0] + cx + RRR * Math.cos(a), C0[1] + cy + RRR * Math.sin(a)]); } });
    return pts;
  })();
  // Winkel: alle Eckpunkte des Außenrings plus ein gleichmäßiges Raster (Sektoren des Daches und der Ränge)
  const ANG = (() => {
    const s = new Set();
    OUTW.forEach(p => s.add(+Math.atan2(p[1] - C0[1], p[0] - C0[0]).toFixed(5)));
    for (let a = -180; a < 180; a += 6) s.add(+(a * Math.PI / 180).toFixed(5));
    return [...s].sort((a, b) => a - b);
  })();
  const N = ANG.length;
  const ray = a => { const dx = Math.cos(a), dy = Math.sin(a), at = t => [C0[0] + dx * t, C0[1] + dy * t]; return { a, dx, dy, at, O: at(rayD(OUT, a)), I: at(rayD(INN, a)), P: at(rayD(PR, a)) }; };
  const R = ANG.map(ray);
  const BR = Array.from({ length: 72 }, (_, i) => ray((i * 5 - 180) * Math.PI / 180));   // Ränge: alle 5°
  const lerp2 = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const pz = (p, z) => [p[0], p[1], Z0 + z];
  // Profil der Ränge: Abstand s vom Spielfeldrand (m, entlang des Strahls) → Höhe
  const PROF = [[0, 2], [9, 9], [11.5, 12.5], [32, 24]];
  const ZMID = .5;   // Anteil des grauen Außenrings an der Dachbreite

  /* ---------- Teile ---------- */
  // Spielfeld, Auslauf, Mähstreifen, Linien
  const pitch = K => {
    let s = K.poly(PR.map(p => pz(p, .3)), 'gl tp');
    const x0 = C0[0] - 52.5, x1 = C0[0] + 52.5, y0 = C0[1] - 34, y1 = C0[1] + 34, n = 14;
    for (let i = 0; i < n; i++) if (i % 2 === 0) { const a = x0 + (x1 - x0) * i / n, b = x0 + (x1 - x0) * (i + 1) / n; s += K.poly([[a, y0, Z0 + .4], [b, y0, Z0 + .4], [b, y1, Z0 + .4], [a, y1, Z0 + .4]], 'cu tp'); }
    const L = (a, b) => `M${K.P(a[0], a[1], Z0 + .5).map(f2).join(' ')}L${K.P(b[0], b[1], Z0 + .5).map(f2).join(' ')}`;
    let d = L([x0, y0], [x1, y0]) + L([x1, y0], [x1, y1]) + L([x1, y1], [x0, y1]) + L([x0, y1], [x0, y0]) + L([C0[0], y0], [C0[0], y1]);
    [[x0, 1], [x1, -1]].forEach(([xe, sg]) => { const x2 = xe + sg * 16.5, x3 = xe + sg * 5.5, ya = C0[1] - 20.2, yb = C0[1] + 20.2, yc = C0[1] - 9.2, yd = C0[1] + 9.2;
      d += L([xe, ya], [x2, ya]) + L([x2, ya], [x2, yb]) + L([x2, yb], [xe, yb]) + L([xe, yc], [x3, yc]) + L([x3, yc], [x3, yd]) + L([x3, yd], [xe, yd]); });
    let c = ''; for (let j = 0; j <= 36; j++) { const a = j / 36 * 2 * Math.PI, p = K.P(C0[0] + 9.15 * Math.cos(a), C0[1] + 9.15 * Math.sin(a), Z0 + .5); c += (j ? 'L' : 'M') + p.map(f2).join(' '); }
    return s + `<path class="dt" d="${d}${c}"/>`;
  };
  // Zuschauerränge: unterer Rang, Fassade/Logen, oberer Rang; Sektoren entlang der Strahlen
  const profPts = (r, k) => PROF.map(([s, z]) => [r.P[0] + r.dx * s, r.P[1] + r.dy * s, Z0 + z]);
  const bowl = K => {
    let s = '';
    for (let i = 0; i < BR.length; i++) {
      const r0 = BR[i], r1 = BR[(i + 1) % BR.length], p0 = profPts(r0), p1 = profPts(r1), mx = (r0.P[0] + r1.P[0]) / 2, my = (r0.P[1] + r1.P[1]) / 2;
      const red = my > C0[1] + 20 && mx > 55 && mx < 180;      // rote Sitze: unterer Rang der Osttribüne
      for (let k = 0; k < PROF.length - 1; k++) {
        const q = [p0[k], p1[k], p1[k + 1], p0[k + 1]];
        const mat = k === 1 ? 'pl' : (k === 0 && red ? 'tl' : 'glb');
        let extra = '';
        if (k !== 1) {
          const n = k === 0 ? 3 : 5; let d = '';
          for (let j = 1; j <= n; j++) { const t = j / (n + 1), a = [p0[k][0] + (p0[k + 1][0] - p0[k][0]) * t, p0[k][1] + (p0[k + 1][1] - p0[k][1]) * t, p0[k][2] + (p0[k + 1][2] - p0[k][2]) * t], b = [p1[k][0] + (p1[k + 1][0] - p1[k][0]) * t, p1[k][1] + (p1[k + 1][1] - p1[k][1]) * t, p1[k][2] + (p1[k + 1][2] - p1[k][2]) * t]; d += `M${K.P(...a).map(f2).join(' ')}L${K.P(...b).map(f2).join(' ')}`; }
          if (i % 3 === 0) d += `M${K.P(...p0[k]).map(f2).join(' ')}L${K.P(...p0[k + 1]).map(f2).join(' ')}`;
          extra = `<path class="dt" d="${d}"/>`;
        }
        s += K.face(q, mat, extra);
      }
    }
    // Schriftzug HEINZ VON HEIDEN im oberen Rang der Westtribüne (vom Spielfeld aus nach Westen gelesen: Süd → Nord = +x)
    const sw = 14.5, sl = (PROF[3][1] - PROF[2][1]) / (PROF[3][0] - PROF[2][0]), zw = PROF[2][1] + (sw - PROF[2][0]) * sl, yw = C0[1] - RRB - sw, k = Math.hypot(1, sl);
    if (K.facing(0, sl / k, 1 / k) > 0) s += wins(`<text class="wn" data-f="3" transform="${K.plane([C0[0] - 26, yw, Z0 + zw], [1, 0, 0], [0, 1 / k, -sl / k])}" font-family="sans-serif" font-weight="700" font-size="4" textLength="52" lengthAdjust="spacingAndGlyphs">HEINZ VON HEIDEN</text>`);
    return s;
  };
  add({ id: 'bowl', fp: [0, 0, W, D], draw: K => pitch(K) + bowl(K) });

  /* Fassade, Türme, Kabelring, Dach */
  const wallDeco = i => (len, h) => {
    // Wandkoordinaten: x entlang, y nach unten ab Oberkante (h = Wandhöhe); drei Fensterbänder auf dem Betonsockel
    let s = hl0(len, h - 3.8) + hl0(len, 1.2), w = '';
    [[4.4, 2.9, 1], [7.9, 2.9, 2]].forEach(([zb, hh, f]) => {
      const y = h - zb - hh; let u = .35;
      while (u < len - .6) { const ww = Math.min(len - u - .35, 2.2); if (ww > .7) w += `<rect class="wn${vari()}" data-f="${f}" x="${f2(u)}" y="${f2(y)}" width="${f2(ww)}" height="${f2(hh)}"/>`; u += ww + .3; }
    });
    return s + wins(w);
  };
  const hl0 = (len, y) => `<path class="dt" d="M0 ${f2(y)}H${f2(len)}"/>`;
  const faceTo = (K, q, mat, tx, ty) => {   // senkrechte Fläche, Normale soll zur Richtung (tx, ty) zeigen
    let nx = 0, ny = 0; for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); }
    return K.face(nx * tx + ny * ty >= 0 ? q : q.slice().reverse(), mat);
  };
  const prism = (K, pts, z0, z1, mat, deco) => { const p = outward(clean(pts)); let s = ''; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += K.wall(a, b, Z0 + z0, Z0 + z1, mat, deco); } return s + K.poly(p.map(q => [q[0], q[1], Z0 + z1]), mat + ' tp'); };
  const towerDeco = (len, h) => `${hl0(len, 1)}` + (len > 3 ? wins(`<rect class="wn${vari()}" data-f="2" x="${f2(len * .36)}" y="2.2" width="${f2(len * .28)}" height="${f2(h - 5)}"/>`) : '');
  add({ id: 'fassade', fp: [0, 0, W, D], above: 'bowl', draw: K => {
    let s = '';
    for (let i = 0; i < OUTW.length; i++) { const a = OUTW[i], b = OUTW[(i + 1) % OUTW.length];
      s += K.wall(a, b, Z0, Z0 + HW, 'kc', wallDeco(i)) + K.wall(a, b, Z0 + HW, Z0 + ZE, 'pl'); }
    const tws = TW.map(p => ({ p, d: K.depth(p.reduce((q, c) => q + c[0], 0) / p.length, p.reduce((q, c) => q + c[1], 0) / p.length) })).sort((x, y) => x.d - y.d);
    tws.forEach(t => { s += prism(K, t.p, 0, 11, 'pl', towerDeco); });
    return s;
  } });
  add({ id: 'dach', fp: [0, 0, W, D], above: 'fassade', draw: K => {
    let s = '';
    const MR = R.map(r => lerp2(r.O, r.I, ZMID));
    const band = (A, za, B, zb, cls) => `<path class="${cls}" fill-rule="evenodd" d="${K.path(A.map(p => pz(p, za)))}Z${K.path(B.map(p => pz(p, zb)).reverse())}Z"/>`;
    s += band(R.map(r => r.O), ZE, MR, ZM, 'pl tp') + band(MR, ZM, R.map(r => r.I), ZI, 'glb tp');
    // Paneelfugen: radial alle 6°, grauer Ring nur außen, blauer Ring über die ganze Breite
    let seams = '';
    BR.forEach((r, i) => { if (i % 1 === 0) { const m = lerp2(r.O, r.I, ZMID); seams += `M${K.P(r.O[0], r.O[1], Z0 + ZE).map(f2).join(' ')}L${K.P(m[0], m[1], Z0 + ZM).map(f2).join(' ')}L${K.P(r.I[0], r.I[1], Z0 + ZI).map(f2).join(' ')}`; } });
    s += `<path class="dt" d="${seams}"/>`;
    // Innenkante der Öffnung (von der Spielfeldseite sichtbar)
    for (let i = 0; i < BR.length; i++) { const a = BR[i], b = BR[(i + 1) % BR.length];
      s += faceTo(K, [pz(a.I, ZI), pz(b.I, ZI), pz(b.I, ZI - 1.8), pz(a.I, ZI - 1.8)], 'pl', C0[0] - (a.I[0] + b.I[0]) / 2, C0[1] - (a.I[1] + b.I[1]) / 2); }
    // Kabelring auf Stäben über dem Dachrand
    let posts = '', ring = '', acc = 0, nxt = 0; const per = [];
    for (let i = 0; i < OUTW.length; i++) { const a = OUTW[i], b = OUTW[(i + 1) % OUTW.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); per.push([a, b, L]); }
    const tot = per.reduce((q, e) => q + e[2], 0), step = tot / Math.round(tot / 15), tops = [];
    per.forEach(([a, b, L]) => { while (nxt <= acc + L) { const t = (nxt - acc) / L, p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; tops.push(p); nxt += step; } acc += L; });
    tops.forEach((p, i) => { posts += `M${K.P(p[0], p[1], Z0 + ZE).map(f2).join(' ')}L${K.P(p[0], p[1], Z0 + ZR).map(f2).join(' ')}`; ring += (i ? 'L' : 'M') + K.P(p[0], p[1], Z0 + ZR).map(f2).join(' '); });
    return s + `<path class="dt" d="${posts}"/><path class="dt" d="${ring}Z"/>`;
  } });
  return { mods: M, lc: [W / 2, D / 2], z0: 0, top: [W / 2, D / 2, ZR], label: 'Heinz von Heiden Arena', h: ZR, len: W };
});


;/* ===== heizkraftwerklinden.js ===== */
/* Heizkraftwerk Linden („Drei warme Brüder“, Elisenstraße 2, an der Ihme; seit 1962, Schornsteine 1975 von 65 auf 125 m erhöht) – Modul.
   Aufbau nach Google-Earth-Kadern ref/heizkraftwerklinden/foto/ (Plan: OSM-Umriss w45336252, minimales Rechteck 149,8 × 51,9 m):
   lokal x = Längsachse von NW nach SO, y von der Ihme-Seite (0, NO) zur Straßenseite (51,9, SW), z Höhe, Gelände z = 1.
   Von NW nach SO: Anbau (Backstein), drei Kesselhaus-Türme 29 × 22 m (graublaue Verglasung, Backstein-Ausfachung an den Stirnseiten),
   dahinter an der Ihme das flache Maschinenhaus, am SO-Ende der Anbau (Backstein + weiß). Schornsteine/Stutzen auf den Turmdächern.
   Abendlicht: die LED-Anstrahlung der Türme (seit 2013 rot/violett) läuft über die Klasse „wsl“ mit eigener Füllfarbe (nur abends sichtbar). */
(() => {
  const Z0 = 1, L = 149.8, W = 51.9;
  const TW = 29, TD = 22, TY = 20.4, TH = 64.5, XT = [30.5, 65.9, 101.3];           // Turmmaße und x-Beginn der drei Türme
  ISO.landmark('heizkraftwerklinden', H => {
    const { f2, hull, hl, vl, winR, wins } = H, M = [], add = m => (M.push(m), m), TAU = Math.PI * 2;
    // Zylindernormale: sichtbar / Schattenseite (Blickrichtung des Moduls = K.view)
    const vis = (K, a, m = 0) => K.facing(Math.cos(a), Math.sin(a)) > m;
    const dark = (K, a) => Math.sin(a) * K.view[0] - Math.cos(a) * K.view[1] < 0;
    const P2 = pts => 'M' + pts.map(p => p.map(f2).join(' ')).join('L') + 'Z';
    const ringPts = (K, cx, cy, z, r, n = 40) => Array.from({ length: n }, (_, i) => K.P(cx + r * Math.cos(TAU * i / n), cy + r * Math.sin(TAU * i / n), Z0 + z));
    // Drehkörper (z, r)-Profil: Hülle hell, sichtbare Schattenhälfte dunkel, optional Deckel
    const cyl = (K, cx, cy, prof, cls, cap) => {
      const all = [], dk = [];
      prof.forEach(([z, r]) => { for (let i = 0; i < 60; i++) { const a = TAU * i / 60, p = K.P(cx + r * Math.cos(a), cy + r * Math.sin(a), Z0 + z); all.push(p); if (vis(K, a) && dark(K, a)) dk.push(p); } });
      let s = `<path class="${cls} fr" d="${P2(hull(all))}"/>`;
      if (dk.length > 2) s += `<path class="${cls} sd" d="${P2(hull(dk))}"/>`;
      if (cap) { const [z, r] = prof[prof.length - 1]; s += `<path class="${cap} tp" d="${P2(ringPts(K, cx, cy, z, r))}"/>`; }
      return s;
    };
    // Fugenringe auf der sichtbaren Seite eines Zylinders
    const bands = (K, cx, cy, r, zs) => zs.map(z => { const pts = []; for (let i = 0; i <= 48; i++) { const a = TAU * i / 48; if (vis(K, a)) pts.push(K.P(cx + r * Math.cos(a), cy + r * Math.sin(a), Z0 + z)); }
      return pts.length > 1 ? `<path class="dt" d="M${pts.map(p => p.map(f2).join(' ')).join('L')}"/>` : ''; }).join('');
    // Schattenklasse einer Wand mit Normale (nx, ny) – wie K.wall (fr/sd)
    const sh = (K, nx, ny) => (ny * K.view[0] - nx * K.view[1] >= 0 ? 'fr' : 'sd');
    // Anstrahlung: drei Lagen „wsl“ (CSS setzt abends je ~.11 Deckkraft), Farbe über das Attribut fill
    const wash = (len, h, col) => [0, 1, 2].map(() => `<rect class="wsl" fill="${col}" opacity="0" y="${f2(h * .16)}" width="${f2(len)}" height="${f2(h * .84)}"/>`).join('');
    // Fassadenraster der graublauen Verglasung (Alu-Raster), leise
    const grid = (len, h) => { let q = ''; for (let v = 6.4; v < h - 1; v += 6.4) q += hl(0, len, v); for (let u = 3.7; u < len - 1; u += 3.7) q += vl(u, 0, h); return `<g opacity=".5">${q}</g>`; };

    /* --- Kesselhaus-Turm: Glasfassade, auf den Stirnseiten (±x) hochformatige Backstein-Ausfachung, Dachaufbauten, Schornstein --- */
    const LED = ['#D8284E', '#9B3FD6', '#C22B83'];                                     // Rot → Violett → Magenta (Turm 1…3)
    const tower = (i, kind) => {
      const x = XT[i], y = TY, zr = TH;
      add({ id: 'tw' + i, fp: [x, y, x + TW, y + TD], draw: K => {
        const end = (len, h) => grid(len, h) + `<rect class="gb ${sh(K, 1, 0)}" x="${f2(len * .14)}" y="${f2(h * .13)}" width="${f2(len * .72)}" height="${f2(h * .84)}"/>`
          + `<path class="dt" opacity=".55" d="M${f2(len * .14)} ${f2(h * .13)}h${f2(len * .72)}"/>` + wash(len, h, LED[i]);
        const side = (len, h) => grid(len, h) + wash(len, h, LED[i]);
        let s = K.box(x, y, Z0, TW, TD, zr, 'glb', { E: end, S: side, W: end, N: side }, false);
        s += `<rect class="kc tp" transform="${K.TOP(x, y, Z0 + zr)}" width="${TW}" height="${TD}"/>`;
        // Dachaufbauten (Lüfter, Kästen)
        s += K.box(x + 3, y + 14, Z0 + zr, 4.5, 3.4, 1.7, 'kc', {}) + K.box(x + 10.5, y + 15.5, Z0 + zr, 3, 3, 1.1, 'kc', {}) + K.box(x + 4, y + 3.4, Z0 + zr, 5, 4, 1.4, 'kc', {});
        const cx = x + 22.5, cy = y + 4.6;
        if (kind === 0) { // Turm 1: hoher Schornstein + kurzer Doppelstutzen
          s += cyl(K, cx + 4, cy + 7, [[zr, 1.5], [zr + 12, 1.5]], 'kc', 'kc') + bands(K, cx + 4, cy + 7, 1.5, [zr + 6, zr + 11]);
          s += cyl(K, cx, cy, [[zr, 1.85], [125, 2.5]], 'kc', 'iron') + bands(K, cx, cy, 2.5, [zr + 14, zr + 28, zr + 42, 118]);
        } else if (kind === 1) { // Turm 2: Schalldämpfer-Trommel + dünnes Rohr
          s += cyl(K, cx - 1, cy + 3, [[zr, 2.7], [zr + 12, 2.7]], 'kc', 'kc') + bands(K, cx - 1, cy + 3, 2.7, [zr + 3, zr + 9]);
          s += cyl(K, cx - 1, cy + 3, [[zr + 12, 1.5], [124, 1.5]], 'kc', 'iron');
        } else { // Turm 3: Schornstein mit größerem Durchmesser (1998 ersetzt) + Stutzen
          s += cyl(K, cx + 4, cy + 7.5, [[zr, 1.7], [zr + 9, 1.7]], 'kc', 'kc') + bands(K, cx + 4, cy + 7.5, 1.7, [zr + 5]);
          s += cyl(K, cx, cy, [[zr, 2.25], [120, 3]], 'kc', 'iron') + bands(K, cx, cy, 3, [zr + 14, zr + 28, zr + 42, 113]);
        }
        return s;
      } });
    };
    [0, 1, 2].forEach(i => tower(i, i));

    /* --- Maschinenhaus an der Ihme (flach, dunkles Dach) + Anbau am NW-Ende (Backstein) --- */
    add({ id: 'hall', fp: [0, 0, 130.3, TY], draw: K => {
      let s = K.box(0, 0, Z0, 130.3, TY, 19, 'pl', {}, false) + `<rect class="sl tp" transform="${K.TOP(0, 0, Z0 + 19)}" width="130.3" height="${TY}"/>`;
      for (let x = 12; x < 124; x += 18) s += K.box(x, 6, Z0 + 19, 4, 5, 1.2, 'kc', {});       // Lüfterhauben
      return s;
    } });
    add({ id: 'annexNW', fp: [0, TY, 30.5, 42.4], draw: K => {
      const fac = (len, h) => { let w = ''; for (let r = 0; r < 5; r++) for (let u = 2; u < len - 3; u += 4.2) w += winR(u, 2 + r * 3.9, 2.2, 2.4, Math.min(4, r)); return hl(0, len, .6) + wins(w); };
      return K.box(0, TY, Z0, 30.5, 22, 22, 'gb', { S: fac, E: fac, W: fac }, false) + `<rect class="sl tp" transform="${K.TOP(0, TY, Z0 + 22)}" width="30.5" height="22"/>`;
    } });

    /* --- Anbau am SO-Ende: Büro-/Werkstattflügel, Backstein und weiß --- */
    const ribbon = (len, h) => { let w = ''; for (let r = 0; r < Math.floor((h - 2) / 3.6); r++) for (let u = 1.6; u < len - 2.6; u += 3.2) w += winR(u, 1.8 + r * 3.6, 2.1, 1.9, Math.min(4, r)); return hl(0, len, .6) + wins(w); };
    add({ id: 'annexSEw', fp: [130.3, 0, L, 13.9], draw: K => K.box(130.3, 0, Z0, L - 130.3, 13.9, 17, 'pl', { S: ribbon, E: ribbon }, false) + `<rect class="sl tp" transform="${K.TOP(130.3, 0, Z0 + 17)}" width="${f2(L - 130.3)}" height="13.9"/>` });
    add({ id: 'annexSEb', fp: [130.3, 13.9, L, 28.8], draw: K => K.box(130.3, 13.9, Z0, L - 130.3, 14.9, 13, 'gb', { S: ribbon, E: ribbon }, false) + `<rect class="sl tp" transform="${K.TOP(130.3, 13.9, Z0 + 13)}" width="${f2(L - 130.3)}" height="14.9"/>` });

    return { mods: M, lc: [L / 2, W / 2], z0: 0, top: [XT[0] + 22.5, TY + 4.6, Z0 + 125], label: 'Heizkraftwerk Linden', h: 125, len: L };
  });
})();


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


;/* ===== leineschloss.js ===== */
/* Leineschloss (Niedersächsischer Landtag) – Modul v2, nach Google-Earth-Kadern: ref/leineschloss/ (INDEX.md, README.md)
   Grundriss: OSM-Relation r1170793 (172,1 × 74,7 m), in Metern gezeichnet; Maßstab auf der Karte = 1 (len 172).
   Lokales System: x von Südwest (Leine) nach Nordost (Hannah-Arendt-Platz), y von Nordwest nach Südost, z Höhe, Gelände z = 1.
   (x = 74,7 − v, y = u der Mindest-Rechteck-Achsen des OSM-Umrisses: u-Achse Azimut 128°, v-Achse 218°.)
   Aufbau: Nordwest-Flügel („Schwanz“) · Mittelpavillon · langer Leine-Flügel (Mansarde, Loggia über dem Fluss) · Südost-Eckpavillon ·
   inneres Kranzgebäude um den Hof (flache Dächer) · Laves-Portikus (sechs Säulen) auf der Platzseite · Plenarsaal-Block (1962) mit
   dunklem Walmdach, Glasdach und Technik auf dem Dach.
   ACHTUNG Wanddeko: y läuft von der Oberkante der Wand nach UNTEN (0 = Traufe, h = Fuß). */
(() => {
  const Z0 = 1;
  ISO.landmark('leineschloss', H => {
    const { f2, hl, vl, winR, winA, wins, lathe, saddle, roofPlane, hip } = H, M = [], add = m => (M.push(m), m);

    /* ---------- Hilfen ---------- */
    // Polygon (konvex) um d nach innen versetzt
    const inset = (P, d) => {
      const n = P.length; let A = 0;
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; A += a[0] * b[1] - b[0] * a[1]; }
      const sg = A > 0 ? 1 : -1, L = [];
      for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
        L.push([a[0] - dy / l * sg * d, a[1] + dx / l * sg * d, dx, dy]); }
      return L.map((l, i) => { const m = L[(i + n - 1) % n], det = m[2] * l[3] - m[3] * l[2], t = ((l[0] - m[0]) * l[3] - (l[1] - m[1]) * l[2]) / det; return [m[0] + m[2] * t, m[1] + m[3] * t]; });
    };
    // Rechteck in der Reihenfolge von K.box (Außennormale = (−dy, dx))
    const rectP = (x0, y0, x1, y1) => [[x1, y0], [x0, y0], [x0, y1], [x1, y1]];
    const flat = (K, P, z, mat = 'kc') => K.face(P.map(p => [p[0], p[1], z]), mat);
    // Mansarde: steile untere Schräge, flaches Plateau
    const mansard = (K, P, ze, rise, d, mat = 'sl') => {
      const I = inset(P, d); let s = '';
      for (let i = 0; i < P.length; i++) { const j = (i + 1) % P.length;
        s += roofPlane(K, [[...P[i], ze], [...P[j], ze], [...I[j], ze + rise], [...I[i], ze + rise]], mat, 3.6); }
      return s + K.face(I.map(p => [...p, ze + rise]), mat);
    };
    // Fensterachsen entlang einer Wand der Länge len (Mitten)
    const axes = (len, step) => { const n = Math.floor((len - 1.6) / step), off = (len - n * step) / 2 + step / 2; return Array.from({ length: n }, (_, i) => off + i * step); };
    // Gauben entlang einer Traufkante a→b (Außennormale (−dy, dx)), über denselben Achsen wie die Fenster
    const dormers = (K, a, b, ze, rise, d, step, skip = []) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
      const ins = d * .42, zb = ze + rise * .42;
      let s = '';
      axes(len, step).forEach(t => {
        if (skip.some(([p, q]) => t > p && t < q)) return;
        const f = [a[0] + ux * t - nx * ins, a[1] + uy * t - ny * ins];
        const L = [f[0] - ux * .8, f[1] - uy * .8], R = [f[0] + ux * .8, f[1] + uy * .8];
        if (!K.wallVisible(L, R)) return;                                  // Gauben auf abgewandten Schrägen nicht zeichnen
        s += K.wall(L, R, zb, zb + 2.3, 'pl', (l, h) => wins(winA(.28, .3, l - .56, h - .5, 3)));
        s += saddle(K, L, R, [-nx * 1.9, -ny * 1.9], zb + 2.3, zb + 3.2, 'sl');
      });
      return s;
    };
    const BASE_ = 4;
    const quoins = (len, h, k = 2) => { let q = ''; for (let v = BASE_ + .8; v < h - 1.2; v += 1.6) q += `<path class="dt" d="M0 ${f2(v)}h${k}M${f2(len - k)} ${f2(v + .8)}h${k}"/>`; return q; };

    /* Fassade des Altbaus: Rustika-Sockel mit Segmentbogenfenstern, drei Reihen Rechteckfenster, Gurte, Traufgesims */
    const old = (o = {}) => (len, h) => {
      const step = o.step || 3.9, ww = o.ww || 1.8, skip = o.skip || [], B = 4;
      let q = hl(0, len, .5) + hl(0, len, 1.3) + hl(0, len, 5.2) + hl(0, len, 9.1) + hl(0, len, h - B) + quoins(len, h);
      for (let v = h - B + 1.3; v < h - .2; v += 1.3) q += hl(0, len, v);
      let w = '';
      for (const u of axes(len, step)) {
        if (skip.some(([a, b]) => u > a && u < b)) continue;
        w += winR(u - ww / 2, 1.9, ww, 3, 3) + winR(u - ww / 2, 5.7, ww, 3.2, 2) + winR(u - ww / 2, 9.5, ww, 3.2, 1) + winA(u - ww / 2, h - B + .6, ww, B - .7, 0);
      }
      return q + wins(w);
    };
    const blank = (len, h) => hl(0, len, .5) + hl(0, len, 1.3);

    /* ---------- Hof (Boden) ---------- */
    const COURT = [[52.9, 81.1], [22, 80.3], [21.6, 101.6], [52.5, 102.4]];

    /* ---------- Nordwest-Flügel („Schwanz“, leicht schräg): Eckpavillon im Nordwesten + Körper; drei Geschosse + Mansarde ---------- */
    const WT = 16.8, WP = 17.4;
    const TB = [[27, 13], [10.2, 13], [3.3, 48.5], [17.5, 50.9]];            // Körper (Wände nach außen)
    const TP = [[29, 5.2], [12.8, 0], [10.2, 13], [27, 13]];                  // NW-Eckpavillon
    add({ id: 'tail', fp: [3.3, 13, 27, 48.2], draw: K => {
      let s = K.wall(TB[0], TB[1], Z0, Z0 + WT, 'pl', blank) + K.wall(TB[1], TB[2], Z0, Z0 + WT, 'pl', old()) + K.wall(TB[2], TB[3], Z0, Z0 + WT, 'pl', blank) + K.wall(TB[3], TB[0], Z0, Z0 + WT, 'pl', old());
      s += mansard(K, TB, Z0 + WT, 5.2, 2.4);
      return s + dormers(K, TB[1], TB[2], Z0 + WT, 5.2, 2.4, 3.9) + dormers(K, TB[3], TB[0], Z0 + WT, 5.2, 2.4, 3.9);
    } });
    add({ id: 'nwPav', fp: [10, 0, 29, 13], draw: K => {
      let s = K.wall(TP[0], TP[1], Z0, Z0 + WP, 'pl', old({ step: 3.9 })) + K.wall(TP[1], TP[2], Z0, Z0 + WP, 'pl', old({ step: 3.9 })) + K.wall(TP[2], TP[3], Z0, Z0 + WP, 'pl', blank) + K.wall(TP[3], TP[0], Z0, Z0 + WP, 'pl', old({ step: 3.9 }));
      s += mansard(K, TP, Z0 + WP, 6.4, 3);
      return s + dormers(K, TP[0], TP[1], Z0 + WP, 6.4, 3, 3.9) + dormers(K, TP[1], TP[2], Z0 + WP, 6.4, 3, 3.9) + dormers(K, TP[3], TP[0], Z0 + WP, 6.4, 3, 3.9);
    } });

    /* ---------- Mittelpavillon (springt zur Leine vor) und Südost-Eckpavillon ---------- */
    const pav = (id, x0, y0, x1, y1) => add({ id, fp: [x0, y0, x1, y1], draw: K => {
      const P = rectP(x0, y0, x1, y1), f = old({ step: 3.9, ww: 1.8 });
      let s = K.box(x0, y0, Z0, x1 - x0, y1 - y0, WP, 'pl', { W: f, S: f, E: f, N: blank }, false);
      s += mansard(K, P, Z0 + WP, 6.4, 3);
      return s + dormers(K, P[1], P[2], Z0 + WP, 6.4, 3, 3.9) + dormers(K, P[2], P[3], Z0 + WP, 6.4, 3, 3.9);
    } });
    pav('midPav', .2, 48.2, 17.5, 60.7);
    pav('endPav', 0, 123.3, 19.5, 137.5);

    /* ---------- Langer Leine-Flügel (Mansarde) + niedrige Loggia über dem Fluss ---------- */
    add({ id: 'sw', fp: [6, 60.7, 21.6, 123.3], draw: K => {
      const P = rectP(6, 60.7, 21.6, 123.3), lg = [[28, 44]];
      let s = K.box(6, 60.7, Z0, 15.6, 62.6, 17, 'pl', { W: old({ skip: lg }), E: old(), N: blank, S: blank }, false);
      s += mansard(K, P, Z0 + 17, 5.2, 2.4);
      return s + dormers(K, P[1], P[2], Z0 + 17, 5.2, 2.4, 3.9) + dormers(K, P[3], P[0], Z0 + 17, 5.2, 2.4, 3.9);
    } });
    add({ id: 'loggia', fp: [2.4, 89.7, 6, 104.3], parent: 'sw', side: 'W', draw: K => {
      const h0 = 9.4;
      const lg = (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 1.1) + `<rect class="lv" x=".8" y="1.6" width="${f2(len - 1.6)}" height="3.3"/>`;
        for (let i = 0; i <= 6; i++) q += `<rect class="pl" x="${f2(.8 + i * (len - 1.6 - .6) / 6)}" y="1.6" width=".6" height="3.3"/>`;
        q += hl(0, len, 5.2);
        for (let v = 6.4; v < h - .2; v += 1.2) q += hl(0, len, v);
        let w = ''; for (let i = 0; i < 4; i++) w += winA(1.6 + i * (len - 3.2 - 1.8) / 3, h - 3.6, 1.8, 3.3, 0);
        return q + wins(w);
      };
      return K.box(2.4, 89.7, Z0, 3.6, 14.6, h0, 'pl', { W: lg, S: blank, N: blank }, false) + flat(K, rectP(2.4, 89.7, 6, 104.3), Z0 + h0, 'kc');
    } });

    /* ---------- Inneres Kranzgebäude: Nordwest-Querflügel + Nordost-Flügel (Platzfassade), flache Dächer ---------- */
    add({ id: 'ne', fp: [21.6, 65.6, 74.3, 102.4], draw: K => {
      const WB = 15.4, WN = 16.4, FW = 15;
      // Nordwest-Querflügel (grau, flaches Dach) und Nordost-Flügel
      let s = K.box(21.6, 65.6, Z0, 52.7, 14.7, WB, 'pl', { N: old(), E: blank, S: blank, W: blank }, false) + flat(K, rectP(21.6, 65.6, 74.3, 80.3), Z0 + WB);
      s += K.box(52.9, 80.3, Z0, 21.4, 22.1, WN, 'pl', { W: old(), N: blank, S: old(), E: blank }, false) + flat(K, rectP(52.9, 80.3, 74.3, 102.4), Z0 + WN);
      // Platzfassade (Laves-Flügel) über beide Teile: Fenster sitzen auf durchgehenden Achsen
      s += K.wall([74.35, 102.2], [74.35, 65.6], Z0, Z0 + WN, 'pl', (len, h) => {
        let q = hl(0, len, .5) + hl(0, len, 1.3) + hl(0, len, 5.2) + hl(0, len, 9.1) + hl(0, len, h - 4) + quoins(len, h);
        for (let v = h - 2.7; v < h - .2; v += 1.3) q += hl(0, len, v);
        let w = '';
        for (const u of axes(len - 4.6, 3.9).map(a => a + 2.3)) {
          w += winR(u - .85, 1.9, 1.7, 3, 3) + winR(u - .85, 5.7, 1.7, 3.2, 2) + winR(u - .85, 9.4, 1.7, 3.1, 1) + winA(u - .85, h - 3.4, 1.7, 3, 0); }
        return q + wins(w);
      });
      // Haustechnik auf dem Dach
      s += K.box(60, 84, Z0 + WN, 6, 3.2, 1.4, 'kc', {}, true) + K.box(66.5, 92, Z0 + WN, 3, 4, 1.1, 'kc', {}, true) + K.box(28, 67.5, Z0 + WB, 4, 3, 1.2, 'kc', {}, true);
      return s;
    } });

    /* ---------- Foyer-Zone (Glasdach) zwischen Hof und Plenarsaal ---------- */
    const WD = 12.5;
    add({ id: 'foyer', fp: [21.6, 102.4, 67.8, 137.5], draw: K => {
      let s = K.box(21.6, 102.4, Z0, 46.2, 35.1, WD, 'kc', { E: blank, W: blank, N: blank, S: blank }, false);
      s += flat(K, rectP(21.6, 102.4, 67.8, 137.5), Z0 + WD);
      s += `<path class="kr" d="${K.path([[21.6, 102.4, Z0 + WD], [67.8, 102.4, Z0 + WD], [67.8, 137.5, Z0 + WD], [21.6, 137.5, Z0 + WD]])}Z"/>`;
      return s;
    } });
    add({ id: 'glass', fp: [36, 113, 64, 129], above: 'foyer', draw: K => {
      const z0 = Z0 + WD, x0 = 36, x1 = 64, y0 = 113, y1 = 129, i = 2.2, zt = z0 + 1.6;
      const B = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], I = [[x0 + i, y0 + i], [x1 - i, y0 + i], [x1 - i, y1 - i], [x0 + i, y1 - i]];
      let s = '';
      const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      const planes = [[B[0], B[1], I[1], I[0]], [B[1], B[2], I[2], I[1]], [B[2], B[3], I[3], I[2]], [B[3], B[0], I[0], I[3]]];
      planes.forEach(p => { let m = ''; for (let k = 1; k < 4; k++) { const a = lerp(p[0], p[1], k / 4), b = lerp(p[3], p[2], k / 4); m += `<path class="dt" d="${K.path([[...a, z0 + .2], [...b, zt]])}"/>`; }
        s += K.face(p.map((q, j) => [...q, j < 2 ? z0 + .2 : zt]), 'glb', m); });
      s += K.face(I.map(p => [...p, zt]), 'glb');
      for (let k = 1; k < 6; k++) { const y = I[0][1] + (I[3][1] - I[0][1]) * k / 6; s += `<path class="dt" d="${K.path([[I[0][0], y, zt], [I[1][0], y, zt]])}"/>`; }
      return s;
    } });

    /* ---------- Plenarsaal-Block (weiße Fassade, tiefes Flachdach, dunkles Walmdach des Saals) ---------- */
    const WE = 14.2, HX = 15.7, HY0 = 137.5, HX1 = 67.6, HY1 = 172.1;
    add({ id: 'hall', fp: [HX, HY0, HX1, HY1], draw: K => {
      // Südostseite: fünf hohe Fenster über verglastem Sockel; Südwestseite: Fensterbänder; Nordostseite: geschlossene Betonwand
      const se = (len, h) => {
        let q = hl(0, len, .6) + hl(0, len, h - 3.7), w = '';
        const n = 5, st = (len - 4) / n;
        for (let i = 0; i < n; i++) { const u = 2 + i * st + st * .2; w += winR(u, 1.5, st * .6, 7.8, 2); q += vl(u - .35, 1.1, 9.8) + vl(u + st * .6 + .35, 1.1, 9.8); }
        for (let i = 0; i < 14; i++) w += winR(1.2 + i * (len - 2.4) / 14, h - 3.2, (len - 2.4) / 14 - .5, 2.6, 0);
        return q + wins(w);
      };
      const sw = (len, h) => {
        let q = hl(0, len, .6) + hl(0, len, h - 3.7), w = '';
        const n = Math.floor((len - 2) / 3.2);
        for (let i = 0; i < n; i++) { const u = 1.4 + i * 3.2; w += winR(u, 2, 2.2, 2.4, 2) + winR(u, 5.4, 2.2, 2.4, 1); }
        for (let i = 0; i < n; i++) w += winR(1.4 + i * 3.2, h - 3.0, 2.2, 2.4, 0);
        return q + wins(w);
      };
      const ne = (len, h) => { let q = hl(0, len, .6) + hl(0, len, h - 2.4); for (let u = 4; u < len - 1; u += 4.4) q += vl(u, .7, h - 2.4); return q; };
      let s = K.box(HX, HY0, Z0, HX1 - HX, HY1 - HY0, WE, 'kc', { S: se, W: sw, E: ne, N: blank }, false);
      const zr = Z0 + WE, R = rectP(HX, HY0, HX1, HY1);
      s += flat(K, R, zr) + `<path class="kr" d="${K.path(R.map(p => [...p, zr]))}Z"/>`;
      // Haustechnik zwischen Glasdach und Saaldach
      [[22, 139, 7, 3, 1.6], [31, 140.5, 5, 2.4, 2.2], [38.5, 139.5, 9, 2.2, 1.2], [49, 140, 6, 3.2, 1.8], [57, 139, 7, 3, 1.4], [26, 143, 12, 1.4, 1], [42, 143.4, 14, 1.4, 1]]
        .forEach(([x, y, w, d, h]) => { s += K.box(x, y, zr, w, d, h, 'kc', {}, true); });
      // dunkles Walmdach des Saals (gekappte Ecken) mit vier Oberlichtern
      const O = [[60, 151], [55, 146], [31, 146], [26, 151], [26, 163], [31, 168], [55, 168], [60, 163]];
      const Iq = O.map(p => [43 + (p[0] - 43) * .66, 157 + (p[1] - 157) * .62]), zt = zr + 5.2;
      for (let i = 0; i < O.length; i++) { const j = (i + 1) % O.length; s += roofPlane(K, [[...O[i], zr], [...O[j], zr], [...Iq[j], zt], [...Iq[i], zt]], 'sl', 3.2); }
      s += K.face(Iq.map(p => [...p, zt]), 'sl');
      [[35, 152], [35, 160], [48, 152], [48, 160]].forEach(([x, y]) => { s += K.box(x, y, zt, 3.2, 2.4, .9, 'glb', {}, true); });
      return s;
    } });

    /* ---------- Laves-Portikus (Platzseite): sechs Säulen, Gebälk, Giebel ---------- */
    add({ id: 'portico', fp: [67.8, 106, 79.7, 138], parent: 'foyer', side: 'E', draw: K => {
      let s = K.box(67.8, 107.8, Z0, 6.9, 28.4, 1.3, 'pl', { E: l => hl(0, l, .4) }, true);
      for (let i = 0; i < 5; i++) s += K.box(74.7 + i * 1.05, 106.4, Z0, 1.05, 31.2, Math.max(.06, 1.3 * (5 - i) / 5.5), 'pl');
      for (let i = 0; i < 6; i++) { const y = 110.4 + i * 4.64;
        s += lathe(K, 73.1, y, [[Z0 + 1.3, 1.05], [Z0 + 2, .86], [Z0 + 13.6, .76], [Z0 + 14.2, .98], [Z0 + 14.9, 1.2]], 'pl fr', 3, [1, 3]); }
      const zb = Z0 + 14.9;
      s += K.box(67.8, 108.2, zb, 6.9, 27.6, 1.9, 'pl', { E: l => hl(0, l, .5) + hl(0, l, 1.1) + Array.from({ length: 27 }, (_, i) => vl(.6 + i, 1.1, 1.9)).join(''), S: l => hl(0, l, .5) }, false);
      const zp = zb + 1.9;
      s += flat(K, rectP(67.8, 108.2, 74.7, 135.8), zp, 'pl');
      s += saddle(K, [74.7, 135.8], [74.7, 108.2], [-6.9, 0], zp, zp + 4.4, 'sl');
      s += K.face([[74.7, 135.8, zp], [74.7, 108.2, zp], [74.7, 122, zp + 4.4]], 'pl', `<path class="dt" d="${K.path([[74.7, 133.8, zp + .5], [74.7, 122, zp + 3.7], [74.7, 110.2, zp + .5]])}"/><path class="dt" d="${K.path([[74.7, 129, zp + .5], [74.7, 122, zp + 2.8], [74.7, 115, zp + .5]])}"/>`);
      return s;
    } });

    return { mods: M, lc: [37.33, 86.07], z0: 0, ground: K => K.poly(COURT.map(p => [p[0], p[1], Z0]), 'court'), top: [37, 86, 24], label: 'Leineschloss · Landtag', h: 24, len: 172.1 };
  });
})();


;/* ===== mitte.js ===== */
/* Mitte — Module: Opernhaus (Laves, 1845–1852). (Aegidienkirche: jetzt landmarks/aegidienkirche.js)
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



;/* ===== mitte2.js ===== */
/* Mitte, zweite Reihe — Module (Stufe „erkennbar“, Details später):
   Anzeiger-Hochhaus, NORD/LB, Kreuzkirche, Waterloosäule, Kröpcke-Uhr. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1. Vorbilder: ref/mitte2/ (Quellen in quellen.txt). */
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


;/* ===== neustaedter.js ===== */
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


;/* ===== telemax.js ===== */
/* Telemax (Fernmeldeturm Hannover-Buchholz, 1992, 282 m) – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1 (Z0).
   Quadratischer, leicht verjüngter weißer Betonschaft (Mitte bei 22/22), unten pyramidenförmiger grauer Sockel; bei ≈ 105–128 m
   graue Antennenfelder; darüber 10 gestapelte quadratische Plattformen (unten ≈ 27 m breit, oben ≈ 14 m) mit Stahlfachwerk dazwischen;
   weißer Kopf mit Öffnungen, oben ein rotbrauner GRP-Zylinder (≈ 30 m) mit Stahlspitze. Maße nach ref/telemax/foto (siehe INDEX.md). */
(() => {
  const Z0 = 1, C0 = 22;
  ISO.landmark('telemax', H => {
    const { f2, hl, winR, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const seam = (len, h) => hl(0, len, .2);
    const brace = (len, h) => { let d = ''; const n = Math.max(2, Math.round(len / 2.6)), st = len / n;
      for (let i = 0; i < n; i++) d += `M${f2(i * st)} 0L${f2(i * st + st / 2)} ${f2(h)}L${f2((i + 1) * st)} 0`; return `<path class="dt sl-d" d="${d}"/>`; };
    const slabDeco = (len, h) => hl(0, len, h * .5);
    const panel = (len, h) => `<path class="dt" d="M${f2(len * .12)} ${f2(h * .1)}H${f2(len * .88)}V${f2(h * .9)}H${f2(len * .12)}Z"/>` + hl(len * .12, len * .88, h * .5) + `<path class="dt" d="M${f2(len / 2)} ${f2(h * .1)}V${f2(h * .9)}"/>`;
    const head = (len, h) => { let w = ''; for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) w += `<rect class="wn${H.vari()}" data-f="3" x="${f2(len * (.14 + i * .29))}" y="${f2(h * (.12 + r * .29))}" width="${f2(len * .2)}" height="${f2(h * .2)}"/>`; return wins(w); };
    const cabin = (len, h) => wins(winR(len * .18, h * .3, len * .64, h * .42, 2));
    const box = (K, hw, z, h, mat, deco = {}) => K.box(C0 - hw, C0 - hw, Z0 + z, 2 * hw, 2 * hw, h, mat, deco);
    const all4 = d => ({ S: d, E: d, N: d, W: d });
    add({ id: 'tw', fp: [0, 0, 44, 44], draw: K => {
      let s = '';
      // Sockel: niedrige graue Pyramide (≈ 2,4 × Schaftbreite)
      const b = 9.6, t = 4.2, z1 = Z0, z2 = Z0 + 12, c = C0;
      [[[c - b, c - b], [c + b, c - b], [c + t, c - t], [c - t, c - t]], [[c + b, c - b], [c + b, c + b], [c + t, c + t], [c + t, c - t]],
        [[c + b, c + b], [c - b, c + b], [c - t, c + t], [c + t, c + t]], [[c - b, c + b], [c - b, c - b], [c - t, c - t], [c - t, c + t]]]
        .forEach(q => { s += K.face([[...q[0], z1], [...q[1], z1], [...q[2], z2], [...q[3], z2]], 'sl'); });
      // Schaft (8 Segmente, Verjüngung 4,0 → 3,4 m Halbbreite)
      const segs = 8, zs = 11, ze = 106, dz = (ze - zs) / segs;
      for (let i = 0; i < segs; i++) { const z = zs + i * dz, hw = 4.0 - (z - zs) * .0063; s += box(K, hw, z, dz + .05, 'pl', all4(seam)); }
      // Antennenfelder
      s += box(K, 5.4, 107, 27, 'sl', all4(panel));
      // 10 Plattformen: je weißer Technikraum, Fachwerk-Untersicht, Platte
      for (let i = 0; i < 10; i++) {
        const zb = 134 + i * 10.4, hp = 16 - i * .83;
        s += box(K, hp * .45, zb, 7.4, 'pl', all4(cabin));
        s += box(K, hp * .85, zb + 7.4, 1.6, 'sl', all4(brace));
        s += box(K, hp, zb + 9, 1.4, 'st', all4(slabDeco));
      }
      // Kopf
      s += box(K, 5.0, 238, 16, 'pl', all4(head));
      s += box(K, 5.2, 254, 1.5, 'st', {});
      // Mast: weißer Fuß + rotbrauner GRP-Zylinder + Stahlspitze
      const prof1 = [], prof2 = [];
      for (let i = 0; i <= 2; i++) prof1.push([Z0 + 255.5 + i * 2.2, 2.0]);
      for (let i = 0; i <= 6; i++) prof2.push([Z0 + 259.9 + i * 3.6, 1.9 - i * .05]);
      s += lathe(K, C0, C0, prof1, 'pl', 0, []) + lathe(K, C0, C0, prof2, 'bk', 0, []);
      s += `<path class="dt" d="${K.path([[C0, C0, Z0 + 281.5], [C0, C0, Z0 + 285]])}"/>`;
      return s;
    } });
    return { mods: M, lc: [C0, C0], z0: 0, top: [C0, C0, Z0 + 281], label: 'Telemax', h: 282, len: 44 };
  });
})();


;/* ===== vwtower.js ===== */
/* VW-Tower („Telemoritz“, ehem. Fernmeldeturm Hannover; Stahlbeton 1958–59, Fritz Leonhardt) – Modul, eine Datei pro Gebäude.
   Aufbau nach Google-Earth-Kadern ref/vwtower/foto/: Schaft ~66 m, breites Deck mit gerippter Brüstung (Ø 22 m, passt zum OSM-Kreis),
   dunkle Trommel, drei schmale Scheiben mit Fensterhälsen (Ø ~17 m), oben Sockel mit drei runden Logoschildern, Mast bis 141 m.
   Lokal: x Ost, y Süd, z Höhe, Gelände z = 1, Schaftachse bei (12, 12). */
(() => {
  const Z0 = 1, CX = 12, CY = 12;
  const LOGOS = true; // Kadern zeigen die Schilder; real 2024 abmontiert (siehe ref/vwtower/README.md). false = nur Sockel + Mast
  ISO.landmark('vwtower', H => {
    const { f2, hull, vari, wins } = H, M = [], TAU = Math.PI * 2;
    // Sichtbarkeit / Schattenseite einer Zylindernormale (Winkel a im lokalen System)
    const vis = (K, a, m = 0) => K.facing(Math.cos(a), Math.sin(a)) > m;
    const dark = (K, a) => Math.sin(a) * K.view[0] - Math.cos(a) * K.view[1] < 0;
    const P2 = pts => 'M' + pts.map(p => p.map(f2).join(' ')).join('L') + 'Z';
    const ringPts = (K, z, r, n = 48) => Array.from({ length: n }, (_, i) => K.P(CX + r * Math.cos(TAU * i / n), CY + r * Math.sin(TAU * i / n), Z0 + z));
    // Drehkörper aus Profil [[z, r], …]: Hülle hell (fr), sichtbare Schattenhälfte dunkel (sd), optional Deckfläche (tp)
    const solid = (K, prof, cls, cap, lit = 'fr') => {
      const all = [], dk = [];
      prof.forEach(([z, r]) => { for (let i = 0; i < 72; i++) { const a = TAU * i / 72, p = K.P(CX + r * Math.cos(a), CY + r * Math.sin(a), Z0 + z); all.push(p); if (vis(K, a) && dark(K, a)) dk.push(p); } });
      let s = `<path class="${cls} ${lit}" d="${P2(hull(all))}"/>`;
      if (dk.length > 2) s += `<path class="${cls} sd" d="${P2(hull(dk))}"/>`;
      if (cap) { const [z, r] = prof[prof.length - 1]; s += `<path class="${cap} tp" d="${P2(ringPts(K, z, r))}"/>`; }
      return s;
    };
    // Fensterband um einen Hals: n Fenster, nur die zugewandte Seite
    const neckWins = (K, z, h, r, n, f) => {
      let w = '';
      for (let i = 0; i < n; i++) {
        const a = TAU * (i + .5) / n; if (!vis(K, a, .22)) continue;
        const d = .55 / r, q = (aa, zz) => K.P(CX + (r + .04) * Math.cos(aa), CY + (r + .04) * Math.sin(aa), Z0 + zz);
        w += `<path class="wn${vari()}" data-f="${f}" d="${P2([q(a - d, z), q(a + d, z), q(a + d, z + h), q(a - d, z + h)])}"/>`;
      }
      return wins(w);
    };
    // Rippen der Brüstung (Fertigteil-Lisenen) auf der sichtbaren Hälfte
    const ribs = (K, z0, z1, r, n) => {
      let d = '';
      for (let i = 0; i < n; i++) { const a = TAU * i / n; if (!vis(K, a, .05)) continue; d += 'M' + K.P(CX + r * Math.cos(a), CY + r * Math.sin(a), Z0 + z0).map(f2).join(' ') + 'L' + K.P(CX + r * Math.cos(a), CY + r * Math.sin(a), Z0 + z1).map(f2).join(' '); }
      return `<path class="dt" d="${d}"/>`;
    };
    // rundes Logoschild (verallgemeinert: dunkle Scheibe, heller Ring, einfacher Zickzack – keine Kopie der Marke) senkrecht, Normale nach außen
    const logo = (K, a, zc, R, r) => {
      const nx = Math.cos(a), ny = Math.sin(a), t = [-Math.sin(a), Math.cos(a), 0], at = d => [CX + nx * (R + d), CY + ny * (R + d), Z0 + zc];
      let s = `<g transform="${K.plane(at(-.9), t, [0, 0, 1])}"><circle class="st sd" r="${f2(r)}"/></g>`;
      if (vis(K, a, .08)) s += `<g transform="${K.plane(at(0), t, [0, 0, 1])}"><circle class="lant" r="${f2(r)}"/><circle fill="#14243B" r="${f2(r * .86)}"/>`
        + `<path fill="none" stroke="#E9EEF3" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round" d="M-2.4 2.1L-1.2 -1.6L0 .6L1.2 -1.6L2.4 2.1"/></g>`;
      return s;
    };
    M.push({ id: 'vt', fp: [0, 0, 24, 24], draw: K => {
      let s = '';
      // Schaft (Stahlbeton, leicht verjüngt, am Fuß verbreitert)
      s += solid(K, [[0, 4.7], [3, 4.2], [14, 3.7], [66, 3.4]], 'st');
      // Hauptdeck: Brüstung mit Rippen, dunkle verwitterte Oberseite
      s += solid(K, [[66, 11], [70.5, 11]], 'st', 'st sd') + ribs(K, 66.4, 70.1, 11.02, 96);
      // dunkle gewölbte Trommel über dem Deck
      const dr = [[70.5, 7.4], [71.4, 8.1], [72.6, 8.4], [74.4, 8.3], [76.2, 7.7], [77.6, 6.9], [78.5, 6.2]];
      for (let i = 0; i < dr.length - 1; i++) s += solid(K, [dr[i], dr[i + 1]], 'st', null, 'sd');
      s += solid(K, [[78.5, 6.2], [78.5, 6.2]], 'st', 'st', 'sd');
      // Hals 1 + Scheibe C
      s += solid(K, [[78.5, 3.4], [83.6, 3.4]], 'st') + neckWins(K, 79.6, 2.6, 3.4, 12, 3);
      s += solid(K, [[83.6, 7.9], [84.8, 7.9]], 'st', 'st');
      // Hals 2 + Scheibe B
      s += solid(K, [[84.8, 3.4], [91.2, 3.4]], 'st') + neckWins(K, 86.4, 3, 3.4, 12, 4);
      s += solid(K, [[91.2, 7.9], [92.4, 7.9]], 'st', 'st');
      // Hals 3 + oberste Scheibe + dunkler Sockel der Logos
      s += solid(K, [[92.4, 3.4], [99, 3.4]], 'st') + neckWins(K, 94, 3.2, 3.4, 12, 4);
      s += solid(K, [[99, 7.9], [100.2, 7.9]], 'st', 'st');
      s += solid(K, [[100.2, 5.2], [101, 4.4]], 'st', 'st', 'sd');
      // Logos hinter dem Mast, Mast, Logos davor (Tiefe nach K.depth)
      const R = 3.8, zc = 105.6, rr = 4.6, az = [15, 135, 255].map(d => d * Math.PI / 180);
      const dm = K.depth(CX, CY), L = LOGOS ? az.map(a => ({ a, d: K.depth(CX + R * Math.cos(a), CY + R * Math.sin(a)) })) : [];
      L.filter(o => o.d < dm).forEach(o => { s += logo(K, o.a, zc, R, rr); });
      s += solid(K, [[101, .95], [112, .95]], 'st') + solid(K, [[112, .65], [125, .65]], 'st') + solid(K, [[125, .35], [141, .15]], 'st') + solid(K, [[111.6, 1.3], [112.4, 1.3]], 'st', 'st') + solid(K, [[124.6, .9], [125.4, .9]], 'st', 'st');
      L.filter(o => o.d >= dm).forEach(o => { s += logo(K, o.a, zc, R, rr); });
      return s;
    } });
    return { mods: M, lc: [CX, CY], z0: 0, top: [CX, CY, Z0 + 141], label: 'VW-Tower', h: 141, len: 24 };
  });
})();


;/* ===== wangenheim.js ===== */
/* Wangenheimpalais (Friedrichswall 1, Laves 1829–1833; heute Wirtschaftsministerium) – Modul v2 nach Kadern Google Earth (ref/wangenheim/foto/v_01…v_10)
   Lokales System: Längsachse des Palais = x (Ost), lokal +y = Hauptfront nach Süden zum Friedrichswall (Straße), 1 Einheit ≈ 1 m.
   Maße aus dem OSM-Umriss (Relation r5162749, nur der südwestliche Teil = Palais): Hauptbau 48,7 × 19,2 m, Mittelrisalit 17,7 m breit und 1,2 m vorgezogen,
   Flügel je ≈ 15,3 m, Erker mit Kupferhaube an der Westseite (Sehne 6,7 m, Pfeil 2,4 m). Alles andere im Relationsumriss (Ostflügel, großer Block mit Hof) gehört
   zum Ministerium und ist NICHT Teil dieses Moduls.
   Nach den Kadern: heller Putz (cremeweiß), drei Fensterreihen (EG / hohes OG / 2. OG), 4 + 5 + 4 = 13 Fensterachsen an der Front, viersäuliger Portikus mit
   Balkon, davor Stufen; darüber Dreiecksgiebel mit Wappen (Querdach), Walmdach aus dunkel braungrauen Ziegeln mit Dachfenstern; Westerker mit Balkon,
   Fensterband und grüner Kupferhaube. Rück- und Westseite sind im Kartenwinkel (Blick von Südosten) verdeckt und nur schlicht gezeichnet. */
(() => {
  const Z0 = 1;
  ISO.landmark('wangenheim', H => {
    const { f2, hl, vl, winR, wins, hip, lathe } = H, M = [], add = m => (M.push(m), m);
    const X0 = 2.4, X1 = 51.1, Y1 = 19.2, YR = 20.4;              // Hauptbau x 2,4…51,1, y 0…19,2; Risalit bis y 20,4
    const HE = 13, RISE = 5.0, ZE = Z0 + HE, ZR = Z0 + HE + RISE;   // Traufe 13 m, First ≈ 18 m über Sockel
    const RX0 = 17.7, RX1 = 35.4, RC = (RX0 + RX1) / 2;             // Risalit
    const PW = 11.5, PX = RC - PW / 2, PH = 2.4;                    // Dreiecksgiebel: Breite, linke Ecke, Höhe

    // ---------- Fassadenhilfen (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ----------
    // drei Fensterreihen: EG niedrig, OG hoch, 2. OG kleiner (z-Bereiche über dem Sockel)
    const winRows = (u, h, rows = [0, 1, 2], w = 1.5) => {
      let s = '';
      if (rows.includes(0)) s += winR(u - w / 2, h - 3.9, w, 3.0, 0);
      if (rows.includes(1)) s += winR(u - w / 2, h - 8.9, w, 3.6, 1);
      if (rows.includes(2)) s += winR(u - w / 2, h - 12.2, w, 2.3, 2);
      return s;
    };
    // waagerechte Gliederung: Sockel, zwei Gurtgesimse, Kranzgesims
    const bands = (len, h) => hl(0, len, h - .8) + hl(0, len, h - 4.7) + hl(0, len, h - 9.2) + hl(0, len, h - 12.5) + hl(0, len, h - 12.9);
    // Flügelfront: 4 Achsen je Flügel, dazwischen (u = 15,3…33,4) das Risalit, das davorsteht
    const wingFront = (len, h) => {
      let w = '';
      for (let i = 0; i < 4; i++) { w += winRows((i + .5) * 3.825, h); w += winRows(len - 15.3 + (i + .5) * 3.825, h); }
      return bands(len, h) + wins(w);
    };
    // Risalit-Front: 5 Achsen; EG: Portal in der Mitte, daneben je ein Fenster, 2 weitere an den Rändern
    const risFront = (len, h) => {
      let w = '', q = bands(len, h);
      for (let i = 0; i < 5; i++) {
        const u = (i + .5) * (len / 5);
        w += winRows(u, h, i === 2 ? [1, 2] : [0, 1, 2], 1.6);
      }
      q += `<rect class="gl" x="${f2(len / 2 - 1.3)}" y="${f2(h - 4.1)}" width="2.6" height="3.3"/>` + vl(len / 2, h - 4.1, h - .8);
      q += vl(.45, 0, h - .8) + vl(len - .45, 0, h - .8);               // Eckpilaster
      return q + wins(w);
    };
    const endWall = (len, h) => {                                        // Ost- und Westgiebelwand, Rückseite: schlicht
      let w = '';
      const n = Math.max(2, Math.round(len / 4.2));
      for (let i = 0; i < n; i++) w += winRows((i + .5) * (len / n), h);
      return bands(len, h) + wins(w);
    };

    // ---------- Dach ----------
    const sy = y => ZE + RISE * (Y1 - y) / (Y1 / 2);                     // Höhe der Südfläche über y (Walm, Traufe y = 19,2, First y = 9,6)
    const skylight = (K, xa, xb, y1, y2) => K.face([[xa, y2, sy(y2)], [xb, y2, sy(y2)], [xb, y1, sy(y1)], [xa, y1, sy(y1)]], 'gl');
    const roof = K => {
      let s = hip(K, X0, 0, X1, Y1, ZE, ZR, 'sl');
      // Querdach über dem Risalit (gleiche Neigung): beide Flächen reichen bis zur Dachfläche des Hauptdachs
      const zg = ZE + PH, yv = Y1 - PH / (RISE / (Y1 / 2));               // Giebelfirst-Höhe; y, wo er auf das Hauptdach trifft
      s += K.face([[PX, YR, ZE], [PX, Y1, ZE], [RC, yv, zg], [RC, YR, zg]], 'sl');
      s += K.face([[RC, YR, zg], [RC, yv, zg], [PX + PW, Y1, ZE], [PX + PW, YR, ZE]], 'sl');
      // Dachfenster auf der Südfläche (Reihen in beiden Flügeln, Lage nach den Kadern)
      [9.4, 13.2, 17.0, 36.2, 40.0, 43.8].forEach(x => { s += skylight(K, x - .55, x + .55, 13.6, 14.9); });
      // Lüftungsrohr am First (Ostteil), wie im Kadern
      s += K.box(30.0, 9.15, ZR - .4, .9, .9, 1.7, 'pl');
      return s;
    };
    // Dreiecksgiebel auf der Risalitfront mit Wappenrelief (vergoldet im Foto)
    const pediment = K => K.wallVisible([PX, YR], [PX + PW, YR]) ? K.g(K.plane([PX, YR, ZE], [1, 0, 0], [0, 0, -1]),
      `<path class="pl fr" d="M0 0L${f2(PW / 2)} ${-PH}L${PW} 0Z"/><path class="dt" d="M.6 -.15L${f2(PW / 2)} ${f2(-PH + .45)}L${f2(PW - .6)} -.15"/>`
      + `<path class="dt" d="M0 0H${PW}"/><circle class="dt" cx="${f2(PW / 2)}" cy="-1.1" r=".85"/><circle class="dt" cx="${f2(PW / 2)}" cy="-1.1" r=".4"/>`) : '';

    // ======== HAUPTBAU: Flügel + Risalit + Dach + Giebel (ein Modul, damit Dach und Giebel sicher oben liegen) ========
    add({ id: 'wp', fp: [X0, 0, X1, YR], draw: K =>
      K.box(X0, 0, Z0, X1 - X0, Y1, HE, 'pl', { S: wingFront, E: endWall, N: endWall, W: endWall })
      + K.box(RX0, Y1, Z0, RX1 - RX0, YR - Y1, HE, 'pl', { S: risFront })
      + roof(K) + pediment(K) });

    // ======== PORTIKUS: vier Säulen, Gebälk, Balkon mit Geländer, Stufen ========
    add({ id: 'wpPort', fp: [21.2, YR, 31.9, 24.8], parent: 'wp', side: 'S', draw: K => {
      const x0 = 21.65, x1 = 31.45, y0 = YR, y1 = 23.6, zc = Z0 + .5, zt = Z0 + 4.4;
      let s = K.box(x0 - .5, y0, Z0, x1 - x0 + 1, y1 - y0 + 1.1, .5, 'st');                                    // Stufe/Sockel
      for (let i = 0; i < 4; i++) s += lathe(K, x0 + 1.0 + i * (x1 - x0 - 2.0) / 3, y1 - .6, [[zc, .9], [zc + .5, .72], [zt - .6, .62], [zt, .78]], 'st fr', 2);
      s += K.box(x0, y0, zt, x1 - x0, y1 - y0, .7, 'st', { S: l => hl(0, l, .25) });                          // Gebälk + Balkonplatte
      const zb = zt + .7;
      s += K.wall([x0, y1 - .2], [x1, y1 - .2], zb, zb + 1.0, 'st', l => hl(0, l, .18) + Array.from({ length: Math.floor(l / .7) }, (_, i) => vl(.35 + i * .7, .18, 1.0)).join(''));
      s += K.wall([x1, y1 - .2], [x1, y0], zb, zb + 1.0, 'st') + K.wall([x0, y0], [x0, y1 - .2], zb, zb + 1.0, 'st');
      return s;
    } });

    // ======== WESTERKER: gemauerter Sockel, Balkonring, Fensterband, grüne Kupferhaube ========
    add({ id: 'wpBay', fp: [0, 7.6, X0, 14.7], parent: 'wp', side: 'W', draw: K => {
      const xc = 3.54, yc = 11.15, R = 3.54, n = 6, T = 71 * Math.PI / 180;
      const ring = r => Array.from({ length: n + 1 }, (_, i) => { const t = -T + 2 * T * i / n; return [xc - r * Math.cos(t), yc + r * Math.sin(t)]; });
      const walls = (r, za, zb, mat, deco) => { const p = ring(r); let s = ''; for (let i = 0; i < n; i++) s += K.wall(p[i], p[i + 1], za, zb, mat, deco); return s; };
      const slab = (r, z, cls) => { const p = ring(r); return K.poly([...p.map(q => [q[0], q[1], z]), [X0, p[n][1], z], [X0, p[0][1], z]], cls); };
      let s = walls(R, Z0, Z0 + 4.2, 'pl', (l, h) => hl(0, l, .4) + wins(winR(l / 2 - .5, h - 3.1, 1.0, 1.9, 0)));      // Sockelgeschoss
      s += walls(R + .8, Z0 + 4.2, Z0 + 4.55, 'st') + slab(R + .8, Z0 + 4.55, 'st tp');                              // Balkonplatte
      s += walls(R + .8, Z0 + 4.55, Z0 + 5.45, 'st', l => hl(0, l, .15) + Array.from({ length: Math.max(1, Math.floor(l / .6)) }, (_, i) => vl(.3 + i * .6, .15, .9)).join(''));   // Geländer
      s += walls(R - .55, Z0 + 4.55, Z0 + 8.5, 'pl', (l, h) => hl(0, l, .25) + hl(0, l, h - .5) + wins(winR(l / 2 - .8, .9, 1.6, h - 1.9, 1)));      // Fensterband
      s += lathe(K, xc, yc, [[Z0 + 8.5, R - .1], [Z0 + 9.1, R - .65], [Z0 + 10.3, .9], [Z0 + 10.9, .25]], 'cu', 4, [0]);    // Kupferhaube
      return s;
    } });

    return { mods: M, lc: [27, 10], z0: 0, top: [27, 10, 19], label: 'Wangenheimpalais', h: 19, len: 52 };
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

