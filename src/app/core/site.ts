export const SITE = {
  name: 'Ozan Orhan',
  /** Berufsbezeichnung überall: Title, Schema jobTitle, Autorenbox, Faktenseite, llms.txt */
  rolle: 'AI Automation Engineer',
  ort: 'Hannover, Deutschland',
  origin: 'https://ozan-orhan.com',
  mail: 'contact@ozan-orhan.com',
  github: 'https://github.com/ozanorhn',
  linkedin: 'https://www.linkedin.com/in/ozan-o-7014a22a3',
} as const;

/** Ein Satz für Schema (Person.description), Startseite, Faktenseite und llms.txt. */
export const BESCHREIBUNG =
  'Ozan Orhan ist AI Automation Engineer aus Hannover. Er entwickelt KI-Agenten und ' +
  'automatisiert Geschäftsprozesse mit KI, n8n, RAG und MCP.';

export const KNOWS_ABOUT = [
  'KI-Automatisierung', 'Prozessautomatisierung', 'KI-Agenten',
  'AI Automation', 'AI Agents', 'LLM Integration', 'Model Context Protocol', 'RAG',
  'Workflow Automation', 'n8n', 'Python', 'FastAPI', 'TypeScript', 'Angular', 'REST APIs',
  'Docker', 'PostgreSQL', 'ESP32', 'Embedded Systems', 'Structured Outputs', 'Observability',
];

/** Person-Entität (#person), auf allen Seiten identisch; Seiten ergänzen nur eigene Felder. */
export function person(): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': `${SITE.origin}/#person`,
    name: SITE.name,
    url: SITE.origin,
    jobTitle: SITE.rolle,
    description: BESCHREIBUNG,
    hasOccupation: {
      '@type': 'Occupation',
      name: SITE.rolle,
      alternateName: ['AI Engineer', 'Automation Engineer', 'KI-Automatisierung'],
      skills: 'KI-Agenten, Prozessautomatisierung, n8n, RAG, Model Context Protocol, Python',
    },
    email: `mailto:${SITE.mail}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Hannover', addressCountry: 'DE' },
    knowsAbout: KNOWS_ABOUT,
    sameAs: [SITE.github, SITE.linkedin],
  };
}

/** Google kürzt Titles ab etwa 60 Zeichen; der Name wird nur angehängt, wenn er noch passt. */
const TITEL_MAX = 60;

export function seitenTitel(titel: string): string {
  const mitName = `${titel} | ${SITE.name}`;
  return mitName.length <= TITEL_MAX ? mitName : titel;
}

/**
 * Absolute Seiten-URL, so wie der Server sie ausliefert: vorgerenderte Seiten liegen als
 * Ordner mit index.html, Apache leitet /pfad per 301 auf /pfad/ um. Canonical, Sitemap und
 * strukturierte Daten zeigen deshalb direkt auf die Variante mit Schrägstrich.
 */
export function seiteUrl(pfad: string): string {
  const p = pfad.startsWith('/') ? pfad : `/${pfad}`;
  return SITE.origin + (p.endsWith('/') ? p : `${p}/`);
}
