# Glossar

Eine Datei pro Begriff: `content/glossar/<slug>.md`. Der Dateiname ist der Slug
(klein, Bindestriche, ohne Umlaute; MCP → `mcp-model-context-protocol`, GEO →
`geo-generative-engine-optimization`). `npm run build:prod` baut daraus `/glossar/` und
`/glossar/<slug>/`, Sitemap und llms.txt. Fehler im Kopf brechen den Build mit Meldung ab.

## Aufbau

```
---
{ JSON-Kopf, siehe unten }
---

## Beispiel aus der Praxis

Konkreter Fall …

## Wie funktioniert …?

Hauptteil …
```

## JSON-Kopf

| Feld | Pflicht | Regel |
| --- | --- | --- |
| status | ja | `entwurf` oder `veroeffentlicht`; nur veröffentlichte Begriffe gehen live |
| begriff | ja | max. 60, Anzeigename |
| h1 | ja | max. 90, Begriff vorn, z. B. „Vektordatenbank: Definition, Funktionsweise und Beispiele“ |
| thema | ja | `ki_grundlagen`, `rag_suche`, `agenten_mcp`, `automatisierung`, `sicherheit`, `ki_sichtbarkeit`, `seo_grundlagen` |
| alternativeNamen | nein | Synonyme, Abkürzungen, englische Form (Schema `alternateName`) |
| kurzdefinition | ja | max. 300, 1–2 Sätze, beginnt mit „X ist …“; erscheint wortgleich auf Seite, Übersicht, Schema, llms.txt |
| seoTitel | nein | max. 60, Begriff vorn; Name wird nur angehängt, wenn Platz ist |
| seoBeschreibung | nein | max. 160, beantwortet „Was ist X?“; leer = Kurzdefinition |
| erstveroeffentlicht | bei Veröffentlichung | ISO-Datum, z. B. `2026-10-20T09:00:00Z` (datePublished) |
| aktualisiert | nein | ISO-Datum der letzten inhaltlichen Änderung (dateModified, „Aktualisiert am“) |
| steckbriefAussagen | bei Veröffentlichung 3–5 | Liste zitierbarer Kernaussagen |
| steckbriefFakten | nein, max. 6 | `{ "label", "wert" }`, nur Zahlen und Fakten mit Quelle |
| verwandteBegriffe | 3–8 | Slugs anderer Begriffe; nur veröffentlichte werden verlinkt |
| verwandteArtikel | nein | Blog-Slugs |
| verwandteProjekte | nein | Projekt-Slugs aus `src/app/data/works.ts` |
| quellen | bei Veröffentlichung mind. 2 | `{ "titel", "url", "abgerufen" }`, Primärquellen bevorzugen |
| faq | bei Veröffentlichung mind. 2 | `{ "frage", "antwort" }`; alle echten Suchfragen (Ahrefs/Sistrix „Fragen“), jede Antwort für sich verständlich, keine Zahlen ohne Quelle |

## Schreibregeln

- Mindestens 500, besser 800–1.500 Wörter. Lieber 10 gute als 50 dünne Seiten.
- Erster Satz der Kurzdefinition = Definition, ohne Einleitung.
- H2 als echte Suchfragen: „Wie funktioniert …?“, „Was ist der Unterschied zwischen … und …?“.
- Zahlen mit Quelle im selben Satz, z. B. „(OWASP, 2025)“. Stand-Angabe bei allem, was sich schnell ändert.
- Jeder Absatz und jede FAQ-Antwort muss ohne den Rest der Seite verständlich sein.
- Vergleiche als Tabelle. Keine erfundenen Kunden oder Ergebnisse.
- Wo ein Blogartikel das Thema ausführlich behandelt, bei der Definition bleiben und verlinken.
- `<!-- Kommentare -->` sind Notizen und erscheinen nicht auf der Seite.

## Vorschau

```
GLOSSAR_VORSCHAU=1 node scripts/glossar-daten.mjs && npx ng serve   # inkl. Entwürfe, noindex
npm run build:prod                                                   # vor dem Upload, ohne Entwürfe
```
