import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay } from 'rxjs';

/** Felder aus public/glossar/begriffe.json, erzeugt von scripts/glossar-daten.mjs aus content/glossar. */
export interface GlossarEintrag {
  slug: string;
  begriff: string;
  h1: string;
  thema: string;
  kurzdefinition: string;
  alternativeNamen: string[];
  datum: string;
  geaendert: string;
  /** Lokaler Entwurf (GLOSSAR_VORSCHAU=1): noindex, nicht veröffentlichen */
  vorschau?: boolean;
}

export interface GlossarBegriff extends GlossarEintrag {
  seoTitel: string;
  seoBeschreibung: string;
  aussagen: string[];
  fakten: { label: string; wert: string }[];
  /** Vom Build-Skript bereinigtes HTML (Beispiel aus der Praxis + Hauptteil), siehe scripts/markdown.mjs */
  html: string;
  /** H2-Überschriften für das Inhaltsverzeichnis */
  inhalt: { id: string; titel: string }[];
  woerter: number;
  faq: { frage: string; antwort: string }[];
  quellen: { titel: string; url: string; abgerufen: string | null }[];
  verwandt: { slug: string; begriff: string; kurzdefinition: string }[];
  artikel: { slug: string; titel: string }[];
  projekte: { slug: string; titel: string; kurz: string }[];
}

/** Wie THEMEN in scripts/glossar-daten.mjs; die Reihenfolge gilt auf /glossar. */
export const THEMEN: Record<string, string> = {
  ki_grundlagen: 'KI-Grundlagen',
  rag_suche: 'RAG und Suche',
  agenten_mcp: 'Agenten und MCP',
  automatisierung: 'Automatisierung',
  sicherheit: 'Sicherheit',
  ki_sichtbarkeit: 'Sichtbarkeit in KI-Suchen',
  seo_grundlagen: 'SEO-Grundlagen',
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable({ providedIn: 'root' })
export class GlossarService {
  private readonly http = inject(HttpClient);
  /** Einmal laden: Übersicht und Fußzeile brauchen dieselbe Liste. */
  private readonly alle$ = this.http
    .get<GlossarEintrag[]>('/glossar/begriffe.json')
    .pipe(catchError(() => of([])), shareReplay(1));

  liste(): Observable<GlossarEintrag[]> {
    return this.alle$;
  }

  /** null, wenn es den Begriff nicht gibt. */
  begriff(slug: string): Observable<GlossarBegriff | null> {
    if (!SLUG.test(slug)) return of(null);
    return this.http
      .get<GlossarBegriff>(`/glossar/${slug}/begriff.json`)
      .pipe(catchError(() => of(null)));
  }
}
