/* Gartenkirche St. Marien (Hannover, Mitte) – Modul. Lokal: x Ost (Längsachse), y Süd, z Höhe, Gelände z = 1. Turm im Westen (x klein), Chor im Osten.
   Grundriss nach dem OSM-Umriss (way 138392040, um 4° gedreht: lange Achse = x, Ursprung = Ecke des Umrissrechtecks), Höhen und Gliederung nach den Google-Earth-Kadern in ref/gartenkirche/foto/.
   Neugotische Hallenkirche aus Deister-Sandstein (Rudolph Eberhard Hillebrand, 1887–1891); der Turmhelm (einst fast 85 m) brannte 1943 ab und wurde nicht wiederaufgebaut: heute ein Pyramidendach.
   Sichtbar sind nur Süd- und Ostseiten; Nord- und Westseiten sind in groben Zügen vorhanden, siehe ref/gartenkirche/README.md. Alles selbst gezeichnet. */
ISO.landmark('gartenkirche', H => {
  const { f2, garch, wins, hip, roofPlane, clockSVG, louvre } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  const Zh = z => Z0 + z;                                   // Höhe über Gelände -> lokales z

  /* ---------- Maße (m über Gelände), aus den Kadern geschätzt (Maßstab: Querhausbreite / Strebepfeilerabstand aus OSM) ---------- */
  const EAVE = 13.5, RIDGE = 25.5, ARM = 21.6;               // Traufe der Halle, First des Hauptdachs, First der Querhausdächer
  const YN = 8.1, YC = 16.15, YS = 24.2;                      // Nordwand, Mittelachse, Südwand der Halle
  const KZ = (RIDGE - EAVE) / (YS - YC);                      // Dachsteigung (m Höhe je m Tiefe)
  const TX0 = 1.0, TX1 = 8.7, TY0 = 11.0, TY1 = 21.0, TH = 37.0;   // Turm
  const XA = 26.1, XB = 36.3;                                 // Querhaus (West-/Ostkante)
  const YF = 27.0;                                            // Südfront des Querhaus-Südarms (Portalvorbau tritt 1 m weiter vor)
  const XC = 40.7, XE = 44.9;                                 // Ende des Chorjochs / der Apsis
  const A1 = [XC, YS], A2 = [XE, 19.7], A3 = [XE, 12.6], A4 = [XC, YN];   // Apsis: drei Seiten
  const AP = [43.1, YC, RIDGE];                               // Spitze des Apsisdachs

  /* ---------- Hilfen ---------- */
  const shadeK = (K, nx, ny) => { const co = (K.view[0] + K.view[1]) / 2, si = (K.view[0] - K.view[1]) / 2; return ny * co + nx * si >= nx * co - ny * si ? 'fr' : 'sd'; };
  const hline = (len, y) => `M0 ${f2(y)}H${f2(len)}`;
  const crs = (len, h, z0, z1, step) => { let d = ''; for (let z = z0; z < z1; z += step) d += hline(len, h - z); return `<path class="dt" d="${d}"/>`; };
  const band = (sh, len, h, z, t = .3) => `<rect class="st ${sh}" x="0" y="${f2(h - z - t)}" width="${f2(len)}" height="${f2(t)}"/>`;
  // Kragsteinfries: kurze Striche unter dem Gesims
  const corbel = (len, y, step = .8) => { let d = ''; for (let u = step / 2; u < len; u += step) d += `M${f2(u)} ${f2(y)}v.55`; return `<path class="dt" d="${d}"/>`; };
  // Spitzbogenfenster: Rahmen (fr) + leuchtendes Glas mit Pfosten, Querriegel und Maßwerkkreis (wn)
  const lan = (h, u, zb, zt, w, f = 1, n = 2) => {
    const y = h - zt, hh = zt - zb, x = u - w / 2; let d = '';
    for (let k = 1; k < n; k++) d += `M${f2(x + w * k / n)} ${f2(y + w * .62)}V${f2(y + hh)}`;
    d += `M${f2(x)} ${f2(y + hh * .6)}H${f2(x + w)}M${f2(x)} ${f2(y + hh * .8)}H${f2(x + w)}`;
    return {
      fr: `<path class="dt" d="${garch(x - .3, y - .32, w + .6, hh + .32)}"/>`,
      wn: `<path class="wn" data-f="${f}" d="${garch(x, y, w, hh)}"/><path class="mul" d="${d}"/><circle class="mul" cx="${f2(u)}" cy="${f2(y + w * .5)}" r="${f2(w * .16)}"/>`,
    };
  };
  // Rosette mit Speichen (Rad-Maßwerk): Wandkoordinaten, Mitte (cx, cy), Radius r
  const rose = (cx, cy, r, f = 2) => {
    let d = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; d += `M${f2(cx + r * .3 * Math.cos(a))} ${f2(cy + r * .3 * Math.sin(a))}L${f2(cx + r * Math.cos(a))} ${f2(cy + r * Math.sin(a))}`; }
    let pe = ''; for (let i = 0; i < 12; i++) { const a = (i + .5) * Math.PI / 6; pe += `<circle class="mul" cx="${f2(cx + r * .62 * Math.cos(a))}" cy="${f2(cy + r * .62 * Math.sin(a))}" r="${f2(r * .16)}"/>`; }
    return {
      fr: `<circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .35)}"/><circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .75)}"/>`,
      wn: `<circle class="wn" data-f="${f}" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}"/><path class="mul" d="${d}"/>${pe}<circle class="mul" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * .3)}"/><circle class="mul" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r * .85)}"/>`,
    };
  };
  // Fiale: quadratischer Schaft + Pyramidenhelm
  const pin = (K, cx, cy, zb, zt, w, mat = 'st') => {
    const a = w / 2, ch = w * 2.6, zs = zt - ch, c = [[cx - a, cy - a], [cx + a, cy - a], [cx + a, cy + a], [cx - a, cy + a]];
    let s = K.box(cx - a, cy - a, zb, w, w, zs - zb, mat, {}, false);
    for (let i = 0; i < 4; i++) s += K.face([[...c[i], zs], [...c[(i + 1) % 4], zs], [cx, cy, zt]], mat);
    return s;
  };
  // Wandfläche im Raum (Wandkoordinaten: x entlang L→R, y nach unten ab Höhe zTop) für Zierteile, die über Wand und Giebel reichen
  const overlay = (K, x0, y0, x1, y1, zTop, inner) => { const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy); return K.g(K.plane([x0, y0, zTop], [dx / len, dy / len, 0], [0, 0, -1]), inner); };
  // Vieleck-Turmschaft (n Seiten), Wände einzeln (damit Fenster auf einzelne Seiten gesetzt werden können); Winkel läuft rückwärts, damit die Normalen nach außen zeigen
  const polyWall = (K, cx, cy, r, z0, z1, n, mat, deco) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI / 2 - 2 * Math.PI * i / n, a1 = Math.PI / 2 - 2 * Math.PI * (i + 1) / n;
      s += K.wall([cx + r * Math.cos(a0), cy + r * Math.sin(a0)], [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], z0, z1, mat, deco ? deco(i) : null);
    }
    return s;
  };
  const cone = (K, cx, cy, r, ze, zt, n, mat = 'sl') => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI / 2 - 2 * Math.PI * i / n, a1 = Math.PI / 2 - 2 * Math.PI * (i + 1) / n;
      s += K.face([[cx + r * Math.cos(a0), cy + r * Math.sin(a0), ze], [cx + r * Math.cos(a1), cy + r * Math.sin(a1), ze], [cx, cy, zt]], mat);
    }
    return s;
  };
  // Strebepfeiler an einer Südwand (nach +y vorspringend): zwei Stufen, Abdeckung, kleine Fiale
  const pierS = (K, cx, y0, w = .75, d = 1.05, zt = EAVE - .5) => {
    let s = K.box(cx - w / 2, y0, Zh(0), w, d, 8.2, 'st', {}, true);
    s += K.box(cx - w / 2 + .1, y0, Zh(8.2), w - .2, d - .5, zt - 8.2, 'st', {}, false);
    s += K.face([[cx - w / 2 + .1, y0 + d - .5, Zh(zt)], [cx + w / 2 - .1, y0 + d - .5, Zh(zt)], [cx + w / 2 - .1, y0, Zh(zt + 1.3)], [cx - w / 2 + .1, y0, Zh(zt + 1.3)]], 'st');
    return s;
  };

  /* ---------- Turm (West): quadratischer Schaft aus dunklem Sandstein, Glockengeschoss mit Zwillingslanzetten, Pyramidendach ---------- */
  add({ id: 'tower', fp: [TX0, TY0, TX1, TY1], draw: K => {
    const T = sh => (len, h, south) => {
      const c = len / 2;
      let d = crs(len, h, 1.2, 23.4, 1.5);
      d += `<path class="dt" d="M.75 ${f2(h)}V0M${f2(len - .75)} ${f2(h)}V0"/>`;           // Eckpfeiler (Streifen)
      d += `<path class="dt" d="${hline(len, h - 1)}${hline(len, h - 24.2)}${hline(len, h - 24.7)}"/>`;
      [9.5, 17].forEach(z => { d += `<path class="dt" d="M0 ${f2(h - z)}h.75M${f2(len - .75)} ${f2(h - z)}h.75"/>`; });   // Rücksprünge der Eckpfeiler
      // Glockengeschoss: Blendbogen mit zwei Schallöffnungen (Jalousien), Eckpfeiler setzen sich fort
      d += `<path class="dt" d="${garch(c - 2.2, h - 35.6, 4.4, 10.6)}"/>`;
      let g = louvre(c - 1.45, h - 34.6, 1.2, 8.4) + louvre(c + .25, h - 34.6, 1.2, 8.4);
      d += `<path class="dt" d="M${f2(c - 2.4)} ${f2(h - 36.2)}H${f2(c + 2.4)}"/>` + corbel(len, h - 37.0, .7);
      if (south) {
        d += `<path class="dt" d="${garch(len * .27 - .85, h - 3.4, 1.7, 3.4)}"/>`;          // Eingang an der Südseite
        d += clockSVG(c, h - 21.4, .95);
      }
      return d + g;
    };
    let s = K.box(TX0, TY0, Zh(0), TX1 - TX0, TY1 - TY0, TH, 'rs', { S: (l, h) => T('fr')(l, h, true), E: (l, h) => T('sd')(l, h, false) }, true);
    // Kranzgesims und Pyramidendach (Ziegel)
    s += K.box(TX0 - .35, TY0 - .35, Zh(TH), TX1 - TX0 + .7, TY1 - TY0 + .7, .6, 'st', {}, true);
    s += hip(K, TX0 - .35, TY0 - .35, TX1 + .35, TY1 + .35, Zh(TH + .6), Zh(TH + 4.4), 'tl');
    return s;
  } });

  /* ---------- Treppentürme am Westjoch: Südwestturm (groß) und Nordwestturm (klein), Kegeldächer aus Schiefer ---------- */
  add({ id: 'sturret', fp: [3.8, 21.5, 8.7, 26.5], draw: K => {
    const cx = 6.25, cy = 24.0, r = 2.45;
    const Wd = i => (l, h) => {
      let d = crs(l, h, 1.2, 11, 1.5) + `<path class="dt" d="${hline(l, h - 1)}${hline(l, h - 11)}${hline(l, h - 11.4)}"/>`;
      if (i === 1 || i === 2) { const w = Math.min(.8, l * .45), a = lan(h, l / 2, 3.2, 7.4, w, 1, 1), b = lan(h, l / 2, 8.2, 10.4, w * .8, 1, 1); d += a.fr + wins(a.wn) + b.fr + wins(b.wn); }
      return d;
    };
    let s = polyWall(K, cx, cy, r, Zh(0), Zh(11.4), 12, 'st', Wd);
    s += cone(K, cx, cy, r + .25, Zh(11.4), Zh(17.8), 12, 'sl');
    return s;
  } });
  add({ id: 'nturret', fp: [3.8, 5.4, 8.0, 9.8], draw: K => {
    const cx = 5.9, cy = 7.6, r = 2.0;
    return polyWall(K, cx, cy, r, Zh(0), Zh(11), 12, 'st', () => (l, h) => crs(l, h, 1.2, 10.5, 1.5)) + cone(K, cx, cy, r + .25, Zh(11), Zh(16.2), 12, 'sl');
  } });

  /* ---------- Hallenschiff: Südwand mit vier Lanzettfenstern (je zwischen zwei Strebepfeilern), steiles Schieferdach ---------- */
  const PIERS = [13.0, 17.3, 21.8, 25.5], NX0 = 8.7;
  const mainRoof = (K, x0, x1) => roofPlane(K, [[x0, YS, Zh(EAVE)], [x1, YS, Zh(EAVE)], [x1, YC, Zh(RIDGE)], [x0, YC, Zh(RIDGE)]], 'sl', 2.4);
  // kleine Dachluken (Lüftungsklappen) dicht über der Traufe, wie auf den Kadern zu sehen
  const hatch = (K, u, v) => { const z = EAVE + (YS - v) * KZ, w = .8, d = .6; return K.poly([[u - w / 2, v, Zh(z)], [u + w / 2, v, Zh(z)], [u + w / 2, v - d, Zh(z + d * KZ)], [u - w / 2, v - d, Zh(z + d * KZ)]], 'lv'); };
  add({ id: 'nave', fp: [NX0, YN, XA, YS], draw: K => {
    const W = (len, h) => {
      let d = crs(len, h, 1.2, 4.6, 1.8) + `<path class="dt" d="${hline(len, h - 1.0)}${hline(len, h - 4.9)}${hline(len, h - 5.1)}"/>`;
      let g = '';
      const cs = [10.85, 15.15, 19.55, 23.65];
      cs.forEach(c => {
        const a = lan(h, c - NX0, 5.4, 12.5, 1.9, 1, 2); d += a.fr; g += a.wn;
        d += `<path class="dt" d="M${f2(c - NX0 - .6)} ${f2(h - 4.1)}h1.2v1.2h-1.2Z"/>`;    // kleines Kellerfenster unter jeder Achse
      });
      d += band('fr', len, h, EAVE - .45, .45) + corbel(len, h - EAVE + .45, .75);
      return d + wins(g);
    };
    let s = mainRoof(K, NX0, XA) + hatch(K, 9.9, 22.7) + hatch(K, 25.1, 22.7);
    s += K.wall([NX0, YS], [XA, YS], Zh(0), Zh(EAVE), 'st', W);
    PIERS.forEach(x => { s += pierS(K, x, YS); });
    return s;
  } });

  /* ---------- Querhaus: Dach über der Vierung, Nordarm (hinten), Südarm mit Giebel, Rose und Portal ---------- */
  add({ id: 'cross', fp: [XA, YN, XB, YS], draw: K => mainRoof(K, XA, XB) });
  add({ id: 'narm', fp: [26.3, 4.4, 35.3, YN], parent: 'cross', side: 'N', draw: K => {
    const xm = 30.8, vN = 4.4, vv = YN + (ARM - EAVE) / KZ;   // Kehle auf dem Hauptdach
    let s = K.wall([35.3, YN], [35.3, vN], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .6, 1.8));
    s += K.face([[35.3, vN, Zh(EAVE)], [xm, vN, Zh(ARM)], [xm, vv, Zh(ARM)], [35.3, YN, Zh(EAVE)]], 'sl');
    return s;
  } });
  add({ id: 'arm', fp: [XA, YS, XB, 28.0], parent: 'cross', side: 'S', draw: K => {
    const len = XB - XA, um = len / 2, xm = XA + um, rise = ARM - EAVE;
    // Dachfläche des Südarms (Ostseite) auf dem Hauptdach: Kehle vom Eckpunkt der Traufe bis zum Firstpunkt
    const vv = YS - (ARM - EAVE) / KZ;
    let s = K.face([[XB, YF, Zh(EAVE)], [xm, YF, Zh(ARM)], [xm, vv, Zh(ARM)], [XB, YS, Zh(EAVE)]], 'sl');
    // Ostwand des Arms (schmaler Streifen) und Südfront bis zur Traufe
    s += K.wall([XB, YF], [XB, YS], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .5, 1.8));
    s += K.wall([XA, YF], [XB, YF], Zh(0), Zh(EAVE), 'st', (l, h) => crs(l, h, 1.2, EAVE - .6, 1.8) + `<path class="dt" d="${hline(l, h - 1.0)}"/>`);
    // Giebel + Zierteile als eine Fläche (y nach unten ab Giebelspitze ARM)
    const sh = shadeK(K, 0, 1), z = zz => ARM - zz;
    let ov = `<path class="st ${sh}" d="M0 ${f2(rise)}L${f2(um)} 0L${f2(len)} ${f2(rise)}Z"/>`;
    ov += `<path class="dt" d="M0 ${f2(rise)}L${f2(um)} 0L${f2(len)} ${f2(rise)}M.45 ${f2(rise)}L${f2(um)} .75L${f2(len - .45)} ${f2(rise)}"/>`;
    const r1 = rose(um, z(10.6), 3.0, 2);
    ov += r1.fr + wins(r1.wn);
    // drei Lanzetten im Giebel (mittlere höher)
    const gl = [[um - 1.45, 15.6, 18.2], [um, 15.2, 19.3], [um + 1.45, 15.6, 18.2]].map(([c, zb, zt]) => lan(ARM, c, zb, zt, .75, 2, 1));
    gl.forEach(a => { ov += a.fr + wins(a.wn); });
    // Gesimse unter der Rose und an der Traufe
    ov += `<path class="dt" d="${hline(len, z(4.9))}${hline(len, z(EAVE))}"/>`;
    s += overlay(K, XA, YF, XB, YF, Zh(ARM), ov);
    // Portalvorbau (5 m breit, springt 1 m vor): spitzbogiges Portal unter einem Wimperg
    const px0 = 28.8, px1 = 33.8, pm = (px0 + px1) / 2, vp = YF + 1.0;
    s += K.wall([px0, vp], [px1, vp], Zh(0), Zh(5.0), 'st', (l, h) => {
      return `<path class="dt" d="${garch(l / 2 - 1.15, h - 4.1, 2.3, 4.1)}"/><path class="lv" d="${garch(l / 2 - .95, h - 3.9, 1.9, 3.9)}"/><path class="dt" d="${hline(l, h - 1)}"/>`;
    });
    s += K.wall([px1, vp], [px1, YF], Zh(0), Zh(5.0), 'st', (l, h) => crs(l, h, 1.2, 4.6, 1.8));
    const pg = shadeK(K, 0, 1);
    s += overlay(K, px0, vp, px1, vp, Zh(5.0), `<path class="st ${pg}" d="M0 0L${f2(pm - px0)} -2.4L${f2(px1 - px0)} 0Z"/><path class="dt" d="M0 0L${f2(pm - px0)} -2.4L${f2(px1 - px0)} 0"/><path class="dt" d="M${f2(pm - px0 - .4)} -.9v-.9h.8v.9"/>`);
    s += K.face([[px1, vp, Zh(5.0)], [pm, vp, Zh(7.4)], [pm, YF, Zh(7.4)], [px1, YF, Zh(5.0)]], 'sl');
    // Eckpilaster: schlanke Streben an den beiden Enden der Front, mit Fiale
    [[XA + .05, YF - .05], [XB - 1.05, YF - .05]].forEach(([x, y]) => {
      s += K.box(x, y, Zh(0), 1.0, .85, 8.6, 'st', {}, true) + K.box(x + .1, y, Zh(8.6), .8, .6, 5.2, 'st', {}, true);
      s += pin(K, x + .5, y + .5, Zh(13.7), Zh(17.6), .7);
    });
    return s;
  } });

  /* ---------- Chorjoch und Apsis (drei Seiten), Schieferdach mit Walm, Südosttürmchen ---------- */
  add({ id: 'choir', fp: [XB, YN, XC, YS], draw: K => {
    let s = mainRoof(K, XB, XC) + hatch(K, 38.4, 22.7);
    const W = (len, h) => { const a = lan(h, len / 2, 5.4, 12.5, 1.9, 1, 2); return crs(len, h, 1.2, 4.6, 1.8) + `<path class="dt" d="${hline(len, h - 1.0)}${hline(len, h - 4.9)}"/>` + a.fr + wins(a.wn) + band('fr', len, h, EAVE - .45, .45); };
    s += K.wall([XB, YS], [XC, YS], Zh(0), Zh(EAVE), 'st', W);
    return s;
  } });
  add({ id: 'apse', fp: [XC, YN, XE, YS], draw: K => {
    const dep = (x, y) => K.depth(x, y);
    // Dachfächer: Walmflächen nach Süden/Osten/Norden und die Südschräge bis zum Ende des Chorjochs
    const R1 = [XC, YC, Zh(RIDGE)], P = [AP[0], AP[1], Zh(AP[2])], e = z => Zh(EAVE);
    let s = '';
    const roof = [
      { p: [[...A1, e()], [XC, YC, Zh(RIDGE)], P], c: dep(XC + .8, 21) },
      { p: [[...A1, e()], [...A2, e()], P], c: dep(43, 21.5) },
      { p: [[...A2, e()], [...A3, e()], P], c: dep(XE, 16) },
      { p: [[...A3, e()], [...A4, e()], P], c: dep(43, 11) },
    ];
    roof.sort((a, b) => a.c - b.c).forEach(r => { s += K.face(r.p, 'sl'); });
    // Wandflächen der drei Seiten (nur sichtbare), Fenster je Seite
    const side = (a, b, n, wide) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
      const D = (l, h) => { const w = Math.min(2.3, l - 2.0), a1 = lan(h, l / 2, 5.0, 12.4, w, 1, n); return crs(l, h, 1.2, 4.4, 1.8) + `<path class="dt" d="${hline(l, h - 1.0)}${hline(l, h - 4.7)}"/>` + a1.fr + wins(a1.wn) + band(shadeK(K, nx, ny), l, h, EAVE - .45, .45); };
      return K.wall(a, b, Zh(0), Zh(EAVE), 'st', D);
    };
    s += side(A3, A4, 2) + side(A2, A3, 3) + side(A1, A2, 2);
    // Eckpfeiler mit Fialen
    [A1, A2, A3].forEach(([x, y]) => { s += K.box(x - .5, y - .5, Zh(0), 1.0, 1.0, EAVE - .4, 'st', {}, true) + pin(K, x, y, Zh(EAVE - .4), Zh(EAVE + 4.6), .8); });
    // Südosttürmchen im Winkel zwischen Chorjoch und Apsis
    const cx = 41.9, cy = 24.5, r = 1.25;
    s += polyWall(K, cx, cy, r, Zh(0), Zh(11.2), 10, 'st', i => (l, h) => crs(l, h, 1.2, 10.6, 1.5) + ((i === 1 || i === 2) ? (() => { const a = lan(h, l / 2, 4.0, 8.0, .6, 1, 1); return a.fr + wins(a.wn); })() : ''));
    s += cone(K, cx, cy, r + .22, Zh(11.2), Zh(16.0), 10, 'sl');
    return s;
  } });

  /* ---------- Nordostanbau (Sakristei/Gemeindeteil): niedriger Baukörper mit Walmdach, im Süden vom Chor verdeckt ---------- */
  add({ id: 'annex', fp: [36.3, .5, 46.1, YN], draw: K => {
    const E = (len, h) => { let d = crs(len, h, 1.0, 6.0, 1.6), g = ''; for (let u = 1.6; u < len - 1; u += 2.4) { g += `<rect class="wn" data-f="1" x="${f2(u)}" y="${f2(h - 4.8)}" width=".9" height="2.0"/>`; } return d + wins(g); };
    let s = K.box(36.3, .5, Zh(0), 9.8, YN - .5, 6.5, 'st', { E: E, S: (l, h) => crs(l, h, 1.0, 6.0, 1.6) }, false);
    s += hip(K, 36.0, .2, 46.4, YN, Zh(6.5), Zh(9.8), 'sl');
    return s;
  } });

  return { mods: M, lc: [23.77, 13.99], z0: 0, top: [4.85, 16, 42], label: 'Gartenkirche St. Marien', h: 42, len: 47.5 };
});
