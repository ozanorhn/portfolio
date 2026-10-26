// Schwerpunkte: das Tätigkeitsfeld, gruppiert und je Gruppe an belegende Fallstudien gebunden.
// Jede Aussage hier muss in einer der verlinkten Fallstudien nachlesbar sein.

export interface Schwerpunkt {
  id: string;
  titel: string;
  text: string;
  /** Fallstudien, die den Schwerpunkt belegen, die stärkste zuerst. */
  projekte: string[];
}

export const SCHWERPUNKTE: Schwerpunkt[] = [
  {
    id: 'agenten',
    titel: 'Agenten und MCP',
    text:
      'Agenten, die Aufgaben in mehreren Schritten bearbeiten und Werkzeuge über das Model ' +
      'Context Protocol nutzen: mit festen Skills, eigenem MCP-Server und Freigabe vor ' +
      'schreibenden Aktionen, bis zum Sprachagenten auf eigener Hardware. Eine Multi-Agent-' +
      'Variante mit Orchestrator und Kritiker lief als Testlauf.',
    projekte: ['seo-agent-multi-agent-system', 'mcp-plattform-self-hosted', 'pocket-ai-agent'],
  },
  {
    id: 'wissen',
    titel: 'Wissenssysteme mit RAG',
    text:
      'Interne Dokumente als zentrale Retrieval-Schicht: Chunking, mehrsprachige Embeddings, ' +
      'Vektorsuche in PostgreSQL und Zugriff für beliebige Agenten über einen MCP-Server.',
    projekte: ['wissensbasis-rag-mcp'],
  },
  {
    id: 'automatisierung',
    titel: 'Prozessautomatisierung',
    text:
      'Wiederkehrende Abläufe mit n8n, Code und APIs. Sprachmodelle lesen Rechnungen, ' +
      'Mitschriften und Webseiten gegen feste Schemas, Code prüft und entscheidet, Menschen ' +
      'geben frei.',
    projekte: [
      'ki-rechnungspruefung',
      'leistungsnachweis-automation',
      'recruiting-jobs-sync',
      'conversational-ai-meeting-assistant',
    ],
  },
  {
    id: 'sichtbarkeit',
    titel: 'KI-Sichtbarkeit und Agentic Commerce',
    text:
      'Messen, ob KI-Assistenten Marken, Shops und Quellen nennen, und Inhalte so aufbereiten, ' +
      'dass Antwortsysteme sie eindeutig zuordnen können: Monitoring über fünf Datenquellen, ' +
      'ein Audit mit echten Kauffragen und ein Generator für Grounding Pages.',
    projekte: [
      'ai-visibility-monitoring-platform',
      'agentic-commerce-audit',
      'grounding-page-generator',
    ],
  },
  {
    id: 'betrieb',
    titel: 'Betrieb und Self-Hosting',
    text:
      'Was nach dem Livegang zählt: Container-Deployments, ein zentraler Fehlerpfad, ' +
      'Hänger-Erkennung, Backups mit Wiederherstellung und Zugänge im Credential Store.',
    projekte: [
      'automation-betrieb-self-hosting',
      'mcp-plattform-self-hosted',
      'agentic-commerce-audit',
    ],
  },
];

/** Grundsätze der Arbeitsweise, jeder mit einer Fallstudie, die ihn zeigt. */
export const GRUNDSAETZE: { titel: string; text: string; projekte: string[] }[] = [
  {
    titel: 'Das Modell liest, Code entscheidet',
    text:
      'Sprachmodelle extrahieren, recherchieren und formulieren. Prüfungen, Schlüssel und ' +
      'Schreibvorgänge laufen in deterministischem Code.',
    projekte: ['ki-rechnungspruefung', 'ai-visibility-monitoring-platform'],
  },
  {
    titel: 'Freigabe vor dem folgenreichen Schritt',
    text:
      'Teure, schreibende oder ausliefernde Schritte starten erst nach einer menschlichen ' +
      'Entscheidung, per Passkey, Statuswechsel oder Formular.',
    projekte: ['mcp-plattform-self-hosted', 'grounding-page-generator'],
  },
  {
    titel: 'Fehler werden sichtbar',
    text:
      'Doppelstart-Schutz, Hänger-Wache, Fehlermeldung direkt am Auftrag und ein gemeinsamer ' +
      'Error-Workflow statt stiller Abbrüche.',
    projekte: ['agentic-commerce-audit', 'automation-betrieb-self-hosting'],
  },
  {
    titel: 'Ehrlicher Stand',
    text:
      'Jede Fallstudie nennt Reifegrad, eigenen Beitrag und offene Punkte. Kennzahlen stehen ' +
      'nur dort, wo sie gemessen wurden.',
    projekte: [],
  },
];
