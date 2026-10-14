import { Injectable, signal } from '@angular/core';

type Entscheidung = 'akzeptiert' | 'abgelehnt' | null;
type Fenster = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

const KEY = 'oo-analytics-consent-v1';
const GTM = 'GTM-P455HJW3';
/** Cookies von Google Analytics und Google Ads, die beim Widerruf gelöscht werden. */
const GOOGLE_COOKIE = /^(_ga|_gid|_gat|_gcl)/;

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
    } catch {
      /* Speicher möglicherweise deaktiviert */
    }
    this.entscheidung.set(gespeichert);
    this.sichtbar.set(gespeichert === null);
    if (gespeichert === 'akzeptiert') {
      this.gtmStarten();
    } else {
      // Reste aus einem früheren Opt-in oder aus der Zeit vor dem Banner
      this.googleCookiesLoeschen();
    }
  }

  oeffnen(): void {
    this.details.set(true);
    this.sichtbar.set(true);
  }

  /** Schließen ohne Entscheidung (Escape): nichts wird gespeichert, Tracking bleibt aus. */
  schliessen(): void {
    this.sichtbar.set(false);
    this.details.set(false);
  }

  waehlen(erlaubt: boolean): void {
    const vorher = this.entscheidung();
    const wert: Entscheidung = erlaubt ? 'akzeptiert' : 'abgelehnt';
    try {
      localStorage.setItem(KEY, wert);
    } catch {
      /* Session-Entscheidung */
    }
    this.entscheidung.set(wert);
    this.sichtbar.set(false);
    this.details.set(false);
    if (erlaubt) {
      this.gtmStarten();
    } else if (vorher === 'akzeptiert' || this.gestartet) {
      // Bereits ausgeführte Tags lassen sich nicht sicher durch DOM-Entfernen zurücknehmen.
      // Consent sofort widerrufen, Cookies löschen und neu laden, damit kein Google-Skript mehr läuft.
      this.gtag()('consent', 'update', this.status(false));
      this.googleCookiesLoeschen();
      location.reload();
    }
  }

  /** gtag wie im Google-Snippet: GTM wertet nur echte arguments-Objekte als Befehl, keine Arrays. */
  private gtag(): (...args: unknown[]) => void {
    const win = window as Fenster;
    const dataLayer = (win.dataLayer = win.dataLayer || []);
    win.gtag =
      win.gtag ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        dataLayer.push(arguments);
      };
    return win.gtag;
  }

  private status(analytics: boolean): Record<string, 'granted' | 'denied'> {
    // Werbung bleibt auch bei Analytics-Opt-in untersagt.
    return {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
  }

  private gtmStarten(): void {
    if (this.gestartet) return;
    this.gestartet = true;
    const gtag = this.gtag();
    // Default immer vor dem Container, danach das Update aus der Einwilligung.
    gtag('consent', 'default', this.status(false));
    gtag('set', 'ads_data_redaction', true);
    // _ga-Cookies nur über HTTPS senden (Secure); SameSite wie Google-Standard.
    gtag('set', 'cookie_flags', 'secure;samesite=lax');
    gtag('consent', 'update', this.status(true));
    const win = window as Fenster;
    win.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM;
    document.head.appendChild(script);
  }

  /** Google setzt die Cookies auf die Hauptdomain; ohne passende domain bleiben sie stehen. */
  private googleCookiesLoeschen(): void {
    const host = location.hostname;
    const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
    for (const eintrag of document.cookie.split(';')) {
      const name = eintrag.split('=')[0].trim();
      if (!GOOGLE_COOKIE.test(name)) continue;
      for (const d of domains) {
        document.cookie =
          `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (d ? `; domain=${d}` : '');
      }
    }
  }
}
