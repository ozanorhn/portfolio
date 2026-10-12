import { Injectable, signal } from '@angular/core';

type Entscheidung = 'akzeptiert' | 'abgelehnt' | null;
const KEY = 'oo-analytics-consent-v1';
const GTM = 'GTM-P45SHJW3';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly entscheidung = signal<Entscheidung>(null);
  readonly sichtbar = signal(false);
  readonly details = signal(false);
  private gestartet = false;

  initialisieren(): void {
    let gespeichert: Entscheidung = null;
    try {
      const wert = localStorage.getItem(KEY);
      if (wert === 'akzeptiert' || wert === 'abgelehnt') gespeichert = wert;
    } catch { /* Speicher möglicherweise deaktiviert */ }
    this.entscheidung.set(gespeichert);
    this.sichtbar.set(gespeichert === null);
    if (gespeichert === 'akzeptiert') this.gtmStarten();
  }

  oeffnen(): void {
    this.details.set(true);
    this.sichtbar.set(true);
  }

  waehlen(erlaubt: boolean): void {
    const vorher = this.entscheidung();
    const wert: Entscheidung = erlaubt ? 'akzeptiert' : 'abgelehnt';
    try { localStorage.setItem(KEY, wert); } catch { /* Session-Entscheidung */ }
    this.entscheidung.set(wert);
    this.sichtbar.set(false);
    this.details.set(false);
    if (erlaubt) {
      this.gtmStarten();
    } else if (vorher === 'akzeptiert' || this.gestartet) {
      // Bereits ausgeführte Tags lassen sich nicht sicher durch DOM-Entfernen zurücknehmen.
      // Consent sofort widerrufen und neu laden, damit keine Google-Skripte mehr laufen.
      this.consentSignal(false);
      location.reload();
    }
  }

  private consentSignal(erlaubt: boolean): void {
    const win = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    win.dataLayer = win.dataLayer || [];
    win.gtag = (...args: unknown[]) => { win.dataLayer!.push(args); };
    win.gtag('consent', erlaubt ? 'update' : 'default', {
      analytics_storage: erlaubt ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
  }

  private gtmStarten(): void {
    if (this.gestartet) return;
    this.gestartet = true;
    // Defaults immer vor dem Container. Werbung bleibt auch bei Analytics-Opt-in untersagt.
    this.consentSignal(false);
    this.consentSignal(true);
    const win = window as Window & { dataLayer?: unknown[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM;
    document.head.appendChild(script);
  }
}
