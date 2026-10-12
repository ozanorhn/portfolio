import { Component, ElementRef, Injector, afterNextRender, effect, inject, viewChild } from '@angular/core';
import { ConsentService } from '../core/consent.service';

@Component({
  selector: 'app-consent',
  standalone: true,
  template: `
    @if (consent.sichtbar()) {
      <div class="consent-backdrop">
        <section #dialog tabindex="-1" class="consent" role="dialog" aria-modal="true" aria-labelledby="consent-titel" aria-describedby="consent-text">
          <p class="kicker">DATENSCHUTZ</p>
          <h2 id="consent-titel">Deine Privatsphäre zählt.</h2>
          <p id="consent-text">Wir möchten mit optionaler Reichweitenmessung (Google Analytics über Google Tag Manager)
            erfahren, wie unsere Website genutzt wird. Ohne deine Zustimmung bleibt Google-Tracking deaktiviert.
            Deine Auswahl kannst du jederzeit über „Cookie-Einstellungen“ im Footer ändern.
            <a href="/datenschutz/">Datenschutzerklärung</a>
          </p>
          @if (consent.details()) {
            <div class="details">
              <p><strong>Technisch notwendig</strong> – für die grundlegende Funktion der Website und das Speichern deiner Auswahl. Immer aktiv.</p>
              <p><strong>Statistik (optional)</strong> – Google Analytics 4 über Google Tag Manager. Nur mit deiner Zustimmung.</p>
            </div>
          }
          <div class="aktionen">
            <button type="button" (click)="consent.waehlen(false)">Alle ablehnen</button>
            <button type="button" (click)="consent.waehlen(true)" class="zustimmen">Alle akzeptieren</button>
          </div>
          <button class="details-btn" type="button" (click)="consent.details.set(!consent.details())">
            {{ consent.details() ? 'Einstellungen schließen' : 'Einstellungen anzeigen' }}
          </button>
        </section>
      </div>
    }
  `,
  styles: [`
    :host { font-family: 'Archivo', Arial, sans-serif; }
    .consent-backdrop { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-end; justify-content: center; background: rgba(16,30,30,.48); padding: 16px; }
    .consent { box-sizing: border-box; width: min(100%, 620px); max-height: min(90vh, 780px); overflow-y: auto; padding: clamp(22px, 4vw, 34px); background: #f5f2ed; color: #1c1b19; border-radius: 12px; box-shadow: 0 15px 65px rgba(0,0,0,.25); }
    .kicker { font-size: 11px; letter-spacing: .15em; color: #516464; font-weight: 600; }
    h2 { margin: 10px 0 14px; font-family: 'Source Serif 4', Georgia, serif; font-size: clamp(25px, 4vw, 34px); line-height: 1.2; }
    p { font-size: 14px; line-height: 1.7; }
    a { text-decoration: underline; color: #17544e; }
    .details { margin: 16px 0; padding: 5px 16px; border: 1px solid #c9c8c2; }
    .aktionen { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 24px; }
    button { min-height: 48px; padding: 10px 14px; border: 1px solid #284f48; border-radius: 4px; background: transparent; color: #1c1b19; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
    button:focus-visible { outline: 3px solid #e8752a; outline-offset: 2px; }
    .consent:focus { outline: none; }
    .zustimmen { background: #284f48; color: white; }
    .details-btn { margin-top: 8px; width: 100%; border: 0; text-decoration: underline; }
    @media (max-width: 380px) { .aktionen { grid-template-columns: 1fr; } }
  `],
})
export class ConsentComponent {
  readonly consent = inject(ConsentService);
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private readonly injector = inject(Injector);

  constructor() {
    afterNextRender(() => this.consent.initialisieren());
    // Der Dialog steht am Ende des DOM; ohne Fokus müssten Tastaturnutzer die ganze Seite durchlaufen.
    effect(() => {
      if (!this.consent.sichtbar()) return;
      afterNextRender(() => this.dialog()?.nativeElement.focus(), { injector: this.injector });
    });
  }
}
