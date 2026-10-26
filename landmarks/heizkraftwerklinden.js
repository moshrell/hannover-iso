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
