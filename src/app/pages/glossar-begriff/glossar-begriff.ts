import { Component, ChangeDetectionStrategy, computed, effect, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { CaseStudyNavComponent } from '../../ui/case-study-nav';
import { SeoService } from '../../core/seo.service';
import { SITE, person, seitenTitel, seiteUrl } from '../../core/site';
import { datumLang } from '../../data/blog';
import { GlossarService, THEMEN, type GlossarBegriff } from '../../data/glossar';
import type { Abschnitt } from '../../data/works';

@Component({
  selector: 'app-glossar-begriff',
  standalone: true,
  imports: [RouterLink, KopfComponent, FussComponent, CaseStudyNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './glossar-begriff.html',
  styleUrls: ['../blog-artikel/blog-artikel.scss', './glossar-begriff.scss'],
})
export class GlossarBegriffComponent {
  private readonly seo = inject(SeoService);
  private readonly glossar = inject(GlossarService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly slug = input<string>('');
  readonly datum = datumLang;
  readonly site = SITE;
  readonly themen = THEMEN;

  /** undefined: lädt noch · null: nicht gefunden */
  readonly begriff = toSignal(
    toObservable(this.slug).pipe(switchMap((s) => this.glossar.begriff(s))),
  );

  /** Das HTML ist im Build bereinigt (scripts/markdown.mjs); Angulars Filter würde die Anker entfernen. */
  readonly html = computed(() => {
    const b = this.begriff();
    return b ? this.sanitizer.bypassSecurityTrustHtml(b.html) : '';
  });
  readonly beispielHtml = computed(() => {
    const b = this.begriff();
    return b ? this.sanitizer.bypassSecurityTrustHtml(b.beispielHtml) : '';
  });

  readonly abschnitte = computed<Abschnitt[]>(() => {
    const b = this.begriff();
    if (!b) return [];
    return [
      ...(b.beispielHtml ? [{ id: 'beispiel', titel: 'Beispiel aus der Praxis' }] : []),
      ...b.inhalt,
      ...(b.verwandt.length ? [{ id: 'verwandt', titel: 'Verwandte Begriffe' }] : []),
      ...(b.quellen.length ? [{ id: 'quellen', titel: 'Quellen' }] : []),
      ...(b.faq.length ? [{ id: 'faq', titel: 'Häufige Fragen' }] : []),
    ];
  });

  constructor() {
    effect(() => {
      const b = this.begriff();
      if (b === undefined) return;
      if (b === null) {
        this.seo.set({
          titel: `Begriff nicht gefunden | ${SITE.name}`,
          beschreibung: 'Diesen Begriff gibt es im Glossar nicht.',
          pfad: `/glossar/${this.slug()}`,
          noindex: true,
        });
        return;
      }
      const pfad = `/glossar/${b.slug}`;
      this.seo.set({
        titel: seitenTitel(b.seoTitel),
        beschreibung: b.seoBeschreibung,
        pfad,
        typ: 'article',
        noindex: !!b.vorschau,
        breadcrumb: [
          { name: 'Startseite', pfad: '/' },
          { name: 'Glossar', pfad: '/glossar' },
          { name: b.begriff, pfad },
        ],
        jsonLd: schema(b, pfad),
      });
    });
  }
}

function schema(b: GlossarBegriff, pfad: string): Record<string, unknown>[] {
  const url = seiteUrl(pfad);
  const term: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: b.begriff,
    description: b.kurzdefinition,
    url,
    inDefinedTermSet: `${seiteUrl('/glossar')}#set`,
  };
  if (b.alternativeNamen.length) term['alternateName'] = b.alternativeNamen;
  const seite: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    name: b.h1,
    description: b.seoBeschreibung,
    inLanguage: 'de-DE',
    datePublished: b.datum,
    dateModified: b.geaendert,
    author: person(),
    mainEntity: { '@id': `${url}#term` },
    isPartOf: { '@type': 'WebSite', '@id': `${SITE.origin}/#website` },
  };
  if (b.quellen.length) {
    seite['citation'] = b.quellen.map((q) => ({ '@type': 'CreativeWork', name: q.titel, url: q.url }));
  }
  const bloecke = [term, seite];
  if (b.faq.length) {
    bloecke.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: b.faq.map((f) => ({
        '@type': 'Question',
        name: f.frage,
        acceptedAnswer: { '@type': 'Answer', text: f.antwort },
      })),
    });
  }
  return bloecke;
}
