import {
  Component, ChangeDetectionStrategy, Injector, afterNextRender, computed, effect, inject, input,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { CaseStudyNavComponent } from '../../ui/case-study-nav';
import { SeoService } from '../../core/seo.service';
import { SITE, seiteUrl } from '../../core/site';
import { BlogService, datumLang, type BlogArtikel } from '../../data/blog';
import type { Abschnitt } from '../../data/works';

@Component({
  selector: 'app-blog-artikel',
  standalone: true,
  imports: [RouterLink, KopfComponent, FussComponent, CaseStudyNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-artikel.html',
  styleUrl: './blog-artikel.scss',
})
export class BlogArtikelComponent {
  private readonly seo = inject(SeoService);
  private readonly blog = inject(BlogService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly route = inject(ActivatedRoute);
  private readonly scroller = inject(ViewportScroller);
  private readonly injector = inject(Injector);
  readonly slug = input<string>('');
  readonly datum = datumLang;
  readonly site = SITE;

  /** undefined: lädt noch · null: nicht gefunden */
  readonly artikel = toSignal(
    toObservable(this.slug).pipe(switchMap((s) => this.blog.artikel(s))),
  );

  /** Das HTML ist im Build bereinigt (rohes HTML maskiert, nur sichere Links);
   *  Angulars Filter würde sonst die Anker des Inhaltsverzeichnisses entfernen. */
  readonly html = computed(() => {
    const a = this.artikel();
    return a ? this.sanitizer.bypassSecurityTrustHtml(a.html) : '';
  });

  readonly abschnitte = computed<Abschnitt[]>(() => {
    const a = this.artikel();
    if (!a) return [];
    return [
      ...a.inhalt,
      ...(a.faq.length ? [{ id: 'faq', titel: 'Häufige Fragen' }] : []),
      ...(a.quellen.length ? [{ id: 'quellen', titel: 'Quellen' }] : []),
    ];
  });

  readonly aktualisiert = computed(() => {
    const a = this.artikel();
    return !!a && a.geaendert.slice(0, 10) > a.datum.slice(0, 10);
  });

  constructor() {
    effect(() => {
      const a = this.artikel();
      if (a === undefined) return;
      if (a === null) {
        this.seo.set({
          titel: `Artikel nicht gefunden — ${SITE.name}`,
          beschreibung: 'Dieser Artikel existiert nicht.',
          pfad: `/blog/${this.slug()}`,
          noindex: true,
        });
        return;
      }
      // Der Artikel kommt erst nach der Navigation an; der Router hat zu früh
      // nach dem Anker gesucht. Nach dem Rendern noch einmal springen.
      const anker = this.route.snapshot.fragment;
      if (anker) {
        afterNextRender(() => this.scroller.scrollToAnchor(anker), { injector: this.injector });
      }

      const pfad = `/blog/${a.slug}`;
      this.seo.set({
        titel: `${a.seoTitel} — ${SITE.name}`,
        beschreibung: a.seoBeschreibung,
        pfad,
        bild: a.bild,
        typ: 'article',
        breadcrumb: [
          { name: 'Start', pfad: '/' },
          { name: 'Blog', pfad: '/blog' },
          { name: a.titel, pfad },
        ],
        jsonLd: schema(a, pfad),
      });
    });
  }
}

function schema(a: BlogArtikel, pfad: string): Record<string, unknown>[] {
  const autor = {
    '@type': 'Person',
    '@id': `${SITE.origin}/#person`,
    name: a.autor,
    url: SITE.origin,
    jobTitle: SITE.rolle,
    sameAs: [SITE.github, SITE.linkedin],
  };
  const posting: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': seiteUrl(pfad),
    mainEntityOfPage: seiteUrl(pfad),
    headline: a.titel,
    description: a.seoBeschreibung,
    url: seiteUrl(pfad),
    datePublished: a.datum,
    dateModified: a.geaendert,
    inLanguage: 'de-DE',
    wordCount: a.woerter,
    timeRequired: `PT${a.lesezeit}M`,
    author: autor,
    publisher: autor,
    isPartOf: { '@type': 'Blog', url: seiteUrl('/blog') },
  };
  if (a.tags.length) posting['keywords'] = a.tags.join(', ');
  if (a.bild) posting['image'] = a.bild;
  if (a.kernaussagen.length) posting['abstract'] = a.kernaussagen.join(' ');
  if (a.quellen.length) {
    posting['citation'] = a.quellen.map((q) => ({ '@type': 'CreativeWork', name: q.titel, url: q.url }));
  }
  if (a.projekte.length) {
    posting['mentions'] = a.projekte.map((p) => ({
      '@type': 'CreativeWork',
      name: p.titel,
      url: seiteUrl(`/projekte/${p.slug}`),
    }));
  }
  const bloecke: Record<string, unknown>[] = [posting];
  if (a.faq.length) {
    bloecke.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({
        '@type': 'Question',
        name: f.frage,
        acceptedAnswer: { '@type': 'Answer', text: f.antwort },
      })),
    });
  }
  return bloecke;
}
