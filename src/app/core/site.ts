export const SITE = {
  name: 'Ozan Orhan',
  /** Übergreifende Rolle: Hero, Autorenbox, Footer, Faktenseite, llms.txt, Schema jobTitle */
  rolle: 'AI Engineer',
  /** Gleichwertige zweite Bezeichnung für Automatisierungsarbeit; bleibt sichtbar und im Schema. */
  rolleAutomation: 'AI Automation Engineer',
  /** Einziges Porträt der Website. Person.image, Faktenseite und Profil zeigen genau diese Datei. */
  portraet: 'https://ozan-orhan.com/assets/img/ozan.jpg',
  ort: 'Hannover, Deutschland',
  origin: 'https://ozan-orhan.com',
  mail: 'contact@ozan-orhan.com',
  github: 'https://github.com/ozanorhn',
  linkedin: 'https://www.linkedin.com/in/ozan-o-7014a22a3',
  /** Autorenprofil auf arcnode.de, vom Nutzer als weiteres Profil freigegeben */
  arcnode: 'https://arcnode.de/autor/ozan/',
} as const;

/** Ein Satz für Schema (Person.description), Startseite, Faktenseite und llms.txt. */
export const BESCHREIBUNG =
  'Ozan Orhan ist AI Engineer aus Hannover. Er entwickelt KI-Anwendungen und agentische ' +
  'Systeme und integriert sie als AI Automation Engineer in bestehende Geschäftsprozesse, ' +
  'mit Python, n8n, MCP und RAG.';

/** Nur Themen, die eine Fallstudie oder der Tech-Stack auf der Website belegt. */
export const KNOWS_ABOUT = [
  'KI-Agenten', 'Agentische Systeme', 'Multi-Agent-Systeme', 'Model Context Protocol',
  'RAG', 'KI-Automatisierung', 'Prozessautomatisierung', 'KI-Sichtbarkeit', 'Voice Agents',
  'LLM Integration', 'Structured Outputs', 'Human-in-the-loop', 'Self-Hosting',
  'n8n', 'Python', 'FastAPI', 'TypeScript', 'Angular', 'REST APIs', 'Docker', 'PostgreSQL',
  'ESP32', 'Observability', 'Agentic Coding', 'KI-gestützte Softwareentwicklung', 'Claude Code',
];

/** Porträt als ImageObject; Bildunterschrift identisch mit dem sichtbaren Alt-Text. */
export function portraet(): Record<string, unknown> {
  return {
    '@type': 'ImageObject',
    '@id': `${SITE.origin}/#portraet`,
    url: SITE.portraet,
    contentUrl: SITE.portraet,
    width: 800,
    height: 800,
    caption: PORTRAET_ALT,
  };
}

export const PORTRAET_ALT = 'Ozan Orhan, AI Engineer aus Hannover';

/** Person-Entität (#person), auf allen Seiten identisch; Seiten ergänzen nur eigene Felder. */
export function person(): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': `${SITE.origin}/#person`,
    name: SITE.name,
    url: SITE.origin,
    jobTitle: [SITE.rolle, SITE.rolleAutomation],
    description: BESCHREIBUNG,
    image: portraet(),
    hasOccupation: {
      '@type': 'Occupation',
      name: SITE.rolle,
      alternateName: [SITE.rolleAutomation, 'KI-Entwickler'],
      skills:
        'KI-Agenten, agentische Systeme, Model Context Protocol, RAG, Prozessautomatisierung, ' +
        'Agentic Coding, n8n, Python, Self-Hosting',
    },
    email: `mailto:${SITE.mail}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Hannover', addressCountry: 'DE' },
    knowsAbout: KNOWS_ABOUT,
    sameAs: [SITE.github, SITE.linkedin, SITE.arcnode],
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
