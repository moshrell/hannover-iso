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
