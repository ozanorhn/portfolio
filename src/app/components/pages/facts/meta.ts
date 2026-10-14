import type { SeoInput } from '../../../core/seo.service';
import { BESCHREIBUNG, SITE, person, seiteUrl } from '../../../core/site';

/**
 * Grounding Page für die Entität Ozan Orhan nach Grounding Page Standard v1.6.
 * Sichtbarer Text und JSON-LD speisen sich aus denselben Konstanten, damit die
 * maschinenlesbare Ebene den sichtbaren Inhalt spiegelt und nichts hinzufügt.
 */
export const ENTITAET = {
  id: 'ozan-orhan',
  url: seiteUrl('/facts'),
  erstellt: '2026-03-13',
  aktualisiert: '2026-10-14',
  geprueft: '2026-10-14',
  standard: 'Grounding Page Standard v1.6',
  standardUrl: 'https://groundingpage.com/de/',
  // Erster Satz identisch mit Person.description (BESCHREIBUNG), sichtbar als Lead
  definition:
    BESCHREIBUNG +
    ' Mit Python, APIs, RAG und MCP verbindet er Sprachmodelle mit Daten, Tools und bestehenden Systemen.',
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

export const SEITEN_META: SeoInput = {
  titel: 'Ozan Orhan — Grounding Page',
  beschreibung:
    'Ozan Orhan ist AI Automation Engineer aus Hannover: KI-Automatisierung, AI-Agenten ' +
    'und LLM-Anwendungen mit Python, RAG, MCP und n8n. Grounding Page nach Standard v1.6.',
  pfad: '/facts',
  typ: 'profile',
  breadcrumb: [
    { name: 'Startseite', pfad: '/' },
    { name: 'Grounding Page', pfad: '/facts' },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      // dateCreated/dateModified gehören an die ProfilePage, nicht an die Person
      '@type': 'ProfilePage',
      url: ENTITAET.url,
      inLanguage: 'de-DE',
      dateCreated: ENTITAET.erstellt,
      dateModified: ENTITAET.aktualisiert,
      // Eine Person-Entität für die ganze Website
      mainEntity: { ...person(), identifier: ENTITAET.id, knowsLanguage: ['de', 'en'] },
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
