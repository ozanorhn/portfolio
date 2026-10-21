import { Component, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Aufklappbarer Bereich für das technische Ablaufdiagramm einer Fallstudie.
 * Natives <details>: ohne JavaScript bedienbar, per Tastatur (Enter/Leertaste) und
 * Screenreader als Aufklapper erkennbar. Der Inhalt bleibt im vorgerenderten HTML,
 * also für Suchmaschinen und KI-Systeme lesbar, auch wenn der Bereich geschlossen ist.
 */
@Component({
  selector: 'app-ablauf-ausklappen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details class="ak">
      <summary class="ak__kopf">
        <span class="ak__zeichen" aria-hidden="true"></span>
        <span class="ak__titel">{{ titel() }}</span>
        @if (hinweis()) {
          <span class="ak__hinweis">{{ hinweis() }}</span>
        }
      </summary>
      <div class="ak__inhalt">
        <ng-content />
      </div>
    </details>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      :host {
        display: block;
        margin-top: $s5;
      }
      .ak {
        border-top: $strich-haar solid $linie;
        border-bottom: $strich-haar solid $linie;
      }
      .ak__kopf {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: $s2 $s3;
        min-height: 48px;
        padding-block: $s3;
        cursor: pointer;
        list-style: none;
        font-family: $sans;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: $tusche;
      }
      .ak__kopf::-webkit-details-marker {
        display: none;
      }
      .ak__kopf:hover .ak__titel {
        color: $petrol;
      }
      .ak__kopf:focus-visible {
        outline: 2px solid $petrol;
        outline-offset: 4px;
      }
      .ak__zeichen {
        position: relative;
        width: 14px;
        height: 14px;
        flex: none;
        border: $strich-regel solid $tusche;
        border-radius: 50%;
      }
      .ak__zeichen::before,
      .ak__zeichen::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        background: $tusche;
        transform: translate(-50%, -50%);
        transition: transform 200ms ease;
      }
      .ak__zeichen::before {
        width: 7px;
        height: 1px;
      }
      .ak__zeichen::after {
        width: 1px;
        height: 7px;
      }
      .ak[open] .ak__zeichen::after {
        transform: translate(-50%, -50%) scaleY(0);
      }
      .ak__hinweis {
        font-family: $mono;
        font-size: 11.5px;
        font-weight: 400;
        letter-spacing: 0.02em;
        text-transform: none;
        color: $tusche-2;
      }
      .ak__inhalt {
        padding-bottom: $s5;
      }
      /* Im Aufklapper ist nur die Textspalte breit: die kompakte Fassung des Diagramms
         bleibt dort auf allen Geräten lesbar, das breite Querformat wäre zu klein */
      .ak__inhalt ::ng-deep .sb__quer {
        display: none;
      }
      .ak__inhalt ::ng-deep .sb__hoch {
        display: block;
        max-width: 520px;
        margin-inline: 0;
      }
      .ak__inhalt ::ng-deep app-tafel {
        max-width: 520px;
        border-radius: 4px;
        overflow: hidden;
      }
      .ak[open] .ak__inhalt {
        animation: ak-ein 220ms ease;
      }
      @keyframes ak-ein {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ak[open] .ak__inhalt {
          animation: none;
        }
        .ak__zeichen::after {
          transition: none;
        }
      }
    `,
  ],
})
export class AblaufAusklappenComponent {
  readonly titel = input('Technischen Ablauf ansehen');
  readonly hinweis = input<string | null>(null);
}
