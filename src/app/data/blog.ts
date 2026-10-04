import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

/** Felder aus public/blog/artikel.json, erzeugt von scripts/blog-daten.mjs. */
export interface BlogEintrag {
  slug: string;
  titel: string;
  kurz: string;
  datum: string;
  geaendert: string;
  autor: string;
  tags: string[];
  seoTitel: string;
  seoBeschreibung: string;
  bild?: string;
  bildAlt: string;
  lesezeit: number;
}

export interface BlogLink {
  slug: string;
  titel: string;
  kurz: string;
}

export interface BlogArtikel extends BlogEintrag {
  woerter: number;
  kernaussagen: string[];
  fakten: { label: string; wert: string }[];
  faq: { frage: string; antwort: string }[];
  quellen: { titel: string; url: string; abgerufen: string | null }[];
  verwandt: BlogLink[];
  projekte: BlogLink[];
  /** Vom Build-Skript bereinigtes HTML, siehe scripts/blog-daten.mjs */
  html: string;
  /** H2-Überschriften für das Inhaltsverzeichnis */
  inhalt: { id: string; titel: string }[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  liste(): Observable<BlogEintrag[]> {
    return this.http.get<BlogEintrag[]>('/blog/artikel.json').pipe(catchError(() => of([])));
  }

  /** null, wenn es den Artikel nicht gibt. */
  artikel(slug: string): Observable<BlogArtikel | null> {
    if (!SLUG.test(slug)) return of(null);
    return this.http.get<BlogArtikel>(`/blog/${slug}/artikel.json`).pipe(catchError(() => of(null)));
  }
}

export const datumLang = (iso: string) =>
  new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
