# Neues Rathaus — Stand und Entscheidungen (26.10.2026)

Datei: `landmarks/neues-rathaus.js` (Meta: `landmarks/meta/neuesRathaus.json`). Fotos + Index: `foto/`, `INDEX.md`.

## Was geändert wurde
- **Grundriss nach OSM-Umriss (r313173)** statt Schätzung: Körper x 1,5…128, y 0…62; Flügel nur ≈12 m dick; Höfe 22×38 m (x 12,7…34,4 und 95,3…117,4); Mittelblock 61 m breit. Nordportal 19,5 m breit mit zwei Achtecktürmen (x 47 / 82,3), Südrisalit 34 m, Seitentürme x 19,5 / 100. Ost-/West-Risalite nur 1,5 m vorgezogen, Eckpavillons bündig.
- **Mittelblock**: Mansarddach (steile rote Flanken + flaches Schieferdeck), Glasdach östlich am Kuppelfuß.
- **Dachneigung** steil (First +10 m über Traufe).
- Bodenplatte eng um den Bau (vorher viel zu groß).

## Licht (gilt für alle Wahrzeichen, core/)
- Fenster am Abend: 22 % dunkel (`off`), 20 % gedimmt, 14 % strahlend, Rest warmgelb. Vorher leuchteten fast alle gleich hell → dichte Fassaden wirkten überbelichtet.
- Wandverlauf: jede Wand bekommt drei Overlay-Rechtecke (`wsh` oben abgedunkelt, `wsl` Sockel erwärmt), Opazität nur bei Abendlicht (`core/iso.css`). Stein-/Dachfarben und Linienfarbe gedämpft (Linien #A68E58 statt #C9AE72). Kestner-Beton etwas dunkler.
- Neue Animation (`studio.js`): Laternen → Fenster flackern etagenweise auf (`wflick`) → Anstrahlung wandert von unten nach oben → Laternenkrone zuletzt. Danach Ruhezustand mit Leben: Laternenkrone „atmet“, Sterne funkeln, ein Dutzend Fenster flackert gelegentlich. Alles per `element.style` (CSP). Bleibt am Ende an; der Knopf schaltet auf Nacht zurück.

## Bekannte Lücken
- Dome: Rippenlinien noch dichter als im Original; Zierrat (Figuren, Türmchen auf den Giebeln) vereinfacht.
- Terrasse/Freitreppe/Balustrade der Südseite nur als Bodenplatte angedeutet.
- Gerüste (Foto) absichtlich nicht gezeichnet.
