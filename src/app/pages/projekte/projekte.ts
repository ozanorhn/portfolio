import { Component, ChangeDetectionStrategy, OnInit, computed, inject, signal } from '@angular/core';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { ProjektListeComponent } from '../../ui/projekt-liste';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { PROJEKTE, type Work } from '../../data/works';
import { SCHWERPUNKTE } from '../../data/schwerpunkte';

/** Filter nach Schwerpunkt; Ausbildung ergänzt die fünf Felder als eigene Auswahl. */
const FELDER = [
  ...SCHWERPUNKTE.map((s) => ({ id: s.id, titel: s.titel, slugs: s.projekte })),
  {
    id: 'ausbildung',
    titel: 'Ausbildung',
    slugs: PROJEKTE.filter((w) => w.gruppe === 'ausbildung').map((w) => w.slug),
  },
];

/** SubmitEvent mit den WebMCP-Erweiterungen (deklarative API), solange TypeScript sie nicht kennt. */
type AgentSubmitEvent = SubmitEvent & { agentInvoked?: boolean; respondWith?: (p: Promise<unknown>) => void };

@Component({
  selector: 'app-projekte',
  standalone: true,
  imports: [KopfComponent, FussComponent, ProjektListeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-kopf />
    <main id="inhalt" class="wrap">
      <header class="kopfblock grid">
        <h1 class="titel kopfblock__titel">Projekte und Fallstudien</h1>
        <p class="lede kopfblock__lede">
          Fallstudien zu KI-Anwendungen, Agenten, Wissenssystemen und Automatisierung. Jede nennt
          Reifegrad, eigenen Beitrag und die Aufteilung zwischen KI, Code und Mensch. Darunter,
          klar getrennt: die Projekte aus der Ausbildung.
        </p>
      </header>

      <div class="felder" role="group" aria-label="Nach Schwerpunkt filtern">
        <button type="button" class="feldknopf" [attr.aria-pressed]="!feld()" (click)="feld.set('')">Alle</button>
        @for (f of felder; track f.id) {
          <button type="button" class="feldknopf" [attr.aria-pressed]="feld() === f.id" (click)="feld.set(f.id)">
            {{ f.titel }}
          </button>
        }
      </div>

      <!-- Echte Suche für Menschen; die tool*-Attribute machen sie zugleich zum
           WebMCP-Werkzeug (deklarative API). toolaction ist kein Chrome-Attribut, schadet nicht. -->
      <form
        class="suche"
        role="search"
        toolname="filter_project_list"
        tooldescription="Filtert die sichtbare Projektliste von Ozan Orhan nach Technologie oder Stichwort, z. B. MCP, Python, RAG oder n8n. Nur lesend."
        toolaction="Projektliste auf dieser Seite filtern"
        toolautosubmit
        (submit)="absenden($event)"
      >
        <label class="meta suche__label" for="projekt-suche">Projekte durchsuchen</label>
        <div class="suche__zeile">
          <input
            id="projekt-suche"
            name="suche"
            type="search"
            autocomplete="off"
            placeholder="z. B. MCP, Python, n8n"
            toolparamdescription="Technologie oder Stichwort, z. B. MCP, Python, RAG, n8n"
            [value]="suche()"
            (input)="suche.set($any($event.target).value)"
          />
          <button type="submit" class="aktion">Filtern</button>
        </div>
        <p class="suche__info mono" aria-live="polite">
          {{ treffer().length }} von {{ projekte.length }} Projekten
        </p>
      </form>

      <section aria-label="Alle Projekte">
        @if (treffer().length) {
          <app-projekt-liste [projekte]="treffer()" [vorschau]="true" />
        } @else {
          <p class="prosa">
            Kein Projekt zu dieser Auswahl. Versuch es mit MCP, Python, RAG oder n8n, oder
            <button type="button" class="textknopf" (click)="zuruecksetzen()">zeig alle Projekte</button>.
          </p>
        }
      </section>
    </main>
    <app-fuss />
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .kopfblock { padding-block: clamp(28px, 4vw, 56px) clamp(20px, 2.6vw, 36px); }
      .kopfblock__titel { grid-column: 1 / 7; }
      .kopfblock__lede { grid-column: 8 / 13; align-self: end; color: $tusche-2; }
      .felder { display: flex; flex-wrap: wrap; gap: $s2; margin-bottom: $s5; }
      .feldknopf {
        min-height: 40px; padding: 0 $s4; cursor: pointer;
        font: 500 13px/1 $sans; letter-spacing: 0.02em; color: $tusche-2;
        background: transparent; border: $strich-regel solid $linie; border-radius: 2px;
        transition: color 120ms linear, border-color 120ms linear, background-color 120ms linear;
      }
      .feldknopf:hover { color: $tusche; border-color: $tusche-2; }
      .feldknopf[aria-pressed='true'] { color: $papier; background: $tusche; border-color: $tusche; }
      .feldknopf:focus-visible, .textknopf:focus-visible { outline: 2px solid $petrol; outline-offset: 2px; }
      .textknopf {
        padding: 0; font: inherit; color: $petrol; background: none; border: 0; cursor: pointer;
        text-decoration: underline; text-underline-offset: 0.22em;
      }
      .suche { margin-bottom: clamp(20px, 2.6vw, 36px); max-width: 36rem; }
      .suche__label { display: block; margin-bottom: $s2; }
      .suche__zeile { display: flex; gap: $s3; align-items: stretch; }
      .suche input {
        flex: 1; min-width: 0; min-height: 44px; padding: 0 $s3;
        font: inherit; font-size: 16px; color: $tusche; background: transparent;
        border: $strich-haar solid $linie; border-radius: 4px;
      }
      .suche input:focus-visible { outline: 2px solid $petrol; outline-offset: 2px; }
      .suche button { min-height: 44px; background: none; border: 0; cursor: pointer; }
      .suche__info { margin-top: $s2; font-size: 12px; color: $tusche-2; }
      @media (max-width: $bp-m) {
        .kopfblock__titel, .kopfblock__lede { grid-column: 1 / -1; }
        .kopfblock__lede { margin-top: $s4; }
      }
    `,
  ],
})
export class ProjekteComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly projekte = PROJEKTE;
  readonly suche = signal('');
  readonly felder = FELDER;
  /** Gewählter Schwerpunkt; leer zeigt alle Projekte. */
  readonly feld = signal('');
  /** Treffer im Schwerpunkt und in Titel, Kurzbeschreibung, Kicker und Stack. */
  readonly treffer = computed<Work[]>(() => {
    const q = this.suche().trim().toLowerCase().slice(0, 80);
    const f = FELDER.find((x) => x.id === this.feld());
    const basis = f ? PROJEKTE.filter((w) => f.slugs.includes(w.slug)) : PROJEKTE;
    if (!q) return basis;
    return basis.filter((w) =>
      `${w.titel} ${w.lede} ${w.kicker} ${w.stack.join(' ')}`.toLowerCase().includes(q),
    );
  });

  zuruecksetzen(): void {
    this.suche.set('');
    this.feld.set('');
  }

  /** Kein Seitenwechsel: gefiltert wird live. Für Agenten gibt es die Treffer als Antwort. */
  absenden(e: Event): void {
    e.preventDefault();
    const ev = e as AgentSubmitEvent;
    const daten = new FormData(ev.target as HTMLFormElement);
    this.suche.set(String(daten.get('suche') ?? ''));
    if (ev.agentInvoked && typeof ev.respondWith === 'function') {
      const liste = this.treffer().slice(0, 8).map((w) => `${w.titel}: ${seiteUrl(`/projekte/${w.slug}`)}`);
      ev.respondWith(Promise.resolve(liste.length ? liste.join('\n') : 'Keine Treffer.'));
    }
  }

  ngOnInit(): void {
    this.seo.set({
      titel: `Projekte: KI-Agenten, MCP, RAG und Automatisierung — ${SITE.name}`,
      beschreibung:
        'Fallstudien von Ozan Orhan zu KI-Agenten, MCP-Servern, RAG-Wissenssystemen und ' +
        'Prozessautomatisierung, je mit Reifegrad, eigenem Beitrag und Architektur.',
      pfad: '/projekte',
      breadcrumb: [{ name: 'Start', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }],
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projekte von Ozan Orhan',
        url: seiteUrl('/projekte'),
        inLanguage: 'de-DE',
        about: { '@id': `${SITE.origin}/#person` },
        isPartOf: { '@id': `${SITE.origin}/#website` },
        hasPart: PROJEKTE.map((w) => ({
          '@type': 'CreativeWork',
          name: w.titel,
          url: seiteUrl(`/projekte/${w.slug}`),
          abstract: w.lede,
          creator: { '@id': `${SITE.origin}/#person` },
        })),
      },
    });
  }
}
