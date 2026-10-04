import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { BlogService, datumLang } from '../../data/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, KopfComponent, FussComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-kopf />
    <main id="inhalt" class="wrap">
      <header class="kopfblock grid">
        <h1 class="titel kopfblock__titel">Blog</h1>
        <p class="lede kopfblock__lede">
          Notizen aus der Arbeit an Agenten, Automationen und LLM-Anwendungen: was funktioniert,
          was nicht, und warum.
        </p>
      </header>

      @if (artikel(); as liste) {
        @if (liste.length) {
          <ol class="liste" aria-label="Alle Artikel">
            @for (a of liste; track a.slug) {
              <li class="eintrag">
                <a class="eintrag__link grid" [routerLink]="['/blog', a.slug]">
                  <span class="mono eintrag__datum">
                    <time [attr.datetime]="a.datum">{{ datum(a.datum) }}</time><br />
                    {{ a.lesezeit }} Min.
                  </span>
                  <span class="eintrag__text">
                    <span class="untertitel eintrag__titel">{{ a.titel }}</span>
                    @if (a.kurz) { <span class="eintrag__kurz">{{ a.kurz }}</span> }
                  </span>
                </a>
              </li>
            }
          </ol>
        } @else {
          <p class="leer">Noch keine Artikel veröffentlicht.</p>
        }
      }
    </main>
    <app-fuss />
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .kopfblock { padding-block: clamp(28px, 4vw, 56px) clamp(20px, 2.6vw, 36px); }
      .kopfblock__titel { grid-column: 1 / 7; }
      .kopfblock__lede { grid-column: 8 / 13; align-self: end; color: $tusche-2; }
      .liste { border-top: $strich-regel solid $linie; margin-bottom: clamp(48px, 6vw, 96px); }
      .eintrag { border-bottom: $strich-haar solid $linie; }
      .eintrag__link { padding-block: $s5; align-items: baseline; }
      .eintrag__datum { grid-column: 1 / 3; }
      .eintrag__text { grid-column: 3 / 11; display: block; }
      .eintrag__titel { display: block; transition: color 120ms linear; }
      .eintrag__link:hover .eintrag__titel { color: $petrol; }
      .eintrag__kurz { display: block; margin-top: 6px; color: $tusche-2; max-width: 66ch; }
      .leer { padding-block: $s6 clamp(48px, 8vw, 120px); color: $tusche-2; }
      @media (max-width: $bp-m) {
        .kopfblock__titel, .kopfblock__lede, .eintrag__datum, .eintrag__text { grid-column: 1 / -1; }
        .kopfblock__lede { margin-top: $s4; }
        .eintrag__text { margin-top: 4px; }
      }
    `,
  ],
})
export class BlogComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly artikel = toSignal(inject(BlogService).liste());
  readonly datum = datumLang;

  ngOnInit(): void {
    this.seo.set({
      titel: `Blog — ${SITE.name}`,
      beschreibung:
        'Artikel von Ozan Orhan zu AI-Agenten, n8n-Automationen, MCP, RAG und LLM-Anwendungen.',
      pfad: '/blog',
      breadcrumb: [{ name: 'Start', pfad: '/' }, { name: 'Blog', pfad: '/blog' }],
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `Blog — ${SITE.name}`,
        url: seiteUrl('/blog'),
        inLanguage: 'de-DE',
        author: { '@type': 'Person', name: SITE.name, url: SITE.origin },
      },
    });
  }
}
