import { Component, ElementRef, afterNextRender, effect, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { ConsentService } from '../core/consent.service';

/** Pflichtseiten bleiben lesbar: dort erscheint der Dialog ohne Sperre des Hintergrunds. */
const RECHTSSEITEN = /^\/(impressum|datenschutz)(\/|$|[?#])/;

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [RouterLink],
  template: `
    <dialog
      #dialog
      class="consent"
      [class.consent--frei]="aufRechtsseite()"
      aria-labelledby="consent-titel"
      aria-describedby="consent-text"
      (cancel)="abbrechen($event)"
    >
      <p class="kicker">DATENSCHUTZ</p>
      <h2 id="consent-titel" tabindex="-1">Deine Privatsphäre zählt.</h2>
      <p id="consent-text">
        Wir möchten mit optionaler Reichweitenmessung (Google Analytics über Google Tag Manager)
        erfahren, wie unsere Website genutzt wird. Ohne deine Zustimmung bleibt Google-Tracking
        deaktiviert. Deine Auswahl kannst du jederzeit über „Cookie-Einstellungen“ im Footer ändern.
      </p>
      <p class="links">
        <a routerLink="/datenschutz">Datenschutzerklärung</a>
        <a routerLink="/impressum">Impressum</a>
      </p>
      @if (consent.details()) {
        <div class="details">
          <p>
            <strong>Technisch notwendig</strong> – für die grundlegende Funktion der Website und das
            Speichern deiner Auswahl. Immer aktiv.
          </p>
          <p>
            <strong>Statistik (optional)</strong> – Google Analytics 4 über Google Tag Manager. Nur
            mit deiner Zustimmung.
          </p>
        </div>
      }
      <div class="aktionen">
        <button type="button" (click)="consent.waehlen(false)">Alle ablehnen</button>
        <button type="button" (click)="consent.waehlen(true)" class="zustimmen">
          Alle akzeptieren
        </button>
      </div>
      <button
        class="details-btn"
        type="button"
        [attr.aria-expanded]="consent.details()"
        (click)="consent.details.set(!consent.details())"
      >
        {{ consent.details() ? 'Einstellungen schließen' : 'Einstellungen anzeigen' }}
      </button>
    </dialog>
  `,
  styles: [
    `
      :host {
        font-family: 'Archivo', Arial, sans-serif;
      }
      .consent {
        box-sizing: border-box;
        width: min(calc(100% - 32px), 620px);
        max-height: min(90vh, 780px);
        overflow-y: auto;
        margin: auto auto 16px;
        padding: clamp(22px, 4vw, 34px);
        border: 0;
        background: #f5f2ed;
        color: #1c1b19;
        border-radius: 12px;
        box-shadow: 0 15px 65px rgba(0, 0, 0, 0.25);
      }
      .consent::backdrop {
        background: rgba(16, 30, 30, 0.48);
      }
      /* Nicht-modal auf Impressum und Datenschutz: unten angedockt, Seite bleibt bedienbar */
      .consent--frei {
        position: fixed;
        inset: auto 0 16px;
        z-index: 10000;
        max-height: min(60vh, 520px);
      }
      .kicker {
        font-size: 11px;
        letter-spacing: 0.15em;
        color: #516464;
        font-weight: 600;
      }
      h2 {
        margin: 10px 0 14px;
        font-family: 'Source Serif 4', Georgia, serif;
        font-size: clamp(25px, 4vw, 34px);
        line-height: 1.2;
      }
      h2:focus {
        outline: none;
      }
      p {
        font-size: 14px;
        line-height: 1.7;
      }
      a {
        text-decoration: underline;
        color: #17544e;
      }
      a:focus-visible {
        outline: 3px solid #e8752a;
        outline-offset: 2px;
      }
      .links {
        display: flex;
        gap: 16px;
        margin-top: 4px;
      }
      .details {
        margin: 16px 0;
        padding: 5px 16px;
        border: 1px solid #c9c8c2;
      }
      .aktionen {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 24px;
      }
      button {
        min-height: 48px;
        padding: 10px 14px;
        border: 1px solid #284f48;
        border-radius: 4px;
        background: transparent;
        color: #1c1b19;
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 3px solid #e8752a;
        outline-offset: 2px;
      }
      .zustimmen {
        background: #284f48;
        color: white;
      }
      .details-btn {
        margin-top: 8px;
        width: 100%;
        border: 0;
        text-decoration: underline;
      }
      @media (max-width: 380px) {
        .aktionen {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ConsentComponent {
  readonly consent = inject(ConsentService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly router = inject(Router);
  /** Element, das vor dem Öffnen den Fokus hatte (z. B. „Cookie-Einstellungen“ im Footer) */
  private vorherFokus: HTMLElement | null = null;

  readonly aufRechtsseite = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => RECHTSSEITEN.test(this.router.url)),
    ),
    // Beim Direktaufruf steht router.url vor der ersten Navigation noch auf "/"
    { initialValue: RECHTSSEITEN.test(location.pathname) },
  );

  constructor() {
    afterNextRender(() => this.consent.initialisieren());
    effect(() => this.anzeigen(this.consent.sichtbar(), this.aufRechtsseite()));
  }

  /** Escape schließt ohne Entscheidung: keine Einwilligung, das Tracking bleibt aus. */
  abbrechen(event: Event): void {
    event.preventDefault();
    this.consent.schliessen();
  }

  private anzeigen(sichtbar: boolean, frei: boolean): void {
    const el = this.dialog().nativeElement;
    if (typeof el.showModal !== 'function') return;
    if (!sichtbar) {
      if (!el.open) return;
      el.close();
      if (this.vorherFokus?.isConnected) this.vorherFokus.focus();
      this.vorherFokus = null;
      return;
    }
    const modal = !frei;
    if (el.open && el.matches(':modal') === modal) return;
    if (!el.open) {
      const aktiv = document.activeElement;
      this.vorherFokus = aktiv instanceof HTMLElement && aktiv !== document.body ? aktiv : null;
    }
    if (el.open) el.close();
    if (modal) {
      // showModal macht den Rest der Seite inert und hält den Tab-Fokus im Dialog
      el.showModal();
      el.querySelector<HTMLElement>('#consent-titel')?.focus();
    } else {
      // Rechtsseiten: nicht-modal. show() fokussiert den Dialog; beim automatischen Öffnen
      // bleibt der Fokus aber auf der Seite, nur über „Cookie-Einstellungen“ springt er hinein.
      el.show();
      if (!this.vorherFokus && el.contains(document.activeElement)) {
        (document.activeElement as HTMLElement).blur();
      }
    }
  }
}
