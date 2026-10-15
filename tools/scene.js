/* tools/scene.js — baut die ganze Karte als SVG (Abend, alles an). Nur zum Vorrendern der Kacheln (tools/render-tiles.mjs), nicht für die Website. */
(() => {
  'use strict';
  const { C, S, f2 } = ISO, D = window.MITTE;
  const FACTS = {
    neuesRathaus: 'Erbaut 1901–1913 am Maschteich, Kuppel 97,73 m, Bogenaufzug bis zur Aussicht.',
    marktkirche: 'Backsteingotik aus dem 14. Jahrhundert, Turm 97 m – Wahrzeichen der Altstadt.',
    altesRathaus: 'Ältestes Profangebäude der Stadt (ab 1410), Treppengiebel mit glasierten Friesen.',
    leineschloss: 'Ehemaliges Residenzschloss an der Leine, seit 1962 Sitz des Niedersächsischen Landtags.',
  };
  const LM_OFF = { leineschloss: 0, altesRathaus: .35, marktkirche: .7, neuesRathaus: 1.0 };

  /* ---------- Rahmen ---------- */
  const [X0, X1, Y0, Y1] = D.ext;
  const pr = (x, y, z = 0) => [(x - y) * C, (x + y) * S - z];
  let bx0 = 1e9, bx1 = -1e9, by0 = 1e9, by1 = -1e9;
  [[X0, Y0], [X1, Y0], [X0, Y1], [X1, Y1]].forEach(([x, y]) => { const [a, b] = pr(x, y); bx0 = Math.min(bx0, a); bx1 = Math.max(bx1, a); by0 = Math.min(by0, b); by1 = Math.max(by1, b); });
  by0 -= 120;
  const VW = bx1 - bx0, VH = by1 - by0;
  const toV = ([a, b]) => [a - bx0, b - by0];             // Bild → Pixel in der Welt-Ebene
  const pth = (flat, z = 0, close = true) => { let d = ''; for (let i = 0; i < flat.length; i += 2) { const [a, b] = pr(flat[i], flat[i + 1], z); d += (i ? 'L' : 'M') + f2(a) + ' ' + f2(b); } return d + (close ? 'Z' : ''); };

  /* ---------- Fenstermuster für die Grundbebauung (4 Varianten, beleuchtete Fenster) ---------- */
  function patterns() {
    let s = ''; ISO.setSeed(21);
    for (let v = 0; v < 4; v++) {
      s += `<pattern id="wp${v}" patternUnits="userSpaceOnUse" width="16" height="9.9">`;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
        const q = ISO.rnd(); if (q < .38) continue;
        s += `<rect x="${f2(c * 3.2 + .95)}" y="${f2(r * 3.3 + .8)}" width="1.3" height="1.75" fill="${q > .9 ? '#FFF2C8' : q > .62 ? '#FFE7A3' : '#E3BF78'}" opacity="${q > .5 ? .95 : .7}"/>`;
      }
      s += '</pattern>';
    }
    return s;
  }

  /* ---------- Gebäude aus OSM als Prismen ---------- */
  const CENTER = [-40, 160];
  function building(i) {
    const [p, h, m, rf] = D.b[i], n = p.length / 2;
    const he = rf ? rf[1] : h;                       // Traufhöhe (bei Dach) bzw. Gesamthöhe
    let area = 0; for (let k = 0; k < n; k++) { const j = (k + 1) % n; area += p[2 * k] * p[2 * j + 1] - p[2 * j] * p[2 * k + 1]; }
    let s = '', cx = 0, cy = 0;
    for (let k = 0; k < n; k++) {
      const j = (k + 1) % n;
      // Außennormale: bei positiver Fläche (y nach Süden) zeigt (dy, −dx) nach außen → Wand von R nach L zeichnen
      const [Lx, Ly, Rx, Ry] = area > 0 ? [p[2 * j], p[2 * j + 1], p[2 * k], p[2 * k + 1]] : [p[2 * k], p[2 * k + 1], p[2 * j], p[2 * j + 1]];
      cx += p[2 * k]; cy += p[2 * k + 1];
      const dx = Rx - Lx, dy = Ry - Ly, len = Math.hypot(dx, dy); if (len < .3) continue;
      const nx = -dy / len, ny = dx / len; if (nx + ny <= 1e-6) continue;
      const ux = dx / len, uy = dy / len, o = pr(Lx, Ly, he);
      const t = `matrix(${f2((ux - uy) * C)} ${f2((ux + uy) * S)} 0 1 ${f2(o[0])} ${f2(o[1])})`;
      s += `<rect class="gw ${ny >= nx ? 'fr' : 'sd'}" transform="${t}" width="${f2(len)}" height="${f2(he)}"/>`;
      if (he >= 5 && len >= 3) s += `<rect class="gwin" transform="${t}" width="${f2(len)}" height="${f2(he - 2.4)}" fill="url(#wp${i % 4})"/>`;
    }
    cx /= n; cy /= n;
    const dist = Math.hypot(cx - CENTER[0], cy - CENTER[1]);
    return `<g class="hb${m === 'b' ? ' b' : ''}" data-w="${f2(dist)}">${s}${rf ? roof(rf) : `<path class="gt" d="${pth(p, h)}"/>`}</g>`;
  }
  // Sattel- (1) und Walmdach (2) über dem kleinsten umschließenden Rechteck; First entlang der Längsseite
  function roof([kind, he, rh, cx, cy, th, w, d]) {
    const co = Math.cos(th), si = Math.sin(th), Pt = (u, v, z) => [cx + u * co - v * si, cy + u * si + v * co, z];
    const a = w / 2, b = d / 2, top = he + rh, r = kind === 2 ? Math.max(0, a - b) : a;
    const c = [Pt(-a, -b, he), Pt(a, -b, he), Pt(a, b, he), Pt(-a, b, he)], r0 = Pt(-r, 0, top), r1 = Pt(r, 0, top);
    const faces = kind === 2
      ? [[c[0], c[1], r1, r0, 'gr'], [c[1], c[2], r1, 'gr'], [c[2], c[3], r0, r1, 'gr'], [c[3], c[0], r0, 'gr']]
      : [[c[0], c[1], r1, r0, 'gr'], [c[2], c[3], r0, r1, 'gr'], [c[1], c[2], r1, 'gw'], [c[3], c[0], r0, 'gw']];
    let out = '';
    faces.map(f => { const cls = f.pop(); let nx = 0, ny = 0, nz = 0;
      for (let k = 0; k < f.length; k++) { const A = f[k], B = f[(k + 1) % f.length]; nx += (A[1] - B[1]) * (A[2] + B[2]); ny += (A[2] - B[2]) * (A[0] + B[0]); nz += (A[0] - B[0]) * (A[1] + B[1]); }
      if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; }
      return { f, cls, vis: nx + ny + nz > 1e-6, sh: ny >= nx ? 'fr' : 'sd', dep: f.reduce((q, P) => q + P[0] + P[1], 0) / f.length }; })
      .filter(o => o.vis && !(o.f.length === 3 && Math.abs(r) < 1e-6 && kind === 1)).sort((x, y) => x.dep - y.dep)
      .forEach(o => { out += `<path class="${o.cls} ${o.sh}" d="M${o.f.map(P => pr(...P).map(f2).join(' ')).join('L')}Z"/>`; });
    return out;
  }
  const tree = i => { const x = D.tr[2 * i], y = D.tr[2 * i + 1], a = pr(x, y, 0), b = pr(x, y, 4.5), c = pr(x, y, 7.6);
    return `<path class="tk" d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}"/><circle class="tc" cx="${f2(c[0])}" cy="${f2(c[1])}" r="3.6"/>`; };

  /* ---------- Wahrzeichen an ihren Platz ---------- */
  const LMS = {};
  function landmark(name) {
    const L = D.lm[name], def = ISO.LM[name](ISO.H);
    const fit = Math.min(1.4, Math.max(.85, Math.max(L.w, L.d) / def.len));
    const r = ISO.drawLandmark(name, { cx: L.cx, cy: L.cy, phi: L.phi, s: fit });
    LMS[name] = { K: r.K, def: r.def };
    return `<g class="lm" data-b="${name}" data-o="${LM_OFF[name] || 0}">${r.svg}</g>`;
  }

  /* ---------- Szene ---------- */
  function render() {
    let s = `<defs>
      <filter id="wglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
      <linearGradient id="hallglow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7A3" stop-opacity="0"/><stop offset=".5" stop-color="#FFE7A3" stop-opacity=".35"/><stop offset="1" stop-color="#FFE7A3" stop-opacity="0"/></linearGradient>
      ${patterns()}
    </defs><g transform="translate(${f2(-bx0)} ${f2(-by0)})">`;
    s += `<path class="gnd" d="${pth([X0, Y0, X1, Y0, X1, Y1, X0, Y1])}"/>`;
    s += D.pk.map(r => `<path class="park" d="${pth(r)}"/>`).join('');
    s += D.wa.map(r => `<path class="water" d="${pth(r)}"/>`).join('');
    s += (D.rd.area || []).map(r => `<path class="area" d="${pth(r)}"/>`).join('');
    ['f', 'd', 'p', 'c', 'b', 'a'].forEach(k => { if (D.rd[k]) s += `<path class="rd r-${k}" d="${D.rd[k].map(l => pth(l, 0, false)).join('')}"/>`; });
    // Straßenlaternen: Lichtpunkte entlang der Straßen
    ['c', 'b', 'a', 'p'].forEach((k, i) => { if (D.rd[k]) { const d = D.rd[k].map(l => pth(l, 0, false)).join('');
      s += `<path class="rlh" data-d="${f2(i * .25)}" d="${d}"/><path class="rl" data-d="${f2(i * .25)}" d="${d}"/>`; } });
    s += D.seq.map(v => typeof v === 'string' ? landmark(v.slice(2)) : v >= 0 ? building(v) : tree(-1 - v)).join('');
    s += '</g>';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${f2(VW)} ${f2(VH)}`);
    svg.setAttribute('width', f2(VW)); svg.setAttribute('height', f2(VH));
    svg.setAttribute('class', 'rh'); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Isometrische Karte von Hannover Mitte mit Neuem Rathaus, Marktkirche, Altem Rathaus und Leineschloss');
    svg.innerHTML = s;
    return svg;
  }

  /* ---------- Rendermodus: ganze Szene, Ansicht von außen steuerbar ---------- */
  const stage = document.getElementById('stage');
  const svg = render();
  svg.setAttribute('class', 'rh lamps win lit crown instant');
  stage.appendChild(svg);
  ISO.clock(svg);
  const labels = Object.entries(LMS).map(([name, { K, def }]) => { const [x, y] = toV(K.P(...def.top)); return { name, label: def.label, x: +f2(x), y: +f2(y) }; });
  window.SCENE = {
    VW, VH, labels,
    view(x, y, s) { svg.style.transform = `translate(${-x * s}px, ${-y * s}px) scale(${s})`; },
    ready: true,
  };
})();
