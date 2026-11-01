/* Heizkraftwerk Linden („Drei warme Brüder“, Elisenstraße 2, an der Ihme; seit 1962, Schornsteine 1975 von 65 auf 125 m erhöht) – Modul.
   Maße aus Google-Earth-Kadern vermessen (Kamera je Kader gefittet, OSM-Passpunkte; Plan: OSM-Umriss w45336252, Rechteck 149,8 × 51,9 m):
   lokal x = Längsachse von NW nach SO, y von der Ihme-Seite (0, NO) zur Straßenseite (51,9, SW), z Höhe, Gelände z = 1.
   Von NW nach SO: Anbau (Backstein, 11 m), drei Kesselhaus-Türme 14,6 × 29 × 65,5 m (graublaue Verglasung, Backstein-Tafeln auf den breiten SO-/NW-Stirnseiten),
   dahinter an der Ihme das Maschinenhaus (22 m, dunkles Flachdach), am SO-Ende der Anbau (weiß 17 m + Backstein 13 m). Schornsteine A/B/C auf den Turmdächern.
   Abendlicht: die LED-Anstrahlung der Türme (seit 2013 rot/violett) läuft über die Klasse „wsl“ mit eigener Füllfarbe (nur abends sichtbar). */
(() => {
  const Z0 = 1, L = 149.8, W = 51.9;
  const TW = 14.6, TD = 29, TY = 22.7, TH = 65.5, XT = [42.9, 78, 113.2];                 // Turmmaße (x-Breite, y-Tiefe) und x-Beginn der drei Türme
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
        // breite Stirnseiten (E/W, Länge TD): Backstein-Tafel y≈6,4…22,8 m, z≈1,5…58,5 m
        const end = (len, h) => grid(len, h) + `<rect class="gb ${sh(K, 1, 0)}" x="${f2(len * .22)}" y="${f2(h * .107)}" width="${f2(len * .565)}" height="${f2(h * .87)}"/>`
          + wash(len, h, LED[i]);
        const side = (len, h) => grid(len, h) + wash(len, h, LED[i]);
        let s = K.box(x, y, Z0, TW, TD, zr, 'glb', { E: end, S: side, W: end, N: side }, false);
        s += `<rect class="kc tp" transform="${K.TOP(x, y, Z0 + zr)}" width="${TW}" height="${TD}"/>`;
        s += K.box(x + 2, y + 18, Z0 + zr, 4, 3.4, 1.6, 'kc', {}) + K.box(x + 8.5, y + 21, Z0 + zr, 3.4, 3, 1.1, 'kc', {});
        if (kind === 0) { // A: hoher Schornstein (r≈2,75, 124 m) + kurze Doppelstutzen
          const cx = 51.4, cy = 32.5;
          s += cyl(K, cx + 4.2, cy + 3, [[zr, 1.3], [zr + 7, 1.3]], 'kc', 'kc') + cyl(K, cx + 4.2, cy - 2.6, [[zr, 1.3], [zr + 7, 1.3]], 'kc', 'kc');
          s += cyl(K, cx, cy, [[zr, 2.7], [124, 2.8]], 'kc', 'iron') + bands(K, cx, cy, 2.8, [zr + 14, zr + 28, zr + 42, 118]);
        } else if (kind === 1) { // B: Trommel r≈3,8 (14 m) + dünnes Rohr bis 122 m
          const cx = 85.5, cy = 23.5 + 5;
          s += cyl(K, cx, cy, [[zr, 3.8], [zr + 14, 3.8]], 'kc', 'kc') + bands(K, cx, cy, 3.8, [zr + 4, zr + 10]);
          s += cyl(K, cx, cy - 5, [[zr, 1.2], [122, 0.9]], 'kc', 'iron');
        } else { // C: silberner Schornstein r≈2,7 (125 m) + zweite kurze Trommel
          const cx = 121.5, cy = 32.8;
          s += cyl(K, cx + 4.8, cy + 5, [[zr, 2.2], [zr + 9, 2.2]], 'kc', 'kc') + bands(K, cx + 4.8, cy + 5, 2.2, [zr + 5]);
          s += cyl(K, cx, cy, [[zr, 2.7], [125, 2.7]], 'iron', 'iron') + bands(K, cx, cy, 2.7, [zr + 14, zr + 28, 70, zr + 42, 118]);
        }
        return s;
      } });
    };
    [0, 1, 2].forEach(i => tower(i, i));

    /* --- Maschinenhaus an der Ihme (22 m, dunkles Flachdach) + Anbau am NW-Ende (Backstein, 11 m) --- */
    add({ id: 'hall', fp: [0, 0, 130.2, TY], draw: K => {
      const cap = (len, h) => `<path class="dt" opacity=".6" d="M0 ${f2(h * .08)}h${f2(len)}"/>`;
      let s = K.box(0, 0, Z0, 130.2, TY, 22, 'pl', { E: cap }, false) + `<rect class="sl tp" transform="${K.TOP(0, 0, Z0 + 22)}" width="130.2" height="${TY}"/>`;
      for (let x = 14; x < 124; x += 20) s += K.box(x, 7, Z0 + 22, 3.4, 3.4, .5, 'kc', {});     // runde Oberlichter (flach)
      return s;
    } });
    add({ id: 'annexNW', fp: [0, TY, 42.9, 42.4], draw: K => {
      const fac = (len, h) => { let w = ''; for (let r = 0; r < 2; r++) for (let u = 2; u < len - 3; u += 4.2) w += winR(u, 2 + r * 4, 2.2, 2.4, r); return hl(0, len, .6) + wins(w); };
      let s = K.box(0, TY, Z0, 42.9, 19.7, 11, 'gb', { S: fac, E: fac, W: fac }, false) + `<rect class="sl tp" transform="${K.TOP(0, TY, Z0 + 11)}" width="42.9" height="19.7"/>`;
      return s + cyl(K, 22, 32, [[11, 3], [17, 3]], 'kc', 'kc');
    } });

    /* --- Anbau am SO-Ende: Büro-/Werkstattflügel, weiß (17 m) und Backstein (13 m) --- */
    const ribbon = (len, h) => { let w = ''; for (let r = 0; r < Math.floor((h - 2) / 3.6); r++) for (let u = 1.6; u < len - 2.6; u += 3.2) w += winR(u, 1.8 + r * 3.6, 2.1, 1.9, Math.min(4, r)); return hl(0, len, .6) + wins(w); };
    add({ id: 'annexSEw', fp: [130.2, 0, L, 13.9], draw: K => K.box(130.2, 0, Z0, L - 130.2, 13.9, 17, 'pl', { S: ribbon, E: ribbon }, false) + `<rect class="sl tp" transform="${K.TOP(130.2, 0, Z0 + 17)}" width="${f2(L - 130.2)}" height="13.9"/>` });
    add({ id: 'annexSEb', fp: [130.2, 13.9, L, 28.8], draw: K => K.box(130.2, 13.9, Z0, L - 130.2, 14.9, 13, 'gb', { S: ribbon, E: ribbon }, false) + `<rect class="sl tp" transform="${K.TOP(130.2, 13.9, Z0 + 13)}" width="${f2(L - 130.2)}" height="14.9"/>` });

    return { mods: M, lc: [L / 2, W / 2], z0: 0, top: [85.5, 32, Z0 + 125], pin: [L / 2, 26, Z0 + 128], label: 'Heizkraftwerk Linden', h: 125, len: L };
  });
})();
