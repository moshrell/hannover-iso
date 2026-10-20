/* karte.js — Hannover Mitte als Kachelkarte (wie echte Online-Karten).
   Die Zeichnung wird vorab im Rechner gerendert (tools/render-tiles.mjs) – der Browser zeigt nur fertige Bilder:
   sofort sichtbar (Poster), flüssig auf dem Telefon, kaum Speicher. Wahrzeichen öffnen sich per Tipp als Detailansicht. */
(() => {
  'use strict';
  const BASE = 'tiles/';
  // Punkte auf der Karte (ohne Schrift, damit nichts verdeckt): Altstadt = ein Punkt für alle drei Bauten
  // Pins aus landmarks/meta/*.json (window.LMETA, von tools/build-landmarks.py erzeugt); Altstadt = Sammelpunkt für drei Bauten
  const FACTS = {};
  Object.entries(window.LMETA || {}).forEach(([n, m]) => { if (m.pin === false) return; FACTS[n] = { t: m.title, f: m.fact, d: m.detail, from: [n], minor: !!m.minor }; });
  FACTS.altstadt = { t: 'Altstadt', f: 'Marktkirche (Backsteingotik, 14. Jh., Turm 97 m), Altes Rathaus mit Treppengiebeln und das Leineschloss – heute Sitz des Niedersächsischen Landtags.', d: 'altstadt.html', from: ['marktkirche', 'altesRathaus', 'leineschloss'] };
  const map = document.getElementById('map'), world = document.getElementById('world'), poster = document.getElementById('poster');
  const labelsEl = document.getElementById('labels');
  const v = { x: 0, y: 0, z: 1 };
  let M = null, zMin = .2, zMax = 4.5, raf = 0;
  const cv = document.createElement('canvas'), ctx = cv.getContext('2d', { alpha: false });
  let DPR = 1, cw = 0, ch = 0;
  const cache = new Map(); let fno = 0, fading = false;   // Kacheln: geladene Bilder (Stufe 0 bleibt immer im Speicher)

  /* ---------- Kacheln ---------- */
  function setup(meta) {
    M = meta; M.box = M.box || [0, 0, M.VW, M.VH];
    M.have = M.levels.map((_, i) => new Set(M.tiles[i] || []));
    world.appendChild(cv); fit();
    poster.addEventListener('load', apply); if (poster.complete) apply();
    // Punkte aus den gerenderten Positionen der Bauten (Mittelwert bei Gruppen)
    M.pins = Object.entries(FACTS).map(([name, F]) => {
      const ls = F.from.map(n => M.labels.find(l => l.name === n)).filter(Boolean);
      const p = { name, x: ls.reduce((s, l) => s + l.x, 0) / ls.length, y: ls.reduce((s, l) => s + l.y, 0) / ls.length };
      const b = document.createElement('button'); b.className = 'pin' + (F.minor ? ' minor' : ''); b.dataset.n = F.t; b.setAttribute('aria-label', F.t + ' – Detailansicht öffnen');
      b.addEventListener('click', () => openDetail(name)); labelsEl.appendChild(b); p.el = b; return p;
    });
  }
  const levelFor = z => { const dpr = Math.min(2, window.devicePixelRatio || 1); for (let i = 0; i < M.levels.length; i++) if (M.levels[i].s * 2 >= z * dpr * .9) return i; return M.levels.length - 1; };
  /* Zeichnen auf EINE Leinwand statt riesiger Ebenen: nie schwarz (Poster + grobe Stufen liegen immer darunter), kein Bild-Ziehen am PC */
  function fit() {
    const W = map.clientWidth, H = map.clientHeight; DPR = Math.min(2, window.devicePixelRatio || 1);
    if (W * H * DPR * DPR > 4.5e6) DPR = Math.max(1, Math.sqrt(4.5e6 / (W * H)));
    cw = W; ch = H; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
  }
  function want(i, key) {
    const id = i + '/' + key; let e = cache.get(id);
    if (e) { e.u = fno; return e; }
    const im = new Image(); im.alt = ''; e = { im, ok: false, t0: 0, u: fno }; cache.set(id, e);
    im.src = `${BASE}${i}/${key}.webp?v=${M.v}`;
    (im.decode ? im.decode() : new Promise((res, rej) => { im.onload = res; im.onerror = rej; }))
      .then(() => { e.ok = true; e.t0 = performance.now(); apply(); })
      .catch(() => { cache.delete(id); });
    return e;
  }
  function tiles() {
    fno++;
    const L = levelFor(v.z), T = M.tile, now = performance.now();
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#0A0E0C'; ctx.fillRect(0, 0, cv.width, cv.height);
    if (poster.complete && poster.naturalWidth) ctx.drawImage(poster, Math.round(v.x * DPR), Math.round(v.y * DPR), Math.ceil(M.VW * v.z * DPR), Math.ceil(M.VH * v.z * DPR));
    fading = false;
    for (let i = 0; i <= L; i++) {
      if (i < L - 2) continue;                           // gezeichnet: aktuelle Stufe + zwei gröbere darunter (Rückfall, nie schwarz; außerhalb der Innenstadt gibt es nur grobe)
      const k = v.z / M.levels[i].s, ts = T * k, mg = i === L ? 1 : 0;
      const x0 = Math.max(0, Math.floor(-v.x / ts)), y0 = Math.max(0, Math.floor(-v.y / ts));
      const x1 = Math.ceil((cw - v.x) / ts), y1 = Math.ceil((ch - v.y) / ts);
      for (let ty = y0 - mg; ty <= y1 + mg; ty++) for (let tx = x0 - mg; tx <= x1 + mg; tx++) {
        const key = tx + '_' + ty;
        if (tx < 0 || ty < 0 || !M.have[i].has(key)) continue;
        const e = want(i, key), inView = tx >= x0 && tx <= x1 && ty >= y0 && ty <= y1;
        if (!e.ok || !inView) continue;
        const a = Math.min(1, (now - e.t0) / 220); if (a < 1) fading = true;
        const dx = Math.floor((v.x + tx * ts) * DPR), dy = Math.floor((v.y + ty * ts) * DPR);
        ctx.globalAlpha = a; ctx.drawImage(e.im, dx, dy, Math.ceil((v.x + (tx + 1) * ts) * DPR) - dx, Math.ceil((v.y + (ty + 1) * ts) * DPR) - dy);
      }
    }
    ctx.globalAlpha = 1;
    if (cache.size > 260) { const old = [...cache.entries()].filter(([id, e]) => !id.startsWith('0/') && e.u < fno - 30).sort((a, b) => a[1].u - b[1].u);
      for (let n = 0; n < old.length && cache.size > 200; n++) cache.delete(old[n][0]); }
    map.classList.toggle('far', v.z < .8);
    M.pins.forEach(p => { p.el.style.transform = `translate3d(${(v.x + p.x * v.z).toFixed(1)}px, ${(v.y + p.y * v.z).toFixed(1)}px, 0) translate(-50%, -50%)`; });
    if (fading) apply();
  }
  const apply = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tiles(); }); };

  /* ---------- Verschieben, Zoomen ---------- */
  const clamp = () => {
    const W = map.clientWidth, H = map.clientHeight;
    v.z = Math.min(zMax, Math.max(zMin, v.z));
    const [bx0, by0, bx1, by1] = M.box;   // nur das Datengebiet ist begehbar
    v.x = Math.min(W * .6 - bx0 * v.z, Math.max(W * .4 - bx1 * v.z, v.x));
    v.y = Math.min(H * .6 - by0 * v.z, Math.max(H * .4 - by1 * v.z, v.y));
  };
  const zoomAt = (f, px, py) => { const z0 = v.z; v.z = Math.min(zMax, Math.max(zMin, v.z * f)); const k = v.z / z0; v.x = px - (px - v.x) * k; v.y = py - (py - v.y) * k; clamp(); apply(); };
  const focus = (wx, wy, z) => { v.z = z; v.x = map.clientWidth / 2 - wx * z; v.y = map.clientHeight / 2 - wy * z; clamp(); apply(); };
  function fly(wx, wy, z) {
    const a = { ...v }, t0 = performance.now(), b = { z, x: map.clientWidth / 2 - wx * z, y: map.clientHeight / 2 - wy * z };
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = now => { const t = Math.min(1, (now - t0) / 700), e = ease(t);
      v.x = a.x + (b.x - a.x) * e; v.y = a.y + (b.y - a.y) * e; v.z = a.z + (b.z - a.z) * e; tiles();
      if (t < 1) requestAnimationFrame(step); else { clamp(); apply(); } };
    requestAnimationFrame(step);
  }
  // Außerhalb der Innenstadt gibt es nur grobe Stufen: nach dem Bewegen sanft auf deren Schärfe zurückzoomen
  let settleT = 0;
  const settle = () => { clearTimeout(settleT); settleT = setTimeout(() => {
    if (!M.core || pts.size) return;
    const cx = (map.clientWidth / 2 - v.x) / v.z, cy = (map.clientHeight / 2 - v.y) / v.z, [a, b, c, d] = M.core;
    if (cx >= a && cx <= c && cy >= b && cy <= d) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1), zo = M.levels[M.outerMax].s * 2 / (dpr * .9) * .98;
    if (v.z > zo) fly(cx, cy, zo);
  }, 350); };
  const pts = new Map(); let last = null, moved = 0;
  map.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; map.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); map.classList.add('drag'); last = null; moved = 0; });
  map.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    const r = map.getBoundingClientRect(), P = [...pts.values()];
    const cur = P.length > 1 ? { x: (P[0][0] + P[1][0]) / 2 - r.left, y: (P[0][1] + P[1][1]) / 2 - r.top, d: Math.hypot(P[0][0] - P[1][0], P[0][1] - P[1][1]), n: 2 }
                             : { x: P[0][0] - r.left, y: P[0][1] - r.top, d: 0, n: 1 };
    if (last && last.n === cur.n) {
      v.x += cur.x - last.x; v.y += cur.y - last.y; moved += Math.abs(cur.x - last.x) + Math.abs(cur.y - last.y);
      if (cur.n === 2 && last.d > 0) zoomAt(cur.d / last.d, cur.x, cur.y); else { clamp(); apply(); }
    }
    last = cur;
  });
  const up = e => { pts.delete(e.pointerId); last = null; if (!pts.size) { map.classList.remove('drag'); settle(); } };
  map.addEventListener('pointerup', up); map.addEventListener('pointercancel', up);
  map.addEventListener('dragstart', e => e.preventDefault());
  map.addEventListener('wheel', e => { e.preventDefault(); const r = map.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0016), e.clientX - r.left, e.clientY - r.top); settle(); }, { passive: false });
  map.addEventListener('dblclick', e => { if (e.target.closest('button')) return; const r = map.getBoundingClientRect(); zoomAt(1.8, e.clientX - r.left, e.clientY - r.top); });
  document.getElementById('zin').addEventListener('click', () => { zoomAt(1.5, map.clientWidth / 2, map.clientHeight / 2); settle(); });
  document.getElementById('zout').addEventListener('click', () => zoomAt(1 / 1.5, map.clientWidth / 2, map.clientHeight / 2));
  document.getElementById('zall').addEventListener('click', () => fly((M.box[0] + M.box[2]) / 2, (M.box[1] + M.box[3]) / 2, zMin));
  window.addEventListener('resize', () => { if (M) { fit(); zMin = Math.min(map.clientWidth / (M.box[2] - M.box[0]), map.clientHeight / (M.box[3] - M.box[1])) * .95; clamp(); apply(); } });

  /* ---------- Detailansicht eines Wahrzeichens (eigene Seite im Rahmen, mit Abendlicht) ---------- */
  const dlg = document.getElementById('detail'), frame = document.getElementById('detail-frame'), dTitle = document.getElementById('detail-title'), dFact = document.getElementById('detail-fact');
  function openDetail(name) {
    const F = FACTS[name]; if (!F) return;
    dTitle.textContent = F.t; dFact.textContent = F.f;
    const p = M.pins.find(q => q.name === name); if (p) fly(p.x, p.y + 40, Math.max(v.z, 1.6));
    frame.src = F.d + (F.d.includes('?') ? '&' : '?') + 'embed';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  const closeDetail = () => { dlg.close ? dlg.close() : dlg.removeAttribute('open'); };
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  dlg.addEventListener('close', () => { frame.src = 'about:blank'; });
  dlg.addEventListener('click', e => { if (e.target === dlg) closeDetail(); });

  /* ---------- Liste unter der Karte (echter Text für Google) ---------- */
  const list = document.getElementById('list');
  Object.entries(FACTS).forEach(([name, F]) => {
    const li = document.createElement('li'); const b = document.createElement('button');
    b.innerHTML = `<b></b><span></span>`; b.firstChild.textContent = F.t; b.lastChild.textContent = F.f;
    b.addEventListener('click', () => openDetail(name)); li.appendChild(b); list.appendChild(li);
  });

  /* ---------- Start ---------- */
  try {
    setup(window.TILES);
    zMin = Math.min(map.clientWidth / (M.box[2] - M.box[0]), map.clientHeight / (M.box[3] - M.box[1])) * .95;
    // Start: nah am Neuen Rathaus, Altstadt noch im Bild
    const nr = M.pins.find(p => p.name === 'neuesRathaus'), al = M.pins.find(p => p.name === 'altstadt');
    focus(nr.x * .62 + al.x * .38, nr.y * .62 + al.y * .38, Math.max(zMin, map.clientWidth < 700 ? 1.15 : 1.5));
    map.classList.add('ready');
  } catch (err) { console.error('karte:', err); }
})();
