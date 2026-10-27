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
  // Jochgiebel auf der Wandkrone (Wandkoordinaten: Fuß y = 0, nach oben negativ); sh = Schattenklasse.
  // Ruine: die Giebel sind unterschiedlich hoch erhalten (hs = Höhenfaktor je Joch), einzelne sind abgebrochen (br = Index, Spitze fehlt, ausgefranste Kante)
  const GS = [1, .94, 1, .8, .92], GN = [.96, 1, .86, 1, .9];
  const gables = (x0, sh, hs, br) => { let s = '';
    for (let i = 0; i < 5; i++) { const a = BUT[i] - x0 + .35, b = BUT[i + 1] - x0 - .35, m = (a + b) / 2, H = GR * hs[i], hw = (b - a) / 2;
      if (i === br) {
        const q = (u, v) => `${f2(m + u * hw)} ${f2(-H * v)}`;
        s += `<path class="rs ${sh}" d="M${f2(a)} 0L${q(-.34, .66)}L${q(-.2, .56)}L${q(-.05, .7)}L${q(.12, .6)}L${q(.3, .72)}L${q(.48, .5)}L${f2(b)} 0Z"/>`
          + `<path class="dt" d="M${f2(a + 1.1)} -.4L${q(-.34, .6)}M${q(.5, .44)}L${f2(b - 1.1)} -.4"/>`;
      } else {
        s += `<path class="rs ${sh}" d="M${f2(a)} 0L${f2(m)} ${f2(-H)}L${f2(b)} 0Z"/><path class="dt" d="M${f2(a + 1.1)} -.4L${f2(m)} ${f2(-H + .7)}L${f2(b - 1.1)} -.4"/>`
          + `<circle class="wn off" data-f="1" cx="${f2(m)}" cy="${f2(-H * .42)}" r=".5"/>`; } }
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
    s += K.wall([TX1, YN + T], [XE - 1.1, YN + T], Z0 + WH, Z0 + WH + .01, 'rs', () => gables(TX1, shadeK(K, 0, 1), GN, 2));
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
    s += K.wall([TX1, YS], [XE, YS], Z0 + WH, Z0 + WH + .01, 'rs', () => gables(TX1, shadeK(K, 0, 1), GS, 3));
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

  return { mods: M, ground, lc: [33.2, 11.1], z0: 0, top: [12.4, 10.5, 57], pin: [33.2, 11.1, 21], label: 'Aegidienkirche', h: 57, len: 50.3 };
});
