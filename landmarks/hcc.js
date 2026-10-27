/* HCC / Stadthalle Hannover (Hannover Congress Centrum am Stadtpark, Kuppelsaal 1914) – Modul.
   Grundlage: OSM-Relation r17296064 (17 Gebäudeteile, building:part) in lokale Meter umgerechnet (ref/hcc/gen/gen-hcc.py, Teileliste TEILE.md)
   und Google-Earth-Kader ref/hcc/foto/. Lokal = Karten-Welt (x Ost, y Süd, gegen die Kartendrehung), Nullpunkt = Mitte des Ankerquadrats (meta.point).
   Aufbau: Ringbau (0–15 m, Dach als flacher Kegel) → Trommel (15–27 m) → grüne Kupferkuppel (27–39 m) → Laterne; davor südlich das Foyer mit
   Satteldach, östlich/nördlich Hallen und Konferenzflügel. Jeder Teil ist in konvexe Stücke zerlegt (Sortierung ohne Durchdringung); Dächer
   (Kegel, Sattel, Walm, Kuppel) entstehen aus dem Teilumriss. Fenster eines Wandstücks sind je Helligkeitsklasse EIN Pfad (leicht fürs Handy). */
(() => {
  const Z0 = 1;
  /*DATA*/const D = [[0,15.0,0,[-6.8,-19.6,-5.4,-18.8,6.6,-26.0,6.9,-40.9,4.1,-50.8],15],[0,15.0,0,[-30.0,-5.5,-22.2,-7.2,-12.1,-13.3,-11.2,-13.9,-6.8,-19.6,4.1,-50.8],15],[0,15.0,0,[-42.2,3.1,-29.9,-4.1,-30.0,-5.5],3],[0,15.0,0,[1.7,-55.4,-1.2,-59.7,-8.6,-66.8,-13.0,-69.6,-22.6,-73.4,-32.9,-74.6,-38.1,-74.2,-43.1,-73.1,-52.6,-69.0,-56.9,-66.1,-64.2,-58.7,-67.0,-54.3,-70.8,-44.8,-71.8,-39.7,-71.7,-29.4,-70.6,-24.4,-66.5,-14.9,-60.1,-6.9,-56.2,-3.5,-51.8,-0.7,-42.2,3.1,-30.0,-5.5,4.1,-50.8],5242879],[0,11.0,1,[-31.4,32.2,-5.5,16.8,-7.5,17.3],3],[0,11.0,1,[-32.6,18.6,-35.3,14.3,-40.3,17.3,-31.4,32.2],7],[0,11.0,1,[-12.2,16.5,-32.6,18.6,-31.4,32.2,-7.5,17.3],8],[0,11.0,1,[-11.5,10.4,-13.5,7.2,-32.6,18.6],3],[0,11.0,1,[27.4,-2.7,16.0,-10.3,-3.3,1.2,-1.4,4.3],6],[0,11.0,1,[27.4,-2.7,18.5,-17.6,13.4,-14.6,16.0,-10.3],7],[0,11.0,1,[27.4,-2.7,-1.4,4.3,-11.5,10.4],2],[0,11.0,1,[4.4,6.5,27.4,-2.7,-11.5,10.4,-32.6,18.6],0],[0,11.0,1,[3.0,11.1,1.6,12.5,27.4,-2.7],3],[0,11.0,1,[4.4,6.5,3.0,11.1,27.4,-2.7],1],[0,11.0,1,[-12.2,16.5,4.4,6.5,-32.6,18.6],1],[0,5.5,2,[-4.6,25.0,-7.7,18.2,-9.9,28.5,-8.0,29.5,-4.8,27.8],28],[0,5.5,2,[-27.2,39.1,-27.2,39.2,-26.6,40.2],3],[0,5.5,2,[-27.2,39.1,-26.6,40.2,-27.0,38.7],2],[0,5.5,2,[-31.4,32.2,-27.2,39.1,-27.0,38.7],1],[0,5.5,2,[-7.7,18.2,-31.4,32.2,-27.0,38.7,-9.9,28.5],5],[0,5.5,2,[27.4,-2.8,4.0,11.2,-0.9,16.2],3],[0,5.5,2,[41.7,-12.3,27.1,-3.2,27.4,-2.8],3],[0,5.5,2,[13.8,13.9,30.5,3.8,41.7,-12.3,27.4,-2.8,-0.9,16.2],1],[0,5.5,2,[48.5,2.3,49.9,1.4,41.7,-12.3],3],[0,5.5,2,[30.5,3.8,31.5,5.6,40.2,10.1,48.4,5.4,48.5,2.3,41.7,-12.3],15],[0,5.5,2,[8.1,17.4,13.5,16.5,13.8,13.9,-0.9,16.2,-7.7,18.2],10],[0,5.5,2,[8.1,17.4,10.3,18.6,13.5,16.5],3],[0,5.5,2,[-4.6,25.0,2.5,22.6,8.1,17.4,-7.7,18.2],3],[0,12.0,3,[-77.9,-77.6,-64.2,-58.7,-62.2,-60.7,-60.8,-62.6],6],[0,12.0,3,[-77.9,-77.6,-66.2,-55.7,-64.2,-58.7],3],[0,12.0,3,[-57.0,-66.1,-48.3,-95.7,-77.9,-77.6,-60.8,-62.6,-59.1,-64.0],26],[0,12.0,3,[-38.1,-74.2,-34.7,-74.5,-39.6,-82.9,-40.5,-82.3],7],[0,12.0,3,[-43.1,-73.1,-38.1,-74.2,-40.5,-82.3,-48.3,-95.7],5],[0,12.0,3,[-52.7,-69.1,-43.1,-73.1,-48.3,-95.7],1],[0,12.0,3,[-57.0,-66.1,-52.7,-69.1,-48.3,-95.7],1],[0,15.0,4,[2.7,-8.2,-5.9,-3.1,-3.4,1.1,15.9,-10.3],7],[0,15.0,4,[-2.2,-16.9,2.7,-8.2,15.9,-10.3,6.7,-26.0],5],[0,15.0,4,[6.7,-26.0,-5.4,-18.7,-2.2,-16.9],3],[0,10.0,5,[-40.2,17.6,-55.6,26.9,-44.2,45.9,-40.0,43.4],7],[0,10.0,5,[-38.5,46.0,-27.2,39.2,-40.2,17.6,-40.0,43.4],11],[0,3.8,6,[41.8,-12.3,50.0,1.4,59.1,-4.1,46.9,-24.7],7],[0,3.8,6,[26.6,-12.6,26.9,-3.5,41.8,-12.3,46.9,-24.7],10],[0,3.8,6,[26.6,-12.6,25.0,-15.3,21.2,-13.1,26.9,-3.5],7],[0,20.0,7,[-15.1,-10.7,-22.1,-7.2,-11.6,10.4,-1.5,4.3],7],[0,20.0,7,[-1.5,4.3,-12.0,-13.2,-15.1,-10.7],3],[0,7.0,8,[-23.3,-0.6,-16.1,2.9,-22.2,-7.1,-26.5,-5.9],14],[0,7.0,8,[-23.3,-0.6,-27.9,2.2,-24.4,7.9,-16.1,2.9],7],[0,13.0,9,[-7.5,17.3,-1.4,15.6,3.0,11.1,4.5,6.6,-12.2,16.4],31],[0,3.5,10,[-38.5,46.0,-40.1,43.5,-44.1,45.9,-40.9,51.3,-36.8,48.8],31],[3.8,6.0,11,[48.4,-16.2,41.8,-12.3,50.0,1.4,63.0,-6.4],7],[3.8,6.0,11,[49.2,-29.7,42.7,-25.8,48.4,-16.2,63.0,-6.4],11],[3.8,9.0,12,[48.3,-16.2,42.6,-25.8,21.2,-13.1,26.9,-3.5],15],[15.0,27.0,13,[-26.5,-5.9,-22.2,-7.2,-15.2,-10.7,-11.2,-13.9,-5.2,-22.1,-2.3,-31.8,-2.8,-41.9,-4.4,-46.7,-9.8,-55.3,-17.7,-61.5,-22.4,-63.6,-32.4,-65.2,-42.4,-63.3,-51.3,-58.3,-57.9,-50.7,-60.2,-46.1,-62.2,-36.2,-60.9,-26.2,-58.9,-21.5,-52.8,-13.5,-44.4,-7.9,-34.5,-5.5],4194303],[27.0,27.0,14,[-25.8,-12.1,-18.5,-15.5,-15.3,-18.1,-10.5,-24.7,-9.0,-28.5,-8.1,-36.5,-9.8,-44.4,-14.1,-51.2,-20.5,-56.2,-28.2,-58.8,-36.3,-58.7,-40.3,-57.6,-47.3,-53.6,-50.2,-50.8,-54.5,-43.9,-56.1,-35.9,-55.0,-27.9,-53.5,-24.2,-48.6,-17.8,-41.8,-13.3,-33.9,-11.4],2097151],[39.0,40.0,15,[-26.0,-32.3,-25.8,-38.1,-28.9,-41.5,-34.6,-41.9,-38.8,-37.9,-38.5,-32.2,-35.1,-29.0,-29.3,-29.1],255]], T = [[15.0,27.0,1,12.0,0,6.9,-40.9,6.6,-26.0,-5.4,-18.8,-6.8,-19.6,-11.2,-13.9,-12.1,-13.3,-22.2,-7.2,-30.0,-5.5,-29.9,-4.1,-42.2,3.1,-51.8,-0.7,-56.2,-3.5,-60.1,-6.9,-66.5,-14.9,-70.6,-24.4,-71.7,-29.4,-71.8,-39.7,-70.8,-44.8,-67.0,-54.3,-64.2,-58.7,-56.9,-66.1,-52.6,-69.0,-43.1,-73.1,-38.1,-74.2,-32.9,-74.6,-22.6,-73.4,-13.0,-69.6,-8.6,-66.8,-1.2,-59.7,1.7,-55.4,4.1,-50.8],[11.0,22.0,2,11.0,2,-5.5,16.8,-31.4,32.2,-40.3,17.3,-35.3,14.3,-32.6,18.6,-13.5,7.2,-11.5,10.4,-1.4,4.3,-3.3,1.2,16.0,-10.3,13.4,-14.6,18.5,-17.6,27.4,-2.7,1.6,12.5,3.0,11.1,4.4,6.5,-12.2,16.5,-7.5,17.3],[5.5,5.5,0,0,0,-8.0,29.5,-9.9,28.5,-27.0,38.7,-26.6,40.2,-27.2,39.2,-27.2,39.1,-31.4,32.2,-7.7,18.2,-0.9,16.2,4.0,11.2,27.4,-2.8,27.1,-3.2,41.7,-12.3,49.9,1.4,48.5,2.3,48.4,5.4,40.2,10.1,31.5,5.6,30.5,3.8,13.8,13.9,13.5,16.5,10.3,18.6,8.1,17.4,2.5,22.6,-4.6,25.0,-4.8,27.8],[12.0,23.0,2,11.0,1,-60.8,-62.6,-62.2,-60.7,-64.2,-58.7,-66.2,-55.7,-77.9,-77.6,-48.3,-95.7,-40.5,-82.3,-39.6,-82.9,-34.7,-74.5,-38.1,-74.2,-43.1,-73.1,-52.7,-69.1,-57.0,-66.1,-59.1,-64.0],[15.0,15.0,0,0,0,15.9,-10.3,-3.4,1.1,-5.9,-3.1,2.7,-8.2,-2.2,-16.9,-5.4,-18.7,6.7,-26.0],[10.0,10.0,0,0,0,-44.2,45.9,-55.6,26.9,-40.2,17.6,-27.2,39.2,-38.5,46.0,-40.0,43.4],[3.75,3.75,0,0,0,59.1,-4.1,50.0,1.4,41.8,-12.3,26.9,-3.5,21.2,-13.1,25.0,-15.3,26.6,-12.6,46.9,-24.7],[20.0,21.0,2,1.0,0,-11.6,10.4,-22.1,-7.2,-15.1,-10.7,-12.0,-13.2,-1.5,4.3],[7.0,7.0,0,0,0,-22.2,-7.1,-16.1,2.9,-24.4,7.9,-27.9,2.2,-23.3,-0.6,-26.5,-5.9],[13.0,13.0,0,0,0,4.5,6.6,3.0,11.1,-1.4,15.6,-7.5,17.3,-12.2,16.4],[3.5,3.5,0,0,0,-40.9,51.3,-44.1,45.9,-40.1,43.5,-38.5,46.0,-36.8,48.8],[6.0,12.0,3,6.0,0,50.0,1.4,41.8,-12.3,48.4,-16.2,42.7,-25.8,49.2,-29.7,63.0,-6.4],[9.0,12.0,2,3.0,0,21.2,-13.1,42.6,-25.8,48.3,-16.2,26.9,-3.5],[27.0,30.0,1,3.0,1,-44.4,-7.9,-52.8,-13.5,-58.9,-21.5,-60.9,-26.2,-62.2,-36.2,-60.2,-46.1,-57.9,-50.7,-51.3,-58.3,-42.4,-63.3,-32.4,-65.2,-22.4,-63.6,-17.7,-61.5,-9.8,-55.3,-4.4,-46.7,-2.8,-41.9,-2.3,-31.8,-5.2,-22.1,-11.2,-13.9,-15.2,-10.7,-22.2,-7.2,-26.5,-5.9,-34.5,-5.5],[27.0,39.0,4,12.0,1,-41.8,-13.3,-48.6,-17.8,-53.5,-24.2,-55.0,-27.9,-56.1,-35.9,-54.5,-43.9,-50.2,-50.8,-47.3,-53.6,-40.3,-57.6,-36.3,-58.7,-28.2,-58.8,-20.5,-56.2,-14.1,-51.2,-9.8,-44.4,-8.1,-36.5,-9.0,-28.5,-10.5,-24.7,-15.3,-18.1,-18.5,-15.5,-25.8,-12.1,-33.9,-11.4],[40.0,44.0,1,4.0,0,-35.1,-29.0,-38.5,-32.2,-38.8,-37.9,-34.6,-41.9,-28.9,-41.5,-25.8,-38.1,-26.0,-32.3,-29.3,-29.1]], IDS = ["w1490187483", "w526550619", "w37761436", "w37761426", "w526529263", "w37761428", "w1490187459", "w526583246", "w1490187480", "w1490187481", "w1490187479", "w526583245", "w37761434", "w526529261", "w526529262", "w526550620"];/*END*/
  ISO.landmark('hcc', H => {
    const { f2, rnd } = H;
    const P = D.map((d, n) => {
      const v = []; for (let i = 0; i < d[3].length; i += 2) v.push([d[3][i], d[3][i + 1]]);
      const cx = v.reduce((a, p) => a + p[0], 0) / v.length, cy = v.reduce((a, p) => a + p[1], 0) / v.length;
      return { n, z0: d[0], z1: d[1], part: d[2], v, m: d[4], cx, cy };
    });
    const ring = t => { const r = []; for (let i = 5; i < t.length; i += 2) r.push([t[i], t[i + 1]]); return r; };
    const PART = T.map(t => { const r = ring(t); return { zw: t[0], h: t[1], shape: t[2], rh: t[3], mc: t[4], r, minx: Math.min(...r.map(q => q[0])), maxx: Math.max(...r.map(q => q[0])), miny: Math.min(...r.map(q => q[1])), maxy: Math.max(...r.map(q => q[1])) }; });
    const fp = [Math.min(...PART.map(p => p.minx)), Math.min(...PART.map(p => p.miny)), Math.max(...PART.map(p => p.maxx)), Math.max(...PART.map(p => p.maxy))];
    // Teil B steht auf Teil A (B beginnt dort, wo A endet, und beide Grundrisse überlappen) → alle Stücke von A vor allen Stücken von B
    const SP = {};   // "a>b": Teil a liegt unter Teil b
    const stackInit = () => {
      for (const A of P) for (const B of P) {
        if (A.part === B.part || SP[A.part + '>' + B.part]) continue;
        if (B.z0 >= PART[A.part].zw - 1e-6 && B.z0 > A.z0 + 1e-6 && sepSide(A.v, B.v, 1, 1) === 2) SP[A.part + '>' + B.part] = 1;
      }
    };
    const stack = (A, B) => SP[A.part + '>' + B.part] ? 1 : SP[B.part + '>' + A.part] ? -1 : 0;

    /* ---------- Sortierung: konvexe Stücke, trennende Gerade → was näher am Betrachter liegt, kommt später ---------- */
    function sepSide(A, B, vx, vy) {            // -1: A vor B zeichnen, 1: B vor A, 0: keine trennende Gerade / egal
      const test = (X, Y) => {
        for (let i = 0; i < X.length; i++) {
          const a = X[i], b = X[(i + 1) % X.length], nx = a[1] - b[1], ny = b[0] - a[0];   // Außennormale wie K.wall: (−dy, dx)
          const ref = nx * a[0] + ny * a[1];
          if (Y.every(q => nx * q[0] + ny * q[1] >= ref - 1e-6)) return [nx, ny];             // Y liegt ganz außerhalb von X
        }
        return null;
      };
      let n = test(A, B);
      if (n) return (n[0] * vx + n[1] * vy) > 1e-6 ? -1 : (n[0] * vx + n[1] * vy) < -1e-6 ? 1 : 0;   // B hinter A-Kante … s.u.
      n = test(B, A);
      if (n) return (n[0] * vx + n[1] * vy) > 1e-6 ? 1 : (n[0] * vx + n[1] * vy) < -1e-6 ? -1 : 0;
      return 2;                                   // überlappend
    }
    stackInit();
    const order = K => {
      const [vx, vy] = K.view, n = P.length, before = Array.from({ length: n }, () => new Set()), indeg = new Array(n).fill(0), sBefore = Array.from({ length: n }, () => new Set()), sIndeg = new Array(n).fill(0);
      const dep = p => p.cx * vx + p.cy * vy;
      const add = (a, b) => { if (!before[a].has(b)) { before[a].add(b); indeg[b]++; } };
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = P[i], B = P[j];
        if (A.part !== B.part) { const r = stack(A, B); if (r) { const [a, b] = r > 0 ? [i, j] : [j, i]; add(a, b); if (!sBefore[a].has(b)) { sBefore[a].add(b); sIndeg[b]++; } continue; } }
        if (A.z1 <= B.z0 + 1e-6 && A.z0 < B.z0) { // B steht auf A (oder höher): erst A – gilt nur, wenn sich die Grundrisse berühren
          const s = sepSide(A.v, B.v, vx, vy); if (s === 2) { add(i, j); continue; }
        }
        if (B.z1 <= A.z0 + 1e-6 && B.z0 < A.z0) { const s = sepSide(A.v, B.v, vx, vy); if (s === 2) { add(j, i); continue; } }
        const s = sepSide(A.v, B.v, vx, vy);
        if (s === -1) add(i, j); else if (s === 1) add(j, i);
        else if (s === 2) { const da = dep(A), db = dep(B); if (da < db) add(i, j); else if (db < da) add(j, i); }
      }
      const out = [], ready = [];
      for (let i = 0; i < n; i++) if (!indeg[i]) ready.push(i);
      const done = new Set();
      while (out.length < n) {
        if (!ready.length) {                       // Zyklus: das am weitesten hinten liegende Stück zuerst
          let best = -1; for (let i = 0; i < n; i++) if (!done.has(i) && sIndeg[i] <= 0 && (best < 0 || dep(P[i]) < dep(P[best]))) best = i;
          indeg[best] = 0; ready.push(best);
        }
        ready.sort((a, b) => dep(P[a]) - dep(P[b]));
        const i = ready.shift(); if (done.has(i)) continue; done.add(i); out.push(i); sBefore[i].forEach(j => sIndeg[j]--);
        before[i].forEach(j => { if (!done.has(j) && --indeg[j] <= 0 && !ready.includes(j)) ready.push(j); });
      }
      return out.map(i => P[i]);
    };


    /* ---------- Fassaden (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ---------- */
    const rect = (x, y, w, h) => `M${f2(x)} ${f2(y)}h${f2(w)}v${f2(h)}h${f2(-w)}z`;
    function windows(len, h, o) {
      const { fh, bay, ww, wh, sill, mx } = o, acc = {}, rows = Math.floor((h - (o.top || mx)) / fh);
      if (rows < 1 || len < ww + 2 * mx) return '';
      const nb = Math.max(1, Math.floor((len - 2 * mx + (bay - ww)) / bay)), off = (len - (nb * bay - (bay - ww))) / 2;
      for (let r = 0; r < rows; r++) {
        const yb = h - r * fh - sill, f = Math.min(4, 1 + Math.floor(4 * r / rows));
        if (yb - wh < .3) continue;
        for (let b = 0; b < nb; b++) {
          const q = rnd(), c = q < o.pOff ? ' off' : q < o.pOff + o.pDim ? ' dim' : q < o.pOff + o.pDim + o.pHi ? ' hi' : '';
          const key = f + c; (acc[key] = acc[key] || []).push(rect(off + b * bay, yb - wh, ww, wh));
        }
      }
      return Object.entries(acc).map(([k, v]) => { const [f, ...c] = k.split(' '); return `<path class="wn${c.length ? ' ' + c.join(' ') : ''}" data-f="${f}" d="${v.join('')}"/>`; }).join('');
    }
    const vlines = (len, h, step) => { let d = ''; for (let u = step / 2; u < len; u += step) d += `M${f2(u)} 0V${f2(h)}`; return `<path class="dt" d="${d}"/>`; };
    const hlines = (len, ys) => ys.length ? `<path class="dt" d="${ys.map(y => `M0 ${f2(y)}H${f2(len)}`).join('')}"/>` : '';
    const LIT = { pOff: .40, pDim: .22, pHi: .08 };
    const HALL = { fh: 4.4, bay: 4.2, ww: 2.2, wh: 2.6, sill: 1.1, mx: 1.4, ...LIT };
    const RING = { fh: 7.6, bay: 4.4, ww: 2.0, wh: 4.6, sill: 1.5, mx: 1.4, ...LIT };
    const DRUM = { fh: 12, bay: 3.4, ww: 1.5, wh: 7.5, sill: 2.4, mx: 1.0, ...LIT };
    const FOY = { fh: 5.4, bay: 3.6, ww: 2.0, wh: 3.6, sill: 1.2, mx: 1.4, ...LIT };
    function deco(p) {
      const pt = p.part, id = IDS[pt];
      return (len, h) => {
        if (len < 2.5 || h < 1) return '';
        if (id === 'w526529261') return windows(len, h, DRUM) + vlines(len, h, 3.4);        // Trommel: Pilaster und hohe Fenster
        if (id === 'w1490187483') return windows(len, h, RING) + hlines(len, [h * .5]);      // Ringbau
        if (id === 'w37761426' || id === 'w526550619') return windows(len, h, FOY) + hlines(len, [h - 5.4]);
        if (h < 4) return hlines(len, [h - 1]);
        return windows(len, h, HALL) + hlines(len, h > 9 ? [h - 4.4] : []);
      };
    }

    /* ---------- Dächer ---------- */
    const MATS = ['sl', 'cu', 'rs'];
    function roof(K, q) {
      const { zw, h, shape, rh, mc, r } = q, z = Z0 + zw, zt = Z0 + h, mat = MATS[mc];
      const cx = r.reduce((a, p) => a + p[0], 0) / r.length, cy = r.reduce((a, p) => a + p[1], 0) / r.length;
      if (shape === 0) return K.poly(r.map(p => [p[0], p[1], zt]), 'pl tp');
      if (shape === 1) { let s = ''; for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; s += K.face([[a[0], a[1], z], [b[0], b[1], z], [cx, cy, zt]], mat); } return s; }
      if (shape === 4) {
        let R = 0; r.forEach(p => R += Math.hypot(p[0] - cx, p[1] - cy)); R /= r.length;
        const N = 28, KS = 6, pt = (k, i) => { const ph = k / KS * Math.PI / 2, a = i / N * 2 * Math.PI; return [cx + R * Math.cos(ph) * Math.cos(a), cy + R * Math.cos(ph) * Math.sin(a), z + rh * Math.sin(ph)]; };
        let s = '';
        for (let i = 0; i < N; i++) {       // ein Streifen je Rippe (Meridian): wenig Pfade, Rippenoptik wie beim Original
          const L = [], R2 = [];
          for (let k = 0; k <= KS; k++) { L.push(pt(k, i)); R2.push(pt(k, i + 1)); }
          s += K.face([...L, ...R2.slice(0, KS).reverse()], mat);
        }
        return s;
      }
      // Sattel-/Walmdach auf dem Hüllrechteck (längste Kante bestimmt die Firstrichtung)
      let bi = 0, bl = 0; r.forEach((p, i) => { const n = r[(i + 1) % r.length], l = Math.hypot(n[0] - p[0], n[1] - p[1]); if (l > bl) { bl = l; bi = i; } });
      const e0 = r[bi], e1 = r[(bi + 1) % r.length], ux = (e1[0] - e0[0]) / bl, uy = (e1[1] - e0[1]) / bl, vx = -uy, vy = ux;
      let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9;
      r.forEach(p => { const u = (p[0] - e0[0]) * ux + (p[1] - e0[1]) * uy, v = (p[0] - e0[0]) * vx + (p[1] - e0[1]) * vy; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); });
      const W = (u, v, zz) => [e0[0] + u * ux + v * vx, e0[1] + u * uy + v * vy, zz], vm = (v0 + v1) / 2, hw = (v1 - v0) / 2;
      const hip = shape === 3 && (u1 - u0) > 2 * hw ? hw : 0;
      const A = W(u0, v0, z), B = W(u1, v0, z), C = W(u1, v1, z), Dd = W(u0, v1, z), R0 = W(u0 + hip, vm, zt), R1 = W(u1 - hip, vm, zt);
      let s = K.face([A, B, R1, R0], mat) + K.face([C, Dd, R0, R1], mat);
      s += hip ? K.face([B, C, R1], mat) + K.face([Dd, A, R0], mat) : K.face([B, C, R1], 'pl') + K.face([Dd, A, R0], 'pl');
      return s;
    }

    /* ---------- Zeichnen ---------- */
    const draw = K => {
      let s = '';
      const left = PART.map(() => 0); P.forEach(p => left[p.part]++);
      order(K).forEach(p => {
        if (p.z1 - p.z0 > .05) for (let i = 0; i < p.v.length; i++) if (p.m >> i & 1) s += K.wall(p.v[i], p.v[(i + 1) % p.v.length], Z0 + p.z0, Z0 + p.z1, 'pl', deco(p));
        if (--left[p.part] === 0) s += roof(K, PART[p.part]);
      });
      return s;
    };
    const M = [{ id: 'hcc', fp, draw }];
    return { mods: M, lc: [0, 0], z0: 0, top: [-10, 5, Z0 + 44], label: 'HCC', h: 44, len: 140 };
  });
})();
