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
