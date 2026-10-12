import { DOCUMENT, Injectable, PLATFORM_ID, inject, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConsentService } from './consent.service';
import { SITE } from './site';

/** Alle Events mit ihren Parametern. Keine personenbezogenen Daten (keine Adressen, Namen, Inhalte). */
export interface AnalyticsEreignisse {
  contact_email_click: { link_location: string };
  linkedin_profile_click: { link_location: string };
  portfolio_project_view: { project_slug: string; project_name: string; project_category: string };
}

type Fenster = Window & { dataLayer?: unknown[] };

/**
 * Sendet strukturierte Events an den dataLayer des vorhandenen GTM-Containers.
 * Nur mit Analytics-Einwilligung und laufendem GTM; ohne Einwilligung wird verworfen,
 * nicht gepuffert, damit nach Ablehnung oder Widerruf nichts nachträglich übertragen wird.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly consent = inject(ConsentService);
  private readonly doc = inject(DOCUMENT);
  private readonly istBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private beobachtet = false;

  senden<K extends keyof AnalyticsEreignisse>(name: K, parameter: AnalyticsEreignisse[K]): void {
    if (!this.istBrowser) return;
    // untracked: Ein Aufruf aus einem effect() darf nicht bei späterer Zustimmung erneut feuern.
    if (untracked(this.consent.entscheidung) !== 'akzeptiert') return;
    const dataLayer = (window as Fenster).dataLayer;
    if (!dataLayer) return;
    dataLayer.push({ event: name, ...parameter });
  }

  /**
   * Ein delegierter Listener für die ganze Seite: erfasst auch Links in Blogartikeln aus dem CMS
   * und zählt jeden Klick genau einmal. Nur einmal registrieren.
   */
  linkKlicksBeobachten(): void {
    if (!this.istBrowser || this.beobachtet) return;
    this.beobachtet = true;
    this.doc.addEventListener('click', (e) => this.linkKlick(e), { capture: true });
  }

  private linkKlick(e: MouseEvent): void {
    const link = (e.target as Element | null)?.closest?.('a[href]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const href = link.getAttribute('href') ?? '';
    if (href.toLowerCase().startsWith('mailto:')) {
      // Nur die berufliche Adresse; die Adresse selbst wird nicht übertragen.
      const adresse = decodeURIComponent(href.slice(7).split('?')[0]).toLowerCase();
      if (adresse === SITE.mail) this.senden('contact_email_click', { link_location: ort(link) });
      return;
    }
    if (ohneSchraegstrich(href) === ohneSchraegstrich(SITE.linkedin)) {
      this.senden('linkedin_profile_click', { link_location: ort(link) });
    }
  }
}

const ohneSchraegstrich = (u: string) => u.replace(/\/+$/, '');

/** Bereich des Links, z. B. "footer", "kontakt", "autor"; die Seite steht ohnehin in page_location. */
function ort(link: Element): string {
  if (link.closest('app-fuss')) return 'footer';
  if (link.closest('app-kopf')) return 'header';
  const bereich = link.closest('[data-tracking-ort], section[id], aside[id]');
  return bereich?.getAttribute('data-tracking-ort') || bereich?.id || 'inhalt';
}
