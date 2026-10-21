// Bahnen und Stationen der Systembilder. Nur abstrahierte Bausteine, keine internen Namen.
// gate: true = menschliche Freigabe an dieser Stelle.
export const SYSTEMBILDER = [
  {
    id: 'agentic-commerce-audit',
    titel: 'Agentic Commerce Audit',
    untertitel: 'Drei Bahnen, ein Auftrag',
    beschreibung:
      'Bestellung per Webhook, Normalisierung, Ablage in Tabelle und Projektboard, Kauffragen-Entwurf durch ein Sprachmodell, Briefing-Formular. Audit-Lauf nach menschlicher Freigabe per Statuswechsel, Doppelstart-Prüfung, Auftrag an den Worker, Abfragen an drei KI-Assistenten, Analyse-Deck, Review durch einen Menschen. Überwachung alle 15 Minuten mit Job-Abfrage und einmaliger Warnung.',
    bahnen: [
      {
        titel: 'Bestellung', takt: 'Webhook',
        stationen: [
          { label: 'Eingang', note: 'Webhook' },
          { label: 'Normalisierung', note: 'Auftrag-ID' },
          { label: 'Ablage', note: 'Tabelle · Board' },
          { label: 'Kauffragen', note: 'LLM-Entwurf' },
          { label: 'Briefing', note: 'Formular' },
        ],
      },
      {
        titel: 'Audit-Lauf', takt: 'nach Freigabe',
        stationen: [
          { label: 'Statuswechsel', note: 'Mensch', gate: true },
          { label: 'Doppelstart-Prüfung', note: 'Lauf-Tabelle' },
          { label: 'Worker', note: 'Container' },
          { label: 'KI-Assistenten', note: 'drei Modelle' },
          { label: 'Analyse-Deck', note: 'Auswertung' },
          { label: 'Review', note: 'Mensch', gate: true },
        ],
      },
      {
        titel: 'Überwachung', takt: 'alle 15 Minuten',
        stationen: [
          { label: 'Offene Läufe', note: 'über 90 Minuten' },
          { label: 'Job-Status', note: 'Worker' },
          { label: 'Nachtragen', note: 'verlorene Rückmeldung' },
          { label: 'Warnung', note: 'einmalig' },
        ],
      },
    ],
  },
  {
    id: 'seo-agent-multi-agent-system',
    titel: 'SEO-Agent mit Multi-Agent-System',
    untertitel: 'Skills, MCP, Freigabe',
    beschreibung:
      'Anfrage aus dem Chat oder per Zeitplan, Agent wählt einen Skill, ruft Daten über MCP-Tools ab, wertet aus und liefert das Ergebnis; schreibende Aktionen nur nach Freigabe. Zielüberprüfung: Agent ruft n8n auf, n8n vergleicht Daten je URL, bewertet Trends und antwortet. Multi-Agent-Testlauf: Orchestrator, vier Fachrollen, Kritiker, Zusammenführung.',
    bahnen: [
      {
        titel: 'Anfrage', takt: 'Chat oder Zeitplan',
        stationen: [
          { label: 'Anfrage', note: 'Chat' },
          { label: 'Agent', note: 'Skill wählen' },
          { label: 'MCP-Tools', note: 'Datenquellen' },
          { label: 'Auswertung', note: 'Skill-Logik' },
          { label: 'Ergebnis', note: 'Chat · Dokument' },
          { label: 'Freigabe', note: 'vor Änderungen', gate: true },
        ],
      },
      {
        titel: 'Zielüberprüfung', takt: 'zweiwöchentlich',
        stationen: [
          { label: 'Agent', note: 'Auslöser' },
          { label: 'Webhook', note: 'n8n' },
          { label: 'URLs', note: 'Beobachtungsliste' },
          { label: 'Zwei Zeiträume', note: 'Klicks · Rankings' },
          { label: 'Trend', note: 'Signal-Abstimmung' },
          { label: 'Antwort', note: 'synchron' },
        ],
      },
      {
        titel: 'Multi-Agent-Test', takt: 'Rollenmodell',
        stationen: [
          { label: 'Orchestrator', note: 'Aufteilung' },
          { label: 'Fachrollen', note: 'Strategie · OnPage' },
          { label: 'Fachrollen', note: 'Technik · KI-Sichtbarkeit' },
          { label: 'Kritiker', note: 'Qualitätsprüfung' },
          { label: 'Zusammenführung', note: 'Priorisierung' },
        ],
      },
    ],
  },
  {
    id: 'mcp-plattform-self-hosted',
    titel: 'MCP-Plattform',
    untertitel: 'Selbst gehostet, Freigabe per Passkey',
    beschreibung:
      'Zugriff eines Agenten über CDN und Reverse Proxy auf den MCP-Server mit OAuth. Änderungen: Tool-Aufruf, Vorschau, Freigabe per Passkey, Anwendung im Container, Healthcheck. Betrieb: lokale und verschlüsselte externe Sicherung, Rollback-Punkt, gezielte Wiederherstellung.',
    bahnen: [
      {
        titel: 'Zugriff', takt: 'jede Anfrage',
        stationen: [
          { label: 'Agent', note: 'MCP-Client' },
          { label: 'CDN', note: 'Schutz' },
          { label: 'Reverse Proxy', note: 'TLS' },
          { label: 'OAuth', note: 'Anmeldung' },
          { label: 'MCP-Server', note: 'Tools' },
        ],
      },
      {
        titel: 'Änderung', takt: 'nur mit Freigabe',
        stationen: [
          { label: 'Tool-Aufruf', note: 'Agent' },
          { label: 'Vorschau', note: 'Prüfung' },
          { label: 'Passkey', note: 'einmalig, befristet', gate: true },
          { label: 'Anwendung', note: 'Container' },
          { label: 'Healthcheck', note: 'HTTP · OAuth' },
        ],
      },
      {
        titel: 'Betrieb', takt: 'Sicherung',
        stationen: [
          { label: 'Backup', note: 'lokal' },
          { label: 'Kopie', note: 'verschlüsselt extern' },
          { label: 'Rollback-Punkt', note: 'vor Rollout' },
          { label: 'Wiederherstellung', note: 'je Komponente' },
        ],
      },
    ],
  },
  {
    id: 'ki-rechnungspruefung',
    titel: 'KI-Rechnungsprüfung',
    untertitel: 'Modell extrahiert, Code prüft, Mensch gibt frei',
    beschreibung:
      'Mail mit PDF, Textextraktion, Auslesen gegen ein JSON-Schema durch ein Sprachmodell, Plausibilitätsprüfung in Code, Zuordnung zu Projektpositionen, Vorschlag an die Fachabteilung und Freigabe. Unklare Fälle werden markiert und gemeldet.',
    bahnen: [
      {
        titel: 'Eingang', takt: 'Postfach',
        stationen: [
          { label: 'Mail', note: 'PDF-Anhang' },
          { label: 'Text', note: 'Extraktion' },
          { label: 'LLM', note: 'JSON-Schema' },
          { label: 'Prüfung', note: 'Summen · Duplikate' },
          { label: 'Zuordnung', note: 'Positionen' },
          { label: 'Freigabe', note: 'Fachabteilung', gate: true },
        ],
      },
      {
        titel: 'Unklar', takt: 'Ausnahme',
        stationen: [
          { label: 'Markierung', note: 'zur Prüfung' },
          { label: 'Hinweis', note: 'Mail mit Grund' },
          { label: 'Neu verarbeiten', note: 'Label entfernen' },
        ],
      },
    ],
  },
  {
    id: 'automation-betrieb-self-hosting',
    titel: 'Automation-Betrieb',
    untertitel: 'Fehler, Daten, Zugänge',
    beschreibung:
      'Fehler aus Workflows laufen in einen zentralen Fehler-Workflow und von dort in einen Chat-Kanal. Daten liegen in einer selbst gehosteten Datenbank in Containern, Zugriffe über einen Credential Store. Zugänge über ein VPN mit fester Adresse und einen Passwortmanager.',
    bahnen: [
      {
        titel: 'Fehler', takt: 'bei jeder Ausnahme',
        stationen: [
          { label: 'Workflow', note: 'beliebig' },
          { label: 'Fehler-Workflow', note: 'zentral' },
          { label: 'Meldung', note: 'Chat-Kanal' },
        ],
      },
      {
        titel: 'Daten', takt: 'laufend',
        stationen: [
          { label: 'Workflows', note: 'n8n' },
          { label: 'Credential Store', note: 'Zugriff' },
          { label: 'Datenbank', note: 'Container, DE' },
          { label: 'Sicherung', note: 'nächtlich' },
        ],
      },
      {
        titel: 'Zugang', takt: 'Team',
        stationen: [
          { label: 'Team', note: 'Geräte' },
          { label: 'VPN', note: 'WireGuard' },
          { label: 'Feste IP', note: 'Freigaben' },
          { label: 'Passwortmanager', note: 'selbst gehostet' },
        ],
      },
    ],
  },
  {
    id: 'wissensbasis-rag-mcp',
    titel: 'Wissensbasis — RAG + MCP-Server',
    untertitel: 'Schreibpfad und Lesepfad getrennt',
    beschreibung:
      'Ingest: Dokumente aus einem Ordner laden, in Chunks zerlegen, mehrsprachige Embeddings erzeugen und in Postgres mit Vektor-Erweiterung speichern. Retrieval: Ein Agent ruft das einzige, lesende MCP-Tool auf, die Anfrage wird mit demselben Modell eingebettet und über eine Match-Funktion gesucht.',
    bahnen: [
      {
        titel: 'Ingest', takt: 'Schreibpfad',
        stationen: [
          { label: 'Dokumentquelle', note: 'Ordner' },
          { label: 'Laden', note: 'Dokument-Loader' },
          { label: 'Chunking', note: 'Text-Splitter' },
          { label: 'Embeddings', note: 'mehrsprachig' },
          { label: 'Vector Store', note: 'Postgres' },
        ],
      },
      {
        titel: 'Retrieval', takt: 'Lesepfad über MCP',
        stationen: [
          { label: 'Agent', note: 'beliebiger Client' },
          { label: 'MCP-Server', note: 'ein Tool, lesend' },
          { label: 'Anfrage', note: 'gleiches Modell' },
          { label: 'Match-Funktion', note: 'Postgres' },
          { label: 'Treffer', note: 'an den Agenten' },
        ],
      },
    ],
  },
  {
    id: 'ai-visibility',
    titel: 'AI Visibility Monitoring Platform',
    untertitel: 'Drei Komponenten, fünf Datenquellen',
    beschreibung:
      'Täglich: Sichtbarkeits-APIs, defensive Extraktion, Kontext, Analyse-Agent ohne Tools, Normalisierung, Upsert in die Insights-Tabelle. Täglich: Webanalyse, Suchkonsole und Backlinks über zwei Zeiträume, Aggregation nach URL, Anomalieerkennung, Aufgaben und Meldung. Vierzehntägig: ein Agent-System ruft n8n per Webhook, n8n bewertet je URL den Trend und antwortet synchron.',
    bahnen: [
      {
        titel: 'KI-Sichtbarkeit', takt: 'täglich',
        stationen: [
          { label: 'Sichtbarkeits-APIs', note: 'parallel' },
          { label: 'Extraktion', note: 'defensiv, rekursiv' },
          { label: 'Kontext', note: 'gewonnen · verloren' },
          { label: 'Analyse-Agent', note: 'ohne Tools' },
          { label: 'Normalisierung', note: 'in Code' },
          { label: 'Upsert', note: 'stabile Schlüssel' },
        ],
      },
      {
        titel: 'Traffic und Rankings', takt: 'täglich',
        stationen: [
          { label: 'Drei Quellen', note: 'zwei Zeiträume' },
          { label: 'Aggregation', note: 'nach URL' },
          { label: 'Anomalien', note: 'Einbrüche' },
          { label: 'Meldung', note: 'Aufgabe · Chat' },
        ],
      },
      {
        titel: 'Zielüberprüfung', takt: '14-tägig, extern',
        stationen: [
          { label: 'Agent-System', note: 'Auslöser' },
          { label: 'Webhook', note: 'synchron' },
          { label: 'Je URL', note: 'vier Abfragen' },
          { label: 'Trend', note: 'Signal-Voting' },
          { label: 'Antwort', note: 'an den Agenten' },
        ],
      },
    ],
  },
  {
    id: 'grounding-page-generator',
    titel: 'Grounding Page Generator',
    untertitel: 'Dreistufiger Self-Service',
    beschreibung:
      'Dreistufiger Self-Service-Flow. Stufe eins: Formular, Verzweigung nach vorhandener URL, Research-Agent mit Web-Such-Tool und JSON-Schema, Session als Audit-Trail. Stufe zwei: Validierung durch den Menschen zwischen den beiden Modellaufrufen, danach deterministisches Merge, bei dem die Nutzereingabe die KI schlägt, wenn sie vorhanden ist. Stufe drei: Generierungs-Chain gegen ein strenges Ausgabeschema und das fertige Dokument aus Titel, Meta-Description, JSON-LD und HTML. Scheitert das Scraping, fällt der Lauf auf den Pfad ohne URL zurück.',
    bahnen: [
      {
        titel: 'Stufe 1', takt: 'Recherche',
        stationen: [
          { label: 'Formular', note: 'Entität · URL optional' },
          { label: 'Verzweigung', note: 'URL vorhanden?' },
          { label: 'Research-Agent', note: 'LLM + Web-Suche' },
          { label: 'Session', note: 'Audit-Trail je Lauf' },
        ],
      },
      {
        titel: 'Stufe 2', takt: 'Validierung',
        stationen: [
          { label: 'Validierung', note: 'durch den Menschen', gate: true },
          { label: 'Merge', note: 'Eingabe schlägt KI' },
        ],
      },
      {
        titel: 'Stufe 3', takt: 'Generierung',
        stationen: [
          { label: 'Generierungs-Chain', note: 'strenges Schema' },
          { label: 'Dokument', note: 'Titel · Meta · JSON-LD · HTML' },
        ],
      },
    ],
  },
  {
    id: 'recruiting-jobs-sync',
    titel: 'Recruiting Jobs Sync',
    untertitel: 'Täglicher Batch, selbstheilend',
    beschreibung:
      'Täglicher Batch. Ein Lauf-Zeitstempel wird zu Beginn gesetzt und über den gesamten Lauf geführt. Karriereseite, Scraping und Extraktion, LLM-gestützte strukturierte Extraktion, Validierung und Normalisierung, Upsert in den Datenspeicher; die Schleife läuft je Link mit Batchgröße eins. Jeder berührte Datensatz bekommt last_seen_at auf den Laufzeitpunkt. Am Ende werden alle aktiven Zeilen mit älterem last_seen_at auf inaktiv gesetzt statt gelöscht; beim nächsten erfolgreichen Lauf kommt der Eintrag zurück.',
    bahnen: [
      {
        titel: 'Je Link', takt: 'Batchgröße 1',
        stationen: [
          { label: 'Karriereseite', note: 'HTML, keine API' },
          { label: 'Scraping', note: 'Links dedupliziert' },
          { label: 'LLM-Extraktion', note: 'JSON-Schema · Enum' },
          { label: 'Validierung', note: 'Unklares bleibt leer' },
          { label: 'Upsert', note: 'Match über Slug' },
        ],
      },
      {
        titel: 'Laufende', takt: 'einmal je Lauf',
        stationen: [
          { label: 'Zeitstempel', note: 'last_seen_at' },
          { label: 'Vergleich', note: 'älter als Lauf' },
          { label: 'Inaktiv', note: 'nicht gelöscht' },
        ],
      },
    ],
  },
  {
    id: 'leistungsnachweis-automation',
    titel: 'Leistungsnachweis Automation',
    untertitel: 'Monatlich, nach Freigabe',
    beschreibung:
      'Monatlicher n8n-Workflow. Eine Chat-Nachricht fragt die Freigabe ab; eine Reaktion darauf startet den Lauf und bestimmt den Zeitraum. Zeiteinträge werden aus der Zeiterfassung geladen, Kunden zugeordnet und transformiert, daraus entstehen Tabellen und Dokumente, die in der Ablage gespeichert werden. Der Abschluss wird im Chat zurückgemeldet. Ohne Reaktion startet kein Lauf.',
    bahnen: [
      {
        titel: 'Start', takt: 'monatlich',
        stationen: [
          { label: 'Freigabe-Nachricht', note: 'Chat' },
          { label: 'Reaktion', note: 'Mensch', gate: true },
          { label: 'Zeitraum', note: 'Monat · von / bis' },
          { label: 'Zeiteinträge', note: 'Zeiterfassung-API' },
        ],
      },
      {
        titel: 'Je Kunde', takt: 'Schleife',
        stationen: [
          { label: 'Zuordnung', note: 'je Kunde strukturiert' },
          { label: 'Dokumente', note: 'Vorlagen befüllt' },
          { label: 'Ablage', note: 'Ordner je Kunde' },
          { label: 'Abschluss', note: 'Rückmeldung im Chat' },
        ],
      },
    ],
  },
];
