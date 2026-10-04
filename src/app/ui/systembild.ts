import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Systembild auf Plattengrund. Quer- und Hochformat liegen beide vor; die
 * Umschaltung erfolgt über CSS, nicht über Skalierung, damit die Beschriftung
 * auf schmalen Geräten lesbar bleibt.
 *
 * Die Bilddaten werden dynamisch geladen: sie sind rund 120 kB und haben im
 * Initial-Bundle nichts zu suchen.
 */
@Component({
  selector: 'app-systembild',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="sb" role="group" [attr.aria-label]="alt()">
      @if (quer(); as q) {
        <div class="sb__quer" aria-hidden="true" [innerHTML]="q"></div>
      }
      @if (hoch(); as h) {
        <div class="sb__hoch" aria-hidden="true" [innerHTML]="h"></div>
      }
      <figcaption class="sr-only">{{ alt() }}</figcaption>
    </figure>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .sb {
        background: $platte;
        margin: 0;
        min-height: 220px;
      }
      .sb ::ng-deep svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .sb__hoch {
        display: none;
        max-width: 680px;
        margin-inline: auto;
      }
      /* Unter 1200 px wird das Querformat zu klein für seine Beschriftung */
      @media (max-width: $bp-l) {
        .sb__quer {
          display: none;
        }
        .sb__hoch {
          display: block;
        }
      }
    `,
  ],
})
export class SystembildComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);

  readonly id = input.required<string>();
  readonly alt = input.required<string>();

  readonly quer = signal<SafeHtml | null>(null);
  readonly hoch = signal<SafeHtml | null>(null);

  async ngOnInit(): Promise<void> {
    const { DIAGRAMS } = await import('../data/diagrams');
    const paar = DIAGRAMS[this.id()];
    if (!paar) return;
    this.quer.set(this.sanitizer.bypassSecurityTrustHtml(paar.quer));
    this.hoch.set(this.sanitizer.bypassSecurityTrustHtml(paar.hoch));
  }
}
