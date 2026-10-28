/* Beginenturm (um 1357, Am Hohen Ufer 3, Hannover) – Modul. Einziger vollständig erhaltener Turm der mittelalterlichen Stadtbefestigung, heute Teil des Historischen Museums.
   Runder Wehrturm aus hellem Kalk-Bruchstein, unten leicht verbreitert, zwei Mauerbänder, wenige Schießscharten, Konsolkranz, zwölfseitiges Biberschwanz-Pyramidendach.
   Gesamthöhe 24 m (hannover.de); Wand ≈ 19,2 m, Kranz ≈ 0,8 m, Dach ≈ 4 m (aus den Kadern ref/beginenturm/foto/ v_01–v_04 nachgemessen).
   Lokal: x Ost, y Süd (face = echte Himmelsrichtungen), z Höhe, Gelände z = 1. Lage der Öffnungen nach den Kadern:
   Süd (v_04): Scharte oben (z ≈ 16), ausgebrochenes Loch (z ≈ 9); Nord (v_01/v_02): Scharte oben mit Wappenstein (z ≈ 17); WNW (v_03): Wappenstein oben, Scharte (z ≈ 10,5).
   Die Ostseite verdeckt der Museumsbau (nicht gezeichnet), v_05 zeigt einen anderen, quadratischen Turm. Alles selbst gezeichnet. */
(() => {
  const Z0 = 1, C = 5, R = 4.9, TAU = Math.PI * 2;
  const ZW = 19.2, ZK = 20.0, ZT = 24.0;                  // Oberkante der Wand, Oberkante des Konsolkranzes, Dachspitze (m über Gelände)
  ISO.landmark('beginenturm', H => {
    const { f2, hull, lathe, rnd, setSeed } = H, M = [];
    const vis = (K, a) => K.facing(Math.cos(a), Math.sin(a)) > 0;
    const dk = (K, a) => Math.sin(a) * K.view[0] - Math.cos(a) * K.view[1] < 0;
    const pathOf = pts => 'M' + hull(pts).map(p => p.map(f2).join(' ')).join('L') + 'Z';
    const rAt = z => z < 4.2 ? 5.35 - (5.35 - R - .1) * z / 4.2 : R + .1 - .1 * Math.min(1, (z - 4.2) / 3);   // verbreiterter Sockel, darüber fast zylindrisch
    // sichtbare Schattenhälfte (nur die Wand): wie fr/sd bei den Kastenwänden
    const half = (K, prof, cls) => {
      const pts = []; prof.forEach(([z, r]) => { for (let i = 0; i < 60; i++) { const a = TAU * i / 60; if (vis(K, a) && dk(K, a)) pts.push(K.P(C + r * Math.cos(a), C + r * Math.sin(a), z)); } });
      return pts.length > 2 ? `<path class="${cls} sd" d="${pathOf(pts)}"/>` : '';
    };
    // Fläche der sichtbaren Mantelhälfte zwischen zwei Höhen (für Anstrahlung unten / Abdunklung oben, wie wsh/wsl bei K.wall)
    const band = (K, z0, z1) => {
      const pts = []; for (let i = 0; i < 60; i++) { const a = TAU * i / 60; if (vis(K, a)) [z0, z1].forEach(z => pts.push(K.P(C + rAt(z) * Math.cos(a), C + rAt(z) * Math.sin(a), Z0 + z))); }
      return pts.length > 2 ? pathOf(pts) : '';
    };
    // sichtbare Bogenstücke eines Rings (r, z) als Teilpfade; an der Rückseite wird getrennt, damit keine Sehne entsteht
    const arcs = (K, r, z, step = 72) => { let d = '', run = []; const flush = () => { if (run.length > 1) d += K.path(run); run = []; }; for (let i = 0; i <= step; i++) { const a = TAU * i / step; if (!vis(K, a)) { flush(); continue; } run.push([C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z]); } flush(); return d; };
    const at = (K, a, z, r) => K.P(C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z);

    M.push({ id: 'bt', fp: [0, 0, 10, 10], draw: K => {
      const wall = [[Z0, 5.35], [Z0 + 4.2, R + .1], [Z0 + ZW, R - .05]];
      let s = lathe(K, C, C, wall, 'rs fr', 0) + half(K, wall, 'rs');
      // Licht am Abend: Anstrahlung des Sockels, Abdunklung nach oben (Klassen wsl/wsh, Deckkraft kommt aus dem CSS)
      const lo = band(K, 0, 5.2), lo2 = band(K, 0, 2.4), hi = band(K, 11, ZW), hi2 = band(K, 15.2, ZW);
      [hi, hi2].forEach(d => { if (d) s += `<path class="wsh" fill="#000" opacity="0" d="${d}"/>`; });
      [lo, lo2].forEach(d => { if (d) s += `<path class="wsl" fill="#FFCF73" opacity="0" d="${d}"/>`; });

      // Bruchsteinmauerwerk: unregelmäßige Lagen mit Lücken und kurzen Stoßfugen (ein Pfad, damit die Karte leicht bleibt)
      setSeed(11);
      let mas = '';
      for (let z = 1.1, k = 0; z < ZW - .5; z += .8 + rnd() * .35, k++) {
        let run = [];
        const flush = () => { if (run.length > 1) mas += K.path(run); run = []; };
        for (let i = 0; i <= 72; i++) {
          const a = TAU * i / 72;
          if (!vis(K, a) || rnd() < .3) { flush(); continue; }
          const r = rAt(z) + .02; run.push([C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z]);
        }
        flush();
        for (let j = 0; j < 5; j++) { const a = Math.PI * (rnd() * 2 - .5); if (!vis(K, a)) continue; const r = rAt(z) + .02; mas += K.path([[C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z], [C + r * Math.cos(a), C + r * Math.sin(a), Z0 + z + .7]]); }
      }
      s += `<path class="dt" opacity=".26" d="${mas}"/>`;

      // zwei Mauerbänder (kleine Rücksprünge): Kante und Schattenlinie darunter
      [7.2, 14.4].forEach(z => { s += `<path class="dt" stroke-width="1.1" d="${arcs(K, R + .16, z)}"/><path class="dt" opacity=".4" d="${arcs(K, R + .08, z - .3)}"/>`; });

      // Öffnungen: schmale dunkle Scharten (kein Licht), ausgebrochenes Loch im Süden, Wappenstein im Norden
      const slit = (a, z, h = 1.2) => { if (!vis(K, a)) return ''; const p = at(K, a, z, R + .02); return `<rect class="lv" x="${f2(p[0] - .16)}" y="${f2(p[1] - h / 2)}" width=".32" height="${f2(h)}"/>`; };
      s += slit(Math.PI / 2, 16.2) + slit(.2, 16.4) + slit(3.4, 10.5) + slit(3.5, 16.6) + slit(4.7, 16.8, 1.0);
      if (vis(K, 1.62)) { const p = at(K, 1.62, 9.2, R + .02); s += `<path class="lv" d="M${f2(p[0] - .22)} ${f2(p[1] - .38)}l.42 -.08l.22 .42l-.08 .46l-.46 .08l-.22 -.3z"/>`; }
      const w = at(K, 4.62, 15.8, R + .06); if (vis(K, 4.62)) s += `<path class="rs sd" d="M${f2(w[0] - .5)} ${f2(w[1] - .65)}h1v.8l-.5 .7l-.5 -.7z"/>`;

      // Konsolkranz unter dem Dach: Wulst und Konsolen
      s += lathe(K, C, C, [[Z0 + ZW, R], [Z0 + ZW + .35, R + .28], [Z0 + ZK, R + .45]], 'rs', 0);
      let cons = ''; for (let i = 0; i < 48; i++) { const a = TAU * i / 48; if (!vis(K, a)) continue; cons += K.path([[C + (R + .25) * Math.cos(a), C + (R + .25) * Math.sin(a), Z0 + ZW + .05], [C + (R + .25) * Math.cos(a), C + (R + .25) * Math.sin(a), Z0 + ZW + .65]]); }
      s += `<path class="dt" d="${cons}"/>`;

      // Dach: zwölf Flächen (Biberschwanz), Reihen parallel zur Traufe und Grate, Spitze
      const RE = R + .6, N = 12, apex = [C, C, Z0 + ZT], rim = [];
      for (let i = 0; i < N; i++) { const a = TAU * (i + .5) / N; rim.push([C + RE * Math.cos(a), C + RE * Math.sin(a), Z0 + ZK + .12]); }
      for (let i = 0; i < N; i++) {
        const p0 = rim[i], p1 = rim[(i + 1) % N]; let ex = '';
        const lerp = (p, t) => [p[0] + (apex[0] - p[0]) * t, p[1] + (apex[1] - p[1]) * t, p[2] + (apex[2] - p[2]) * t];
        for (let t = .1; t < .95; t += .085) ex += K.path([lerp(p0, t), lerp(p1, t)]);
        ex += K.path([p0, apex]);
        s += K.face([p0, p1, apex], 'tl', `<path class="dt tl-d" opacity=".6" d="${ex}"/>`);
      }
      return s;
    } });
    return { mods: M, lc: [C, C], z0: 0, top: [C, C, 25], pin: [C, C, Z0 + ZT + 1.4], label: 'Beginenturm', h: 24, len: 10 };
  });
})();
