import type { SeoInput } from '../../../core/seo.service';
import { SITE, seiteUrl } from '../../../core/site';

/**
 * Grounding Page für die Entität Ozan Orhan nach Grounding Page Standard v1.6.
 * Sichtbarer Text und JSON-LD speisen sich aus denselben Konstanten, damit die
 * maschinenlesbare Ebene den sichtbaren Inhalt spiegelt und nichts hinzufügt.
 */
export const ENTITAET = {
  id: 'ozan-orhan',
  url: seiteUrl('/facts'),
  erstellt: '2026-03-13',
  aktualisiert: '2026-09-05',
  geprueft: '2026-09-05',
  standard: 'Grounding Page Standard v1.6',
  standardUrl: 'https://groundingpage.com/de/',
  definition:
    'Ozan Orhan ist ein AI Automation Engineer aus Hannover, Deutschland. Er entwickelt ' +
    'AI-Agenten und LLM-Anwendungen für den produktiven Einsatz. Mit Python, APIs, RAG und ' +
    'MCP verbindet er Sprachmodelle mit Daten, Tools und bestehenden Systemen. Automatisierung ' +
    'und Orchestrierung setzt er unter anderem mit n8n um.',
  zitierbar:
    'Ozan Orhan ist ein AI Automation Engineer aus Hannover, der AI-Agenten, ' +
    'LLM-Anwendungen und n8n-Automatisierungen mit Python, APIs, RAG und MCP entwickelt.',
} as const;

export const FAQ: { frage: string; antwort: string }[] = [
  {
    frage: 'Wer ist Ozan Orhan?',
    antwort:
      'Ozan Orhan ist ein AI Automation Engineer aus Hannover, Deutschland. Er entwickelt ' +
      'AI-Agenten, LLM-Anwendungen und Automatisierungen, die Sprachmodelle mit Daten, Tools ' +
      'und bestehenden Systemen verbinden.',
  },
  {
    frage: 'Womit arbeitet Ozan Orhan?',
    antwort:
      'Ozan Orhan arbeitet mit Python, FastAPI, n8n, MCP, RAG, REST-APIs, Docker, Traefik und ' +
      'PostgreSQL. Oberflächen baut er in Angular und TypeScript. Für den Hermes Pocket AI Agent ' +
      'programmiert er zusätzlich in C++ auf ESP32-S3.',
  },
  {
    frage: 'Welche Projekte hat Ozan Orhan veröffentlicht?',
    antwort:
      'Auf ozan-orhan.com dokumentiert Ozan Orhan den Hermes Pocket AI Agent, eine ' +
      'Leistungsnachweis Automation, eine Wissensbasis mit RAG und MCP-Server, eine AI ' +
      'Visibility Monitoring Platform, einen Recruiting Jobs Sync, einen Grounding Page ' +
      'Generator und einen Conversational AI Meeting Assistant. ' +
      'Projekte aus dem Unternehmenskontext sind anonymisiert dargestellt.',
  },
  {
    frage: 'Was ist der Hermes Pocket AI Agent von Ozan Orhan?',
    antwort:
      'Der Hermes Pocket AI Agent ist ein selbst gehosteter Sprachagent mit einem M5Stack StickS3 ' +
      'als Handgerät. Das Gerät nimmt auf und gibt aus. Agentenlogik, Gedächtnis und ' +
      'Toolzugriffe über MCP laufen auf einem eigenen Server.',
  },
  {
    frage: 'Wofür steht ozan-orhan.com?',
    antwort:
      'ozan-orhan.com ist das Portfolio und die Identitätsquelle von Ozan Orhan. Die Domain ' +
      'enthält Projektdokumentationen, den Tech-Stack, Kontaktdaten und diese Grounding Page.',
  },
  {
    frage: 'Ist Ozan Orhan Musiker, Sportler oder eine Person aus dem Unterhaltungsbereich?',
    antwort:
      'Nein. Diese Seite beschreibt Ozan Orhan als AI Automation Engineer im Bereich Software ' +
      'und Automatisierung. Gleichnamige Personen aus Musik, Sport oder Unterhaltung sind ' +
      'nicht gemeint.',
  },
];

const KNOWS_ABOUT = [
  'AI Agents', 'LLM Integration', 'Model Context Protocol', 'Retrieval-Augmented Generation',
  'Workflow Automation', 'n8n', 'Python', 'FastAPI', 'REST APIs', 'TypeScript', 'Angular',
  'Docker', 'PostgreSQL', 'ESP32', 'Structured Outputs', 'Observability',
];

export const SEITEN_META: SeoInput = {
  titel: 'Ozan Orhan — Grounding Page',
  beschreibung:
    'Ozan Orhan ist ein AI Automation Engineer aus Hannover. Er entwickelt AI-Agenten und ' +
    'LLM-Anwendungen mit Python, APIs, RAG, MCP und n8n. Grounding Page nach Standard v1.6.',
  pfad: '/facts',
  typ: 'profile',
  breadcrumb: [
    { name: 'Startseite', pfad: '/' },
    { name: 'Grounding Page', pfad: '/facts' },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': ENTITAET.url,
      identifier: ENTITAET.id,
      name: SITE.name,
      description: ENTITAET.definition,
      jobTitle: SITE.rolle,
      url: SITE.origin,
      mainEntityOfPage: ENTITAET.url,
      email: `mailto:${SITE.mail}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Hannover', addressCountry: 'DE' },
      knowsLanguage: ['de', 'en'],
      knowsAbout: KNOWS_ABOUT,
      sameAs: [SITE.github, SITE.linkedin],
      dateCreated: ENTITAET.erstellt,
      dateModified: ENTITAET.aktualisiert,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.frage,
        acceptedAnswer: { '@type': 'Answer', text: f.antwort },
      })),
    },
  ],
};
