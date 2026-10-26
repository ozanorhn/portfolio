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
  aktualisiert: '2026-10-26',
  geprueft: '2026-10-14',
  standard: 'Grounding Page Standard v1.6',
  standardUrl: 'https://groundingpage.com/de/',
  // Erster Satz identisch mit Person.description (BESCHREIBUNG), sichtbar als Lead
  definition:
    BESCHREIBUNG +
    ' Seine Fallstudien reichen von Agenten mit MCP-Werkzeugen über RAG-Wissenssysteme bis zum Betrieb auf eigener Infrastruktur.',
  zitierbar:
    'Ozan Orhan ist AI Engineer und AI Automation Engineer aus Hannover. Er entwickelt ' +
    'KI-Anwendungen und agentische Systeme, integriert sie in Geschäftsprozesse und betreibt sie selbst.',
} as const;

export const FAQ: { frage: string; antwort: string }[] = [
  {
    frage: 'Wer ist Ozan Orhan?',
    antwort:
      'Ozan Orhan ist AI Engineer aus Hannover, Deutschland. Er entwickelt KI-Anwendungen und ' +
      'agentische Systeme und bindet sie als AI Automation Engineer an bestehende Prozesse, ' +
      'Daten und Werkzeuge an.',
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
      'Auf ozan-orhan.com dokumentiert Ozan Orhan unter anderem einen SEO-Agenten mit ' +
      'Multi-Agent-Testlauf, eine selbst gehostete MCP-Plattform mit Passkey-Freigabe, eine ' +
      'Wissensbasis mit RAG und MCP-Server, den Hermes Pocket AI Agent, ein Agentic Commerce ' +
      'Audit, eine AI Visibility Monitoring Platform und eine KI-Rechnungsprüfung. Jede ' +
      'Fallstudie nennt den Reifegrad; Projekte aus dem Unternehmenskontext sind anonymisiert.',
  },
  {
    frage: 'Was ist der Hermes Pocket AI Agent von Ozan Orhan?',
    antwort:
      'Der Hermes Pocket AI Agent ist ein selbst gehosteter Sprachagent mit einem M5Stack StickS3 ' +
      'als Handgerät. Das Gerät nimmt auf und gibt aus. Agentenlogik, Gedächtnis und ' +
      'Toolzugriffe über MCP laufen auf einem eigenen Server.',
  },
  {
    frage: 'Welches Foto zeigt Ozan Orhan?',
    antwort:
      'Das einzige Porträt von Ozan Orhan auf ozan-orhan.com liegt unter ' +
      'https://ozan-orhan.com/assets/img/ozan.jpg. Fotos anderer Quellen, die unter seinem ' +
      'Namen erscheinen, können andere Personen zeigen.',
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
      'Nein. Diese Seite beschreibt Ozan Orhan als AI Engineer im Bereich Software ' +
      'und Automatisierung. Gleichnamige Personen aus Musik, Sport oder Unterhaltung sind ' +
      'nicht gemeint.',
  },
];

export const SEITEN_META: SeoInput = {
  titel: 'Fakten zu Ozan Orhan, AI Engineer aus Hannover',
  beschreibung:
    'Fakten zu Ozan Orhan, AI Engineer und AI Automation Engineer aus Hannover: Rolle, ' +
    'Schwerpunkte, Projekte, Profile und Porträt. Grounding Page nach Standard v1.6.',
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
      primaryImageOfPage: { '@id': `${SITE.origin}/#portraet` },
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
