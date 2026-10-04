import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SystembildComponent } from './systembild';
import type { Plate } from '../data/works';

/**
 * Bildfläche einer Arbeit. Das Seitenverhältnis ist reserviert, damit ein
 * höher aufgelöstes Bild später eins zu eins ersetzt werden kann.
 */
@Component({
  selector: 'app-tafel',
  standalone: true,
  imports: [SystembildComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (plate(); as p) {
      @if (p.kind === 'systembild') {
        <app-systembild [id]="p.ref" [alt]="p.alt" />
      } @else {
        <div
          class="flaeche"
          [style.aspect-ratio]="p.ratio ?? '16 / 9'"
          [style.max-height]="hoehe()"
        >
          <img
            [src]="p.ref"
            [alt]="p.alt"
            [attr.loading]="eager() ? null : 'lazy'"
            [attr.fetchpriority]="eager() ? 'high' : null"
            [attr.width]="1086"
            [attr.height]="700"
            decoding="async"
          />
        </div>
      }
    }
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      :host { display: block; background: $platte; }
      .flaeche { width: 100%; overflow: hidden; background: $platte; }
      .flaeche img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
      /* Schmal: das Bild zeigt sich ganz, im eigenen Seitenverhältnis */
      @media (max-width: $bp-m) {
        .flaeche { aspect-ratio: auto !important; max-height: none !important; }
        .flaeche img { height: auto; }
      }
    `,
  ],
})
export class TafelComponent {
  readonly plate = input<Plate | undefined>(undefined);
  readonly eager = input(false);
  readonly hoehe = input<string | null>(null);
}
