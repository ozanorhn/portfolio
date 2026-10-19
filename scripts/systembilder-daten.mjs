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
];
