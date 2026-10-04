import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE, seiteUrl } from './site';

export interface SeoInput {
  titel: string;
  beschreibung: string;
  pfad: string;
  bild?: string;
  typ?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  breadcrumb?: { name: string; pfad: string }[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  set(input: SeoInput): void {
    const url = seiteUrl(input.pfad);
    const roh = input.bild ?? 'assets/img/og-bild.png';
    const bild = /^https?:\/\//.test(roh) ? roh : SITE.origin + '/' + roh.replace(/^\//, '');

    this.title.setTitle(input.titel);
    this.upsertName('description', input.beschreibung);
    this.upsertProperty('og:title', input.titel);
    this.upsertProperty('og:description', input.beschreibung);
    this.upsertProperty('og:url', url);
    this.upsertProperty('og:type', input.typ ?? 'website');
    this.upsertProperty('og:image', bild);
    this.upsertProperty('og:locale', 'de_DE');
    this.upsertProperty('og:site_name', `${SITE.name} — ${SITE.rolle}`);
    this.upsertName('twitter:card', 'summary_large_image');
    this.upsertName('twitter:title', input.titel);
    this.upsertName('twitter:description', input.beschreibung);
    this.upsertName('twitter:image', bild);

    if (input.noindex) {
      this.upsertName('robots', 'noindex, follow');
    } else {
      this.upsertName('robots', 'index, follow, max-image-preview:large');
    }

    this.canonical(url);

    const bloecke = input.jsonLd
      ? Array.isArray(input.jsonLd)
        ? [...input.jsonLd]
        : [input.jsonLd]
      : [];
    if (input.breadcrumb?.length) {
      bloecke.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: input.breadcrumb.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: seiteUrl(b.pfad),
        })),
      });
    }
    this.jsonLd(bloecke.length ? bloecke : undefined);
  }

  private upsertName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private upsertProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private canonical(url: string): void {
    let el = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  private jsonLd(data: SeoInput['jsonLd']): void {
    const id = 'seiten-schema';
    this.doc.getElementById(id)?.remove();
    if (!data) return;
    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
