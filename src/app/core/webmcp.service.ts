import { DOCUMENT, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { WORKS, findWork, type Work } from '../data/works';
import { BlogService } from '../data/blog';
import { SITE, seiteUrl } from './site';

/**
 * WebMCP (experimenteller Webstandard, Chrome-Flag bzw. Origin Trial ab Chrome 149):
 * stellt Browser-Agenten strukturierte Werkzeuge für diese Seite bereit.
 * https://developer.chrome.com/docs/ai/webmcp
 *
 * Nur lesend und nur bereits öffentliche Inhalte: Projekte, Artikel, Profil. Keine
 * Formulare, keine Netzwerkzugriffe außer auf die eigene Artikelliste, keine Zugangsdaten.
 * Ohne WebMCP im Browser passiert nichts (progressive Erweiterung).
 */

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
    consequentialHint?: boolean;
  };
  execute: (eingabe: Record<string, unknown>) => Promise<string>;
}

interface ModelContext {
  registerTool(tool: WebMcpTool, optionen?: { signal?: AbortSignal }): Promise<void> | void;
}

/** Empfehlung von Chrome: höchstens etwa 1.500 Zeichen je Tool-Ausgabe. */
const MAX_AUSGABE = 1500;
const MAX_TREFFER = 6;

const NUR_LESEN = { readOnlyHint: true, untrustedContentHint: false, consequentialHint: false };

const text = (x: unknown): string => (typeof x === 'string' ? x.trim().slice(0, 80) : '');
const kurz = (s: string): string =>
  s.length > MAX_AUSGABE ? s.slice(0, MAX_AUSGABE - 1) + '…' : s;

@Injectable({ providedIn: 'root' })
export class WebMcpService {
  private readonly doc = inject(DOCUMENT);
  private readonly istBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly router = inject(Router);
  private readonly blog = inject(BlogService);
  private registriert = false;

  /** Einmal beim Start: registriert die Werkzeuge, falls der Browser WebMCP anbietet. */
  starten(): void {
    if (!this.istBrowser || this.registriert) return;
    const kontext = (this.doc as Document & { modelContext?: ModelContext }).modelContext;
    if (typeof kontext?.registerTool !== 'function') return;
    this.registriert = true;
    for (const tool of this.werkzeuge()) {
      // Registrierung ist optional; scheitert sie (z. B. geänderte Vorab-API), bleibt die Seite unberührt.
      Promise.resolve()
        .then(() => kontext.registerTool(tool))
        .catch(() => undefined);
    }
  }

  private werkzeuge(): WebMcpTool[] {
    return [
      {
        name: 'find_projects',
        description:
          'Findet Projekte und Fallstudien von Ozan Orhan (AI Automation Engineer) nach ' +
          'Technologie oder Stichwort, z. B. "MCP", "Python", "RAG", "n8n". Liefert Titel, ' +
          'Kurzbeschreibung, Stack und Link. Ohne Eingabe: die ausgewählten KI-Systeme.',
        inputSchema: {
          type: 'object',
          properties: {
            technologie: {
              type: 'string',
              description: 'Technologie im Stack, z. B. MCP, Python, n8n',
            },
            stichwort: {
              type: 'string',
              description: 'Freies Stichwort für Titel und Beschreibung',
            },
          },
        },
        annotations: NUR_LESEN,
        execute: async (e) => this.projekteFinden(text(e['technologie']), text(e['stichwort'])),
      },
      {
        name: 'open_case_study',
        description:
          'Öffnet die Fallstudie eines Projekts auf dieser Website und gibt Ausgangspunkt, ' +
          'eigenen Beitrag und Status zurück. Slug aus find_projects verwenden.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: { type: 'string', enum: WORKS.map((w) => w.slug), description: 'Projekt-Slug' },
          },
          required: ['slug'],
        },
        annotations: NUR_LESEN,
        execute: async (e) => this.fallstudieOeffnen(text(e['slug'])),
      },
      {
        name: 'find_articles',
        description:
          'Sucht technische Fachartikel von Ozan Orhan zu KI-Agenten, MCP, RAG und n8n. ' +
          'Liefert Titel, Kurzfassung und Link.',
        inputSchema: {
          type: 'object',
          properties: { stichwort: { type: 'string', description: 'Thema, z. B. MCP oder RAG' } },
        },
        annotations: NUR_LESEN,
        execute: async (e) => this.artikelFinden(text(e['stichwort'])),
      },
      {
        name: 'get_profile',
        description:
          'Gibt das berufliche Kurzprofil von Ozan Orhan zurück: Rolle, Ort, Schwerpunkte und ' +
          'öffentliche Kontaktwege. Sendet nichts.',
        inputSchema: { type: 'object', properties: {} },
        annotations: NUR_LESEN,
        execute: async () => this.profil(),
      },
    ];
  }

  private projekteFinden(technologie: string, stichwort: string): string {
    const t = technologie.toLowerCase();
    const s = stichwort.toLowerCase();
    const passt = (w: Work) =>
      (!t ||
        w.stack.some((x) => x.toLowerCase().includes(t)) ||
        w.kicker.toLowerCase().includes(t)) &&
      (!s || `${w.titel} ${w.lede} ${w.kicker}`.toLowerCase().includes(s));
    const basis = t || s ? WORKS : WORKS.filter((w) => w.gruppe === 'kern');
    const treffer = basis.filter(passt).slice(0, MAX_TREFFER);
    if (!treffer.length)
      return `Keine Projekte zu "${technologie || stichwort}". Alle Projekte: ${seiteUrl('/projekte')}`;
    return kurz(
      treffer
        .map(
          (w) =>
            `- ${w.titel} (${w.slug}): ${w.karte?.beitrag ?? w.lede} Stack: ${w.stack.slice(0, 5).join(', ')}. ${seiteUrl(`/projekte/${w.slug}`)}`,
        )
        .join('\n'),
    );
  }

  private async fallstudieOeffnen(slug: string): Promise<string> {
    const w = findWork(slug);
    if (!w) return `Unbekanntes Projekt "${slug}". Erst find_projects aufrufen.`;
    await this.router.navigate(['/projekte', w.slug]);
    const teile = [
      `${w.titel}: ${w.lede}`,
      w.ausgangspunkt[0] ? `Ausgangspunkt: ${w.ausgangspunkt[0]}` : '',
      w.beitrag?.[0] ? `Beitrag: ${w.beitrag[0]}` : '',
      `Status: ${w.status}. Kontext: ${w.kontext}.`,
      `Seite geöffnet: ${seiteUrl(`/projekte/${w.slug}`)}`,
    ];
    return kurz(teile.filter(Boolean).join('\n'));
  }

  private async artikelFinden(stichwort: string): Promise<string> {
    const s = stichwort.toLowerCase();
    const liste = await firstValueFrom(this.blog.liste());
    const treffer = liste
      .filter((a) => !s || `${a.titel} ${a.kurz} ${a.tags.join(' ')}`.toLowerCase().includes(s))
      .slice(0, MAX_TREFFER);
    if (!treffer.length)
      return `Keine Artikel zu "${stichwort}". Alle Artikel: ${seiteUrl('/blog')}`;
    return kurz(
      treffer.map((a) => `- ${a.titel}: ${a.kurz} ${seiteUrl(`/blog/${a.slug}`)}`).join('\n'),
    );
  }

  private profil(): string {
    return kurz(
      [
        `${SITE.name}, ${SITE.rolle} und ${SITE.rolleAutomation}, ${SITE.ort}.`,
        'Schwerpunkte: KI-Agenten, MCP- und RAG-Systeme, LLM-Integration, Automatisierung mit Python und n8n.',
        `Projekte: ${seiteUrl('/projekte')} · Fakten: ${seiteUrl('/facts')}`,
        `Kontakt: ${SITE.mail} · LinkedIn: ${SITE.linkedin} · GitHub: ${SITE.github}`,
      ].join('\n'),
    );
  }
}
