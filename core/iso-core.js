/* iso-core.js — gemeinsamer Zeichenkern der Hannover-Karte.
   Projektion nach iso-figure (MIT, © Tolga Cohce): Bild-x = (x − y)·cos30°, Bild-y = (x + y)·sin30° − z.
   Welt: x = Ost, y = Süd (Karte um die Achse des Neuen Rathauses gedreht), z = Höhe, 1 Einheit ≈ 1 m. */
(() => {
  'use strict';
  const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
  const f2 = n => (+n).toFixed(2);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const setSeed = v => { seed = v; };

  /* Kernel für ein Modul: lokale Koordinaten → Welt (Drehung phi, Maßstab s, Verschiebung) → Bild.
     place = { cx, cy, phi, s, lcx, lcy, z0 }: lokaler Punkt (lcx, lcy, z0) landet auf Welt (cx, cy, 0). */
  function kernel(place = {}, mirror = false) {
    const { cx = 0, cy = 0, phi = 0, s = 1, lcx = 0, lcy = 0, z0 = 0, zw = 0 } = place;
    const co = Math.cos(phi), si = Math.sin(phi);
    const rotN = (x, y) => [x * co - y * si, x * si + y * co];
    const W = (x, y, z) => { const [a, b] = rotN(x - lcx, y - lcy); return [cx + s * a, cy + s * b, s * (z - z0)]; };
    // Spiegelung (Wasser): Höhe an der Wasserlinie zw (lokal) gespiegelt
    const P = (x, y, z) => { const [X, Y, ZZ] = W(x, y, mirror ? 2 * zw - z : z); return [(X - Y) * C, (X + Y) * S - ZZ]; };
    const D = (x, y, z) => { const [a, b] = rotN(x, y); return [(a - b) * C * s, ((a + b) * S - (mirror ? -z : z)) * s]; };
    const plane = (O, U, V) => { const o = P(...O), u = D(...U), v = D(...V); return `matrix(${f2(u[0])} ${f2(u[1])} ${f2(v[0])} ${f2(v[1])} ${f2(o[0])} ${f2(o[1])})`; };
    const TOP = (x, y, z) => plane([x, y, z], [1, 0, 0], [0, 1, 0]);
    const path = pts => 'M' + pts.map(p => P(...p).map(f2).join(' ')).join('L');
    const poly = (pts, cls) => `<path class="${cls}" d="${path(pts)}Z"/>`;
    const g = (t, inner) => `<g transform="${t}">${inner}</g>`;
    const facing = (nx, ny, nz = 0) => { const [a, b] = rotN(nx, ny); return a + b + nz; };
    const shadeOf = (nx, ny) => { const [a, b] = rotN(nx, ny); return b >= a ? 'fr' : 'sd'; };
    const depth = (x, y) => { const [X, Y] = W(x, y, 0); return X + Y; };
    function wall(L, R, z0_, z1, mat, deco) {
      const dx = R[0] - L[0], dy = R[1] - L[1], len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
      if (facing(nx, ny) <= 1e-6) return '';
      const t = plane([L[0], L[1], z1], [dx / len, dy / len, 0], [0, 0, -1]);
      const h = z1 - z0_;
      // Anstrahlung von unten: Oberkante abgedunkelt, Sockel leicht erwärmt (Opazität kommt aus dem CSS, nur bei Abendlicht)
      const sh = `<rect class="wsh" fill="#000" opacity="0" width="${f2(len)}" height="${f2(h * .5)}"/><rect class="wsh" fill="#000" opacity="0" width="${f2(len)}" height="${f2(h * .22)}"/><rect class="wsl" fill="#FFCF73" opacity="0" y="${f2(h * .78)}" width="${f2(len)}" height="${f2(h * .22)}"/>`;
      return `<g transform="${t}"><rect class="${mat} ${shadeOf(nx, ny)}" width="${f2(len)}" height="${f2(h)}"/>${sh}${deco ? deco(len, h) : ''}</g>`;
    }
    const wallVisible = (L, R) => { const dx = R[0] - L[0], dy = R[1] - L[1]; return facing(-dy, dx) > 1e-6; };
    function box(x, y, z, w, d, h, mat, deco = {}, top = true) {
      return wall([x + w, y], [x, y], z, z + h, mat, deco.N) + wall([x, y], [x, y + d], z, z + h, mat, deco.W)
        + wall([x, y + d], [x + w, y + d], z, z + h, mat, deco.S) + wall([x + w, y + d], [x + w, y], z, z + h, mat, deco.E)
        + (top ? `<rect class="${mat} tp" transform="${TOP(x, y, z + h)}" width="${f2(w)}" height="${f2(d)}"/>` : '');
    }
    function face(pts, mat, extra = '') {
      let nx = 0, ny = 0, nz = 0;
      for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); nz += (a[0] - b[0]) * (a[1] + b[1]); }
      if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; }
      if (facing(nx, ny, nz) <= 1e-6) return '';
      return `<path class="${mat} ${shadeOf(nx, ny)}" d="${path(pts)}Z"/>${extra}`;
    }
    // Blickrichtung im lokalen System (für die Sortierung)
    const view = [co + si, co - si]; // R(−phi)·(1,1)
    return { P, D, W, plane, TOP, path, poly, g, wall, wallVisible, box, face, facing, depth, view, mirror, s };
  }

  /* ---------- Hilfen in Wandkoordinaten (u nach rechts, v nach unten ab Oberkante) ---------- */
  // Fenster am Abend: manche dunkel, manche gedimmt, wenige strahlend (sonst verschmelzen dichte Fassaden zu einer hellen Fläche)
  const vari = () => { const r = rnd(); return r < .22 ? ' off' : r < .42 ? ' dim' : r < .56 ? ' hi' : ''; };
  const arch = (x, y, w, h) => `M${f2(x)} ${f2(y + h)}V${f2(y + w / 2)}A${f2(w / 2)} ${f2(w / 2)} 0 0 1 ${f2(x + w)} ${f2(y + w / 2)}V${f2(y + h)}Z`;
  const hl = (x0, x1, y) => `<path class="dt" d="M${f2(x0)} ${f2(y)}H${f2(x1)}"/>`;
  const vl = (x, y0, y1) => `<path class="dt" d="M${f2(x)} ${f2(y0)}V${f2(y1)}"/>`;
  const winR = (x, y, w, h, f) => `<rect class="wn${vari()}" data-f="${f}" x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/><path class="mul" d="M${f2(x + w / 2)} ${f2(y)}V${f2(y + h)}M${f2(x)} ${f2(y + h * .38)}H${f2(x + w)}"/>`;
  const winA = (x, y, w, h, f, cls = '') => `<path class="wn${cls || vari()}" data-f="${f}" d="${arch(x, y, w, h)}"/><path class="mul" d="M${f2(x + w / 2)} ${f2(y + w * .1)}V${f2(y + h)}M${f2(x)} ${f2(y + w / 2 + (h - w / 2) * .35)}H${f2(x + w)}"/><path class="dt" d="M${f2(x + w / 2 - .35)} ${f2(y - .45)}h.7l-.15 .7h-.4Z"/>`;
  const wins = s => `<g class="wins">${s}</g>`;
  const garch = (x, y, w, h) => { const r = w * .85; return `M${f2(x)} ${f2(y + h)}V${f2(y + w * .62)}A${f2(r)} ${f2(r)} 0 0 1 ${f2(x + w / 2)} ${f2(y)}A${f2(r)} ${f2(r)} 0 0 1 ${f2(x + w)} ${f2(y + w * .62)}V${f2(y + h)}Z`; };
  const winG = (x, y, w, h, f, cls = '') => `<path class="wn${cls || vari()}" data-f="${f}" d="${garch(x, y, w, h)}"/><path class="mul" d="M${f2(x + w / 2)} ${f2(y + w * .45)}V${f2(y + h)}${h > 6 ? `M${f2(x)} ${f2(y + h * .5)}H${f2(x + w)}M${f2(x)} ${f2(y + h * .75)}H${f2(x + w)}` : ''}"/>`;
  const niche = (x, y, w, h) => `<path class="dt" d="${garch(x, y, w, h)}"/>`;
  const louvre = (x, y, w, h) => { let s = `<path class="lv" d="${garch(x, y, w, h)}"/>`; for (let v = y + w * .8; v < y + h - .3; v += .9) s += `<path class="dt" d="M${f2(x + .15)} ${f2(v)}H${f2(x + w - .15)}"/>`; return s; };
  const frieze = (len, y) => { let d = `M0 ${f2(y)}H${f2(len)}M0 ${f2(y + .8)}H${f2(len)}M0 ${f2(y + .4)}`; let i = 0; for (let u = .4; u < len; u += .4) d += `L${f2(u)} ${f2(y + (i++ % 2 ? .65 : .15))}`; return `<path class="gz" d="${d}"/>`; };
  const groupM = (mat, inner) => `<g class="on-${mat}">${inner}</g>`;

  // Volutengiebel (Renaissance)
  function gableD(w, h) {
    const segs = [['L', [0, -.30]], ['C', [0, -.38], [.13, -.34], [.13, -.44]], ['L', [.13, -.58]], ['C', [.13, -.66], [.27, -.62], [.27, -.72]],
      ['L', [.27, -.82]], ['C', [.27, -.88], [.4, -.86], [.4, -.92]], ['L', [.5, -1]]];
    const pt = ([a, b]) => `${f2(a * w)} ${f2(b * h)}`, mir = ([a, b]) => [1 - a, b];
    let d = 'M0 0';
    segs.forEach(s => { d += s[0] === 'L' ? `L${pt(s[1])}` : `C${pt(s[1])} ${pt(s[2])} ${pt(s[3])}`; });
    const pts = [[0, 0], ...segs.map(s => s[s.length - 1])];
    for (let i = segs.length - 1; i >= 0; i--) { const s = segs[i], from = pts[i]; d += s[0] === 'L' ? `L${pt(mir(from))}` : `C${pt(mir(s[2]))} ${pt(mir(s[1]))} ${pt(mir(from))}`; }
    return d + 'Z';
  }
  function gable(w, h, inner = '', shade = 'fr') {
    const fin = (a, b) => `${vl(a * w, b * h, b * h - 2)}<circle class="st ${shade}" cx="${f2(a * w)}" cy="${f2(b * h - 2.4)}" r=".5"/>`;
    return `<path class="st ${shade}" d="${gableD(w, h)}"/>${hl(.04 * w, .96 * w, -.30 * h)}${hl(.13 * w, .87 * w, -.58 * h)}${hl(.27 * w, .73 * w, -.82 * h)}`
      + `${vl(.27 * w, -.30 * h, -.58 * h)}${vl(.73 * w, -.30 * h, -.58 * h)}`
      + fin(.13, -.44) + fin(.87, -.44) + fin(.27, -.72) + fin(.73, -.72) + fin(.5, -1) + inner;
  }
  // Treppengiebel (Backsteingotik)
  function sgable(w, h, n, mat, sh, winRows = 0, fBase = 3) {
    const pw = w / (2 * n + 1), top = i => -h * (Math.min(i, 2 * n - i) + 1) / (n + 1);
    let d = 'M0 0';
    for (let i = 0; i <= 2 * n; i++) d += `V${f2(top(i))}H${f2((i + 1) * pw)}`;
    let s = `<path class="${mat} ${sh}" d="${d}V0Z"/>`, w2 = '';
    for (let i = 0; i <= 2 * n; i++) {
      const x0 = i * pw, t = top(i), cx = x0 + pw / 2;
      if (i > 0) s += vl(x0, Math.max(t, top(i - 1)), 0);
      s += `<path class="${mat} ${sh}" d="M${f2(cx - pw * .14)} ${f2(t + .01)}V${f2(t - pw * .5)}L${f2(cx)} ${f2(t - pw * 1.3)}L${f2(cx + pw * .14)} ${f2(t - pw * .5)}V${f2(t + .01)}Z"/>`;
      s += `<path class="dt" d="M${f2(cx)} ${f2(t - pw * 1.3)}v${f2(-pw * .35)}"/>`;
      const rows = Math.floor((-t - 1) / 2.6);
      for (let r = 0; r < rows; r++) {
        const v = -1.1 - (r + 1) * 2.6 + .5, ww = Math.min(1.1, pw * .5);
        if (r < winRows) w2 += winG(cx - ww / 2, v, ww, 2.1, Math.min(4, fBase + Math.floor(r / 2)));
        else s += niche(cx - ww / 2, v, ww, 2.1);
      }
    }
    return s + hl(0, w, -.6) + wins(w2);
  }
  const clockSVG = (cx, cy, r) => `<g class="clk"><circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .6)}"/><circle class="clockface" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r)}"/>`
    + `<line class="hand" data-h="h" data-cx="${f2(cx)}" data-cy="${f2(cy)}" data-l="${f2(r * .5)}" x1="${f2(cx)}" y1="${f2(cy)}" x2="${f2(cx)}" y2="${f2(cy - r * .5)}"/>`
    + `<line class="hand" data-h="m" data-cx="${f2(cx)}" data-cy="${f2(cy)}" data-l="${f2(r * .8)}" x1="${f2(cx)}" y1="${f2(cy)}" x2="${f2(cx)}" y2="${f2(cy - r * .8)}"/></g>`;
  const star = (cx, cy, r, n) => {
    const pts = k => Array.from({ length: k }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / k; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    let d;
    if (n === 5) { const p = pts(5); d = 'M' + [0, 2, 4, 1, 3].map(i => p[i].map(f2).join(' ')).join('L') + 'Z'; }
    else { const p = pts(6); d = `M${p[0].map(f2).join(' ')}L${p[2].map(f2).join(' ')}L${p[4].map(f2).join(' ')}ZM${p[1].map(f2).join(' ')}L${p[3].map(f2).join(' ')}L${p[5].map(f2).join(' ')}Z`; }
    return `<circle class="dt" cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(r + .5)}"/><path class="dt" d="${d}"/>`;
  };

  // runde Körper aus projizierten Ringen
  function hull(pts) {
    pts = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const p of pts) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of pts.slice().reverse()) { while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  function lathe(K, cx, cy, prof, cls, ribs = 0, rings = []) {
    const pts = [];
    prof.forEach(([z, r]) => { for (let i = 0; i < 36; i++) { const t = i / 36 * 2 * Math.PI; pts.push(K.P(cx + r * Math.cos(t), cy + r * Math.sin(t), z)); } });
    let s = `<path class="${cls}" d="M${hull(pts).map(p => p.map(f2).join(' ')).join('L')}Z"/>`;
    const dc = cls.startsWith('cu') ? 'dt cu-d' : cls.startsWith('sl') ? 'dt sl-d' : 'dt';
    const vis = a => K.facing(Math.cos(a), Math.sin(a)) > 0;
    for (let i = 0; i < ribs * 2; i++) {
      const a = Math.PI * 2 * (i + .5) / (ribs * 2);
      if (!vis(a)) continue;
      s += `<path class="${dc}" d="${K.path(prof.map(([z, r]) => [cx + r * Math.cos(a), cy + r * Math.sin(a), z]))}"/>`;
    }
    rings.forEach(i => { const [z, r] = prof[i]; const pts2 = []; for (let j = 0; j <= 48; j++) { const a = Math.PI * 2 * j / 48; if (vis(a)) pts2.push([cx + r * Math.cos(a), cy + r * Math.sin(a), z]); }
      if (pts2.length > 1) s += `<path class="${dc}" d="${K.path(pts2)}"/>`; });
    return s;
  }
  const dcOf = mat => mat === 'tl' ? 'dt tl-d' : mat === 'sl' ? 'dt sl-d' : 'dt cu-d';
  function hip(K, x0, y0, x1, y1, ze, zr, mat = 'tl') {
    const w = x1 - x0, d = y1 - y0, alongX = w >= d, h = Math.min(w, d) / 2;
    let a, b;
    if (alongX) { const ym = (y0 + y1) / 2; a = [x0 + h, ym, zr]; b = [x1 - h, ym, zr]; }
    else { const xm = (x0 + x1) / 2; a = [xm, y0 + h, zr]; b = [xm, y1 - h, zr]; }
    const c00 = [x0, y0, ze], c10 = [x1, y0, ze], c11 = [x1, y1, ze], c01 = [x0, y1, ze];
    const planes = alongX ? [[c00, c10, b, a], [c10, c11, b], [c11, c01, a, b], [c01, c00, a]] : [[c00, c10, a], [c10, c11, b, a], [c11, c01, b], [c01, c00, a, b]];
    const dc = dcOf(mat);
    let s = '';
    planes.forEach(p => {
      let seams = '';
      if (p.length === 4) { const n = Math.max(2, Math.round(Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]) / 2.6));
        for (let i = 1; i < n; i++) { const t = i / n, L = (u, v) => u.map((q, j) => q + (v[j] - q) * t); seams += `<path class="${dc}" d="${K.path([L(p[0], p[1]), L(p[3], p[2])])}"/>`; } }
      s += K.face(p, mat, seams);
    });
    return s;
  }
  function saddle(K, L, R, back, ze, zr, mat = 'tl') {
    const m = [(L[0] + R[0]) / 2, (L[1] + R[1]) / 2];
    const Lb = [L[0] + back[0], L[1] + back[1]], Rb = [R[0] + back[0], R[1] + back[1]], mb = [m[0] + back[0], m[1] + back[1]];
    return K.face([[...L, ze], [...Lb, ze], [...mb, zr], [...m, zr]], mat) + K.face([[...m, zr], [...mb, zr], [...Rb, ze], [...R, ze]], mat);
  }
  function roofPlane(K, p, mat = 'tl', step = 2.4) {
    const dc = dcOf(mat);
    let seams = '';
    const n = Math.max(2, Math.round(Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]) / step));
    for (let i = 1; i < n; i++) { const t = i / n, L = (u, v) => u.map((q, j) => q + (v[j] - q) * t); seams += `<path class="${dc}" d="${K.path([L(p[0], p[1]), L(p[3], p[2])])}"/>`; }
    return K.face(p, mat, seams);
  }

  /* ---------- Sortierung der Baugruppen eines Moduls ----------
     fp = [x0,y0,x1,y1] lokal; parent+side = Anbau; above = steht auf. Gilt für Drehungen |phi| < 45° je Achse (Vorzeichen der Blickrichtung). */
  const N_ = { S: [0, 1], N: [0, -1], E: [1, 0], W: [-1, 0] };
  function order(mods, K) {
    const [vx, vy] = K.view;
    const list = mods.filter(m => !m.ground).map(m => ({ m, r: m.fp, c: K.depth((m.fp[0] + m.fp[2]) / 2, (m.fp[1] + m.fp[3]) / 2) }));
    const byId = Object.fromEntries(list.map(o => [o.m.id, o]));
    const edges = new Map(list.map(o => [o, new Set()])), indeg = new Map(list.map(o => [o, 0]));
    const edge = (a, b) => { if (!a || !b || a === b || edges.get(a).has(b)) return; edges.get(a).add(b); indeg.set(b, indeg.get(b) + 1); };
    list.forEach(o => {
      const m = o.m;
      if (m.parent) { const p = byId[m.parent]; const n = N_[m.side]; K.facing(n[0], n[1]) > 0 ? edge(p, o) : edge(o, p); }
      if (m.above) edge(byId[m.above], o);
    });
    const E = .01;
    // A liegt hinter B, wenn entlang einer Achse getrennt und die Blickrichtung auf dieser Achse von A nach B zeigt
    const behind = (A, B) => (vx > 0 && A.r[2] <= B.r[0] + E) || (vx < 0 && B.r[2] <= A.r[0] + E) || (vy > 0 && A.r[3] <= B.r[1] + E) || (vy < 0 && B.r[3] <= A.r[1] + E);
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const A = list[i], B = list[j];
      if (A.m.parent === B.m.id || B.m.parent === A.m.id || A.m.above === B.m.id || B.m.above === A.m.id) continue;
      const ab = behind(A, B), ba = behind(B, A);
      if (ab && !ba) edge(A, B); else if (ba && !ab) edge(B, A);
    }
    const out = [], ready = list.filter(o => indeg.get(o) === 0);
    while (ready.length) {
      ready.sort((a, b) => a.c - b.c);
      const o = ready.shift(); out.push(o.m);
      edges.get(o).forEach(n => { indeg.set(n, indeg.get(n) - 1); if (indeg.get(n) === 0) ready.push(n); });
    }
    if (out.length < list.length) list.filter(o => !out.includes(o.m)).sort((a, b) => a.c - b.c).forEach(o => out.push(o.m));
    return out;
  }

  /* ---------- Wahrzeichen-Register ----------
     ISO.landmark(name, factory): factory(H) → { mods, lc: [lcx, lcy], z0, s?, ground?(K), label, fact } */
  const LM = {};
  const H = { C, S, f2, rnd, setSeed, vari, arch, hl, vl, winR, winA, wins, garch, winG, niche, louvre, frieze, groupM, gableD, gable, sgable, clockSVG, star, hull, lathe, hip, saddle, roofPlane };
  function landmark(name, factory) { LM[name] = factory; }
  function drawLandmark(name, place) {
    const def = LM[name](H);
    const K = kernel({ ...place, lcx: def.lc[0], lcy: def.lc[1], z0: def.z0 || 0, s: (place.s || 1) * (def.s || 1) });
    setSeed(7);
    let out = def.ground ? def.ground(K) : '';
    out += order(def.mods.filter(m => !m.obj), K).map(m => `<g class="part" data-o="${m.o || 0}">${m.draw(K)}</g>`).join('');
    return { svg: out, def, K };
  }

  /* ---------- Licht: Uhren, Vorbereitung, Ablauf ---------- */
  function clock(root) {
    const d = new Date(), m = d.getMinutes(), h = d.getHours() % 12 + m / 60;
    root.querySelectorAll('.hand').forEach(el => { const a = (el.dataset.h === 'h' ? h / 12 : m / 60) * 2 * Math.PI, L = +el.dataset.l, cx = +el.dataset.cx, cy = +el.dataset.cy;
      el.setAttribute('x2', f2(cx + L * Math.sin(a))); el.setAttribute('y2', f2(cy - L * Math.cos(a))); });
  }

  window.ISO = { C, S, f2, kernel, H, order, landmark, drawLandmark, clock, LM, setSeed, rnd };
})();
