/* Telemax (Fernmeldeturm Hannover-Buchholz, 1992, 282 m) – Modul. Lokal: x Ost, y Süd, z Höhe, Gelände z = 1 (Z0).
   Quadratischer, leicht verjüngter weißer Betonschaft (Mitte bei 22/22), unten pyramidenförmiger grauer Sockel; bei ≈ 105–128 m
   unter der untersten Plattform ein 20-m-Würfel (Betriebskabine, außermittig nach Osten, dunkle Paneele); darüber 7 gestapelte quadratische Plattformen
   (unten ≈ 32 m breit, oben ≈ 22 m) mit weißen Technikräumen und Untersicht; weißer Kopf mit Öffnungen, oben ein rotbrauner GRP-Zylinder (30 m) mit Stahlspitze.
   Plattformzahl und Kabine nach Kadern v_03/v_05 und de.wikipedia (sieben Plattformen, 20-m-Kabine asymmetrisch). Maße geschätzt (siehe README). */
(() => {
  const Z0 = 1, C0 = 22;
  ISO.landmark('telemax', H => {
    const { f2, hl, winR, wins, lathe } = H, M = [], add = m => (M.push(m), m);
    const seam = (len, h) => hl(0, len, .2);
    const brace = (len, h) => { let d = ''; const n = Math.max(2, Math.round(len / 2.6)), st = len / n;
      for (let i = 0; i < n; i++) d += `M${f2(i * st)} 0L${f2(i * st + st / 2)} ${f2(h)}L${f2((i + 1) * st)} 0`; return `<path class="dt sl-d" d="${d}"/>`; };
    const slabDeco = (len, h) => hl(0, len, h * .5);
    const panel = (len, h) => `<path class="dt" d="M${f2(len * .12)} ${f2(h * .1)}H${f2(len * .88)}V${f2(h * .9)}H${f2(len * .12)}Z"/>` + hl(len * .12, len * .88, h * .5) + `<path class="dt" d="M${f2(len / 2)} ${f2(h * .1)}V${f2(h * .9)}"/>`;
    const cabinPanels = (len, h) => { let d = ''; for (let i = 1; i < 4; i++) d += `M${f2(len * i / 4)} ${f2(h * .05)}V${f2(h * .95)}`; for (let j = 1; j < 3; j++) d += `M${f2(len * .03)} ${f2(h * j / 3)}H${f2(len * .97)}`; return `<path class="dt" d="${d}"/>`; };
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
      // Schaft (8 Segmente, Verjüngung 5,2 → 4,3 m Halbbreite, Basis ≈ 11 m laut Wikipedia)
      const segs = 8, zs = 11, ze = 106, dz = (ze - zs) / segs;
      for (let i = 0; i < segs; i++) { const z = zs + i * dz, hw = 5.2 - (z - zs) * .0095; s += box(K, hw, z, dz + .05, 'pl', all4(seam)); }
      // Betriebskabine: 20-m-Würfel, hängt außermittig (nach Osten) unter der untersten Plattform (Kadr v_03, v_05)
      s += K.box(C0 - 6, C0 - 10, Z0 + 118, 20, 20, 20, 'sl', all4(cabinPanels));
      // 7 Plattformen: je weißer Technikraum, Untersicht, Platte
      const P0 = 138, PITCH = 13;
      for (let i = 0; i < 7; i++) {
        const zb = P0 + i * PITCH, hp = 16 - i * .85;
        s += box(K, hp * .42, zb, 8.4, 'pl', all4(cabin));
        s += box(K, hp * .85, zb + 8.4, 2.2, 'sl', all4(brace));
        s += box(K, hp, zb + 10.6, 2.4, 'st', all4(slabDeco));
      }
      // Kopf
      s += box(K, 5.2, 229, 16, 'pl', all4(head));
      // Mast: weißer Fuß + rotbrauner GRP-Zylinder (30 m) + Stahlspitze, insgesamt 282 m
      const prof1 = [], prof2 = [];
      for (let i = 0; i <= 2; i++) prof1.push([Z0 + 245 + i * 2.5, 2.0]);
      for (let i = 0; i <= 6; i++) prof2.push([Z0 + 250 + i * 4.3, 1.9 - i * .05]);
      s += lathe(K, C0, C0, prof1, 'pl', 0, []) + lathe(K, C0, C0, prof2, 'bk', 0, []);
      s += `<path class="dt" d="${K.path([[C0, C0, Z0 + 275.8], [C0, C0, Z0 + 281]])}"/>`;
      return s;
    } });
    return { mods: M, lc: [C0, C0], z0: 0, top: [C0, C0, Z0 + 281], pin: [C0, C0, Z0 + 286], label: 'Telemax', h: 282, len: 44 };
  });
})();
