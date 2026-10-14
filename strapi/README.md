# Glossar: Strapi-Inhaltstyp und Blog-MCP-Werkzeuge

Diese Dateien gehören in das Strapi-Projekt auf dem Server, nicht in die Website.

## 1. Inhaltstyp installieren

Strapi läuft im Produktionsmodus, der Content-Type Builder ist dort gesperrt. Deshalb die Dateien
direkt ins Strapi-Projekt kopieren:

```
strapi/src/api/glossarbegriff/   →  <strapi-projekt>/src/api/glossarbegriff/
strapi/src/components/glossar/   →  <strapi-projekt>/src/components/glossar/
```

- Ist das Strapi-Projekt in JavaScript statt TypeScript, die drei `glossarbegriff.ts` in `.js`
  umbenennen (Inhalt bleibt gleich).
- `verwandteArtikel` zeigt auf `api::article.article`. Heißt der Blog-Inhaltstyp anders, diese
  Zeile vor dem Start anpassen, sonst startet Strapi nicht.
- Vorher Datenbank sichern. Dann neu bauen und starten (`npm run build` + Neustart bzw.
  `docker compose up -d --build`).

## 2. Rechte

- Settings → API Tokens → der Build-Token der Website: bei **Glossarbegriff** `find` und `findOne`
  erlauben. Ohne das bleibt das Glossar beim Build leer (das Build-Skript bricht nicht ab).
- Der Token des Blog-MCP-Servers braucht zusätzlich `create`, `update` und `publish`.

## 3. Felder

| Feld | Typ | Regeln |
| --- | --- | --- |
| begriff | Text | Pflicht, max. 60 |
| slug | UID aus begriff | Pflicht, klein, Bindestriche, keine Umlaute |
| h1 | Text | Pflicht, max. 90, Hauptbegriff am Anfang |
| alternativeNamen | JSON (Liste von Texten) | Synonyme, Abkürzungen, englische Form |
| thema | Enumeration | ki_grundlagen, rag_suche, agenten_mcp, automatisierung, sicherheit, ki_sichtbarkeit |
| kurzdefinition | Text | Pflicht, max. 300, 1 bis 2 Sätze, beginnt mit „X ist …“ |
| steckbriefAussagen | Komponente glossar.aussage {text} | 3 bis 5 |
| steckbriefFakten | Komponente glossar.fakt {label, wert} | 0 bis 6, nur Fakten mit Quelle |
| beispiel | Markdown | Abschnitt „Beispiel aus der Praxis“, ohne eigene Überschrift |
| inhalt | Markdown | Hauptteil, `## ` als Suchfragen |
| faq | Komponente glossar.faq {frage, antwort} | 2 bis 4 |
| verwandteBegriffe | Relation Glossarbegriff | 3 bis 8 |
| verwandteArtikel | Relation Article | optional |
| verwandteProjekte | JSON (Liste von Projekt-Slugs) | nur bestehende Slugs |
| quellen | Komponente glossar.quelle {titel, url, abgerufen} | mindestens 2 |
| seoTitle | Text | max. 60, Begriff vorn |
| seoDescription | Text | max. 160, beantwortet „Was ist X?“ |
| erstveroeffentlicht | Datum mit Uhrzeit | wie beim Blog, für datePublished |

## 4. Werkzeuge im Blog-MCP-Server (Vorlage)

Der Code des Blog-MCP-Servers liegt nicht in diesem Repo. Die Werkzeuge analog zu den
Blog-Werkzeugen anlegen, gegen `/api/glossarbegriffe`:

**glossar_auflisten** · Parameter: `status` (`draft` | `published`).
Beschreibung: „Listet Glossarbegriffe von ozan-orhan.com/glossar mit documentId, begriff, slug,
thema, Status und updatedAt. Vor dem Anlegen prüfen, ob es den Begriff schon gibt.“

**glossar_entwurf_anlegen** · legt nur einen Entwurf an (`status=draft`), veröffentlicht nie.
Beschreibung: „Legt einen Glossarbegriff als Entwurf an. Pflicht: begriff (max. 60), slug
(klein, Bindestriche, ohne Umlaute; MCP → mcp-model-context-protocol, GEO →
geo-generative-engine-optimization), h1 (max. 90, Begriff vorn), thema (ki_grundlagen,
rag_suche, agenten_mcp, automatisierung, sicherheit, ki_sichtbarkeit), kurzdefinition (max. 300,
erster Satz ‚X ist …‘, wortgleich überall verwendet), steckbriefAussagen (3–5), beispiel und
inhalt als Markdown (H2 als echte Suchfragen, Zahlen mit Quelle im selben Satz, jeder Absatz
für sich verständlich, mindestens 500 Wörter gesamt), faq (2–4), verwandteBegriffe (3–8),
quellen (mindestens 2, Primärquellen, mit Abrufdatum), seoTitle (max. 60), seoDescription
(max. 160), erstveroeffentlicht. Keine erfundenen Kunden, Zahlen oder Ergebnisse.“

**glossar_aktualisieren** · Parameter: `documentId` und die zu ändernden Felder; schreibt nur den
Entwurf. Beschreibung: „Aktualisiert den Entwurf eines Glossarbegriffs. Ändert nie die
veröffentlichte Fassung; danach glossar_veroeffentlichen nur nach Bestätigung durch Ozan.“

**glossar_veroeffentlichen** · Parameter: `documentId`.
Beschreibung: „Veröffentlicht einen Glossarbegriff. Nur aufrufen, wenn Ozan ausdrücklich
bestätigt hat. Danach muss die Website neu gebaut und hochgeladen werden.“

## 5. Testdaten

`scripts/glossar-vorschau.json` enthält die zehn Begriffe aus Welle 1 (Begriff, Slug, H1, Thema,
Kurzdefinition, FAQ, Verweise, Quellen ohne Abrufdatum). Sie dienen nur zum Testen der Vorlage:

```
GLOSSAR_VORSCHAU=1 npm run build:prod   # Vorschau, Seiten sind noindex
npm run build:prod                      # danach immer normal neu bauen, erst dann hochladen
```

Für Strapi können die Einträge als Ausgangspunkt der Entwürfe dienen.
