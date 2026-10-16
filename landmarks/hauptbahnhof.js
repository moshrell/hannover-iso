/* Hauptbahnhof Hannover mit Ernst-August-Denkmal – Modul. Lokal: x Ost, y Süd (Front zum Ernst-August-Platz = +y), z Höhe, Gelände z = 1.
   Fotos: ref/hauptbahnhof/ (Wikimedia Commons, Quellen in quellen.txt). Zeichnung nach den Fotos, nichts kopiert; ohne Logos (DB, Läden).
   Empfangsgebäude 1876–1879 (Hubert Stier), gelber Backstein mit Sandsteingliederung: Mittelbau mit zwei Eckrisaliten (Uhren), drei großen Bogenfenstern
   mit Archivolten und Medaillons, darüber drei Arkadengruppen zu je fünf Bögen, Rundbogenfries und durchbrochene Brüstung; unten Sockel aus Naturstein
   mit drei Portalen unter Glasvordächern. Niedrige Seitenflügel (oben Bogenfenster in Dreiergruppen, unten Ladenfront), flache Metalldächer.
   Davor das Reiterstandbild Ernst Augusts (Albert Wolff, 1861): Pferd blickt zur Stadt (+y), Schwanz zum Bahnhof. */
ISO.landmark('hauptbahnhof', H => {
  const { f2, hl, vl, winR, winA, wins, hip, roofPlane } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  // rote Backsteinbänder (dünne dunkle Linien)
  const band = (len, ys) => ys.map(y => `<path class="dt rb" d="M0 ${f2(y)}H${f2(len)}"/>`).join('');
  // Bogenfries: kleine Rundbögen im Raster (Oberkante y, Höhe 2r)
  const arcs = (u0, u1, y, pitch, r) => { let d = ''; for (let u = u0; u + pitch <= u1 + 1e-6; u += pitch) d += `M${f2(u + (pitch - 2 * r) / 2)} ${f2(y + r)}a${f2(r)} ${f2(r)} 0 0 1 ${f2(2 * r)} 0`; return `<path class="dt" d="${d}"/>`; };
  // Sandsteinring um ein Bogenfenster (Mitte u, Kämpfer spring, Innenradius r0, Außenradius r1, Unterkante bottom)
  const ring = (u, spring, r0, r1, bottom) => `<path class="st fr" fill-rule="evenodd" d="M${f2(u - r1)} ${f2(bottom)}V${f2(spring)}A${f2(r1)} ${f2(r1)} 0 0 1 ${f2(u + r1)} ${f2(spring)}V${f2(bottom)}Z`
    + `M${f2(u - r0)} ${f2(bottom)}V${f2(spring)}A${f2(r0)} ${f2(r0)} 0 0 1 ${f2(u + r0)} ${f2(spring)}V${f2(bottom)}Z"/>`;
  // großes Bogenfenster mit Strahlenrosette im Bogen (Foto: Speichenfächer), Kämpferlinie, drei Pfosten
  const bigArch = (u, apex, gw, bottom, f) => {
    const spring = apex + gw;
    let s = `<path class="wn" data-f="${f}" d="M${f2(u - gw)} ${f2(bottom)}V${f2(spring)}A${f2(gw)} ${f2(gw)} 0 0 1 ${f2(u + gw)} ${f2(spring)}V${f2(bottom)}Z"/>`;
    let d = `M${f2(u)} ${f2(apex)}V${f2(bottom)}M${f2(u - gw)} ${f2(spring)}H${f2(u + gw)}M${f2(u - gw)} ${f2(spring + (bottom - spring) * .62)}H${f2(u + gw)}M${f2(u - gw * .5)} ${f2(spring)}V${f2(bottom)}M${f2(u + gw * .5)} ${f2(spring)}V${f2(bottom)}`;
    for (let i = 1; i < 6; i++) { const a = Math.PI * i / 6; d += `M${f2(u)} ${f2(spring)}L${f2(u + gw * Math.cos(a))} ${f2(spring - gw * Math.sin(a))}`; }
    d += `M${f2(u - gw * .45)} ${f2(spring)}A${f2(gw * .45)} ${f2(gw * .45)} 0 0 1 ${f2(u + gw * .45)} ${f2(spring)}`;
    return s + `<path class="mul" d="${d}"/>`;
  };
  // Bahnsteighallen hinter dem Empfangsgebäude
  add({ id: 'hbHalls', o: .6, fp: [0, -54, 140, -2], draw: K => {
    let s = '';
    for (let i = 0; i < 3; i++) { const y0 = -54 + i * 17, y1 = y0 + 15;
      s += roofPlane(K, [[0, y1, Z0 + 9], [140, y1, Z0 + 9], [140, (y0 + y1) / 2, Z0 + 13], [0, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += roofPlane(K, [[140, y0, Z0 + 9], [0, y0, Z0 + 9], [0, (y0 + y1) / 2, Z0 + 13], [140, (y0 + y1) / 2, Z0 + 13]], 'sl', 3);
      s += K.wall([140, y1], [140, y0], Z0 + 9, Z0 + 9.01, 'gb', len => `<path class="gb sd" d="M0 0L${f2(len / 2)} -4L${f2(len)} 0Z"/>`); }
    return s;
  } });
  // Seitenflügel (13 m): oben Bogenfenster in Dreiergruppen mit Säulchen, unten verglaste Ladenfront unter dem Vordach
  const wingF = (len, h) => {
    let q = band(len, [8.5]) + hl(0, len, .35) + hl(0, len, 2.5) + hl(0, len, 7.7) + hl(0, len, 8.0) + arcs(0, len, 1.0, 1.1, .45), w = '';
    const n = Math.max(1, Math.floor(len / 8.4)), g0 = (len - n * 8.4) / 2 + (8.4 - 5.5) / 2;
    for (let g = 0; g < n; g++) for (let i = 0; i < 3; i++) {
      const x = g0 + g * 8.4 + i * 2.1;
      w += winA(x, 3.5, 1.3, 4.0, 1);
      if (i < 2) q += vl(x + 1.3 + .4, 4.7, 7.5);
    }
    for (let u = 1; u < len - 3; u += 4) w += `<rect class="wn dim" data-f="0" x="${f2(u + .4)}" y="9" width="3.2" height="${f2(h - 9.8)}"/>`;
    return q + wins(w);
  };
  add({ id: 'hbWW', o: .3, fp: [0, 0, 42, 26], draw: K => K.box(0, 0, Z0, 42, 26, 13, 'gb', { S: wingF, W: wingF }) + K.box(-.3, -.3, Z0 + 13, 42.6, 26.6, .7, 'st') + hip(K, 0, 0, 42, 26, Z0 + 13.7, Z0 + 16.3, 'sl') });
  add({ id: 'hbWE', o: .3, fp: [98, 0, 140, 26], draw: K => K.box(98, 0, Z0, 42, 26, 13, 'gb', { S: wingF, E: wingF }) + K.box(97.7, -.3, Z0 + 13, 42.6, 26.6, .7, 'st') + hip(K, 98, 0, 140, 26, Z0 + 13.7, Z0 + 16.3, 'sl') });
  // Mittelbau: Natursteinsockel (4,4 m) + Backsteingeschosse bis 30 m über Gelände, flaches Dach
  add({ id: 'hbCenter', o: .4, fp: [42, -4, 98, 30], draw: K => {
    const AC = [13.4, 28, 42.6], GW = 3.9, BOT = 25.2, APEX = 14.6, SPR = APEX + GW;   // Wandkoordinaten: v nach unten ab Oberkante (z = 30)
    const plinth = (len, h) => {
      let q = hl(0, len, 1.1) + hl(0, len, 2.2) + hl(0, len, 3.3), w = '';
      AC.forEach(u => { w += winR(u - 3.2, .7, 6.4, h - .7, 0); });                           // drei Portale, abends hell
      return q + wins(w);
    };
    const front = (len, h) => {
      let q = band(len, [22.4, 23.0]) + `<path class="dt rb" d="M7 6.3H${f2(len - 7)}"/>` + hl(0, len, 11.3) + hl(0, len, 11.9) + hl(0, len, 10.5), w = '';
      // Eckrisalite: Sandstein-Eckstreifen und Lisenen, oben die Uhr
      q += `<rect class="st fr" x="0" y="0" width=".7" height="${f2(h)}"/><rect class="st fr" x="${f2(len - .7)}" y="0" width=".7" height="${f2(h)}"/>`;
      [1.5, 5.5, len - 5.5, len - 1.5].forEach(u => { q += vl(u, 7, h); });
      q += vl(7, 0, h) + vl(len - 7, 0, h);
      // drei große Bogenfenster mit Archivolten, Doppelsäulchen und Medaillons in den Zwickeln
      AC.forEach(u => {
        q += ring(u, SPR, GW + .15, GW + 1.5, BOT);
        q += `<path class="dt" d="M${f2(u - GW - 2.1)} ${f2(BOT)}V${f2(SPR)}A${f2(GW + 2.1)} ${f2(GW + 2.1)} 0 0 1 ${f2(u + GW + 2.1)} ${f2(SPR)}V${f2(BOT)}"/>`;
        [-1, 1].forEach(sg => { q += vl(u + sg * (GW + .5), SPR, BOT) + vl(u + sg * (GW + 1.0), SPR, BOT);
          q += `<circle class="dt" cx="${f2(u + sg * (GW + 1.5))}" cy="${f2(SPR - GW - 1.05)}" r=".8"/><path class="dt" d="M${f2(u + sg * (GW + 1.5) - .4)} ${f2(SPR - GW - 1.05)}l.4 -.45l.4 .45l-.4 .45Z"/>`; });
        w += bigArch(u, APEX, GW, BOT, 1);
        // Arkadengruppe darüber: fünf Bögen mit Säulchen
        for (let i = 0; i < 5; i++) { const x = u - 4.35 + i * 1.9 + .35; w += winA(x, 6.3, 1.1, 3.9, 2); if (i < 4) q += vl(x + 1.1 + .4, 7.4, 10.2); }
        q += hl(u - 4.9, u + 4.9, 5.7);
      });
      // Rundbogenfries mit kleinen Schlitzfenstern, darüber durchbrochene Brüstung und Gesims
      q += hl(0, len, 4.9) + hl(0, len, 2.1) + arcs(.4, len - .4, 2.5, 1.4, .5) + arcs(0, len, .2, .9, .4) + hl(0, len, .08);
      for (let u = 7.8; u < len - 7; u += 4.2) w += winA(u, 2.7, .6, 1.8, 3);
      return q + wins(w) + H.clockSVG(3.5, 7.4, 1.35) + H.clockSVG(len - 3.5, 7.4, 1.35);
    };
    const side = (len, h) => band(len, [5.5, 6.1]) + hl(0, len, 1.9) + arcs(0, len, .2, .9, .4) + wins([0, 1, 2, 3, 4, 5, 6].map(i => winA(4 + i * (len - 8) / 6 - .7, 6.5, 1.4, 5.5, 1)).join(''));
    let s = K.box(42, -4, Z0, 56, 34, 4.4, 'rs', { S: plinth }, false);
    s += K.box(42, -4, Z0 + 4.4, 56, 34, 25.6, 'gb', { S: front, E: side, W: side });
    s += K.box(41.6, -4.4, Z0 + 30, 56.8, 34.8, .8, 'st');                                    // Kranzgesims
    // Akroterien (Greifen) auf den Eckrisaliten
    [[42.2, 28.2], [96.2, 28.2], [42.2, -3.4], [96.2, -3.4]].forEach(([x, y]) => { s += K.box(x, y, Z0 + 30.8, 1.6, 1.2, 1.4, 'st') + K.box(x + .3, y + .2, Z0 + 32.2, 1.0, .8, .9, 'st'); });
    return s + hip(K, 42, -4, 98, 30, Z0 + 30.8, Z0 + 33.4, 'sl');
  } });
  // Vordächer aus grünem Glas: durchgehend vor dem Mittelbau (über den Portalen) und über den Ladenfronten der Flügel
  add({ id: 'hbCanopy', o: .1, fp: [0, 26, 140, 34], parent: 'hbCenter', side: 'S', draw: K =>
    K.box(0, 26, Z0 + 5.6, 42, 3.6, .5, 'gl') + K.box(98, 26, Z0 + 5.6, 42, 3.6, .5, 'gl') + K.box(44, 30, Z0 + 4.4, 52, 3.6, .5, 'gl') });
  // Ernst-August-Denkmal: Natursteinsockel (Fuß, Sockelkörper, Gesims, Inschriftfeld „Dem Landesvater sein treues Volk“, Platte) und Reiterfigur als Schattenriss nach dem Foto
  add({ id: 'hbStatue', o: .8, fp: [66, 52, 74, 61.5], obj: false, draw: K => {
    const lines = (len, h) => `<path class="dt" d="M${f2(len * .2)} ${f2(h * .32)}H${f2(len * .8)}M${f2(len * .4)} ${f2(h * .52)}H${f2(len * .6)}M${f2(len * .27)} ${f2(h * .72)}H${f2(len * .73)}"/>`
      + `<rect class="dt" x="${f2(len * .1)}" y="${f2(h * .12)}" width="${f2(len * .8)}" height="${f2(h * .76)}"/>`;
    const panel = (len, h) => `<rect class="dt" x="${f2(len * .2)}" y="${f2(h * .2)}" width="${f2(len * .6)}" height="${f2(h * .6)}"/><circle class="dt" cx="${f2(len / 2)}" cy="${f2(h / 2)}" r="${f2(Math.min(len, h) * .22)}"/>`;
    let s = K.box(66, 52.4, Z0, 5.2, 8.8, .5, 'rs')                                          // Fuß
      + K.box(66.4, 52.8, Z0 + .5, 4.4, 8.0, 2.6, 'rs', { E: (l, h) => hl(0, l, h * .5), S: (l, h) => hl(0, l, h * .5) })
      + K.box(66.2, 52.6, Z0 + 3.1, 4.8, 8.4, .6, 'rs')                                      // Gesims
      + K.box(66.6, 53.0, Z0 + 3.7, 4.0, 7.6, 2.8, 'rs', { E: lines, S: panel })             // Sockelkörper mit Inschrift (Ostseite = lange Seite zum Betrachter)
      + K.box(66.2, 52.6, Z0 + 6.5, 4.8, 8.4, .7, 'rs')                                      // Kranz
      + K.box(66.5, 52.9, Z0 + 7.2, 4.2, 7.8, .4, 'st');                                     // Deckplatte
    const Zt = Z0 + 7.6, k = .0112, T = ([x, y]) => [(x - 462) * k, (y - 803) * k];
    // Schattenriss (Foto-Umriss, Pixel → Meter): Pferd im Schritt, linkes Vorderbein gehoben, Reiter in Husarenuniform mit Tschako und Federbusch, Schweif nach hinten
    const OUT = [[462,437],[470,424],[486,382],[495,332],[498,306],[508,298],[520,308],[536,300],[560,291],[590,286],[608,298],[632,312],[652,322],[674,332],[686,352],
      [700,372],[708,332],[716,288],[722,262],[717,246],[719,233],[722,218],[725,200],[731,177],[728,160],[738,112],[760,68],[772,72],[776,112],[766,166],[790,172],[796,200],[793,228],
      [797,247],[826,270],[848,312],[858,360],[862,410],[860,438],[900,436],[930,436],[944,430],
      [975,424],[1018,436],[1046,478],[1070,538],[1100,608],[1123,672],[1096,654],[1068,596],[1036,540],[1004,500],[968,486],[954,520],[952,560],
      [972,610],[990,650],[993,720],[992,772],[997,794],[950,802],[958,780],[958,730],[950,690],[930,650],[912,628],
      [902,640],[880,676],[838,722],[808,744],[806,770],[812,800],[786,803],[784,770],[798,716],[824,676],[848,630],[846,606],
      [800,608],[740,610],[700,602],[668,600],[652,640],[646,700],[642,760],[648,797],[618,803],[620,770],[622,700],[626,640],[632,612],[614,606],
      [580,600],[548,606],[520,612],[500,626],[488,650],[500,690],[522,722],[540,742],[552,754],[526,760],[504,736],[484,700],[466,664],[464,636],[476,612],[510,590],[548,566],[552,530],[548,494],[528,478],[500,478],[486,470],[470,452]];
    // innere Linien (Patina): Zügel, Schabracke, Mantel, Säbel, Reiterbein, Schweifsträhne
    const DET = ['M690 388Q600 452 494 456', 'M800 452L842 522L884 604L838 572L768 540', 'M798 252Q842 320 858 440', 'M728 420L746 628', 'M736 470L652 506L668 608', 'M1018 440Q1060 520 1100 620'];
    const pt = ([x, y]) => T([x, y]).map(f2).join(' ');
    const dPath = d => d.replace(/([MLQ])([^MLQ]+)/g, (m, c, r) => { const n = r.trim().split(/[ ,]+/).map(Number), o = []; for (let i = 0; i < n.length; i += 2) o.push(pt([n[i], n[i + 1]])); return c + o.join(' '); });
    const fig = (x, cls, extra) => K.facing(1, 0) > 0 ? K.g(K.plane([x, 60.6, Zt], [0, -1, 0], [0, 0, -1]), `<path class="${cls}" d="M${OUT.map(pt).join('L')}Z"/>${extra || ''}`) : '';
    s += fig(68.25, 'iron sd');                                                              // Rückseite der Figur (Tiefe)
    s += fig(68.6, 'brz', `<path class="gz" d="${DET.map(dPath).join('')}"/>`);
    return s;
  } });
  return { mods: M, lc: [70, 13], z0: 0, top: [70, 13, 39], label: 'Hauptbahnhof', h: 39, len: 140 };
});
