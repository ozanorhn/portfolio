import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { ProjektListeComponent } from '../../ui/projekt-liste';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { PROJEKTE } from '../../data/works';

@Component({
  selector: 'app-projekte',
  standalone: true,
  imports: [KopfComponent, FussComponent, ProjektListeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-kopf />
    <main id="inhalt" class="wrap">
      <header class="kopfblock grid">
        <h1 class="titel kopfblock__titel">Projekte</h1>
        <p class="lede kopfblock__lede">
          Fünf Systeme, die laufen — von einem sprachgesteuerten Handgerät bis zu Workflows, die
          im Unternehmen täglich Daten zusammenführen. Darunter, klar getrennt: die Projekte aus
          der Ausbildung.
        </p>
      </header>

      <section aria-label="Alle Projekte">
        <app-projekt-liste [projekte]="projekte" [vorschau]="true" />
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

  ngOnInit(): void {
    this.seo.set({
      titel: `Projekte — ${SITE.name}`,
      beschreibung:
        'Fünf laufende Systeme: Hermes Pocket AI Agent, Leistungsnachweis Automation, Wissensbasis ' +
        'mit RAG und MCP, AI Visibility Monitoring, Recruiting Jobs Sync.',
      pfad: '/projekte',
      breadcrumb: [{ name: 'Start', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }],
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projekte',
        url: seiteUrl('/projekte'),
        inLanguage: 'de-DE',
        hasPart: PROJEKTE.map((w) => ({
          '@type': 'CreativeWork',
          name: w.titel,
          url: seiteUrl(`/projekte/${w.slug}`),
          abstract: w.lede,
        })),
      },
    });
  }
}
