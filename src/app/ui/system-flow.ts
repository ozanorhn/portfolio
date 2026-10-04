import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import type { FlussStation } from '../data/works';

/**
 * Systemfluss auf Plattengrund. Ein Datenpunkt läuft entlang der Linie durch
 * die realen Stationen der Architektur. Kein Glow, kein Verlauf.
 */
@Component({
  selector: 'app-system-flow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fl" [class.fl--kompakt]="kompakt()" role="img" [attr.aria-label]="beschriftung()">
      <p class="fl__kopf">{{ kopf() }}</p>
      <ol class="fl__bahn">
        @for (s of stationen(); track s.label; let i = $index) {
          <li class="fl__st" [style.--i]="i">
            <span class="fl__punkt" aria-hidden="true"></span>
            <span class="fl__label">{{ s.label }}</span>
            @if (s.note) { <span class="fl__note">{{ s.note }}</span> }
          </li>
        }
        <span class="fl__laeufer" aria-hidden="true"></span>
      </ol>
    </div>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .fl { background: $platte; padding: clamp(20px, 2.4vw, 32px) clamp(20px, 2.6vw, 36px) clamp(24px, 3vw, 40px); }
      .fl__kopf {
        font-family: $sans; font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
        text-transform: uppercase; color: $kreide-2; margin-bottom: clamp(20px, 2.4vw, 32px);
      }
      .fl__bahn {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 0;
      }
      /* Die Bahn selbst */
      .fl__bahn::before {
        content: '';
        position: absolute;
        left: 0; right: 0; top: 5px;
        height: $strich-haar;
        background: $petrol-platte;
      }
      .fl__st { position: relative; padding-right: $s4; }
      .fl__punkt {
        display: block; width: 11px; height: 11px; margin-bottom: $s4;
        border: $strich-regel solid $kreide; border-radius: 50%;
        background: $platte; position: relative; z-index: 1;
      }
      .fl__label {
        display: block; font-family: $mono; font-size: 12px; letter-spacing: 0.02em;
        color: $kreide; line-height: 1.35;
      }
      .fl__note {
        display: block; margin-top: 4px; font-family: $mono; font-size: 11px;
        color: $kreide-2; line-height: 1.4;
      }
      .fl__laeufer {
        position: absolute; top: 2px; left: 0;
        width: 7px; height: 7px; border-radius: 50%;
        background: $petrol-platte;
        animation: lauf 7s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      }
      @keyframes lauf {
        0%   { left: 0; opacity: 0; }
        6%   { opacity: 1; }
        94%  { opacity: 1; }
        100% { left: calc(100% - 7px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .fl__laeufer { animation: none; left: 0; opacity: 1; }
      }
      /* Kompakt: immer vertikal, unabhängig von der Fensterbreite */
      .fl--kompakt .fl__bahn { grid-auto-flow: row; grid-auto-columns: auto; }
      .fl--kompakt .fl__bahn::before {
        left: 5px; right: auto; top: 5px; bottom: 5px; width: $strich-haar; height: auto;
      }
      .fl--kompakt .fl__st { padding: 0 0 $s4 $s6; }
      .fl--kompakt .fl__st:last-of-type { padding-bottom: 0; }
      .fl--kompakt .fl__punkt { position: absolute; left: 0; top: 1px; margin: 0; }
      .fl--kompakt .fl__laeufer { animation-name: lauf-vertikal; }

      @media (max-width: $bp-m) {
        .fl__bahn { grid-auto-flow: row; grid-auto-columns: auto; }
        .fl__bahn::before { left: 5px; right: auto; top: 5px; bottom: 5px; width: $strich-haar; height: auto; }
        .fl__st { padding: 0 0 $s5 $s6; }
        .fl__st:last-of-type { padding-bottom: 0; }
        .fl__punkt { position: absolute; left: 0; top: 1px; margin: 0; }
        .fl__laeufer { animation-name: lauf-vertikal; }
      }
      @keyframes lauf-vertikal {
        0%   { top: 0; left: 2px; opacity: 0; }
        6%   { opacity: 1; }
        94%  { opacity: 1; }
        100% { top: calc(100% - 7px); left: 2px; opacity: 0; }
      }
    `,
  ],
})
export class SystemFlowComponent {
  readonly stationen = input.required<FlussStation[]>();
  readonly kopf = input('Systemfluss');
  readonly kompakt = input(false);
  beschriftung(): string {
    return this.kopf() + ': ' + this.stationen().map((s) => s.label).join(' → ') + '.';
  }
}
