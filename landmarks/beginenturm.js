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
