---
version: 1
slug: "src-app-components-pages-home-home-component-html"
primary_target: "src/app/components/pages/home/home.component.html"
related_targets: []
---

## Scope

Gesamtes Portfolio, drei Ebenen: Startseite `/`, Werkverzeichnis `/arbeiten`, Fallstudien `/arbeiten/:slug`. Bestehende Routen `/impressum`, `/datenschutz`, `/facts` erben dasselbe System.

Besuchermodus: **Experience** — die Arbeit führt ab dem ersten Bild. Die Fallstudienseiten kippen nach **Read**: Verständnis und Wegfindung schlagen dort Ausdruck.

## Audience, job, action

Zwei gleichrangige Leser (siehe PRODUCT.md): Entscheider im Unternehmen und Hiring Manager. Beide bewerten unter Skepsis und Zeitdruck. Gesuchte Handlung: eine qualifizierte Kontaktaufnahme nach mindestens einer gelesenen Fallstudie.

## Direction contract

**THESIS:** Ein editoriales Werkverzeichnis auf warmem Papier, in dem die Arbeit selbst führt und die technische Systemlogik erst auf der zweiten Ebene erscheint. Verweigert wird die Anordnung dieser Kategorie: Sektionen aus gleich großen Karten.

**OWN-WORLD:** Papier `#F5F2ED`, Papier tief `#EBE7E0`, Platte `#1C1B19`, Tusche `#1A1917`, Tusche sekundär `#6E6A63`, Linie `#D6D1C8`, ein Akzent Petrol `#17403C`. Auf Plattengrund invertiert die Palette zu benannten Gegenwerten, nie über Deckkraft: Kreide `#E8E4DC`, Kreide sekundär `#8A857C`, Linie auf Platte `#3A3833`, Petrol auf Platte `#3F8C79`. Source Serif 4 (Display und Lesetext), Archivo (Meta, Navigation, Tabellen), Spline Sans Mono (nur Systembilder und Kenndaten). Haarlinien statt Rahmen. Keine Karte, kein Kasten, kein Verlauf, kein Glas, keine Deckkraft-Mischung; Radius höchstens 2px. Linienstärken nur 0,75 / 1 / 2 px.

**STORY:** Der Leser versteht in einem Satz, dass Ozan die ganze Kette baut; er glaubt es, weil er die Arbeit groß und die Systemlogik echt sieht, nicht weil sie behauptet wird; er schreibt.

**FIRST VIEWPORT:** Kopfzeile über Haarlinie, Name links, drei Wörter Navigation rechts, kein Balken, kein Logo. Positionierungssatz in Source Serif 4 über Spalten 1–8, `clamp(38px, 5.4vw, 76px)`, flatternd rechts, drei Zeilen. Darunter Spalten 1–5 ein Absatz Lesetext, Spalten 9–12 ein dreizeiliger Metablock in Archivo, tracked, Versalien — Rolle, Ort, Jahr, **keine Verfügbarkeitszeile**. Volle Haarlinie. Direkt darunter beginnt Arbeit 01: das Hermes-Foto randabfallend auf Plattengrund, 72vh, Nummer und Stack in der Marginalie. Primäre Handlung ist die Arbeit selbst; „Kontakt aufnehmen“ steht als beschriftete Linie in der Kopfzeile und am Seitenfuß, nie als Pille.

**FORM:** Kategoriestandard, der stehende Ausgang, vom Nutzer gegen den Wurf gewählt; stand außerhalb meiner Rangliste. Seed `eb875ac5`. Handwerks-Messlatte: anthropic.com, claude.com, tarikkarahodzic.dev.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Ansprache

Durchgängig **Du**, ausnahmslos, auf jeder Seite. Der bestehende Sie-Bruch im Kontaktbereich („Lassen Sie uns zusammernarbeiten“, inklusive Tippfehler) wird ersetzt.

## Projekthierarchie

**Selected Work — fünf Kernarbeiten, feste Reihenfolge.** Jede trägt eine Tafel, eine eigene Fallstudienseite und einen Kenndatenblock.

| Nr. | Arbeit | Tafel-Art |
|---|---|---|
| 01 | Hermes Pocket AI Agent | echtes Hardwarefoto |
| 02 | Grounding Page Generator — Self-Service (Agentic) | abstrahierter Workflow, dazu anonymisierte UI-Ansichten |
| 03 | Wissensbasis — RAG-Pipeline + MCP-Server | Systemarchitektur (SVG) |
| 04 | AI Visibility Monitoring Platform | anonymisierte System-/Dashboarddarstellung |
| 05 | Recruiting Jobs Sync | Datenfluss- und Synchronisationsdiagramm (SVG) |

**Weitere Arbeiten** — unterhalb der fünf, ohne Tafel, als haarlinien-getrennte Zeilen: Conversational AI Meeting Assistant. Offene Entscheidung des Nutzers: ob „Production & Operations“ als eigener Abschluss-Abschnitt erscheint und wie mit den zuvor gelisteten, nicht mehr benannten anonymisierten Workflows verfahren wird.

**Ausbildungsprojekte — Developer Akademie** — eigene Überschrift weiter unten, ohne Tafel, kleinerer Grad, eigene Detailseiten zulässig: DaBubble, Join, Pokedex, El Pollo Loco. Die Trennung entsteht aus Hierarchie, nie aus einem Behälter.

## Motiv-Korrektur Hermes

Arbeit 01 zeigt ein **physisches Handheld-Gerät** — ein M5Stack StickS3 mit Gehäuse, 135 × 240-px-Display und Hardware-Button, in der Hand gehalten. Es ist **keine Platine**, keine offene Elektronik, kein Board. Jede Bildunterschrift, jeder Alternativtext und jede Textzeile, die das Gegenteil behauptet, ist ein Sachfehler.

## Fallstudien-Aufbau (einheitlich, fünf Kernarbeiten)

1. **Tafel** — randabfallend auf Plattengrund, das größte Element der Seite.
2. **Kenndatenblock** — Rolle, Zeitraum, Stack, Status, Vertraulichkeit als haarlinien-gegliederte Definitionsliste, nicht als Badges. Der Status wird wörtlich aus der Doku übernommen, inklusive „aktuell nicht aktiviert“ bei Recruiting Jobs Sync und „funktionsfähiger Prototyp“ bei Hermes.
3. **Problem** — die betriebliche Reibung, aus der die Arbeit entstand.
4. **Systembild** — handgesetztes SVG auf Plattengrund; 0,75-px-Petrol-Flusslinien, 1-px-Tusche-Knotenlinien, keine gefüllten Kästen, Beschriftung in Spline Sans Mono 11px. Echte Dienst- und Knotennamen, echte Flussrichtung.
5. **Stromtabelle** — nummerierter Punkt, Auslöser, Verarbeitung, Ziel, Zustand. Tabellenziffern, eine Haarlinie unter der Kopfzeile, kein Zebra, keine Rahmen.
6. **Zentrale Entscheidungen** — die Engineering-Entscheidungen der Doku, in Prosa, ohne Aufzählungsinflation.
7. **Offene Punkte** — was nicht gemessen wurde und welche Praxis fehlt, wörtlich in der Haltung der Doku. Dieser Abschnitt wird nicht weggelassen und nicht geglättet; er ist der Grund, warum die Fallstudien glaubwürdig sind.

## Signature interaction

**Vorher/Nachher im gleichen Rahmen.** Ein Bedienelement schaltet denselben Diagrammrahmen zwischen `manuell` und `automatisiert`. Knoten, die bleiben, bewegen sich nicht; verschwindende Knoten fallen auf eine 0,75-px-Kontur zurück, neue Knoten und Flusslinien zeichnen sich ein. Nur das Veränderte bewegt sich. Tastaturbedienbar; unter `prefers-reduced-motion` ein reiner Zweizustands-Umschalter ohne Übergang.

**Nur zwei Einsatzorte, weil nur dort ein Vorzustand belegt ist:**

- **Grounding Page Generator** — belegt: „Die Erstellung war Handarbeit von Spezialisten“.
- **AI Visibility Monitoring Platform** — belegt: „Manuelle Zusammenführung ist aufwendig“ und „Der Wirkungsnachweis läuft ohne manuelle Datensammlung“.

**Ohne Vorher/Nachher, weil unbelegt:** Hermes (kein Vorzustand dokumentiert), Wissensbasis (der Vergleich ist eine Architekturalternative, kein Vorprozess), Recruiting Jobs Sync (die Doku beschreibt Quellenbeschränkungen, keinen manuellen Vorgängerprozess). Diese drei bekommen ein statisches Systembild in derselben Sprache.

## Motion grammar

Kein Scroll-Reveal. Die bestehende `RevealDirective` und ihre sechs Varianten entfallen ersatzlos. Bewegung besteht aus genau drei Dingen: dem Zeichnen im Systembild, einem 120-ms-Farbwechsel an Links und Navigation, und dem Einblenden großer Bilder aus dem Plattengrund beim Dekodieren (Opazität, keine Transformation). Kein Parallax, kein Hover-Scale, kein Glühen, kein Float, kein Shimmer.

## Werkverzeichnis

Kein Raster. Einspaltiges Verzeichnis aus haarlinien-getrennten Zeilen. Die fünf Kernarbeiten tragen je eine randabfallende Tafel unter ihrer Zeile; „Weitere Arbeiten“ und „Ausbildungsprojekte — Developer Akademie“ stehen unter eigenen Überschriften ohne Tafel und in kleinerem Grad.

## Constraints

- Angular 20/21, SCSS, `lucide-angular` als einzige Icon-Familie.
- Keine erfundenen Kennzahlen, Kunden, Features, Nutzerzahlen oder Resultate. Es wird ausschließlich übernommen, was durch die beiden verifizierten Projektdokumentationen oder vorhandenen Code belegbar ist.
- Keine Kunden-, Firmen-, Domain-, ID- oder Personennamen in Text, Bild oder Alternativtext.
- Die in der AI-Visibility-Doku benannten eigenen Sicherheitsbefunde erscheinen nicht auf der Seite.
- Vertrauliche Arbeiten ausschließlich als Abstraktion oder anonymisierter Nachbau, erkennbar gekennzeichnet.

## Unresolved

- SSR/Prerendering ja oder nein.
- Ob „Production & Operations“ als eigener Abschluss-Abschnitt erscheint.
- Umgang mit den in der neuen Hierarchie nicht mehr benannten anonymisierten Workflows.
- Fehlendes Bildmaterial: Arbeit 01 (Hermes-Hero in ausreichender Auflösung), 02 (UI-Ansichten) und 04 (anonymisierte Dashboarddarstellung). Arbeit 03 und 05 sind mit den gesetzten Systembildern unter `public/assets/diagrams/` versorgt.
- Systembilder liegen je Format doppelt vor (`-quer.svg` ab 900 px Viewport, `-hoch.svg` darunter). Sie werden inline eingebunden, damit `currentColor` und die Schriften der Seite greifen; die Umschaltung erfolgt über zwei `<svg>`-Elemente mit `hidden`, nicht über CSS-Skalierung.
