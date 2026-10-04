# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Zwei gleichrangige Primärzielgruppen, die dieselbe Seite unterschiedlich lesen:

1. **Entscheider in Unternehmen** (Geschäftsführung, Bereichsleitung, Operations, Marketing/SEO), die Automatisierung oder KI-Integration einkaufen wollen. Situation: ein Prozess dauert zu lange, läuft manuell oder ist fehleranfällig. Job: einschätzen, ob Ozan das Problem versteht, es schon einmal gelöst hat und vertrauenswürdig ist.
2. **Hiring Manager und Tech Leads**, die eine Festanstellung besetzen. Job: technische Tiefe, Architekturentscheidungen und Codequalität beurteilen.

Beide Gruppen müssen ohne Umweg bedient werden. Die Seite darf für keine der beiden zur Kompromissfassung werden: geschäftliche Wirkung und technische Substanz stehen nebeneinander, nicht anstelle voneinander.

Sprache: Deutsch (`de-DE`).

## Product Purpose

Persönliches Portfolio von Ozan Orhan, AI Automation Engineer aus Hannover. Es soll seine stärkste Arbeit so zeigen, dass sie als ernsthafte Ingenieursarbeit gelesen wird — nicht als Sammlung von Tool-Demos.

Erfolg: eine qualifizierte Kontaktaufnahme (Projektanfrage oder Gespräch über eine Anstellung) durch jemanden, der vorher mindestens eine Fallstudie in Tiefe gelesen hat.

## Positioning

Ozan baut die gesamte Kette selbst: von der Prozesslogik im Hintergrund über API- und Datenanbindung bis zur Oberfläche im Frontend — und auf der Hardware-Seite bis zum physischen Gerät. Das unterscheidet ihn sowohl von reinen n8n-/No-Code-Automatisierern (keine eigene Frontend- und Systemtiefe) als auch von reinen Frontend-Entwicklern (keine Prozess- und Integrationstiefe).

Arbeitsweise als Teil der Positionierung: Ausgangspunkt ist immer ein konkretes betriebliches Problem, nicht eine Technologie. Schnell live gehen, dann gezielt verbessern.

## Operating Context

- Ozan arbeitet aus Hannover, Deutschland; Leistungsgebiet Deutschland.
- Ein wesentlicher Teil der Arbeit entsteht in Unternehmenskontexten unter Vertraulichkeit. Kunden-, Unternehmens- und personenbezogene Daten dürfen niemals gezeigt werden — auch nicht in Screenshots oder Beispieldaten.
- Wiederkehrende Werkzeuge und Umgebungen der tatsächlichen Arbeit: n8n, MCP-Server, LLM-APIs (OpenAI, Claude) sowie lokal gehostete Modelle, Python, Angular/TypeScript, Supabase/PostgreSQL/Firebase, Docker, REST-APIs und Webhooks.
- Besucher kommen häufig über Suche und über direkte Weitergabe des Links; das Portfolio wird auch mobil gelesen.

## Capabilities and Constraints

**Bestehender Stack (bindend):** Angular 20/21 mit Standalone Components, TypeScript, SCSS, `lucide-angular` als einzige Icon-Familie. Tailwind v4 ist installiert, aber faktisch ungenutzt. Kein SSR/Prerendering aktiv.

**Bestätigte Struktur (Entscheidung des Nutzers):** Startseite → Werk-Übersicht → Detailseiten. Die vier Kernarbeiten erhalten eigene, editorial gesetzte Fallstudienseiten; die Ausbildungsprojekte behalten eigene Detailseiten in reduzierter Form.

**Bestehende Routen, die erhalten bleiben:** `/impressum`, `/datenschutz`, `/facts`.

**Technische Altlasten, die aufzulösen sind:** widersprüchliche Token-Quellen (`src/styles/_variables.scss` gegen `design-system/ozanportfolio/MASTER.md`), globaler Bild-Filter in `src/styles.scss` (`hue-rotate` auf alle Logo-Dateinamen), doppelte `n8n-workflow-block`-Komponente, Versionsdrift `@angular/animations` gegen Core.

**Geklärt:** Die AI Visibility Monitoring Platform ist Enterprise-Arbeit und wird anonymisiert dargestellt (Enterprise-Case-Study der verifizierten Doku). Messbare Ergebniszahlen existieren zu keiner der fünf Kernarbeiten; die Dokumentationen weisen die jeweiligen Messlücken ausdrücklich aus, und die Seite übernimmt diese Ehrlichkeit statt sie zu füllen.

**Offen / noch nicht entschieden:** ob SSR/Prerendering eingeführt wird; ob „Production & Operations“ als eigener Abschluss-Abschnitt erscheint; wie mit den zuvor gelisteten, in der neuen Hierarchie nicht mehr benannten anonymisierten Workflows verfahren wird.

## Brand Commitments

- Name und Identität: Ozan Orhan, AI Automation Engineer, Hannover.
- Domain `ozan-orhan.com`; E-Mail `contact@ozan-orhan.com`; GitHub `ozanorhn`; LinkedIn `ozan-o-7014a22a3`.
- Icons ausschließlich aus `lucide-angular`, keine Emojis als Icons.
- **Ansprache: durchgängig Du.** Vom Nutzer entschieden; gilt für jede Zeile auf jeder Seite, inklusive Formularen, Fehlermeldungen und rechtlichen Seiten, soweit dort zulässig.
- **Keine Verfügbarkeitszeile.** Vom Nutzer entschieden; im Metablock des ersten Bildes entfällt jede Aussage zur Verfügbarkeit.
- **Stehende visuelle Präferenz (vom Nutzer gewählt):** der Kategoriestandard des editorialen Portfolios, in voller Ausführung und ohne Ironie — warmes Papier, starke Serifentypografie, viel Weißraum, dünne Linien, große Projektbilder, ruhige editoriale Hierarchie. Ergänzt um eine eigene technische Signatur, die ausschließlich innerhalb der Projektseiten erscheint: dezente System- und Datenflusslinien, Architekturdiagramme und technische Metadaten. Ausdrücklich ausgeschlossen: industrielle Fließbild-Optik über die ganze Website, generische KI-Ästhetik, und eine n8n-Leinwand als Hauptgestaltung. Die Seite wirkt zuerst wie ein hochwertiges Editorial-Portfolio und zeigt erst auf den zweiten Blick die technische Systemlogik.
- **Handwerks-Messlatte (vom Nutzer benannt):** anthropic.com, claude.com, tarikkarahodzic.dev. Ihr Ausführungsniveau ist die Grenze, nicht ihr Aussehen; die Seite darf keiner davon gleichen.
- Der Nutzer hat als bindende Ausschlüsse benannt: generische KI-Portfolio-Ästhetik, übermäßige Kartenraster, Farbverläufe, Glassmorphism, unnötige Badges, übertriebene Eckenrundung, generische SaaS-Sektionen, Bootcamp-artige Projektraster.

## Evidence on Hand

Faktenbasis: zwei verifizierte Projektdokumentationen des Nutzers, entstanden aus einer separaten Analyse der tatsächlichen n8n-Instanz und der Hermes-Implementierung. Beide Dokumente benennen fehlende Messungen und fehlende Praktiken ausdrücklich als offene Punkte. Diese Ehrlichkeit ist Teil der Substanz und wird auf der Seite nicht geglättet.

### Selected Work — fünf Kernarbeiten, in dieser Reihenfolge

**1. Hermes Pocket AI Agent** — selbst gehosteter, sprachgesteuerter KI-Agent mit einem **physischen Handheld-Gerät** als Interface: M5Stack StickS3 (ESP32-S3, 8 MB Flash, 8 MB PSRAM, 135 × 240 px Display, Mikrofon, Lautsprecher, WLAN, Akku, zwei Hardware-Buttons). Das Gerät ist ein Handgerät mit Gehäuse und Display, **keine offene Platine**. Der Stick nimmt PCM16/16 kHz/Mono auf und sendet an einen Voice Relay; STT über Whisper Large V3 via OpenRouter; die Agentenlogik liegt im selbst gehosteten Hermes Agent (Docker, VPS, Traefik) mit Sessions, Langzeitgedächtnis und MCP-Tools (Todoist, Notion, Google Workspace, Spotify, Web, Memory, Session Search); TTS über Fish Audio S2.1 Pro mit Piper als lokalem Fallback. Besonderheiten: Todoist-Self-Healing, FreeRTOS-Trennung von UI- und Netzwerk-Task, mehrstufige Energiesparlogik, WLAN-Fallback-Hotspot. Stack: C++, ESP32-S3, FreeRTOS, PlatformIO, Python, FastAPI, Docker, Traefik, MCP, OpenRouter.
*Status:* funktionsfähiger Prototyp, laufende Weiterentwicklung. *Offen laut Doku:* vollständige ChatGPT-OAuth-Anbindung für Remote MCP, Akkulaufzeit, zusätzliche Modell-Fallbacks, Memory-Retrieval-Feintuning, Google-Contacts.
*Bild:* echtes Hardwarefoto. Vorhanden: `public/assets/img/pocket-agent.jpg`, 1086 × 700 px — zeigt korrekt das Handgerät in der Hand, ist für randabfallende Darstellung jedoch zu klein.

**2. Grounding Page Generator — Self-Service (Agentic)** — dreistufiger Self-Service-Flow als ein n8n-Workflow mit 21 Nodes: Formular → Research-Agent (LLM mit Web-Such-Tool, schema-gebundene Ausgabe mit `sources_used`, `confidence`, `user_input_needed`) → **menschliche Validierung zwischen den beiden Modellaufrufen** → deterministisches Merge → Generierungs-Chain → fertiges HTML-Dokument mit Download und kopierbaren Blöcken. Kernentscheidungen: Trennung von Recherche und Generierung in zwei Aufrufe; Pflichtfelder, die das Modell nicht beantworten darf; „nicht wissen“ als gültiges Ergebnis; Nutzereingabe schlägt KI, aber nur wenn vorhanden; Graceful Degradation bei Scraping-Ausfall in den bereits existierenden Pfad „keine URL“.
*Status:* produktiv im Einsatz. *Nicht gemessen:* Durchlaufzeit gegenüber manueller Erstellung, Nutzungsvolumen. *Offen laut Doku:* kein Rate-Limiting am öffentlichen Formular, Prompt-Injection-Fläche durch ungefilterten Fremdinhalt im Agent-Kontext, kein automatisiertes Testing.
*Bild:* abstrahierte Workflow-Darstellung (von mir als SVG gesetzt) plus anonymisierte UI-Ansichten der drei Formularstufen.

**3. Wissensbasis — RAG-Pipeline + MCP-Server** — internes Wissen als Infrastruktur-Ressource statt als Kopie in einzelnen Assistenten. Zwei bewusst getrennte Workflows entlang der Schreib-/Lese-Grenze: Ingest (Batch, manuell ausgelöst — Dokumente laden, Chunking, mehrsprachige Embeddings, Vektor-Store auf Postgres) und Serving (dauerhaft aktiv, **drei Nodes** — MCP-Server-Trigger, semantische Suche über eine dedizierte Match-Funktion in der Datenbank, identisches Embedding-Modell). Kernentscheidungen: MCP statt eingebettetem Tool, damit beliebige Clients andocken; Ingest und Serving einzeln deploybar; mehrsprachiges Embedding wegen deutscher Inhalte bei gemischten Anfragen; die Tool-Beschreibung als öffentlicher API-Vertrag behandelt.
*Status:* produktiv aktiv. *Nicht gemessen:* Anzahl angebundener Clients, Trefferqualität. *Offen laut Doku:* keine automatische Re-Ingestion bei Dokumentänderungen, keine Authentifizierung und keine Mandantentrennung am MCP-Endpunkt, keine Evals, keine Query-Protokollierung.
*Bild:* Systemarchitektur (von mir als SVG gesetzt). Ausdrücklicher Hinweis der Doku: als Canvas-Screenshot verkauft sich diese Arbeit schlecht, weil ihre Stärke in der Architektur und nicht in der Node-Anzahl liegt.

**4. AI Visibility Monitoring Platform** — Enterprise-Fallstudie über drei zusammenwirkende Komponenten und zwei Systeme, die drei getrennte Fragen beantworten: (a) täglicher Sync externer KI-Sichtbarkeitsquellen plus Analyse-Agent, der priorisierte Maßnahmen ableitet; (b) tägliches Intelligence-Dashboard aus Webanalyse, Suchkonsole und Backlink-API mit Anomalieerkennung, das Aufgaben im Projektsystem anlegt; (c) 14-tägige Zielüberprüfung, **extern von einem Agent-System per Webhook angestoßen, mit synchroner Antwort**. Die Architekturaussage: n8n ist hier kein Automatisierungstool, sondern ein Rechen-Service hinter einem Agenten — der Agent besitzt Auslösung und Kommunikation, n8n Datenbeschaffung und Auswertung. Kernentscheidungen: Signal-Voting statt Schwellwert auf einer Metrik, mit „gemischt“ als eigenem Ergebnis; Fallback-Kette bei Ranking-Quellen, wobei fehlende Werte nicht als Null gelten; Rauschunterdrückung im Bericht bei gleichzeitiger Transparenz über die Unterdrückung; defensive, rekursive Extraktion aus instabilen Fremd-API-Strukturen; deterministische Nachbearbeitung hinter dem Modell; stabile Schlüssel für Upsert.
*Status:* drei produktive Komponenten, fünf externe Datenquellen, ein zweites Agent-System integriert. *Nicht gemessen:* eingesparte Arbeitszeit, Trefferqualität der abgeleiteten Maßnahmen.
*Bild:* anonymisierte System- bzw. Dashboarddarstellung; keine Kunden-, Firmen- oder Domainnamen.
*Nicht auf der Seite zeigen:* die in der Doku benannten eigenen Sicherheitsbefunde (Klartext-Zugangsdaten, deaktivierte Zertifikatsprüfung, unauthentifizierter Webhook). Sie sind ein internes Review-Ergebnis mit laufender Behebung, kein Portfolio-Inhalt.

**5. Recruiting Jobs Sync** — täglicher Batch mit 11 Nodes, der Stellenausschreibungen aus HTML-Seiten ohne API und ohne Änderungsmeldungen in einen konsistenten strukturierten Bestand überführt. Der Kern ist nicht die Extraktion, sondern die Konsistenz über die Zeit: ein **Lauf-Zeitstempel als Wahrheitsanker** markiert alles Gesehene, danach werden alle aktiven Zeilen mit älterem `last_seen_at` auf inaktiv gesetzt. Weitere Entscheidungen: weiches Deaktivieren statt Löschen; Slug aus der URL als natürlicher Schlüssel und damit Idempotenz ohne eigenen Schlüsselraum; deterministische HTML-Bereinigung vor dem Modell; Enum-Constraint auf Seniorität gegen Divergenz über Läufe; Batchgröße 1 gegen Durchsatz, für Fehlerisolierung. Die Deaktivierungslogik ist selbstheilend — fälschlich deaktivierte Einträge kommen beim nächsten erfolgreichen Lauf zurück.
*Status:* implementiert und lauffähig, **aktuell nicht aktiviert**. *Nicht gemessen:* Extraktionsgenauigkeit. *Offen laut Doku:* kein Retry auf den HTTP-Abrufen, kein Error-Workflow, keine Plausibilitätsprüfung vor Massendeaktivierung.
*Bild:* Datenfluss- und Synchronisationsdiagramm (von mir als SVG gesetzt).

### Weitere Arbeiten

- **Conversational AI Meeting Assistant** — strukturiert gesprochene Sprache per LLM, extrahiert Action Items und leitet sie an Slack/Mail weiter. Stack: n8n, OpenAI API, Prompt Engineering, Google Workspace, Slack API. Bleibt sichtbar, aber unterhalb der fünf Kernarbeiten und ohne eigene Tafel. Vertraulich; ausschließlich abstrahiert darstellbar.
- **Production & Operations** — Betriebsschicht über der gesamten n8n-Instanz: zentraler Error-Workflow als Konfiguration statt Kopie; wöchentliche gebündelte Alert-Zusammenfassung gegen Alert-Ermüdung; stündliche LLM-Kostenerfassung als fortgeschriebene Zeitreihe mit persistentem Workflow-State, inklusive Klemmung negativer Differenzen nach Guthabenaufladung. Ehrliche Selbstbewertung der Doku: Kostenerfassung ist deutlich reifer als Zuverlässigkeitserfassung; es fehlen automatisierte Tests, Lauferfolgsquoten, Alarmierung bei ausbleibenden Läufen und strukturierte Logs. *Offene Entscheidung:* ob dieser Querschnitt als eigener Abschluss-Abschnitt erscheint. Die Doku empfiehlt es ausdrücklich als Antwort auf die Frage technischer Entscheider „wer merkt es, wenn etwas kaputtgeht?“.
- *Offene Entscheidung:* die zuvor gelisteten anonymisierten Workflows (Review-Automation, HR-Intake und Routing, Abwesenheits- und Teamkalender, Onboarding, Content-Workflow, SEO-Recherche, Geo- und Performance-Dashboard) sind in der neuen Hierarchie nicht mehr benannt. Sie werden weder gelöscht noch gezeigt, bis der Nutzer entscheidet.

### Ausbildungsprojekte (Developer Akademie)

Belegen die Grundlagen in Frontend, JavaScript, TypeScript und Angular. Bleiben sichtbar, klar getrennt von der aktuellen KI-/Automation-Arbeit, in eigener Sektion und visuell deutlich weniger dominant. Eigene Detailseiten zulässig.

- DaBubble — Team-Messenger, Echtzeitnachrichten und Kanäle (Angular, TypeScript, Firebase, RxJS). Live `dabubble.ozan-orhan.com`, Quellcode `github.com/ozanorhn/DaBubble`.
- Join — Kanban-Aufgabenmanager (JavaScript, Firebase). Live `join.ozan-orhan.com`, Quellcode `github.com/ozanorhn/Join`. Bild: `join.png`, 1900 × 922 px.
- Pokedex — Pokémon-Datenbank über REST-API (JavaScript, Async/Await). Live `pokedex.ozan-orhan.com`, Quellcode `github.com/ozanorhn/PokeDex`. Bild: `pokedex.png`, 1905 × 957 px.
- El Pollo Loco — Jump-and-Run mit OOP-Architektur (JavaScript, Canvas API). Live `elpolloloco.ozan-orhan.com`, Quellcode `github.com/ozanorhn/El-Pollo-Loco`. Bild: `el-pollo-loce.png`, 708 × 462 px — zu klein.

### Belegbare Vorher/Nachher-Paare

Das Signatur-Systembild „Vorher/Nachher im gleichen Rahmen“ darf ausschließlich dort eingesetzt werden, wo die Doku einen tatsächlichen Vorzustand belegt:

- **Grounding Page Generator** — belegt: „Die Erstellung war Handarbeit von Spezialisten“ gegen den dreistufigen Self-Service-Flow.
- **AI Visibility Monitoring Platform** — belegt: „Manuelle Zusammenführung ist aufwendig“ und „Der Wirkungsnachweis läuft ohne manuelle Datensammlung“.

Nicht belegt und deshalb ohne Vorher/Nachher: Hermes (kein Vorzustand dokumentiert), Wissensbasis (der Vergleich ist eine Architekturalternative, kein Vorprozess), Recruiting Jobs Sync (die Doku beschreibt Quellenbeschränkungen, keinen manuellen Vorgängerprozess).

### Vorhandene Assets

Porträt `public/assets/img/ozan.png`, 1080 × 1080 px. Hardwarefoto `public/assets/img/pocket-agent.jpg`, 1086 × 700 px. Screenshots der Ausbildungsprojekte in `public/assets/img/`.

Gesetzte Systembilder in `public/assets/diagrams/`, je Quer- und Hochformat: `wissensbasis-rag-mcp-quer.svg` / `-hoch.svg` und `recruiting-jobs-sync-quer.svg` / `-hoch.svg`. Vollständig auf den verifizierten Dokumentationen aufgebaut, keine n8n-Canvas-Screenshots, keine Diagramm-Templates, keine erfundenen Dienste. Damit brauchen die Arbeiten 03 und 05 kein Bildmaterial mehr.

### Ausdrücklich nicht vorhanden — darf nicht erfunden werden

Kundennamen, Firmennamen, Domains, IDs, Personennamen, Referenzen, Testimonials, Zeit- oder Kostenersparnis in Zahlen, Nutzerzahlen, Trefferquoten, Auszeichnungen, Preise. Beide Dokumentationen benennen ausdrücklich, was **nicht gemessen** wurde; diese Lücken werden auf der Seite als offene Punkte benannt, nicht durch Schätzwerte gefüllt. Für die vertraulichen Arbeiten liegt kein echter Oberflächen-Screenshot vor; ihre Visuals entstehen als Abstraktion oder anonymisierter Nachbau und sind als solche erkennbar.

## Product Principles

1. **Das Problem kommt vor der Technologie.** Jede Arbeit wird von der betrieblichen Reibung her erzählt, die sie beseitigt — nicht von der Werkzeugliste her.
2. **Vertraulichkeit ist Handwerk, nicht Entschuldigung.** Wo keine Kundendaten gezeigt werden dürfen, entsteht eine bewusst gebaute Abstraktion. Ein Geheimhaltungshinweis ersetzt niemals den Inhalt.
3. **Die ganze Kette ist der Beweis.** Prozesslogik, Datenanbindung, Oberfläche und — beim Hermes — die Hardware gehören zusammen erzählt; genau darin liegt die Unterscheidung.
4. **Tiefe schlägt Anzahl.** Vier Arbeiten in voller Tiefe wiegen schwerer als dreizehn Teaser. Ältere Arbeit bleibt auffindbar, ohne mit der aktuellen zu konkurrieren.
5. **Nichts behaupten, was nicht belegt ist.** Ohne echte Zahlen wird über Mechanismus und Architektur überzeugt, nicht über Wirkungsversprechen.

## Accessibility & Inclusion

Keine projektspezifische Anforderung über den allgemeinen Standard hinaus festgelegt. Der bestehende Code verpflichtet sich bereits auf mindestens 4,5:1 Kontrast, sichtbare Fokuszustände, Tastaturbedienbarkeit und Beachtung von `prefers-reduced-motion`; diese Zusagen bleiben bindend.
