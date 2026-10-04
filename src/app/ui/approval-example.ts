import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';

const STUFEN = ['Research-Agent', 'Strukturiertes Ergebnis', 'Prüfung nötig', 'Freigabe durch Mensch', 'Generierung'];

/** Abstrahiertes Beispiel der menschlichen Freigabe. Keine echten Firmendaten. */
@Component({
  selector: 'app-approval-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ap">
      <p class="ap__kopf">Freigabe im Ablauf</p>
      <ol class="ap__stufen">
        @for (s of stufen; track s; let i = $index) {
          <li class="ap__stufe" [class.ist-aktiv]="i <= erreicht()">
            <span class="ap__punkt" aria-hidden="true"></span>
            <span>{{ s }}</span>
          </li>
        }
      </ol>

      <div class="ap__vorschlag">
        <p class="ap__titel">Vorschlag des Research-Agenten</p>
        <dl class="ap__felder">
          <div><dt>Unternehmenskategorie</dt><dd>B2B Software</dd></div>
          <div><dt>Modellseitige Konfidenz</dt><dd class="ap__wert">0.74</dd></div>
          <div><dt>Status</dt><dd class="ap__wert">{{ status() }}</dd></div>
        </dl>
        @if (!bestaetigt()) {
          <div class="ap__aktionen">
            <button type="button" class="ap__knopf ap__knopf--ja" (click)="bestaetigen()">Bestätigen</button>
            <button type="button" class="ap__knopf" (click)="bearbeiten()">Bearbeiten</button>
          </div>
        } @else {
          <p class="ap__ergebnis" aria-live="polite">{{ ergebnis() }}</p>
          <button type="button" class="ap__knopf" (click)="zuruecksetzen()">Zurücksetzen</button>
        }
      </div>

      <p class="ap__fuss">
        Abstrahiertes Beispiel zur Veranschaulichung des Ablaufs. Es zeigt keine echte Oberfläche
        und keine echten Daten.
      </p>
    </div>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .ap { background: $platte; padding: clamp(20px, 2.4vw, 32px) clamp(20px, 2.6vw, 36px); }
      .ap__kopf {
        font-family: $sans; font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
        text-transform: uppercase; color: $kreide-2; margin-bottom: $s5;
      }
      .ap__stufen {
        display: flex; flex-wrap: wrap; gap: $s3 clamp(12px, 1.8vw, 24px);
        font-family: $mono; font-size: 11.5px; color: $kreide-2;
        padding-bottom: $s6; border-bottom: $strich-regel solid $linie-platte;
      }
      .ap__stufe { display: flex; align-items: center; gap: $s2; }
      .ap__punkt {
        width: 7px; height: 7px; border-radius: 50%;
        border: $strich-regel solid $kreide-2; transition: background-color 200ms linear, border-color 200ms linear;
      }
      .ap__stufe.ist-aktiv { color: $kreide; }
      .ap__stufe.ist-aktiv .ap__punkt { background: $petrol-platte; border-color: $petrol-platte; }
      .ap__stufe:not(:last-child)::after {
        content: ''; width: clamp(10px, 1.4vw, 18px); height: $strich-haar;
        background: $linie-platte; margin-left: $s2;
      }
      .ap__vorschlag { padding-top: $s6; }
      .ap__titel {
        font-family: $sans; font-size: 10.5px; font-weight: 600; letter-spacing: 0.16em;
        text-transform: uppercase; color: $kreide-2; margin-bottom: $s4;
      }
      .ap__felder { font-family: $mono; font-size: 12.5px; color: $kreide; }
      .ap__felder > div {
        display: flex; gap: $s4; padding-block: $s3;
        border-bottom: $strich-haar solid $linie-platte;
      }
      .ap__felder dt { flex: 0 0 13rem; color: $kreide-2; }
      .ap__felder dd { margin: 0; }
      .ap__wert { color: $petrol-platte; }
      .ap__aktionen { display: flex; gap: $s5; margin-top: $s5; }
      .ap__knopf {
        font-family: $sans; font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
        text-transform: uppercase; color: $kreide-2;
        border-bottom: $strich-regel solid $linie-platte; padding-bottom: 4px;
        transition: color 120ms linear, border-color 120ms linear;
      }
      .ap__knopf:hover { color: $kreide; border-bottom-color: $kreide; }
      .ap__knopf--ja { color: $petrol-platte; border-bottom-color: $petrol-platte; }
      .ap__ergebnis {
        margin: $s5 0; font-family: $mono; font-size: 12.5px; color: $kreide;
      }
      .ap__fuss {
        margin-top: $s6; padding-top: $s4; border-top: $strich-haar solid $linie-platte;
        font-family: $sans; font-size: 12.5px; line-height: 1.5; color: $kreide-2; max-width: 60ch;
      }
      @media (max-width: $bp-s) {
        .ap__felder > div { flex-direction: column; gap: 2px; }
        .ap__felder dt { flex: none; }
      }
    `,
  ],
})
export class ApprovalExampleComponent {
  readonly stufen = STUFEN;
  readonly bestaetigt = signal<null | 'ja' | 'bearbeitet'>(null);
  readonly erreicht = computed(() => (this.bestaetigt() ? 4 : 2));
  readonly status = computed(() =>
    this.bestaetigt() === null ? 'Bestätigung erforderlich' : 'validiert',
  );
  readonly ergebnis = computed(() =>
    this.bestaetigt() === 'ja'
      ? 'Wert übernommen. Die Generierung läuft mit dem bestätigten Faktensatz.'
      : 'Wert überschrieben. Die Nutzereingabe schlägt den Vorschlag des Agenten.',
  );
  bestaetigen(): void { this.bestaetigt.set('ja'); }
  bearbeiten(): void { this.bestaetigt.set('bearbeitet'); }
  zuruecksetzen(): void { this.bestaetigt.set(null); }
}
