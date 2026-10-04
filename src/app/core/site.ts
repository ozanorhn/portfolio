export const SITE = {
  name: 'Ozan Orhan',
  rolle: 'AI Automation Engineer',
  ort: 'Hannover, Deutschland',
  origin: 'https://ozan-orhan.com',
  mail: 'contact@ozan-orhan.com',
  github: 'https://github.com/ozanorhn',
  linkedin: 'https://www.linkedin.com/in/ozan-o-7014a22a3',
} as const;

/**
 * Absolute Seiten-URL, so wie der Server sie ausliefert: vorgerenderte Seiten liegen als
 * Ordner mit index.html, Apache leitet /pfad per 301 auf /pfad/ um. Canonical, Sitemap und
 * strukturierte Daten zeigen deshalb direkt auf die Variante mit Schrägstrich.
 */
export function seiteUrl(pfad: string): string {
  const p = pfad.startsWith('/') ? pfad : `/${pfad}`;
  return SITE.origin + (p.endsWith('/') ? p : `${p}/`);
}
