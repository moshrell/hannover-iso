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
