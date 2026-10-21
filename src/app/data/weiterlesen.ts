/**
 * Querverweise je Fallstudie: verwandte Projekte, Fachartikel und Glossarbegriffe.
 * Nur Bezüge, die im Projekttext tatsächlich vorkommen. Fachartikel ergänzen die in
 * Strapi gepflegte Zuordnung (projektSlugs), ersetzen sie nicht. Unbekannte Slugs
 * fallen auf der Seite einfach weg.
 */
export interface Weiterlesen {
  projekte?: string[];
  artikel?: string[];
  begriffe?: string[];
}

export const WEITERLESEN: Record<string, Weiterlesen> = {
  'seo-agent-multi-agent-system': {
    projekte: ['ai-visibility-monitoring-platform', 'mcp-plattform-self-hosted'],
    artikel: ['n8n-agents-vs-ai-agent-node', 'ki-agenten-sicherheit-tuev-bsi-studie'],
    begriffe: ['ki-agent', 'mcp-model-context-protocol', 'human-in-the-loop'],
  },
  'agentic-commerce-audit': {
    projekte: ['ai-visibility-monitoring-platform', 'grounding-page-generator'],
    begriffe: ['geo-generative-engine-optimization', 'human-in-the-loop', 'n8n'],
  },
  'mcp-plattform-self-hosted': {
    projekte: [
      'seo-agent-multi-agent-system',
      'wissensbasis-rag-mcp',
      'automation-betrieb-self-hosting',
    ],
    artikel: ['mcp-server-mit-n8n-erstellen', 'ki-agenten-sicherheit-tuev-bsi-studie'],
    begriffe: ['mcp-model-context-protocol', 'human-in-the-loop', 'guardrails'],
  },
  'ki-rechnungspruefung': {
    projekte: ['recruiting-jobs-sync', 'leistungsnachweis-automation'],
    begriffe: ['structured-output', 'human-in-the-loop', 'ki-automatisierung'],
  },
  'automation-betrieb-self-hosting': {
    projekte: ['mcp-plattform-self-hosted', 'leistungsnachweis-automation'],
    begriffe: ['n8n', 'workflow-automatisierung'],
  },
  'wissensbasis-rag-mcp': {
    projekte: ['mcp-plattform-self-hosted', 'seo-agent-multi-agent-system'],
    begriffe: ['rag', 'embeddings', 'vektordatenbank', 'mcp-model-context-protocol'],
  },
  'ai-visibility-monitoring-platform': {
    projekte: ['seo-agent-multi-agent-system', 'agentic-commerce-audit'],
    begriffe: ['geo-generative-engine-optimization', 'n8n'],
  },
  'pocket-ai-agent': {
    projekte: ['mcp-plattform-self-hosted', 'wissensbasis-rag-mcp'],
    begriffe: ['ki-agent', 'mcp-model-context-protocol'],
  },
  'leistungsnachweis-automation': {
    projekte: ['automation-betrieb-self-hosting', 'ki-rechnungspruefung'],
    begriffe: ['human-in-the-loop', 'n8n', 'prozessautomatisierung'],
  },
  'recruiting-jobs-sync': {
    projekte: ['ki-rechnungspruefung', 'leistungsnachweis-automation'],
    begriffe: ['structured-output', 'ki-automatisierung', 'n8n'],
  },
  'grounding-page-generator': {
    projekte: ['agentic-commerce-audit', 'ai-visibility-monitoring-platform'],
    begriffe: ['llms-txt', 'geo-generative-engine-optimization', 'structured-output'],
  },
  'conversational-ai-meeting-assistant': {
    projekte: ['pocket-ai-agent'],
    begriffe: ['llm'],
  },
};
