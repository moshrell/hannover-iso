/* Heinz von Heiden Arena (Stadion Hannover 96, früher HDI-Arena / Niedersachsenstadion) – Modul. Lokal: x = lange Achse (≈ Nord), y = quer (≈ Ost), z Höhe, Gelände z = 1.
   Grundriss und Kronenöffnung stammen aus dem OSM-Umriss (relation 92928, äußerer und innerer Ring, in die Hauptachse gedreht: tools-Rechnung in ref/heinzvonheidenarena/README.md),
   die zehn Treppentürme aus den kleinen OSM-Teilen (building=stadium). Höhen, Ringaufteilung des Daches, Ränge und Fassade nach den Google-Earth-Kadern in ref/heinzvonheidenarena/foto/.
   Alles selbst gezeichnet, nichts kopiert. face (meta): lokale +x-Achse zeigt auf ihre echte Richtung, damit der Umriss auf der Karte genau liegt. */
ISO.landmark('heinzvonheidenarena', H => {
  const { f2, vari, wins } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const W = 233.5, D = 203.6, C0 = [116.8, 116.4];
  // Höhen über Gelände (m): Fassade, Dachrand, Dach in der Mitte des Ringes, Dach am Rand der Öffnung, Kabelring
  const HW = 12, ZE = 14, ZM = 21, ZI = 29, ZR = 34;
  const clean = p => p.filter((q, i) => { const n = p[(i + 1) % p.length]; return Math.hypot(n[0] - q[0], n[1] - q[1]) > .05; });   // doppelte Punkte (geschlossene Ringe) entfernen
  const OUT = clean([[82.0,2.7],[73.4,4.9],[68.5,6.3],[63.5,7.7],[55.2,10.7],[50.1,12.8],[37.1,19.0],[18.5,33.3],[14.9,37.7],[6.9,49.6],[2.9,59.0],[0.0,67.6],[5.5,69.4],[7.3,70.0],[3.6,84.8],[2.1,104.7],[3.9,124.4],[8.8,143.7],[16.7,161.9],[25.2,172.8],[29.5,178.3],[47.3,190.4],[67.1,197.2],[87.6,201.5],[108.5,203.6],[129.4,203.3],[150.2,200.6],[161.5,197.9],[170.5,195.7],[190.2,188.3],[196.2,184.0],[207.5,175.8],[212.1,169.6],[219.9,159.0],[227.1,140.5],[231.5,121.0],[232.6,101.4],[230.8,84.7],[230.5,81.6],[226.4,66.9],[228.3,66.3],[233.5,64.4],[230.3,55.3],[226.2,46.4],[224.7,43.9],[220.2,37.8],[212.9,29.3],[207.0,23.8],[203.7,21.5],[196.9,17.6],[192.3,15.4],[180.6,10.4],[174.7,8.2],[171.9,7.3],[159.7,4.1],[152.0,2.3],[135.9,0.0],[122.2,-0.3],[105.1,0.0],[82.0,2.7]]);   // äußerer Ring (Dachkante/Fassade)
  const INN = clean([[98.2,68.1],[110.2,67.3],[123.5,67.1],[135.5,67.6],[147.2,69.1],[158.5,71.8],[166.9,75.8],[173.9,81.6],[179.1,89.2],[182.9,97.9],[185.2,108.3],[185.5,119.1],[183.7,130.2],[179.7,140.8],[173.2,149.6],[164.5,156.3],[148.7,161.6],[140.2,162.8],[126.1,164.1],[110.5,164.3],[96.4,163.4],[82.9,161.2],[71.8,157.6],[62.9,151.2],[56.2,142.5],[51.9,132.1],[49.1,122.8],[49.8,110.2],[51.8,99.8],[55.3,90.9],[60.3,83.2],[67.0,77.2],[75.5,72.8],[86.3,69.9],[98.2,68.1]]);   // Öffnung des Daches
  const TW = [[[69.8,3.0],[56.3,7.2],[57.6,11.5],[71.1,7.3]],[[161.9,1.6],[160.7,6.0],[174.3,9.7],[175.5,5.4]],[[220.2,33.2],[216.5,35.9],[224.8,47.4],[228.5,44.7]],[[192.5,12.4],[190.4,16.4],[202.8,23.0],[205.0,18.9]],[[39.6,14.5],[27.3,21.5],[29.5,25.5],[41.8,18.5]],[[227.7,89.3],[228.7,98.3],[235.2,97.6],[234.2,88.7]],[[222.7,142.5],[218.2,154.5],[224.0,156.9],[228.7,144.9]],[[12.5,36.2],[4.6,47.9],[8.3,50.5],[16.3,38.7]],[[50.6,190.4],[48.6,196.6],[62.4,201.3],[64.5,195.1],[53.3,191.4]],[[166.4,-5.4],[165.3,-1.9],[169.4,-0.6],[169.6,-1.3],[179.9,2.0],[181.0,-1.6],[170.7,-4.9],[170.5,-4.1]]];     // Treppentürme
  const area = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0);
  const outward = p => area(p) < 0 ? p : p.slice().reverse();    // Orientierung der Wandnormalen (siehe K.wall)
  const OUTW = outward(clean(OUT));
  // Strahl vom Mittelpunkt: Abstand zum Rand eines Polygons (größter Schnitt)
  const rayD = (poly, a) => {
    const dx = Math.cos(a), dy = Math.sin(a); let best = 0;
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length], ex = q[0] - p[0], ey = q[1] - p[1];
      const den = dx * ey - dy * ex; if (Math.abs(den) < 1e-9) continue;
      const t = ((p[0] - C0[0]) * ey - (p[1] - C0[1]) * ex) / den, u = ((p[0] - C0[0]) * dy - (p[1] - C0[1]) * dx) / den;
      if (t > 0 && u >= -1e-6 && u <= 1 + 1e-6 && t > best) best = t;
    }
    return best;
  };
  // Spielfeld mit Auslauf: Rechteck 110 x 75 m mit gerundeten Ecken
  const RRA = 55, RRB = 37.5, RRR = 10;
  const PR = (() => {
    const pts = [];
    const cs = [[RRA - RRR, RRB - RRR, 0], [-RRA + RRR, RRB - RRR, 90], [-RRA + RRR, -RRB + RRR, 180], [RRA - RRR, -RRB + RRR, 270]];
    cs.forEach(([cx, cy, a0]) => { for (let j = 0; j <= 6; j++) { const a = (a0 + 90 * j / 6) * Math.PI / 180; pts.push([C0[0] + cx + RRR * Math.cos(a), C0[1] + cy + RRR * Math.sin(a)]); } });
    return pts;
  })();
  // Winkel: alle Eckpunkte des Außenrings plus ein gleichmäßiges Raster (Sektoren des Daches und der Ränge)
  const ANG = (() => {
    const s = new Set();
    OUTW.forEach(p => s.add(+Math.atan2(p[1] - C0[1], p[0] - C0[0]).toFixed(5)));
    for (let a = -180; a < 180; a += 6) s.add(+(a * Math.PI / 180).toFixed(5));
    return [...s].sort((a, b) => a - b);
  })();
  const N = ANG.length;
  const ray = a => { const dx = Math.cos(a), dy = Math.sin(a), at = t => [C0[0] + dx * t, C0[1] + dy * t]; return { a, dx, dy, at, O: at(rayD(OUT, a)), I: at(rayD(INN, a)), P: at(rayD(PR, a)) }; };
  const R = ANG.map(ray);
  const BR = Array.from({ length: 72 }, (_, i) => ray((i * 5 - 180) * Math.PI / 180));   // Ränge: alle 5°
  const lerp2 = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const pz = (p, z) => [p[0], p[1], Z0 + z];
  // Profil der Ränge: Abstand s vom Spielfeldrand (m, entlang des Strahls) → Höhe
  const PROF = [[0, 2], [9, 9], [11.5, 12.5], [32, 24]];
  const ZMID = .5;   // Anteil des grauen Außenrings an der Dachbreite

  /* ---------- Teile ---------- */
  // Spielfeld, Auslauf, Mähstreifen, Linien
  const pitch = K => {
    let s = K.poly(PR.map(p => pz(p, .3)), 'gl tp');
    const x0 = C0[0] - 52.5, x1 = C0[0] + 52.5, y0 = C0[1] - 34, y1 = C0[1] + 34, n = 14;
    for (let i = 0; i < n; i++) if (i % 2 === 0) { const a = x0 + (x1 - x0) * i / n, b = x0 + (x1 - x0) * (i + 1) / n; s += K.poly([[a, y0, Z0 + .4], [b, y0, Z0 + .4], [b, y1, Z0 + .4], [a, y1, Z0 + .4]], 'cu tp'); }
    const L = (a, b) => `M${K.P(a[0], a[1], Z0 + .5).map(f2).join(' ')}L${K.P(b[0], b[1], Z0 + .5).map(f2).join(' ')}`;
    let d = L([x0, y0], [x1, y0]) + L([x1, y0], [x1, y1]) + L([x1, y1], [x0, y1]) + L([x0, y1], [x0, y0]) + L([C0[0], y0], [C0[0], y1]);
    [[x0, 1], [x1, -1]].forEach(([xe, sg]) => { const x2 = xe + sg * 16.5, x3 = xe + sg * 5.5, ya = C0[1] - 20.2, yb = C0[1] + 20.2, yc = C0[1] - 9.2, yd = C0[1] + 9.2;
      d += L([xe, ya], [x2, ya]) + L([x2, ya], [x2, yb]) + L([x2, yb], [xe, yb]) + L([xe, yc], [x3, yc]) + L([x3, yc], [x3, yd]) + L([x3, yd], [xe, yd]); });
    let c = ''; for (let j = 0; j <= 36; j++) { const a = j / 36 * 2 * Math.PI, p = K.P(C0[0] + 9.15 * Math.cos(a), C0[1] + 9.15 * Math.sin(a), Z0 + .5); c += (j ? 'L' : 'M') + p.map(f2).join(' '); }
    return s + `<path class="dt" d="${d}${c}"/>`;
  };
  // Zuschauerränge: unterer Rang, Fassade/Logen, oberer Rang; Sektoren entlang der Strahlen
  const profPts = (r, k) => PROF.map(([s, z]) => [r.P[0] + r.dx * s, r.P[1] + r.dy * s, Z0 + z]);
  const bowl = K => {
    let s = '';
    for (let i = 0; i < BR.length; i++) {
      const r0 = BR[i], r1 = BR[(i + 1) % BR.length], p0 = profPts(r0), p1 = profPts(r1), mx = (r0.P[0] + r1.P[0]) / 2, my = (r0.P[1] + r1.P[1]) / 2;
      const red = my > C0[1] + 20 && mx > 55 && mx < 180;      // rote Sitze: unterer Rang der Osttribüne
      for (let k = 0; k < PROF.length - 1; k++) {
        const q = [p0[k], p1[k], p1[k + 1], p0[k + 1]];
        const mat = k === 1 ? 'pl' : (k === 0 && red ? 'tl' : 'glb');
        let extra = '';
        if (k !== 1) {
          const n = k === 0 ? 3 : 5; let d = '';
          for (let j = 1; j <= n; j++) { const t = j / (n + 1), a = [p0[k][0] + (p0[k + 1][0] - p0[k][0]) * t, p0[k][1] + (p0[k + 1][1] - p0[k][1]) * t, p0[k][2] + (p0[k + 1][2] - p0[k][2]) * t], b = [p1[k][0] + (p1[k + 1][0] - p1[k][0]) * t, p1[k][1] + (p1[k + 1][1] - p1[k][1]) * t, p1[k][2] + (p1[k + 1][2] - p1[k][2]) * t]; d += `M${K.P(...a).map(f2).join(' ')}L${K.P(...b).map(f2).join(' ')}`; }
          if (i % 3 === 0) d += `M${K.P(...p0[k]).map(f2).join(' ')}L${K.P(...p0[k + 1]).map(f2).join(' ')}`;
          extra = `<path class="dt" d="${d}"/>`;
        }
        s += K.face(q, mat, extra);
      }
    }
    // Schriftzug HEINZ VON HEIDEN: helle Sitze im unteren Rang der Westtribüne (v_07/v_08), direkt unter dem Dachrand; vom Spielfeld aus nach Westen gelesen: Süd → Nord = +x
    // (der obere Rang liegt für eine Kamera im Osten hinter dem Dachrand, sichtbar ist nur der untere Streifen)
    const sw = 1.6, sl = (PROF[1][1] - PROF[0][1]) / (PROF[1][0] - PROF[0][0]), zw = PROF[0][1] + sw * sl, yw = C0[1] - RRB - sw, k = Math.hypot(1, sl);
    if (K.facing(0, sl / k, 1 / k) > 0) s += wins(`<text class="wn" data-f="3" transform="${K.plane([C0[0] - 41, yw, Z0 + zw], [1, 0, 0], [0, 1 / k, -sl / k])}" font-family="sans-serif" font-weight="700" font-size="8" textLength="82" lengthAdjust="spacingAndGlyphs">HEINZ VON HEIDEN</text>`);
    return s;
  };
  add({ id: 'bowl', fp: [0, 0, W, D], draw: K => pitch(K) + bowl(K) });

  /* Fassade, Türme, Kabelring, Dach */
  const wallDeco = i => (len, h) => {
    // Wandkoordinaten: x entlang, y nach unten ab Oberkante (h = Wandhöhe); drei Fensterbänder auf dem Betonsockel
    let s = hl0(len, h - 3.8) + hl0(len, 1.2), w = '';
    [[4.4, 2.9, 1], [7.9, 2.9, 2]].forEach(([zb, hh, f]) => {
      const y = h - zb - hh; let u = .35;
      while (u < len - .6) { const ww = Math.min(len - u - .35, 2.2); if (ww > .7) w += `<rect class="wn${vari()}" data-f="${f}" x="${f2(u)}" y="${f2(y)}" width="${f2(ww)}" height="${f2(hh)}"/>`; u += ww + .3; }
    });
    return s + wins(w);
  };
  const hl0 = (len, y) => `<path class="dt" d="M0 ${f2(y)}H${f2(len)}"/>`;
  const faceTo = (K, q, mat, tx, ty) => {   // senkrechte Fläche, Normale soll zur Richtung (tx, ty) zeigen
    let nx = 0, ny = 0; for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); }
    return K.face(nx * tx + ny * ty >= 0 ? q : q.slice().reverse(), mat);
  };
  const prism = (K, pts, z0, z1, mat, deco) => { const p = outward(clean(pts)); let s = ''; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += K.wall(a, b, Z0 + z0, Z0 + z1, mat, deco); } return s + K.poly(p.map(q => [q[0], q[1], Z0 + z1]), mat + ' tp'); };
  const towerDeco = (len, h) => `${hl0(len, 1)}` + (len > 3 ? wins(`<rect class="wn${vari()}" data-f="2" x="${f2(len * .36)}" y="2.2" width="${f2(len * .28)}" height="${f2(h - 5)}"/>`) : '');
  // Eingangsblock der Ostfassade (v_07/v_08): vorspringender Baukörper mit Glasfront und rotem «96»-Schild, in der Mitte der Ostfassade
  const ENT = [[99.0,202.65],[121.0,203.42],[120.8,208.9],[98.8,208.15]];
  const entDeco = (len, h) => {
    if (len < 12) return hl0(len, 1);
    let w = ''; const y = h - 2.2 - 5.2; let u = .6;
    while (u < len - 1) { const ww = Math.min(len - u - .6, 2.4); if (ww > .8) w += `<rect class="wn${vari()}" data-f="2" x="${f2(u)}" y="${f2(y)}" width="${f2(ww)}" height="5.2"/>`; u += ww + .35; }
    return hl0(len, h - 1.6) + `<rect class="tl" x="${f2(len * .3)}" y="1.2" width="${f2(len * .4)}" height="2.6"/>` + wins(w);
  };
  add({ id: 'fassade', fp: [0, 0, W, D], above: 'bowl', draw: K => {
    let s = '';
    for (let i = 0; i < OUTW.length; i++) { const a = OUTW[i], b = OUTW[(i + 1) % OUTW.length];
      s += K.wall(a, b, Z0, Z0 + HW, 'kc', wallDeco(i)) + K.wall(a, b, Z0 + HW, Z0 + ZE, 'pl'); }
    const tws = TW.map(p => ({ p, h: 11, deco: towerDeco, mat: 'pl' })).concat([{ p: ENT, h: 10.5, deco: entDeco, mat: 'kc' }])
      .map(t => ({ ...t, d: K.depth(t.p.reduce((q, c) => q + c[0], 0) / t.p.length, t.p.reduce((q, c) => q + c[1], 0) / t.p.length) })).sort((x, y) => x.d - y.d);
    tws.forEach(t => { s += prism(K, t.p, 0, t.h, t.mat, t.deco); });
    return s;
  } });
  add({ id: 'dach', fp: [0, 0, W, D], above: 'fassade', draw: K => {
    let s = '';
    const MR = R.map(r => lerp2(r.O, r.I, ZMID));
    const band = (A, za, B, zb, cls) => `<path class="${cls}" fill-rule="evenodd" d="${K.path(A.map(p => pz(p, za)))}Z${K.path(B.map(p => pz(p, zb)).reverse())}Z"/>`;
    s += band(R.map(r => r.O), ZE, MR, ZM, 'pl tp') + band(MR, ZM, R.map(r => r.I), ZI, 'glb tp');
    // Paneelfugen: radial alle 6°, grauer Ring nur außen, blauer Ring über die ganze Breite
    let seams = '';
    BR.forEach((r, i) => { if (i % 1 === 0) { const m = lerp2(r.O, r.I, ZMID); seams += `M${K.P(r.O[0], r.O[1], Z0 + ZE).map(f2).join(' ')}L${K.P(m[0], m[1], Z0 + ZM).map(f2).join(' ')}L${K.P(r.I[0], r.I[1], Z0 + ZI).map(f2).join(' ')}`; } });
    s += `<path class="dt" d="${seams}"/>`;
    // Innenkante der Öffnung (von der Spielfeldseite sichtbar)
    for (let i = 0; i < BR.length; i++) { const a = BR[i], b = BR[(i + 1) % BR.length];
      s += faceTo(K, [pz(a.I, ZI), pz(b.I, ZI), pz(b.I, ZI - 1.8), pz(a.I, ZI - 1.8)], 'pl', C0[0] - (a.I[0] + b.I[0]) / 2, C0[1] - (a.I[1] + b.I[1]) / 2); }
    // Kabelring auf Stäben über dem Dachrand
    let posts = '', ring = '', acc = 0, nxt = 0; const per = [];
    for (let i = 0; i < OUTW.length; i++) { const a = OUTW[i], b = OUTW[(i + 1) % OUTW.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); per.push([a, b, L]); }
    const tot = per.reduce((q, e) => q + e[2], 0), step = tot / Math.round(tot / 22), tops = [];
    per.forEach(([a, b, L]) => { while (nxt <= acc + L) { const t = (nxt - acc) / L, p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; tops.push(p); nxt += step; } acc += L; });
    tops.forEach((p, i) => { posts += `M${K.P(p[0], p[1], Z0 + ZE).map(f2).join(' ')}L${K.P(p[0], p[1], Z0 + ZR).map(f2).join(' ')}`; ring += (i ? 'L' : 'M') + K.P(p[0], p[1], Z0 + ZR).map(f2).join(' '); });
    return s + `<path class="dt" d="${posts}"/><path class="dt" d="${ring}Z"/>`;
  } });
  return { mods: M, lc: [W / 2, D / 2], z0: 0, top: [W / 2, D / 2, ZR], pin: [C0[0], C0[1], Z0 + ZR + 4], label: 'Heinz von Heiden Arena', h: ZR, len: W };
});
