import { Component, ChangeDetectionStrategy, computed, effect, inject, input } from '@angular/core';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { THEMEN, type GlossarEintrag } from '../../data/glossar';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** Glossar = Definition, Blog = Anwendung: je Thema die vertiefenden Artikel (Cluster laut SEO-Strategie). */
// ponytail: feste Zuordnung; auf Strapi-Tags umstellen, wenn mehr als ~15 Artikel existieren
const VERTIEFUNG: Record<string, { slug: string; titel: string }[]> = {
  rag_suche: [
    { slug: 'company-brain-aufbauen-rag-architektur', titel: 'Company Brain aufbauen' },
    { slug: 'agentic-rag-mcp-architektur', titel: 'RAG über MCP bereitstellen' },
    { slug: 'rag-berechtigungsmanagement-company-brain', titel: 'RAG-Berechtigungsmanagement' },
  ],
  agenten_mcp: [
    { slug: 'mcp-server-mit-n8n-erstellen', titel: 'MCP-Server mit n8n erstellen' },
    { slug: 'reverse-engineering-claude-ghidra-mcp', titel: 'Ghidra MCP mit Claude' },
    { slug: 'claude-code-mods', titel: 'Claude Code Mods' },
  ],
  automatisierung: [
    { slug: 'n8n-agents-vs-ai-agent-node', titel: 'n8n Agents vs. AI-Agent-Node' },
  ],
  sicherheit: [
    { slug: 'ki-agenten-sicherheit-tuev-bsi-studie', titel: 'KI-Agenten Sicherheit' },
    { slug: 'claude-dsgvo-konform-unternehmen', titel: 'Claude DSGVO-konform einsetzen' },
    { slug: 'en-18286-ai-act-leitfaden', titel: 'EN 18286 AI Act' },
  ],
};
const buchstabe = (b: GlossarEintrag) =>
  b.begriff.charAt(0).toLocaleUpperCase('de-DE').replace('Ä', 'A').replace('Ö', 'O').replace('Ü', 'U');

@Component({
  selector: 'app-glossar',
  standalone: true,
  imports: [KopfComponent, FussComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-kopf />
    <main id="inhalt" class="wrap">
      <header class="kopfblock grid">
        <nav class="mono kopfblock__pfad" aria-label="Brotkrumen">
          <a href="/">Startseite</a> / <span>Glossar</span>
        </nav>
        <h1 class="titel kopfblock__titel">Glossar: KI-Automatisierung, RAG und KI-Agenten</h1>
        <p class="lede kopfblock__lede">
          Begriffe rund um KI-Automatisierung, kurz und belegt erklärt: von RAG und Embeddings über
          KI-Agenten und MCP bis zu Prompt Injection. Für alle, die KI-Automatisierung planen oder
          bauen, geschrieben von {{ site.name }}, {{ site.rolle }}.
        </p>
      </header>

      @if (begriffe(); as liste) {
        @if (liste.length) {
          <nav class="abc mono" aria-label="Begriffe nach Anfangsbuchstabe">
            @for (z of alphabet; track z) {
              @if (erster()[z]; as slug) {
                <a [href]="'/glossar/#begriff-' + slug">{{ z }}</a>
              } @else {
                <span class="abc__leer" aria-hidden="true">{{ z }}</span>
              }
            }
          </nav>

          @for (g of gruppen(); track g.thema) {
            <section class="thema" [attr.aria-labelledby]="'thema-' + g.thema">
              <h2 class="untertitel thema__titel" [id]="'thema-' + g.thema">{{ g.titel }}</h2>
              <ul class="liste">
                @for (b of g.begriffe; track b.slug) {
                  <li class="eintrag" [id]="'begriff-' + b.slug">
                    <a class="eintrag__link grid" [href]="'/glossar/' + b.slug + '/'">
                      <span class="untertitel eintrag__titel">{{ b.begriff }}</span>
                      <span class="eintrag__kurz">{{ b.kurzdefinition }}</span>
                    </a>
                  </li>
                }
              </ul>
              @if (vertiefung[g.thema]; as artikel) {
                <p class="vertiefung">
                  <span class="meta">Vertiefung</span>
                  @for (a of artikel; track a.slug) {
                    <a [href]="'/blog/' + a.slug + '/'">{{ a.titel }}</a>
                  }
                </p>
              }
            </section>
          }
        } @else {
          <p class="leer">Das Glossar ist im Aufbau.</p>
        }
      }
    </main>
    <app-fuss />
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .kopfblock { padding-block: clamp(28px, 4vw, 56px) clamp(20px, 2.6vw, 36px); row-gap: $s4; }
      .kopfblock__pfad, .kopfblock__titel { grid-column: 1 / -1; }
      .kopfblock__pfad a:hover { color: $petrol; }
      .kopfblock__titel { max-width: 28ch; }
      .kopfblock__lede { grid-column: 1 / 9; color: $tusche-2; }
      .abc {
        display: flex; flex-wrap: wrap; gap: $s2 $s4;
        padding-block: $s4; border-block: $strich-regel solid $linie;
      }
      .abc a:hover { color: $petrol; }
      .abc__leer { color: $linie; }
      .thema { padding-top: clamp(32px, 4vw, 56px); }
      .vertiefung { display: flex; flex-wrap: wrap; align-items: baseline; gap: $s2 $s4; padding-top: $s4; }
      .vertiefung a { color: $petrol; text-decoration: underline; text-underline-offset: 3px; }
      .thema__titel { padding-bottom: $s4; border-bottom: $strich-regel solid $linie; }
      .eintrag { border-bottom: $strich-haar solid $linie; scroll-margin-top: $s7; }
      .eintrag__link { padding-block: $s4; align-items: baseline; }
      .eintrag__titel { grid-column: 1 / 5; transition: color 120ms linear; }
      .eintrag__link:hover .eintrag__titel { color: $petrol; }
      .eintrag__kurz { grid-column: 5 / 12; color: $tusche-2; }
      main { padding-bottom: clamp(48px, 6vw, 96px); }
      .leer { padding-block: $s6 clamp(48px, 8vw, 120px); color: $tusche-2; }
      @media (max-width: $bp-m) {
        .kopfblock__lede, .eintrag__titel, .eintrag__kurz { grid-column: 1 / -1; }
        .eintrag__kurz { margin-top: 4px; }
      }
    `,
  ],
})
export class GlossarComponent {
  private readonly seo = inject(SeoService);
  readonly site = SITE;
  readonly alphabet = ALPHABET;
  readonly vertiefung = VERTIEFUNG;
  /** Vom Resolver geladen (app.routes.ts), damit der vorgerenderte Inhalt bis dahin stehen bleibt. */
  readonly vorab = input<GlossarEintrag[] | undefined>(undefined);
  readonly begriffe = computed(() => this.vorab());

  readonly gruppen = computed(() => {
    const alle = this.begriffe() ?? [];
    return Object.entries(THEMEN)
      .map(([thema, titel]) => ({
        thema,
        titel,
        begriffe: alle
          .filter((b) => b.thema === thema)
          .sort((a, b) => a.begriff.localeCompare(b.begriff, 'de')),
      }))
      .filter((g) => g.begriffe.length);
  });

  /** Erster Begriff je Anfangsbuchstabe, Ziel der Buchstabenleiste */
  readonly erster = computed(() => {
    const ziel: Record<string, string> = {};
    for (const g of this.gruppen()) {
      for (const b of g.begriffe) ziel[buchstabe(b)] ??= b.slug;
    }
    return ziel;
  });

  constructor() {
    effect(() => {
      const alle = this.begriffe();
      if (alle === undefined) return;
      const set = `${seiteUrl('/glossar')}#set`;
      this.seo.set({
        titel: `Glossar: KI-Automatisierung, RAG & KI-Agenten | ${SITE.name}`,
        beschreibung:
          'Begriffe rund um KI-Automatisierung verständlich erklärt: RAG, Embeddings, MCP, ' +
          'KI-Agenten, n8n, Prompt Injection und mehr, mit Beispielen und Quellen.',
        pfad: '/glossar',
        noindex: !alle.length || alle.some((b) => b.vorschau),
        breadcrumb: [
          { name: 'Startseite', pfad: '/' },
          { name: 'Glossar', pfad: '/glossar' },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          '@id': set,
          name: 'Glossar KI-Automatisierung',
          url: seiteUrl('/glossar'),
          inLanguage: 'de-DE',
          hasDefinedTerm: alle.map((b) => ({
            '@type': 'DefinedTerm',
            '@id': `${seiteUrl(`/glossar/${b.slug}`)}#term`,
            name: b.begriff,
            description: b.kurzdefinition,
            url: seiteUrl(`/glossar/${b.slug}`),
            inDefinedTermSet: set,
          })),
        },
      });
    });
  }
}
