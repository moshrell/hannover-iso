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
