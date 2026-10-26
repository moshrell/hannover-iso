# Telemax — Bericht (Branch `lm/telemax`)

**Gemacht:** neues Gebäude `landmarks/telemax.js` + `landmarks/meta/telemax.json` (OSM w590712193, w724093583, w724093584). Ein Modul, 282 m: Sockel-Pyramide, verjüngter Betonschaft, Antennenfeld, 10 Plattformen mit Technikräumen und Fachwerk-Untersicht, Kopf mit 3×3 Öffnungen, weißer Mastfuß, rotbrauner GRP-Zylinder, Stahlspitze. Kein eigener Code außerhalb der erlaubten Dateien.

**Wichtig für den Sammler:** Der Turm liegt **außerhalb** der Detailzone `core` in `data/bbox.json` (Turm ≈ 52.3931 N, 9.7997 E; `core` endet bei E 9.7618). Vor dem Rendern die Zone erweitern (z. B. `--at 52.3931,9.7997,150` oder `core` nach Osten ausdehnen), sonst erscheint er nur grob.

## Seite → Kadr
| Seite | Kadr | Hinweis |
|---|---|---|
| Süd/Südost (Kartenansicht) | v_01, v_02, v_03 | v_03 Hauptvorlage |
| West | v_04 | Plattform-Untersichten |
| Nordwest | v_05 | Kopf, Plattformstapel |
| Nordost | v_06 | Mast |

## Nicht sichtbar / nach Analogie
- Kontrollraum am Sockel (laut visit-hannover «asymmetrisch platziert»): nicht klar erkennbar, nicht gezeichnet.
- Alle vier Seiten identisch gezeichnet (Schaft, Panels, Plattformen); echte Unterschiede einzelner Seiten (Panels sichtbar nur auf manchen Seiten) nicht belegt.
- Keine Nachtaufnahme: keine Sonderbeleuchtung (Magenta-Anstrahlung zu CeBIT war nur gelegentlich; Wikipedia/visit-hannover).
- Rote Hinderniskennzeichnung nicht gezeichnet.

## Fakten (zwei Quellen)
282 m, 1992 fertig (Wikipedia, visit-hannover); Aussichtsplattform 185 m nicht öffentlich, 85 t Stahlmast, 30 m GRP-Zylinder (visit-hannover). Maße der Plattformen und des Schafts sind aus den Kadern geschätzt, nicht amtlich.

## Sichtprüfung
- `vergleich-1.png` (Start) → `vergleich-2.png` (Schaft dünner, Sockel kleiner, Technikräume) → `vergleich-3.png` (Panel, Kopf) → `vergleich-4.png` (Plattformen schmaler, mehr Luft dazwischen). Links Studio, Mitte v_03, rechts v_05. Rest: Detail unter Fenstergröße.
- Studio: `telefon-390.png` (390 px; Turm ist schmal, ≈ 190 px breit, ganz im Bild).
- `sh tools/preview.sh telemax` nicht gemacht: außerhalb der Detailplatten gibt es keine Karte zum Vergleichen.

## Für Sammler / `core/`
- Bounding-Box erweitern (siehe oben); danach `render-tiles.mjs --at …`.
- Hinweis an die Werkzeuge: `tools/studio-shot.mjs`, `preview.sh`, `map-crop.mjs` suchen Chromium 1194, ist jetzt 1243 (`CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`); `map-crop.mjs` ruft `SCENE.region` nicht auf (schwarzes Bild).
- `tools/new-landmark.py` akzeptiert mehrere OSM-IDs nicht (`w1,w2` schlägt fehl); ich habe die zweite/dritte ID von Hand in die JSON geschrieben.
