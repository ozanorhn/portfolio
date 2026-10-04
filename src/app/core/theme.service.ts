import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'hell' | 'dunkel';
const SCHLUESSEL = 'oo-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>('hell');

  constructor() {
    if (!this.browser) return;
    // Hell ist der Standard. Dunkel nur, wenn es hier ausdrücklich gewählt wurde.
    this.setzen(this.lesen() ?? 'hell', false);
  }

  wechseln(): void {
    this.setzen(this.theme() === 'dunkel' ? 'hell' : 'dunkel');
  }

  private setzen(t: Theme, speichern = true): void {
    this.theme.set(t);
    if (!this.browser) return;
    const el = this.doc.documentElement;
    if (t === 'dunkel') el.setAttribute('data-theme', 'dunkel');
    else el.removeAttribute('data-theme');
    if (speichern) {
      try { localStorage.setItem(SCHLUESSEL, t); } catch { /* Speicher nicht verfügbar */ }
    }
  }

  private lesen(): Theme | null {
    try {
      const v = localStorage.getItem(SCHLUESSEL);
      return v === 'hell' || v === 'dunkel' ? v : null;
    } catch { return null; }
  }
}
