import { Component, ElementRef, afterNextRender, effect, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../core/consent.service';

/**
 * Einwilligung als schmale, nicht-modale Leiste am unteren Rand. Die Seite bleibt
 * lesbar und bedienbar; der Hero wird nicht abgedunkelt. Beide Wahlmöglichkeiten
 * sind gleich gewichtet, ohne Entscheidung bleibt das Tracking aus.
 */
@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [RouterLink],
  template: `
    <dialog
      #dialog
      class="consent"
      aria-labelledby="consent-titel"
      aria-describedby="consent-text"
      (cancel)="abbrechen($event)"
    >
      <div class="text">
        <h2 id="consent-titel" tabindex="-1">Deine Privatsphäre zählt.</h2>
        <p id="consent-text">
          Optionale Reichweitenmessung (Google Analytics über Google Tag Manager) nur mit deiner
          Zustimmung. Ändern jederzeit über „Cookie-Einstellungen“ im Footer.
          <a routerLink="/datenschutz">Datenschutz</a> ·
          <a routerLink="/impressum">Impressum</a>
        </p>
        @if (consent.details()) {
          <div class="details">
            <p>
              <strong>Technisch notwendig</strong> – für die grundlegende Funktion der Website und
              das Speichern deiner Auswahl. Immer aktiv.
            </p>
            <p>
              <strong>Statistik (optional)</strong> – Google Analytics 4 über Google Tag Manager.
              Nur mit deiner Zustimmung.
            </p>
          </div>
        }
      </div>
      <div class="steuerung">
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
      </div>
    </dialog>
  `,
  styles: [
    `
      :host {
        font-family: 'Archivo', Arial, sans-serif;
      }
      .consent {
        box-sizing: border-box;
        position: fixed;
        inset: auto 0 12px;
        z-index: 10000;
        width: min(calc(100% - 24px), 1120px);
        max-height: min(60vh, 520px);
        overflow-y: auto;
        margin: 0 auto;
        padding: 14px 18px;
        border: 1px solid #c9c8c2;
        background: #f5f2ed;
        color: #1c1b19;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
      }
      .consent[open] {
        display: grid;
        gap: 10px;
      }
      @media (min-width: 900px) {
        .consent[open] {
          grid-template-columns: minmax(0, 1fr) 340px;
          column-gap: 28px;
          align-items: center;
        }
      }
      h2 {
        margin: 0 0 4px;
        font-family: 'Source Serif 4', Georgia, serif;
        font-size: 18px;
        line-height: 1.25;
      }
      h2:focus {
        outline: none;
      }
      p {
        margin: 0;
        font-size: 13px;
        line-height: 1.55;
      }
      a {
        text-decoration: underline;
        color: #17544e;
      }
      a:focus-visible {
        outline: 3px solid #e8752a;
        outline-offset: 2px;
      }
      .details {
        margin-top: 10px;
        padding: 6px 12px;
        border: 1px solid #c9c8c2;
      }
      .details p + p {
        margin-top: 6px;
      }
      .aktionen {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      button {
        min-height: 44px;
        padding: 8px 12px;
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
        min-height: 32px;
        margin-top: 4px;
        width: 100%;
        border: 0;
        font-weight: 500;
        text-decoration: underline;
      }
    `,
  ],
})
export class ConsentComponent {
  readonly consent = inject(ConsentService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  /** Element, das vor dem Öffnen den Fokus hatte (z. B. „Cookie-Einstellungen“ im Footer) */
  private vorherFokus: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => this.consent.initialisieren());
    effect(() => this.anzeigen(this.consent.sichtbar()));
  }

  /** Escape schließt ohne Entscheidung: keine Einwilligung, das Tracking bleibt aus. */
  abbrechen(event: Event): void {
    event.preventDefault();
    this.consent.schliessen();
  }

  private anzeigen(sichtbar: boolean): void {
    const el = this.dialog().nativeElement;
    if (typeof el.show !== 'function') return;
    if (!sichtbar) {
      if (!el.open) return;
      el.close();
      if (this.vorherFokus?.isConnected) this.vorherFokus.focus();
      this.vorherFokus = null;
      return;
    }
    if (el.open) return;
    const aktiv = document.activeElement;
    this.vorherFokus = aktiv instanceof HTMLElement && aktiv !== document.body ? aktiv : null;
    el.show();
    if (this.vorherFokus) {
      // Bewusst geöffnet (Footer): Fokus in die Leiste
      el.querySelector<HTMLElement>('#consent-titel')?.focus();
    } else if (el.contains(document.activeElement)) {
      // Automatisch beim Laden: Fokus bleibt auf der Seite
      (document.activeElement as HTMLElement).blur();
    }
  }
}
