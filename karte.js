/* karte.js — Hannover Mitte als Kachelkarte (wie echte Online-Karten).
   Die Zeichnung wird vorab im Rechner gerendert (tools/render-tiles.mjs) – der Browser zeigt nur fertige Bilder:
   sofort sichtbar (Poster), flüssig auf dem Telefon, kaum Speicher. Wahrzeichen öffnen sich per Tipp als Detailansicht. */
(() => {
  'use strict';
  const BASE = 'tiles/';
  // Punkte auf der Karte (ohne Schrift, damit nichts verdeckt): Altstadt = ein Punkt für alle drei Bauten
  const FACTS = {
    neuesRathaus: { t: 'Neues Rathaus', f: 'Erbaut 1901–1913 am Maschteich, Kuppel 97,73 m, Bogenaufzug bis zur Aussicht.', d: 'rathaus.html', from: ['neuesRathaus'] },
    altstadt: { t: 'Altstadt', f: 'Marktkirche (Backsteingotik, 14. Jh., Turm 97 m), Altes Rathaus mit Treppengiebeln und das Leineschloss – heute Sitz des Niedersächsischen Landtags.', d: 'altstadt.html', from: ['marktkirche', 'altesRathaus', 'leineschloss'] },
  };
  const map = document.getElementById('map'), world = document.getElementById('world'), poster = document.getElementById('poster');
  const labelsEl = document.getElementById('labels');
  const v = { x: 0, y: 0, z: 1 };
  let M = null, zMin = .2, zMax = 4.5, raf = 0;
  const layers = [];

  /* ---------- Kacheln ---------- */
  function setup(meta) {
    M = meta;
    M.have = M.levels.map((_, i) => new Set(M.tiles[i] || []));
    M.levels.forEach((lv, i) => {
      const el = document.createElement('div'); el.className = 'lv'; el.style.width = lv.w + 'px'; el.style.height = lv.h + 'px';
      world.appendChild(el); layers.push({ el, s: lv.s, imgs: new Map() });
    });
    poster.style.width = M.VW + 'px'; poster.style.height = M.VH + 'px';
    // Punkte aus den gerenderten Positionen der Bauten (Mittelwert bei Gruppen)
    M.pins = Object.entries(FACTS).map(([name, F]) => {
      const ls = F.from.map(n => M.labels.find(l => l.name === n)).filter(Boolean);
      const p = { name, x: ls.reduce((s, l) => s + l.x, 0) / ls.length, y: ls.reduce((s, l) => s + l.y, 0) / ls.length };
      const b = document.createElement('button'); b.className = 'pin'; b.dataset.n = F.t; b.setAttribute('aria-label', F.t + ' – Detailansicht öffnen');
      b.addEventListener('click', () => openDetail(name)); labelsEl.appendChild(b); p.el = b; return p;
    });
  }
  const levelFor = z => { const dpr = Math.min(2, window.devicePixelRatio || 1); for (let i = 0; i < M.levels.length; i++) if (M.levels[i].s * 2 >= z * dpr * .9) return i; return M.levels.length - 1; };
  function tiles() {
    const W = map.clientWidth, H = map.clientHeight, L = levelFor(v.z), T = M.tile;
    layers.forEach((ly, i) => {
      const k = v.z / ly.s;
      ly.el.style.transform = `translate3d(${v.x.toFixed(1)}px, ${v.y.toFixed(1)}px, 0) scale(${k.toFixed(5)})`;
      ly.el.style.visibility = i <= L ? 'visible' : 'hidden';
      if (i !== L && i !== 0 && i !== L - 1) return;
      // sichtbarer Bereich in Kachelkoordinaten dieser Stufe (+1 Rand)
      const x0 = Math.max(0, Math.floor(-v.x / k / T) - 1), y0 = Math.max(0, Math.floor(-v.y / k / T) - 1);
      const x1 = Math.ceil((W - v.x) / k / T) + 1, y1 = Math.ceil((H - v.y) / k / T) + 1;
      if (i !== L) return;
      for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx <= x1; tx++) {
        const key = tx + '_' + ty;
        if (!M.have[i].has(key) || ly.imgs.has(key)) continue;
        const im = new Image(); im.decoding = 'async'; im.alt = ''; im.className = 't';
        im.style.left = tx * T + 'px'; im.style.top = ty * T + 'px';
        im.onload = () => im.classList.add('in');
        im.src = `${BASE}${i}/${key}.webp`;
        ly.el.appendChild(im); ly.imgs.set(key, im);
      }
      // weit entfernte Kacheln freigeben (Speicher auf dem Telefon)
      if (ly.imgs.size > 160) ly.imgs.forEach((im, key) => { const [tx, ty] = key.split('_').map(Number);
        if (tx < x0 - 3 || tx > x1 + 3 || ty < y0 - 3 || ty > y1 + 3) { im.remove(); ly.imgs.delete(key); } });
    });
    poster.style.transform = `translate3d(${v.x.toFixed(1)}px, ${v.y.toFixed(1)}px, 0) scale(${v.z.toFixed(5)})`;
    M.pins.forEach(p => { p.el.style.transform = `translate3d(${(v.x + p.x * v.z).toFixed(1)}px, ${(v.y + p.y * v.z).toFixed(1)}px, 0) translate(-50%, -50%)`; });
  }
  const apply = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tiles(); }); };

  /* ---------- Verschieben, Zoomen ---------- */
  const clamp = () => {
    const W = map.clientWidth, H = map.clientHeight;
    v.z = Math.min(zMax, Math.max(zMin, v.z));
    v.x = Math.min(W * .6, Math.max(W * .4 - M.VW * v.z, v.x));
    v.y = Math.min(H * .6, Math.max(H * .4 - M.VH * v.z, v.y));
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
  const up = e => { pts.delete(e.pointerId); last = null; if (!pts.size) map.classList.remove('drag'); };
  map.addEventListener('pointerup', up); map.addEventListener('pointercancel', up);
  map.addEventListener('wheel', e => { e.preventDefault(); const r = map.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0016), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  map.addEventListener('dblclick', e => { if (e.target.closest('button')) return; const r = map.getBoundingClientRect(); zoomAt(1.8, e.clientX - r.left, e.clientY - r.top); });
  document.getElementById('zin').addEventListener('click', () => zoomAt(1.5, map.clientWidth / 2, map.clientHeight / 2));
  document.getElementById('zout').addEventListener('click', () => zoomAt(1 / 1.5, map.clientWidth / 2, map.clientHeight / 2));
  document.getElementById('zall').addEventListener('click', () => fly(M.VW / 2, M.VH / 2, zMin));
  window.addEventListener('resize', () => { if (M) { zMin = Math.min(map.clientWidth / M.VW, map.clientHeight / M.VH) * .95; clamp(); apply(); } });

  /* ---------- Detailansicht eines Wahrzeichens (eigene Seite im Rahmen, mit Abendlicht) ---------- */
  const dlg = document.getElementById('detail'), frame = document.getElementById('detail-frame'), dTitle = document.getElementById('detail-title'), dFact = document.getElementById('detail-fact');
  function openDetail(name) {
    const F = FACTS[name]; if (!F) return;
    dTitle.textContent = F.t; dFact.textContent = F.f;
    const p = M.pins.find(q => q.name === name); if (p) fly(p.x, p.y + 40, Math.max(v.z, 1.6));
    frame.src = `${F.d}?embed`;
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
    zMin = Math.min(map.clientWidth / M.VW, map.clientHeight / M.VH) * .95;
    // Start: nah am Neuen Rathaus, Altstadt noch im Bild
    const nr = M.pins.find(p => p.name === 'neuesRathaus'), al = M.pins.find(p => p.name === 'altstadt');
    focus(nr.x * .62 + al.x * .38, nr.y * .62 + al.y * .38, Math.max(zMin, map.clientWidth < 700 ? 1.15 : 1.5));
    map.classList.add('ready');
  } catch (err) { console.error('karte:', err); }
})();
