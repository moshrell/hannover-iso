/* Wangenheimpalais (Friedrichswall 1, Laves 1829–1833; heute Wirtschaftsministerium) – Modul v2 nach Kadern Google Earth (ref/wangenheim/foto/v_01…v_10)
   Lokales System: Längsachse des Palais = x (Ost), lokal +y = Hauptfront nach Süden zum Friedrichswall (Straße), 1 Einheit ≈ 1 m.
   Maße aus dem OSM-Umriss (Relation r5162749, nur der südwestliche Teil = Palais): Hauptbau 48,7 × 19,2 m, Mittelrisalit 17,7 m breit und 1,2 m vorgezogen,
   Flügel je ≈ 15,3 m, Erker mit Kupferhaube an der Westseite (Sehne 6,7 m, Pfeil 2,4 m). Alles andere im Relationsumriss (Ostflügel, großer Block mit Hof) gehört
   zum Ministerium und ist NICHT Teil dieses Moduls.
   Nach den Kadern: heller Putz (cremeweiß), drei Fensterreihen (EG / hohes OG / 2. OG), 4 + 5 + 4 = 13 Fensterachsen an der Front, viersäuliger Portikus mit
   Balkon, davor Stufen; darüber Dreiecksgiebel mit Wappen (Querdach), Walmdach aus dunkel braungrauen Ziegeln mit Dachfenstern; Westerker mit Balkon,
   Fensterband und grüner Kupferhaube. Rück- und Westseite sind im Kartenwinkel (Blick von Südosten) verdeckt und nur schlicht gezeichnet. */
(() => {
  const Z0 = 1;
  ISO.landmark('wangenheim', H => {
    const { f2, hl, vl, winR, wins, hip, lathe } = H, M = [], add = m => (M.push(m), m);
    const X0 = 2.4, X1 = 51.1, Y1 = 19.2, YR = 20.4;              // Hauptbau x 2,4…51,1, y 0…19,2; Risalit bis y 20,4
    const HE = 13, RISE = 5.0, ZE = Z0 + HE, ZR = Z0 + HE + RISE;   // Traufe 13 m, First ≈ 18 m über Sockel
    const RX0 = 17.7, RX1 = 35.4, RC = (RX0 + RX1) / 2;             // Risalit
    const PW = 11.5, PX = RC - PW / 2, PH = 2.4;                    // Dreiecksgiebel: Breite, linke Ecke, Höhe

    // ---------- Fassadenhilfen (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ----------
    // drei Fensterreihen: EG niedrig, OG hoch, 2. OG kleiner (z-Bereiche über dem Sockel)
    const winRows = (u, h, rows = [0, 1, 2], w = 1.5) => {
      let s = '';
      if (rows.includes(0)) s += winR(u - w / 2, h - 3.9, w, 3.0, 0);
      if (rows.includes(1)) s += winR(u - w / 2, h - 8.9, w, 3.6, 1);
      if (rows.includes(2)) s += winR(u - w / 2, h - 12.2, w, 2.3, 2);
      return s;
    };
    // waagerechte Gliederung: Sockel, zwei Gurtgesimse, Kranzgesims
    const bands = (len, h) => hl(0, len, h - .8) + hl(0, len, h - 4.7) + hl(0, len, h - 9.2) + hl(0, len, h - 12.5) + hl(0, len, h - 12.9);
    // Flügelfront: 4 Achsen je Flügel, dazwischen (u = 15,3…33,4) das Risalit, das davorsteht
    const wingFront = (len, h) => {
      let w = '';
      for (let i = 0; i < 4; i++) { w += winRows((i + .5) * 3.825, h); w += winRows(len - 15.3 + (i + .5) * 3.825, h); }
      return bands(len, h) + wins(w);
    };
    // Risalit-Front: 5 Achsen; EG: Portal in der Mitte, daneben je ein Fenster, 2 weitere an den Rändern
    const risFront = (len, h) => {
      let w = '', q = bands(len, h);
      for (let i = 0; i < 5; i++) {
        const u = (i + .5) * (len / 5);
        w += winRows(u, h, i === 2 ? [1, 2] : [0, 1, 2], 1.6);
      }
      q += `<rect class="gl" x="${f2(len / 2 - 1.3)}" y="${f2(h - 4.1)}" width="2.6" height="3.3"/>` + vl(len / 2, h - 4.1, h - .8);
      q += vl(.45, 0, h - .8) + vl(len - .45, 0, h - .8);               // Eckpilaster
      return q + wins(w);
    };
    const endWall = (len, h) => {                                        // Ost- und Westgiebelwand, Rückseite: schlicht
      let w = '';
      const n = Math.max(2, Math.round(len / 4.2));
      for (let i = 0; i < n; i++) w += winRows((i + .5) * (len / n), h);
      return bands(len, h) + wins(w);
    };

    // ---------- Dach ----------
    const sy = y => ZE + RISE * (Y1 - y) / (Y1 / 2);                     // Höhe der Südfläche über y (Walm, Traufe y = 19,2, First y = 9,6)
    const skylight = (K, xa, xb, y1, y2) => K.face([[xa, y2, sy(y2)], [xb, y2, sy(y2)], [xb, y1, sy(y1)], [xa, y1, sy(y1)]], 'gl');
    const roof = K => {
      let s = hip(K, X0, 0, X1, Y1, ZE, ZR, 'sl');
      // Querdach über dem Risalit (gleiche Neigung): beide Flächen reichen bis zur Dachfläche des Hauptdachs
      const zg = ZE + PH, yv = Y1 - PH / (RISE / (Y1 / 2));               // Giebelfirst-Höhe; y, wo er auf das Hauptdach trifft
      s += K.face([[PX, YR, ZE], [PX, Y1, ZE], [RC, yv, zg], [RC, YR, zg]], 'sl');
      s += K.face([[RC, YR, zg], [RC, yv, zg], [PX + PW, Y1, ZE], [PX + PW, YR, ZE]], 'sl');
      // Dachfenster auf der Südfläche (Reihen in beiden Flügeln, Lage nach den Kadern)
      [9.4, 13.2, 17.0, 36.2, 40.0, 43.8].forEach(x => { s += skylight(K, x - .55, x + .55, 13.6, 14.9); });
      // Lüftungsrohr am First (Ostteil), wie im Kadern
      s += K.box(30.0, 9.15, ZR - .4, .9, .9, 1.7, 'pl');
      return s;
    };
    // Dreiecksgiebel auf der Risalitfront mit Wappenrelief (vergoldet im Foto)
    const pediment = K => K.wallVisible([PX, YR], [PX + PW, YR]) ? K.g(K.plane([PX, YR, ZE], [1, 0, 0], [0, 0, -1]),
      `<path class="pl fr" d="M0 0L${f2(PW / 2)} ${-PH}L${PW} 0Z"/><path class="dt" d="M.6 -.15L${f2(PW / 2)} ${f2(-PH + .45)}L${f2(PW - .6)} -.15"/>`
      + `<path class="dt" d="M0 0H${PW}"/><circle class="dt" cx="${f2(PW / 2)}" cy="-1.1" r=".85"/><circle class="dt" cx="${f2(PW / 2)}" cy="-1.1" r=".4"/>`) : '';

    // ======== HAUPTBAU: Flügel + Risalit + Dach + Giebel (ein Modul, damit Dach und Giebel sicher oben liegen) ========
    add({ id: 'wp', fp: [X0, 0, X1, YR], draw: K =>
      K.box(X0, 0, Z0, X1 - X0, Y1, HE, 'pl', { S: wingFront, E: endWall, N: endWall, W: endWall })
      + K.box(RX0, Y1, Z0, RX1 - RX0, YR - Y1, HE, 'pl', { S: risFront })
      + roof(K) + pediment(K) });

    // ======== PORTIKUS: vier Säulen, Gebälk, Balkon mit Geländer, Stufen ========
    add({ id: 'wpPort', fp: [21.2, YR, 31.9, 24.8], parent: 'wp', side: 'S', draw: K => {
      const x0 = 21.65, x1 = 31.45, y0 = YR, y1 = 23.6, zc = Z0 + .5, zt = Z0 + 4.4;
      let s = K.box(x0 - .5, y0, Z0, x1 - x0 + 1, y1 - y0 + 1.1, .5, 'st');                                    // Stufe/Sockel
      for (let i = 0; i < 4; i++) s += lathe(K, x0 + 1.0 + i * (x1 - x0 - 2.0) / 3, y1 - .6, [[zc, .66], [zc + .35, .58], [zt - .8, .52], [zt - .3, .58], [zt, .7]], 'st fr', 2);
      s += K.box(x0, y0, zt, x1 - x0, y1 - y0, .7, 'st', { S: l => hl(0, l, .25) });                          // Gebälk + Balkonplatte
      const zb = zt + .7;
      s += K.wall([x0, y1 - .2], [x1, y1 - .2], zb, zb + 1.0, 'st', l => hl(0, l, .18) + Array.from({ length: Math.floor(l / .7) }, (_, i) => vl(.35 + i * .7, .18, 1.0)).join(''));
      s += K.wall([x1, y1 - .2], [x1, y0], zb, zb + 1.0, 'st') + K.wall([x0, y0], [x0, y1 - .2], zb, zb + 1.0, 'st');
      return s;
    } });

    // ======== WESTERKER: gemauerter Sockel, Balkonring, Fensterband, grüne Kupferhaube ========
    add({ id: 'wpBay', fp: [0, 7.6, X0, 14.7], parent: 'wp', side: 'W', draw: K => {
      const xc = 3.54, yc = 11.15, R = 3.54, n = 6, T = 71 * Math.PI / 180;
      const ring = r => Array.from({ length: n + 1 }, (_, i) => { const t = -T + 2 * T * i / n; return [xc - r * Math.cos(t), yc + r * Math.sin(t)]; });
      const walls = (r, za, zb, mat, deco) => { const p = ring(r); let s = ''; for (let i = 0; i < n; i++) s += K.wall(p[i], p[i + 1], za, zb, mat, deco); return s; };
      const slab = (r, z, cls) => { const p = ring(r); return K.poly([...p.map(q => [q[0], q[1], z]), [X0, p[n][1], z], [X0, p[0][1], z]], cls); };
      let s = walls(R, Z0, Z0 + 4.2, 'pl', (l, h) => hl(0, l, .4) + wins(winR(l / 2 - .5, h - 3.1, 1.0, 1.9, 0)));      // Sockelgeschoss
      s += walls(R + .8, Z0 + 4.2, Z0 + 4.55, 'st') + slab(R + .8, Z0 + 4.55, 'st tp');                              // Balkonplatte
      s += walls(R + .8, Z0 + 4.55, Z0 + 5.45, 'st', l => hl(0, l, .15) + Array.from({ length: Math.max(1, Math.floor(l / .6)) }, (_, i) => vl(.3 + i * .6, .15, .9)).join(''));   // Geländer
      s += walls(R - .55, Z0 + 4.55, Z0 + 8.5, 'pl', (l, h) => hl(0, l, .25) + hl(0, l, h - .5) + wins(winR(l / 2 - .8, .9, 1.6, h - 1.9, 1)));      // Fensterband
      s += lathe(K, xc, yc, [[Z0 + 8.5, R - .1], [Z0 + 9.1, R - .65], [Z0 + 10.3, .9], [Z0 + 10.9, .25]], 'cu', 4, [0]);    // Kupferhaube
      return s;
    } });

    return { mods: M, lc: [27, 10], z0: 0, top: [27, 10, 19], label: 'Wangenheimpalais', h: 19, len: 52, pin: [26.8, 9.6, ZR + 4] };   // Punkt über der Mitte des Hauptbaus
  });
})();
