// Projektdaten. Einzige Quelle der Wahrheit für Index, Detailseiten, SEO und llms.txt.
// Nur Aussagen, die durch die Projektdokumentation oder den Code belegt sind.

export interface Plate {
  kind: 'bild' | 'systembild';
  ref: string;
  alt: string;
  ratio?: string;
}

export interface Entscheidung {
  titel: string;
  text: string;
}

/** Eine Station im animierten Systemfluss. Namen stammen aus der realen Architektur. */
export interface FlussStation {
  label: string;
  note?: string;
}

export interface Abschnitt {
  id: string;
  titel: string;
}

export interface Work {
  slug: string;
  nr: string;
  titel: string;
  kicker: string;
  lede: string;
  status: string;
  /** kern = die fünf Kernarbeiten, weitere = Unternehmensarbeit ohne Tafel, ausbildung = Developer Akademie. */
  gruppe: 'kern' | 'weitere' | 'ausbildung';
  /** Herkunft der Arbeit, steht im Kenndatenblock neben Status und Stack. */
  kontext: string;
  /** Unternehmenskontext oder bewusst abstrahierte Darstellung. Steuert den Hinweis in llms.txt. */
  abstrahiert?: boolean;
  stack: string[];
  plate?: Plate;
  fluss?: FlussStation[];
  /** Die betriebliche Reibung oder Ausgangsfrage, aus der die Arbeit entstand. Leer bei Ausbildungsprojekten. */
  ausgangspunkt: string[];
  /** Leer, wenn der Ausgangspunkt den Überblick bereits enthält. */
  ueberblick: string[];
  architektur?: string[];
  /** Engineering-Entscheidungen. Reliability und Security stehen hier, wo sie hingehören. */
  entscheidungen: Entscheidung[];
  ergebnis: string[];
  /** Demos, die nur auf bestimmten Projektseiten erscheinen */
  demo?: 'pocket' | 'grounding' | 'lnw';
  links?: { label: string; href: string }[];
  repo?: string;
  sprachen?: string[];
}

export const WORKS: Work[] = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: 'pocket-ai-agent',
    nr: '01',
    titel: 'Hermes Pocket AI Agent',
    kicker: 'Voice Agent · MCP · Embedded',
    lede:
      'Ein selbst gehosteter Sprachagent mit einem Handgerät als Interface. Aufnahme auf dem ' +
      'Gerät, Agentenlogik auf dem Server, Toolzugriff über MCP.',
    status: 'Funktionsfähiger Prototyp, laufende Weiterentwicklung',
    gruppe: 'kern',
    kontext: 'Eigenes Engineering-Projekt',
    stack: [
      'C++', 'ESP32-S3', 'FreeRTOS', 'PlatformIO', 'Python', 'FastAPI',
      'Docker', 'Traefik', 'MCP', 'OpenRouter', 'Whisper Large V3', 'Fish Audio', 'Piper',
    ],
    sprachen: ['C++', 'Python'],
    plate: {
      kind: 'bild',
      ref: 'assets/img/pocket-agent.jpg',
      alt:
        'Das Handgerät des Hermes Pocket AI Agent, ein M5Stack StickS3 mit Gehäuse und Display, ' +
        'in der Hand gehalten. Auf dem Display steht der Zustand „bereit“.',
      ratio: '1086 / 700',
    },
    fluss: [
      { label: 'M5Stack StickS3', note: 'PCM16 · 16 kHz · Mono' },
      { label: 'Voice Relay', note: 'FastAPI' },
      { label: 'Whisper Large V3', note: 'über OpenRouter' },
      { label: 'Hermes Agent', note: 'Docker auf VPS' },
      { label: 'MCP-Tools', note: 'Todoist · Notion · Kalender' },
      { label: 'Fish Audio', note: 'Piper als Fallback' },
    ],
    demo: 'pocket',
    ausgangspunkt: [
      'Ich wollte einen Sprachagenten bauen, der auf meine eigenen Tools zugreifen kann, ohne ' +
        'dass Modelle, Memory und Integrationen an ein einzelnes Gerät gebunden sind.',
      'Das Interface sollte klein genug für die Hosentasche sein und nur die Aufgaben ' +
        'übernehmen, die wirklich auf die Hardware gehören: Aufnahme, Anzeige und Wiedergabe. ' +
        'Das Gerät ist ein M5Stack StickS3 auf Basis eines ESP32-S3 mit Display, Mikrofon, ' +
        'Lautsprecher, WLAN und Akku.',
    ],
    ueberblick: [],
    architektur: [
      'Der Stick sendet PCM16 mit 16 kHz Mono an einen FastAPI Voice Relay. Der Relay ruft ' +
        'Whisper Large V3 über OpenRouter auf und gibt den Text an den Hermes Agent weiter.',
      'Der Agent läuft in Docker hinter Traefik, hält Sessions und ein Langzeitgedächtnis und ' +
        'ruft Todoist, Notion, Google Workspace und Spotify über MCP auf. Die Antwort geht über ' +
        'Fish Audio zurück an den Stick.',
    ],
    entscheidungen: [
      {
        titel: 'Agentenlogik auf dem Server',
        text:
          'Der ESP32-S3 übernimmt Aufnahme, Anzeige und Wiedergabe. Transkription, Memory, ' +
          'Toolzugriffe und Modellwahl liegen auf dem VPS. Dadurch kann ich Modelle und ' +
          'Integrationen ändern, ohne die Firmware neu zu bauen.',
      },
      {
        titel: 'Die Firmware kennt genau eine API',
        text:
          'Der Stick spricht nur mit dem Voice Relay. Welcher STT-Anbieter, welches Modell und ' +
          'welcher TTS-Provider aktiv sind, steht nicht auf dem Gerät. Ich habe alle drei ' +
          'während der Entwicklung mehrfach getauscht, ohne die Firmware neu zu flashen.',
      },
      {
        titel: 'Session und Langzeitgedächtnis sind getrennt',
        text:
          'Die Session trägt den Kontext einer Unterhaltung und macht Folgefragen möglich. Das ' +
          'Langzeitgedächtnis überlebt neue Sessions und Neustarts des Containers. Secrets, ' +
          'Tokens und temporäre Daten werden dort nicht abgelegt.',
      },
      {
        titel: 'Fallbacks in Tonausgabe, Netz und Integration',
        text:
          'Die Sprachausgabe läuft über Fish Audio, bei Fehlern über lokales Piper. Das Netz hat ' +
          'ein primäres WLAN und einen Hotspot als Rückfall. Ein Health-Check prüft die ' +
          'Todoist-Integration und stößt eine Wiederherstellung nur an, wenn sie ausgefallen ist.',
      },
      {
        titel: 'Getrennte FreeRTOS-Tasks für Oberfläche und Netz',
        text:
          'Netzwerk- und Sprachverarbeitung laufen unabhängig von Anzeige und Tasten. Die ' +
          'Animation bleibt während einer Anfrage aktiv, eine Anfrage lässt sich abbrechen, und ' +
          'ein zweiter Request kann nicht parallel starten. Vor der Wiedergabe prüft die ' +
          'Firmware die erwartete Dateigröße, unvollständige Downloads werden verworfen.',
      },
      {
        titel: 'Transport und Secrets',
        text:
          'Öffentliche Endpunkte laufen über HTTPS hinter Traefik, interne Dienste bleiben im ' +
          'Docker-Netzwerk. Secrets liegen in Environment-Variablen und Credentials; die ' +
          'Secrets-Datei der Firmware steht außerhalb der Versionsverwaltung, und Tokens ' +
          'erscheinen nicht in Logs.',
      },
    ],
    ergebnis: [
      'Der Prototyp läuft Ende zu Ende: Sprache wird auf dem Gerät aufgenommen, serverseitig ' +
        'transkribiert und vom Agenten verarbeitet. Toolaufrufe laufen über MCP, Antworten werden ' +
        'als Audio zurückgegeben. Session-Kontext und persistentes Memory laufen auf dem VPS, das ' +
        'Deployment erfolgt containerisiert über Docker und Traefik.',
      'Das Gerät bleibt dabei bewusst schlank und unabhängig von den verwendeten Modellen und Tools.',
    ],
  },

  // ── 02 ────────────────────────────────────────────────────────────────
  {
    slug: 'leistungsnachweis-automation',
    nr: '02',
    titel: 'Leistungsnachweis Automation',
    kicker: 'API Integration · Document Automation · Human Approval',
    lede:
      'Ein monatlicher Workflow, der Zeiterfassungen aus Toggl verarbeitet, kundenspezifisch ' +
      'aufbereitet und daraus automatisch Leistungsnachweise und Dokumente erzeugt.',
    status: 'Aktiver monatlicher Workflow',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Toggl API', 'Slack Reaction Trigger', 'Google Sheets', 'Google Drive',
      'JavaScript', 'Datentransformation', 'Dokumentvorlagen',
    ],
    plate: {
      kind: 'systembild',
      ref: 'leistungsnachweis-automation',
      alt: 'Systembild der Leistungsnachweis Automation: Freigabe über Slack-Reaktion, Zeitraum, Toggl API, Kundenzuordnung, Sheets und Dokumente, Drive, Abschlussmeldung in Slack.',
    },
    fluss: [
      { label: 'Slack-Freigabe', note: 'Human-in-the-loop' },
      { label: 'Zeitraum', note: 'aus der Reaktion' },
      { label: 'Toggl API', note: 'Zeiteinträge' },
      { label: 'Transformation', note: 'je Kunde' },
      { label: 'Sheets / Dokumente', note: 'Vorlagen befüllt' },
      { label: 'Drive', note: 'Ordnerstruktur' },
      { label: 'Slack', note: 'Abschlussmeldung' },
    ],
    demo: 'lnw',
    ausgangspunkt: [
      'Die Arbeitszeiten liegen bereits strukturiert in Toggl vor. Für monatliche ' +
        'Leistungsnachweise mussten diese Daten jedoch erneut gefiltert, Kunden zugeordnet, ' +
        'aufbereitet und in Dokumente übertragen werden.',
      'Der Workflow übernimmt diesen Prozess automatisiert und erzeugt aus den vorhandenen ' +
        'Zeiterfassungen die benötigten Leistungsnachweise.',
    ],
    ueberblick: [],
    architektur: [
      'Der n8n-Workflow umfasst 152 Nodes und zwei Trigger. Eine Slack-Nachricht fragt monatlich ' +
        'die Freigabe ab; eine Reaktion darauf startet den Lauf und bestimmt über einen Switch den ' +
        'Zeitraum. Anschließend lädt der Workflow die Zeiteinträge aus Toggl, ordnet sie Kunden zu ' +
        'und transformiert sie in die je Kunde benötigte Struktur.',
      'Aus den aufbereiteten Daten entstehen Sheets und Dokumente, die in der vorgesehenen ' +
        'Drive-Ordnerstruktur abgelegt werden. Den Abschluss meldet der Workflow in Slack zurück.',
    ],
    entscheidungen: [
      {
        titel: 'Toggl als Source of Truth',
        text:
          'Die bereits vorhandene Zeiterfassung wird direkt weiterverarbeitet. Es entsteht keine ' +
          'zweite manuell gepflegte Datenquelle.',
      },
      {
        titel: 'Freigabe vor Ausführung',
        text:
          'Der monatliche Lauf startet erst nach einer expliziten Slack-Reaktion. Verschiedene ' +
          'Reaktionen können unterschiedliche Zeiträume oder Pfade auswählen.',
      },
      {
        titel: 'Verarbeitung vor Dokumentausgabe',
        text:
          'Rohdaten aus Toggl werden zuerst transformiert und kundenspezifisch aufbereitet. ' +
          'Dokumente und Sheets erhalten bereits vorbereitete Daten.',
      },
      {
        titel: 'Automatisierte Datei- und Ordnerstruktur',
        text: 'Ausgaben werden automatisiert in der vorgesehenen Drive-Struktur abgelegt.',
      },
      {
        titel: 'Prozess-Telemetrie als Ausbaupfad',
        text:
          'Für einen Teil des Workflows existiert bereits ein Telemetrie-Schema für Laufzeit, ' +
          'potenzielle Zeitersparnis, Kosten und Fehlertypen, mit Feldern wie Execution-ID, ' +
          'Workflow, Baseline-Zeit, eingesparter Zeit, Stundensatz, erzeugtem Wert, AI-Kosten und ' +
          'Fehlertyp. Es ist noch nicht über alle Pfade ausgerollt.',
      },
    ],
    ergebnis: [
      'Der monatliche Workflow verarbeitet Toggl-Zeiterfassungen, bereitet sie für mehrere Kunden ' +
        'auf, erzeugt die benötigten Dokumente bzw. Tabellen und legt die Ergebnisse in Drive ab.',
      'Die Ausführung kann über eine Slack-Reaktion freigegeben werden. Der Abschluss wird ' +
        'ebenfalls über Slack zurückgemeldet.',
    ],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: 'wissensbasis-rag-mcp',
    nr: '03',
    titel: 'Wissensbasis — RAG + MCP-Server',
    kicker: 'RAG · Vector Retrieval · MCP',
    lede: 'Eine zentrale RAG-Wissensbasis, die Agenten über MCP als Retrieval-Tool nutzen können.',
    status: 'Produktiv aktiv',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'MCP-Server-Trigger', 'Postgres mit Vektor-Erweiterung',
      'Mehrsprachige Embeddings', 'Dokument-Loader', 'Text-Splitter',
    ],
    plate: {
      kind: 'systembild',
      ref: 'wissensbasis-rag-mcp',
      alt: 'Systembild der Wissensbasis: Schreibpfad und Lesepfad als getrennte Workflows über einem gemeinsamen Vector Store.',
    },
    fluss: [
      { label: 'Dokumentquelle', note: 'Ordner' },
      { label: 'Chunking', note: 'Text-Splitter' },
      { label: 'Embeddings', note: 'mehrsprachig' },
      { label: 'Vector Store', note: 'Postgres' },
      { label: 'MCP-Server', note: 'ein Tool, nur lesend' },
      { label: 'Client', note: 'beliebige Agenten' },
    ],
    ausgangspunkt: [
      'Interne Dokumente sollten mehreren AI-Assistenten zur Verfügung stehen, ohne Retrieval ' +
        'und Datenanbindung für jeden Agenten erneut aufzubauen.',
      'Dafür habe ich die Wissensbasis als eigene Retrieval-Schicht umgesetzt, die über MCP von ' +
        'unterschiedlichen Clients genutzt werden kann.',
    ],
    ueberblick: [],
    architektur: [
      'Die Architektur besteht aus zwei getrennten Workflows. Der Ingest-Pfad lädt Dokumente, ' +
        'zerlegt sie in Chunks, erzeugt mehrsprachige Embeddings und speichert Text und Vektoren ' +
        'in PostgreSQL mit Vektor-Erweiterung.',
      'Der Retrieval-Pfad stellt die Wissensbasis über einen MCP-Server als read-only Tool ' +
        'bereit. Eine Anfrage wird mit demselben Embedding-Modell verarbeitet und über eine ' +
        'dedizierte Match-Funktion gegen den Vector Store gesucht. Dadurch bleiben ' +
        'Dokumentverarbeitung und Serving voneinander getrennt.',
    ],
    entscheidungen: [
      {
        titel: 'Retrieval hinter MCP kapseln',
        text:
          'Der MCP-Server stellt eine klar begrenzte Fähigkeit bereit: semantische Suche in der ' +
          'Wissensbasis. Agenten müssen dadurch weder Datenbankzugriff noch Retrieval-Logik ' +
          'selbst implementieren. Änderungen an Chunking, Embeddings oder Suche können zentral ' +
          'vorgenommen werden.',
      },
      {
        titel: 'Ingest und Serving trennen',
        text:
          'Dokumentverarbeitung und Retrieval laufen als getrennte Workflows. Ein neuer Ingest ' +
          'kann dadurch unabhängig von laufenden Anfragen ausgeführt und verändert werden.',
      },
      {
        titel: 'Tool-Beschreibung als Teil des Interfaces',
        text:
          'Die Beschreibung des MCP-Tools erklärt dem Agenten, wann und wofür die Wissensbasis ' +
          'verwendet werden soll. Ich behandle Tool-Name, Beschreibung, Input-Schema und ' +
          'Rückgabeformat deshalb wie eine API-Schnittstelle und nicht nur als technische Metadaten.',
      },
      {
        titel: 'Read-only Tool',
        text:
          'Über MCP wird ausschließlich Retrieval angeboten. Schreiboperationen auf Dokumente ' +
          'oder Vector Store sind nicht Bestandteil des exponierten Tools. Datenbank- und ' +
          'Modellzugriffe laufen über den Credential Store.',
      },
      {
        titel: 'Mehrsprachiges Retrieval',
        text:
          'Da Dokumente überwiegend deutsch sind, Anfragen aber auch auf Englisch erfolgen ' +
          'können, verwende ich ein mehrsprachiges Embedding-Modell. Die Similarity Search liegt ' +
          'als eigene Match-Funktion in PostgreSQL und kann unabhängig von den Clients angepasst werden.',
      },
    ],
    ergebnis: [
      'Die Wissensbasis stellt internes Wissen zentral über MCP bereit.',
      'Neue MCP-fähige Agenten können dieselbe Retrieval-Schicht verwenden, ohne jeweils eine ' +
        'eigene Dokumentpipeline oder Datenbankanbindung zu benötigen. Änderungen an Chunking, ' +
        'Embeddings oder Match-Logik wirken damit zentral für alle angebundenen Clients.',
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: 'ai-visibility-monitoring-platform',
    nr: '04',
    titel: 'AI Visibility Monitoring Platform',
    kicker: 'Monitoring · Fünf Datenquellen · Agent-Anbindung',
    lede:
      'Drei Workflows führen fünf externe Datenquellen zusammen und prüfen, ob sich umgesetzte ' +
      'Maßnahmen messbar ausgewirkt haben — ohne dass jemand Daten von Hand sammelt.',
    status: 'Produktiv, drei Komponenten',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Webhook mit synchroner Antwort', 'Zeitplan-Trigger', 'OAuth-Credentials',
      'LLM-Agent mit strukturiertem Output', 'Postgres über REST mit Upsert', 'JavaScript',
    ],
    plate: {
      kind: 'systembild',
      ref: 'ai-visibility',
      alt: 'Systembild der AI Visibility Monitoring Platform mit drei Komponenten als getrennte Bahnen.',
    },
    fluss: [
      { label: 'Externe APIs', note: 'fünf Quellen' },
      { label: 'Defensive Extraktion', note: 'rekursiv' },
      { label: 'Kontext', note: 'aufbereitet' },
      { label: 'Analyse-Agent', note: 'ohne Tools' },
      { label: 'Normalisierung', note: 'in Code' },
      { label: 'Insights', note: 'Upsert' },
    ],
    ausgangspunkt: [
      'Sichtbarkeit in KI-Antworten, Suchmetriken, Webanalyse und Backlinks lagen in fünf ' +
        'getrennten Systemen. Sie von Hand zusammenzuführen war aufwendig, und ob eine umgesetzte ' +
        'Maßnahme gewirkt hat, ließ sich nur mit erneuter Handarbeit belegen.',
    ],
    ueberblick: [
      'Drei n8n-Workflows führen fünf externe Datenquellen zusammen: Suchmetriken, Ranking-Daten, ' +
        'Webanalyse und Sichtbarkeit in KI-Antworten.',
      'Sie beantworten drei Fragen: wo Sichtbarkeit in KI-Antworten verloren geht, wo Traffic ' +
        'einbricht, und ob sich umgesetzte Maßnahmen messbar ausgewirkt haben.',
    ],
    architektur: [
      'Zwei Komponenten laufen täglich. Die erste ruft die Sichtbarkeits-APIs parallel ab, ' +
        'extrahiert defensiv, baut daraus einen Kontext und übergibt ihn an einen Analyse-Agenten; ' +
        'dessen Ausgabe wird in Code normalisiert und über stabile Schlüssel in eine ' +
        'Insights-Tabelle geschrieben. Die zweite holt Webanalyse, Suchkonsole und Backlinks über ' +
        'zwei Zeiträume, aggregiert nach URL und erkennt Anomalien, woraus Aufgaben und eine ' +
        'Chat-Meldung entstehen.',
      'Die dritte läuft vierzehntägig und wird extern angestoßen: ein Agent-System ruft einen ' +
        'n8n-Webhook mit synchroner Antwort. n8n berechnet Zeiträume, lädt die betreuten URLs, ' +
        'führt je URL vier Abfragen aus und gibt eine bewertete Zusammenfassung zurück.',
    ],
    entscheidungen: [
      {
        titel: 'n8n als Rechen-Service hinter einem Agenten',
        text:
          'Bei der Zielüberprüfung besitzt das Agent-System Auslösung und Kommunikation, n8n die ' +
          'Datenbeschaffung und Auswertung. Diese Trennung macht n8n zu einer austauschbaren ' +
          'Komponente hinter einer klaren Schnittstelle und hält beide Seiten einfach.',
      },
      {
        titel: 'Signal-Voting statt Schwellwert auf einer Metrik',
        text:
          'Die Trend-Bewertung sammelt Richtungssignale aus Klick- und Rankingentwicklung und ' +
          'entscheidet per Mehrheit. Bei gegenläufigen Signalen lautet der Status „gemischt“, bei ' +
          'fehlenden Signalen „stabil“.',
      },
      {
        titel: 'Fehlende Werte werden nicht als Null gezählt',
        text:
          'Bevorzugt wird die Position des Drittanbieters, ersatzweise die der Suchkonsole. Ist ' +
          'keine verfügbar, fließt Ranking gar nicht in die Bewertung ein. Vier Quellen liefern ' +
          'unterschiedlich oft nichts; jedes Fehlen als Null zu zählen hätte falsche Trends ' +
          'erzeugt. Deltas werden nur berechnet, wenn beide Seiten vorliegen.',
      },
      {
        titel: 'Defensive Extraktion aus instabilen Fremd-APIs',
        text:
          'Die Antwortstrukturen sind tief verschachtelt und nicht garantiert stabil. Eine ' +
          'Komponente extrahiert rekursiv über den Antwortbaum und erkennt Datensätze an ihrer ' +
          'Feldsignatur statt an einem festen Pfad. HTTP-Fehler brechen den Lauf nicht ab; bei ' +
          'unbrauchbarer Antwort entsteht eine leere Menge statt eines Fehlers.',
      },
      {
        titel: 'Modellausgaben werden deterministisch nachbearbeitet',
        text:
          'Der Analyse-Agent hat keine Tools und keinen Schreibzugriff. Er verarbeitet einen ' +
          'vorbereiteten Kontext und gibt schema-gebundenes JSON zurück; Priorität, ' +
          'Schlüsselbildung und Feldlängen werden danach in Code normalisiert. Alle ' +
          'Schreibvorgänge passieren in deterministischen Nodes, Zugriffe laufen über den ' +
          'Credential Store mit OAuth.',
      },
      {
        titel: 'Der Bericht legt seine eigene Filterung offen',
        text:
          'Nur Einträge mit klarem Trend erscheinen. Die Kopfzeile weist aus, wie viele Einträge ' +
          'geprüft und wie viele ausgeblendet wurden.',
      },
    ],
    ergebnis: [
      'Fünf externe Datenquellen und ein zweites Agent-System sind angebunden. Der ' +
        'Wirkungsnachweis für umgesetzte Maßnahmen läuft ohne manuelle Datensammlung, und ' +
        'Sichtbarkeitsverluste erzeugen nachverfolgbare Einträge in einer Datenbank.',
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: 'recruiting-jobs-sync',
    nr: '05',
    titel: 'Recruiting Jobs Sync',
    kicker: 'LLM Extraction · Idempotent Sync · Data Pipeline',
    lede:
      'Eine LLM-gestützte Datenpipeline, die Stellenanzeigen aus HTML strukturiert und über ' +
      'last_seen_at idempotent synchron hält.',
    status: 'Implementiert und lauffähig',
    gruppe: 'kern',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Zeitplan-Trigger', 'HTTP-Abruf', 'JavaScript',
      'Schema-gebundene LLM-Extraktion', 'Enum-Constraints', 'Datenspeicher mit Upsert',
    ],
    plate: {
      kind: 'systembild',
      ref: 'recruiting-jobs-sync',
      alt: 'Systembild des Recruiting Jobs Sync mit dem Lauf-Zeitstempel über dem gesamten Ablauf.',
    },
    fluss: [
      { label: 'Karriereseite', note: 'HTML, keine API' },
      { label: 'Linkextraktion', note: 'Slug aus dem Pfad' },
      { label: 'LLM-Extraktion', note: 'JSON-Schema' },
      { label: 'Upsert', note: 'Match über Slug' },
      { label: 'last_seen_at', note: 'Laufzeitpunkt' },
      { label: 'Stale Detection', note: 'status inactive' },
    ],
    ausgangspunkt: [
      'Die Quelle ist eine Karriereseite ohne API oder Änderungsereignisse. Ein reiner Import ' +
        'würde deshalb Stellen dauerhaft als aktiv halten, auch wenn sie auf der Quelle bereits ' +
        'entfernt wurden.',
      'Ich habe dafür einen täglichen Sync gebaut, der Stellen aus HTML extrahiert, strukturiert ' +
        'speichert und über einen Lauf-Zeitstempel erkennt, welche Einträge nicht mehr vorhanden sind.',
    ],
    ueberblick: [],
    architektur: [
      'Zu Beginn wird ein Lauf-Zeitstempel gesetzt und über den Lauf mitgeführt. Aus der ' +
        'Übersichtsseite werden die Detail-Links extrahiert, normalisiert und dedupliziert; aus ' +
        'dem Pfad entsteht ein stabiler Slug. Je Link wird die Detailseite bereinigt, ' +
        'schema-gebunden extrahiert und über den Slug geupsertet, wobei last_seen_at auf den ' +
        'Laufzeitpunkt gesetzt wird. Danach werden alle aktiven Zeilen mit älterem Zeitstempel ' +
        'auf inaktiv gesetzt.',
      'Die Detailseiten werden einzeln verarbeitet. Das vereinfacht die Zuordnung von Quelle, ' +
        'Modellantwort und Fehlerfall und verhindert, dass mehrere Stellen in einem gemeinsamen ' +
        'Modellaufruf vermischt werden.',
    ],
    entscheidungen: [
      {
        titel: 'Lauf-Zeitstempel statt Snapshot-Vergleich',
        text:
          'Alles, was in einem erfolgreichen Lauf gesehen wird, bekommt denselben ' +
          'Lauf-Zeitstempel. Anschließend reicht eine Abfrage, um ältere aktive Einträge zu ' +
          'finden. Dadurch brauche ich keinen separaten Soll-Ist-Snapshot.',
      },
      {
        titel: 'Soft Delete statt Löschen',
        text:
          'Entfernte Anzeigen bekommen den Status „inaktiv“. Der historische Bestand bleibt ' +
          'auswertbar, und wird eine Anzeige in einem Lauf nicht erfasst, kann ein späterer ' +
          'erfolgreicher Lauf sie wieder aktivieren.',
      },
      {
        titel: 'Slug als natürlicher Schlüssel',
        text:
          'Der Pfad ist stabil und wird von der Quelle vergeben. Damit ist der Upsert idempotent, ' +
          'ohne dass ich einen eigenen Schlüsselraum verwalte; ein wiederholter Lauf erzeugt keine ' +
          'Duplikate.',
      },
      {
        titel: 'Deterministische Vorverarbeitung, schema-gebundene LLM-Extraktion',
        text:
          'Skripte, Styles und Markup werden entfernt, bevor Text ins Modell geht. Das spart ' +
          'Token und nimmt dem Modell Inhalte weg, die es in die Irre führen können. Die ' +
          'Extraktion ist schema-gebunden; ein Enum begrenzt die möglichen Senioritätswerte und ' +
          'sorgt dafür, dass die Ergebnisse über mehrere Läufe konsistent gruppierbar bleiben.',
      },
    ],
    ergebnis: [
      'Der Workflow überführt eine HTML-Quelle ohne API in einen strukturierten, wiederholbar ' +
        'synchronisierbaren Datenbestand.',
      'Upserts über den Slug verhindern Duplikate. last_seen_at ermöglicht die Erkennung nicht ' +
        'mehr vorhandener Stellen, ohne Datensätze zu löschen. Dadurch bleibt der historische ' +
        'Bestand erhalten und spätere Läufe können Einträge wieder aktivieren.',
    ],
  },

  {
    slug: 'conversational-ai-meeting-assistant',
    nr: '06',
    titel: 'Conversational AI Meeting Assistant',
    kicker: 'Besprechungen · Action Items per LLM',
    lede:
      'Strukturiert gesprochene Sprache per LLM, zieht Action Items heraus und stellt sie in ' +
      'Slack und per Mail zu.',
    status: 'Im Einsatz',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: ['n8n', 'OpenAI API', 'Prompt Engineering', 'Google Workspace', 'Slack API'],
    fluss: [
      { label: 'Mitschrift', note: 'Besprechung' },
      { label: 'LLM', note: 'Strukturierung' },
      { label: 'Action Items', note: 'extrahiert' },
      { label: 'Slack', note: 'Kanal' },
      { label: 'Mail', note: 'Beteiligte' },
    ],
    ausgangspunkt: [
      'Aus Besprechungen entstehen Zusagen und Aufgaben, die nach dem Termin von Hand aus der ' +
        'Mitschrift gezogen und verteilt werden mussten.',
    ],
    ueberblick: [
      'Der Workflow verarbeitet Besprechungsmitschriften mit einem LLM, extrahiert Action Items ' +
        'und leitet sie an Slack und Mail weiter.',
    ],
    entscheidungen: [],
    ergebnis: [
      'Action Items kommen strukturiert in Slack und per Mail an, ohne dass jemand die ' +
        'Mitschrift nachbereitet.',
    ],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: 'grounding-page-generator',
    nr: '07',
    titel: 'Grounding Page Generator',
    kicker: 'Grounding Page Standard v1.6 · Human-in-the-loop',
    lede:
      'Ein dreistufiger Workflow, der eine Grounding Page nach dem offenen Standard erzeugt: ' +
      'Fakten recherchieren, von einem Menschen bestätigen lassen, als HTML mit JSON-LD ' +
      'ausliefern. Vorher war das Handarbeit von Spezialisten.',
    status: 'Produktiv im Einsatz',
    gruppe: 'weitere',
    kontext: 'Unternehmenskontext · anonymisiert dargestellt',
    abstrahiert: true,
    stack: [
      'n8n', 'Form-Trigger', 'LLM-Agent mit Tool Calling', 'JSON Schema', 'JSON-LD · Schema.org',
      'Web-Scraping-API', 'Web-Such-API', 'Tabellenspeicher', 'JavaScript',
    ],
    plate: {
      kind: 'systembild',
      ref: 'grounding-page-generator',
      alt: 'Systembild des Grounding Page Generator mit der menschlichen Validierung zwischen den beiden Modellaufrufen.',
    },
    fluss: [
      { label: 'Formular', note: 'Entität · URL optional' },
      { label: 'Research-Agent', note: 'LLM + Web-Suche' },
      { label: 'Validierung', note: 'Mensch' },
      { label: 'Merge', note: 'deterministisch' },
      { label: 'Generierung', note: 'striktes Schema' },
      { label: 'Dokument', note: 'HTML + JSON-LD' },
    ],
    demo: 'grounding',
    ausgangspunkt: [
      'Der Grounding Page Standard definiert ein strukturiertes Format für überprüfbare ' +
        'Entitätsinformationen, die für Menschen und AI-Systeme lesbar sind. Er adressiert vier ' +
        'Risiken in AI-Antwortsystemen: Halluzination, Entitätsverwechslung, Nichtnennung und ' +
        'englischdominierte Retrieval-Muster.',
      'Die manuelle Erstellung erfordert Recherche, strukturierte Fakten, Disambiguierung und ' +
        'konsistentes Schema.org-Markup. Ich habe dafür einen dreistufigen Workflow gebaut, der ' +
        'Recherche und Generierung automatisiert, die fachliche Freigabe aber beim Menschen lässt.',
    ],
    ueberblick: [],
    architektur: [
      'Stufe eins nimmt Entität und optionale URL entgegen, legt eine Session an und holt die ' +
        'Seite bei vorhandener URL als Markdown. Ein Research-Agent mit Web-Such-Tool füllt die ' +
        'Felder und gibt schema-validiertes JSON zurück: Quellenliste, modellseitige Konfidenz je ' +
        'Feld und eine Liste der Felder, die Nutzereingabe brauchen. Stufe zwei zeigt diese Werte ' +
        'zur Freigabe und Korrektur. Stufe drei erzeugt Titel, Meta-Description, JSON-LD und ' +
        'HTML-Body gegen ein striktes Schema. Ausgabe als HTML-Datei und als kopierbare Blöcke.',
    ],
    entscheidungen: [
      {
        titel: 'Recherche und Generierung sind getrennte Modellaufrufe',
        text:
          'Beide Aufrufe haben eigene Parameter, Schemas und Token-Budgets. Für die Recherche ' +
          'verwende ich eine niedrige Temperatur, um die Varianz der Ausgabe zu reduzieren; die ' +
          'Generierung formuliert freier. Beide lassen sich einzeln debuggen und austauschen.',
      },
      {
        titel: 'Freigabe auf Feldebene vor der Generierung',
        text:
          'Die fachliche Freigabe erfolgt auf Feldebene vor der Generierung. Dadurch verarbeitet ' +
          'der zweite Modellaufruf bereits bestätigte Fakten.',
      },
      {
        titel: 'Pflichtfelder ohne Modellbeteiligung',
        text:
          'Abgrenzung zu ähnlichen Entitäten und die kanonische URL kommen aus dem Formular. ' +
          'Diese Angaben kann ein Modell nicht zuverlässig liefern, also wird es nicht danach ' +
          'gefragt.',
      },
      {
        titel: 'Das Ausgabeschema bildet den Standard ab',
        text:
          'Die Pflichtbausteine des Standards sind als Schemafelder abgebildet. Das ' +
          'Ausgabeschema erzwingt die erwartete Struktur und ' +
          'verhindert zusätzliche, nicht definierte Felder. Die inhaltliche Validierung erfolgt ' +
          'davor durch den Menschen.',
      },
      {
        titel: 'Unsicherheit ist ein eigenes Ausgabefeld',
        text:
          'Bei Unsicherheit liefert der Agent keinen Wert, sondern einen Eintrag in der Liste ' +
          '„Nutzereingabe nötig“, dazu ein modellseitiges Confidence-Signal, das im Formular ' +
          'angezeigt wird. Der Merge ist deterministisch: Ein Formularwert überschreibt nur, wenn ' +
          'er nicht leer ist; ein leeres Feld bedeutet Zustimmung.',
      },
      {
        titel: 'Schema-Bindung und Credential Store',
        text:
          'Das Schema begrenzt die Ausgabe auf definierte Felder. Alle externen Zugriffe laufen ' +
          'über den Credential Store.',
      },
      {
        titel: 'Ausfall des Scrapings führt in den bestehenden Pfad',
        text:
          'Schlägt der Scraping-Aufruf fehl, bricht der Lauf nicht ab. Der Agent recherchiert ' +
          'dann vollständig im Web und nutzt den Pfad, der für Eingaben ohne URL ohnehin existiert.',
      },
    ],
    ergebnis: [
      'Der Workflow führt Recherche, menschliche Validierung und Dokumentgenerierung in einem ' +
        'dreistufigen Prozess zusammen. Das Ergebnis enthält sichtbaren HTML-Inhalt und passendes ' +
        'JSON-LD nach Grounding Page Standard v1.6.',
      'Jeder Lauf besitzt eine Session-ID und wird über die einzelnen Prozessstufen ' +
        'fortgeschrieben. Dadurch bleibt nachvollziehbar, welche recherchierten Werte vor der ' +
        'Generierung bestätigt oder angepasst wurden.',
    ],
    links: [
      { label: 'Grounding Page Standard', href: 'https://groundingpage.com/de/' },
    ],
  },


  {
    slug: 'dabubble',
    nr: '08',
    titel: 'DaBubble',
    kicker: 'Angular · Firebase',
    lede:
      'Team-Messenger mit Kanälen, Direktnachrichten und Threads. Nachrichten synchronisieren in ' +
      'Echtzeit über Firebase; gebaut in Angular mit RxJS.',
    status: 'Abgeschlossen, live',
    gruppe: 'ausbildung',
    kontext: 'Ausbildungsprojekt · Developer Akademie',
    stack: ['Angular', 'TypeScript', 'Firebase', 'RxJS', 'SCSS'],
    sprachen: ['TypeScript'],
    repo: 'https://github.com/ozanorhn/DaBubble',
    plate: {
      kind: 'bild',
      ref: 'assets/img/dabubble.jpg',
      alt: 'Oberfläche von DaBubble mit Seitenleiste für Kanäle und Direktnachrichten.',
      ratio: '1600 / 867',
    },
    ausgangspunkt: [],
    ueberblick: [
      'Ein Messenger mit Kanälen, Direktnachrichten und Threads. Die Synchronisierung läuft in ' +
        'Echtzeit über Firebase.',
    ],
    entscheidungen: [],
    ergebnis: ['Abgeschlossen; die Anwendung läuft weiterhin live, der Quellcode ist öffentlich.'],
    links: [
      { label: 'Live', href: 'https://dabubble.ozan-orhan.com' },
      { label: 'Quellcode', href: 'https://github.com/ozanorhn/DaBubble' },
    ],
  },
  {
    slug: 'join',
    nr: '09',
    titel: 'Join',
    kicker: 'JavaScript · Firebase',
    lede:
      'Aufgabenmanager nach dem Kanban-Prinzip: Tasks anlegen, per Drag-and-Drop zwischen ' +
      'Spalten bewegen, Personen zuordnen. Reines JavaScript mit Firebase.',
    status: 'Abgeschlossen, live',
    gruppe: 'ausbildung',
    kontext: 'Ausbildungsprojekt · Developer Akademie',
    stack: ['JavaScript', 'HTML/CSS', 'Firebase'],
    sprachen: ['JavaScript'],
    repo: 'https://github.com/ozanorhn/Join',
    plate: {
      kind: 'bild',
      ref: 'assets/img/join.jpg',
      alt: 'Kanban-Board von Join mit Aufgabenspalten.',
      ratio: '1600 / 776',
    },
    ausgangspunkt: [],
    ueberblick: [
      'Tasks anlegen, per Drag-and-Drop zwischen Status-Spalten bewegen, Personen und Kategorien ' +
        'zuordnen.',
    ],
    entscheidungen: [],
    ergebnis: ['Abgeschlossen; die Anwendung läuft weiterhin live, der Quellcode ist öffentlich.'],
    links: [
      { label: 'Live', href: 'https://join.ozan-orhan.com' },
      { label: 'Quellcode', href: 'https://github.com/ozanorhn/Join' },
    ],
  },
  {
    slug: 'pokedex',
    nr: '10',
    titel: 'Pokedex',
    kicker: 'JavaScript · REST API',
    lede:
      'Pokémon-Datenbank auf Basis der PokéAPI: Liste mit Nachladen, Detailansicht und Suche. ' +
      'Reines JavaScript mit asynchronen API-Aufrufen.',
    status: 'Abgeschlossen, live',
    gruppe: 'ausbildung',
    kontext: 'Ausbildungsprojekt · Developer Akademie',
    stack: ['JavaScript', 'REST API', 'HTML/CSS'],
    sprachen: ['JavaScript'],
    repo: 'https://github.com/ozanorhn/PokeDex',
    plate: {
      kind: 'bild',
      ref: 'assets/img/pokedex.jpg',
      alt: 'Übersicht des Pokedex mit Karten einzelner Pokémon.',
      ratio: '1600 / 803',
    },
    ausgangspunkt: [],
    ueberblick: [
      'Daten werden zur Laufzeit von der PokéAPI geladen und als Karten dargestellt. Eine ' +
        'Detailansicht zeigt Werte und Typen, die Liste lädt weitere Einträge nach.',
    ],
    entscheidungen: [],
    ergebnis: ['Abgeschlossen; die Anwendung läuft weiterhin live, der Quellcode ist öffentlich.'],
    links: [
      { label: 'Live', href: 'https://pokedex.ozan-orhan.com' },
      { label: 'Quellcode', href: 'https://github.com/ozanorhn/PokeDex' },
    ],
  },
  {
    slug: 'el-pollo-loco',
    nr: '11',
    titel: 'El Pollo Loco',
    kicker: 'JavaScript · OOP · Canvas',
    lede:
      'Jump-and-Run-Spiel mit Game-Loop, Kollisionserkennung und Endgegner. Objektorientiertes ' +
      'JavaScript auf dem HTML-Canvas.',
    status: 'Abgeschlossen, live',
    gruppe: 'ausbildung',
    kontext: 'Ausbildungsprojekt · Developer Akademie',
    stack: ['JavaScript', 'HTML Canvas', 'OOP', 'HTML/CSS'],
    sprachen: ['JavaScript'],
    repo: 'https://github.com/ozanorhn/El-Pollo-Loco',
    plate: {
      kind: 'bild',
      ref: 'assets/img/el-pollo-loco.jpg',
      alt: 'Spielszene aus El Pollo Loco mit der Spielfigur und Gegnern.',
      ratio: '1600 / 1044',
    },
    ausgangspunkt: [],
    ueberblick: [
      'Spielfigur, Gegner, Gegenstände und Endgegner sind als Klassen modelliert. Ein Game-Loop ' +
        'steuert Bewegung, Kollisionen und Animationen auf dem Canvas.',
    ],
    entscheidungen: [],
    ergebnis: ['Abgeschlossen; die Anwendung läuft weiterhin live, der Quellcode ist öffentlich.'],
    links: [
      { label: 'Live', href: 'https://el-pollo-loco.ozan-orhan.com' },
      { label: 'Quellcode', href: 'https://github.com/ozanorhn/El-Pollo-Loco' },
    ],
  },
];

/** Alle Projekte in einer Reihe; die Gruppe steht am Werk selbst. */
export const PROJEKTE = WORKS;
/** Die fünf Kernarbeiten — das, was die Startseite zeigt. */
export const KERNARBEITEN = WORKS.filter((w) => w.gruppe === 'kern');

export const GRUPPEN_TITEL: Record<Work['gruppe'], string> = {
  kern: 'Kernarbeiten',
  weitere: 'Weitere Arbeiten',
  ausbildung: 'Ausbildungsprojekte — Developer Akademie',
};

export function findWork(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export function nachbar(slug: string): Work | undefined {
  const i = WORKS.findIndex((w) => w.slug === slug);
  if (i === -1) return undefined;
  return WORKS[(i + 1) % WORKS.length];
}

/** Sichtbare Abschnitte einer Projektseite, aus den vorhandenen Feldern abgeleitet. */
export function abschnitte(w: Work): Abschnitt[] {
  const a: Abschnitt[] = [];
  if (w.ausgangspunkt.length) a.push({ id: 'ausgangspunkt', titel: 'Ausgangspunkt' });
  if (w.ueberblick.length) a.push({ id: 'ueberblick', titel: 'Überblick' });
  if (w.architektur?.length) a.push({ id: 'architektur', titel: 'Architektur' });
  if (w.demo) a.push({ id: 'demo', titel: w.demo === 'pocket' ? 'Interaktion' : 'Freigabe' });
  if (w.entscheidungen.length) a.push({ id: 'entscheidungen', titel: 'Engineering-Entscheidungen' });
  a.push({ id: 'ergebnis', titel: 'Ergebnis' });
  return a;
}
