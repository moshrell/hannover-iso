/* karte.js — Hannover Mitte als Kachelkarte (wie echte Online-Karten).
   Die Zeichnung wird vorab im Rechner gerendert (tools/render-tiles.mjs) – der Browser zeigt nur fertige Bilder:
   sofort sichtbar (Poster), flüssig auf dem Telefon, kaum Speicher. Wahrzeichen öffnen sich per Tipp als Detailansicht. */
(() => {
  'use strict';
  const mapEl = document.getElementById('map');
  const ROOT = (mapEl && mapEl.dataset.base) || '';   // Website-Seite: Karte liegt unter /vorschau/karte-ksn0/, die Seite selbst woanders
  const BASE = ROOT + 'tiles/';
  // Punkte auf der Karte (ohne Schrift, damit nichts verdeckt): ein Punkt pro Gebäude, über dem höchsten Punkt der Zeichnung
  // Pins aus landmarks/meta/*.json (window.LMETA, von tools/build-landmarks.py erzeugt); Position aus tiles/meta.js (labels)
  const FACTS = {};
  Object.entries(window.LMETA || {}).forEach(([n, m]) => { if (m.pin === false) return; FACTS[n] = { t: m.title, f: m.fact, d: m.detail, from: [n], minor: !!m.minor, r: m.rank == null ? 50 : m.rank }; });
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
    // Gebäude ohne gerenderte Position (z. B. beim Hochladen: Dateien erscheinen nacheinander) bekommen keinen Punkt statt eines Punkts in der Ecke
    M.pins = Object.entries(FACTS).map(([name, F]) => {
      const ls = F.from.map(n => M.labels.find(l => l.name === n)).filter(Boolean);
      if (!ls.length) { console.error('karte: keine Position für', name); return null; }
      const p = { name, r: F.r, x: ls.reduce((s, l) => s + l.x, 0) / ls.length, y: ls.reduce((s, l) => s + l.y, 0) / ls.length };
      const b = document.createElement('button'); b.className = 'km-pin' + (F.minor ? ' minor' : ''); b.dataset.n = F.t; b.setAttribute('aria-label', F.t + ' – Detailansicht öffnen');
      b.addEventListener('click', () => openDetail(name, b)); labelsEl.appendChild(b); p.el = b; return p;
    }).filter(Boolean).sort((a, b) => a.r - b.r);
  }
  const PIN_GAP = 38;   // Mindestabstand zwischen gezeigten Punkten (px)
  const levelFor = z => { const dpr = Math.min(2, window.devicePixelRatio || 1); for (let i = 0; i < M.levels.length; i++) if (M.levels[i].s * 2 >= z * dpr * .9) return i; return M.levels.length - 1; };
  /* Zeichnen auf EINE Leinwand statt riesiger Ebenen: nie schwarz (Poster + grobe Stufen liegen immer darunter), kein Bild-Ziehen am PC */
  function fit() {
    const W = map.clientWidth, H = map.clientHeight; DPR = Math.min(2, window.devicePixelRatio || 1);
    if (W * H * DPR * DPR > 4.5e6) DPR = Math.max(1, Math.sqrt(4.5e6 / (W * H)));
    cw = W; ch = H; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
  }
  const id0 = (i, key) => i + '/' + key;
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
        ctx.globalAlpha = a;
        try { ctx.drawImage(e.im, dx, dy, Math.ceil((v.x + (tx + 1) * ts) * DPR) - dx, Math.ceil((v.y + (ty + 1) * ts) * DPR) - dy); }
        catch (err) { console.error('karte: Kachel kaputt', id0(i, key), err); cache.delete(id0(i, key)); apply(); }   // sonst bricht ein verworfenes Bild das ganze Bild (Karte schwarz)
      }
    }
    ctx.globalAlpha = 1;
    if (cache.size > 260) { const old = [...cache.entries()].filter(([id, e]) => !id.startsWith('0/') && e.u < fno - 30).sort((a, b) => a[1].u - b[1].u);
      for (let n = 0; n < old.length && cache.size > 200; n++) cache.delete(old[n][0]); }
    map.classList.toggle('far', v.z < .8);
    // Punkte: wichtigste zuerst; ein Punkt, der näher als PIN_GAP an einem schon gezeigten liegt, wird ausgeblendet (beim Heranzoomen kommen die übrigen dazu)
    const shown = [];
    M.pins.forEach(p => {
      const sx = v.x + p.x * v.z, sy = v.y + p.y * v.z - 12;
      p.el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%)`;
      const inView = sx > -20 && sx < cw + 20 && sy > -20 && sy < ch + 20;
      const ok = inView && !shown.some(q => Math.hypot(q[0] - sx, q[1] - sy) < PIN_GAP);
      if (ok) shown.push([sx, sy]);
      if (ok !== p.on) { p.on = ok; p.el.classList.toggle('off', !ok); }
    });
    if (fading) apply();
  }
  // Nach der Detailansicht (große Seite im Rahmen, auf dem Telefon knapper Speicher): Leinwand neu anlegen und alles neu zeichnen, sonst bleibt die Karte manchmal schwarz
  const redraw = () => { if (!M) return; fit(); apply(); };
  document.addEventListener('visibilitychange', () => { if (!document.hidden) redraw(); });
  window.addEventListener('pageshow', redraw);
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
  const hint = document.getElementById('hint'), hideHint = () => { if (hint) hint.classList.add('gone'); };
  let tapPin = null, tapDone = null, multi = false;
  map.addEventListener('click', () => { const pb = tapDone; tapDone = null; if (pb) pb.click(); });
  map.addEventListener('pointerdown', e => { const pb = e.target.closest('.km-pin'); if (e.target.closest('button') && !pb) return; hideHint(); tapDone = null; if (!pts.size) { tapPin = pb; multi = false; } else { multi = true; } map.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); map.classList.add('drag'); last = null; moved = 0; });
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
  const up = e => {
    const had = pts.has(e.pointerId); pts.delete(e.pointerId); last = null;
    if (!pts.size) {
      map.classList.remove('drag');
      // Tipp auf einen Punkt (Zeiger war gefangen, daher kein click am Button): öffnen, wenn kaum bewegt und nicht mit zwei Fingern
      tapDone = (had && e.type === 'pointerup' && tapPin && !multi && moved < 8) ? tapPin : null; tapPin = null;   // geöffnet wird erst im folgenden click (sonst trifft er die geöffnete Detailansicht und schließt sie)
      settle();
    }
  };
  map.addEventListener('pointerup', up); map.addEventListener('pointercancel', up);
  map.addEventListener('dragstart', e => e.preventDefault());
  map.addEventListener('wheel', e => { e.preventDefault(); hideHint(); const r = map.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0016), e.clientX - r.left, e.clientY - r.top); settle(); }, { passive: false });
  map.addEventListener('dblclick', e => { if (e.target.closest('button') && !e.target.closest('.km-pin')) return; const r = map.getBoundingClientRect(); zoomAt(1.8, e.clientX - r.left, e.clientY - r.top); });
  document.getElementById('zin').addEventListener('click', () => { hideHint(); zoomAt(1.5, map.clientWidth / 2, map.clientHeight / 2); settle(); });
  document.getElementById('zout').addEventListener('click', () => { hideHint(); zoomAt(1 / 1.5, map.clientWidth / 2, map.clientHeight / 2); });
  document.getElementById('zall').addEventListener('click', () => { hideHint(); fly((M.box[0] + M.box[2]) / 2, (M.box[1] + M.box[3]) / 2, zMin); });
  window.addEventListener('resize', () => { if (M) { fit(); zMin = Math.min(map.clientWidth / (M.box[2] - M.box[0]), map.clientHeight / (M.box[3] - M.box[1])) * .95; clamp(); apply(); } });

  /* ---------- Detailansicht eines Wahrzeichens (eigene Seite im Rahmen, mit Abendlicht) ----------
     Telefon: unterer Bogen (Wischen nach unten, Esc, Tippen daneben, × oder „Zur Karte“ schließen). Rechner: Fenster. */
  const dlg = document.getElementById('detail'), frame = document.getElementById('detail-frame'), dTitle = document.getElementById('detail-title'), dFact = document.getElementById('detail-fact');
  const dEb = document.getElementById('detail-eb'), dTop = document.getElementById('detail-top'), root = document.documentElement;
  const ORDER = Object.keys(FACTS);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;   // Regel der Website: nur gedämpft (kürzer), nicht abgeschaltet
  const wide = () => window.matchMedia('(min-width:720px)').matches;
  let openedAt = 0, current = null, closing = false, opener = null, closeT = 0;
  function fill(name) {
    const F = FACTS[name], m = (window.LMETA || {})[name] || {};
    current = name; dTitle.textContent = F.t; dFact.textContent = F.f;
    const eb = [m.year, m.arch, m.addr].filter(Boolean).join(' · ');   // Felder erscheinen, sobald sie in LMETA stehen
    dEb.textContent = eb; dEb.hidden = !eb;
    frame.src = ROOT + F.d + (F.d.includes('?') ? '&' : '?') + 'embed';
  }
  function openDetail(name, from) {
    const F = FACTS[name]; if (!F) return;
    const p = M.pins.find(q => q.name === name);
    if (dlg.open) { if (closing) return; fill(name); if (p) focus(p.x, p.y + 40, Math.max(v.z, 1.6)); return; }
    opener = from || document.activeElement; fill(name);
    if (p) fly(p.x, p.y + 40, Math.max(v.z, 1.6));
    const sb = window.innerWidth - root.clientWidth;   // Scrollbalken-Breite, damit die Seite beim Sperren nicht springt
    root.classList.add('km-lock'); if (sb > 0) root.style.paddingRight = sb + 'px';
    openedAt = performance.now();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    requestAnimationFrame(() => requestAnimationFrame(() => { if (dlg.open && !closing) dlg.classList.add('on'); }));
  }
  function closeDetail() {
    if (!dlg.open || closing) return;
    closing = true; dlg.classList.remove('on');
    const fin = () => { clearTimeout(closeT); if (!closing) return; closing = false; dlg.style.transition = ''; dlg.style.transform = ''; if (dlg.close) dlg.close(); else { dlg.removeAttribute('open'); dlg.dispatchEvent(new Event('close')); } };
    closeT = setTimeout(fin, reduced() ? 260 : 480);
    dlg.addEventListener('transitionend', function te(e) { if (e.target !== dlg || e.propertyName !== 'transform') return; dlg.removeEventListener('transitionend', te); fin(); });
  }
  const stepTo = d => { if (!current || closing) return; const i = ORDER.indexOf(current); openDetail(ORDER[(i + d + ORDER.length) % ORDER.length]); };
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-back').addEventListener('click', closeDetail);
  document.getElementById('detail-prev').addEventListener('click', () => stepTo(-1));
  document.getElementById('detail-next').addEventListener('click', () => stepTo(1));
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeDetail(); });
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') stepTo(-1); else if (e.key === 'ArrowRight') stepTo(1); });
  dlg.addEventListener('click', e => { if (e.target === dlg && performance.now() - openedAt > 450) closeDetail(); });
  dlg.addEventListener('close', () => {
    if (!dlg.open) frame.src = 'about:blank';
    dlg.classList.remove('on'); closing = false; current = null; clearTimeout(closeT);
    root.classList.remove('km-lock'); root.style.paddingRight = '';
    redraw(); setTimeout(redraw, 400);
    if (opener && opener.focus && document.contains(opener)) { try { opener.focus({ preventScroll: true }); } catch (err) { console.error('karte: Fokus', err); } }
    opener = null;
  });
  // Wischen nach unten an Griff/Kopf schließt (nur Telefon)
  let sw = null;
  dTop.addEventListener('pointerdown', e => { if (wide() || closing || e.target.closest('button')) return; sw = { id: e.pointerId, y0: e.clientY, t0: performance.now(), dy: 0 }; dTop.setPointerCapture(e.pointerId); dlg.style.transition = 'none'; });
  dTop.addEventListener('pointermove', e => { if (!sw || e.pointerId !== sw.id) return; sw.dy = Math.max(0, e.clientY - sw.y0); dlg.style.transform = `translateY(${sw.dy}px)`; });
  const swEnd = e => {
    if (!sw || e.pointerId !== sw.id) return;
    const dy = sw.dy, fast = dy / Math.max(1, performance.now() - sw.t0) > .6; sw = null;
    dlg.style.transition = ''; void dlg.offsetHeight; dlg.style.transform = '';
    if (dy > 110 || (fast && dy > 30)) closeDetail();
  };
  dTop.addEventListener('pointerup', swEnd); dTop.addEventListener('pointercancel', swEnd);

  /* ---------- Liste unter der Karte (echter Text für Google) ---------- */
  const list = document.getElementById('list');
  Object.entries(FACTS).forEach(([name, F]) => {
    const li = document.createElement('li'); const b = document.createElement('button');
    b.innerHTML = `<b></b><span></span>`; b.firstChild.textContent = F.t; b.lastChild.textContent = F.f;
    b.addEventListener('click', () => openDetail(name, b)); li.appendChild(b); list.appendChild(li);
  });

  /* ---------- Start ---------- */
  // Eichung: Telefon 390 × 624 (z = 1.5) zeigt 260 × 416 Welteinheiten um den Punkt „Rathaus + START“ (Rathaus groß, darunter ein Stück Maschteich).
  // Dieses Fenster muss auf jedem Kartenblock ganz sichtbar sein → Zoom = kleinerer der beiden Faktoren, nach oben begrenzt.
  const START = { dx: -30, dy: 75 }, REF = { w: 260, h: 416, zMax: 2.2 };
  const startZoom = () => Math.max(zMin, Math.min(REF.zMax, map.clientWidth / REF.w, map.clientHeight / REF.h));
  try {
    setup(window.TILES);
    zMin = Math.min(map.clientWidth / (M.box[2] - M.box[0]), map.clientHeight / (M.box[3] - M.box[1])) * .95;
    const nr = M.pins.find(p => p.name === 'neuesRathaus');
    focus(nr.x + START.dx, nr.y + START.dy, startZoom());
    map.classList.add('ready');
  } catch (err) { console.error('karte:', err); }
})();
