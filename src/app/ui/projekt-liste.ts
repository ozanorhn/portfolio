import { Component, ChangeDetectionStrategy, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TafelComponent } from './tafel';
import { SystemFlowComponent } from './system-flow';
import { GRUPPEN_TITEL, type Work } from '../data/works';

interface Gruppe {
  key: Work['gruppe'];
  titel: string;
  werke: Work[];
}

/**
 * Projektliste als Verzeichnis, nach Herkunft gruppiert. Die Gruppen entstehen
 * aus dem Werk selbst; bei nur einer Gruppe entfällt die Zwischenüberschrift.
 * Auf großen Flächen zeigt Hover oder Fokus daneben eine Vorschau; ohne
 * Zeigegerät bleibt die Liste vollständig lesbar.
 */
@Component({
  selector: 'app-projekt-liste',
  standalone: true,
  imports: [RouterLink, TafelComponent, SystemFlowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pl" [class.pl--mit-vorschau]="vorschau()">
      <div class="pl__gruppen">
        @for (g of gruppen(); track g.key) {
          <section class="pl__gruppe" [class.pl__gruppe--leise]="g.key === 'ausbildung'">
            @if (gruppen().length > 1) {
              <h2 class="untertitel pl__gruppentitel">{{ g.titel }}</h2>
            }
            <ul class="pl__liste">
              @for (w of g.werke; track w.slug) {
                <li>
                  <a
                    class="pl__zeile"
                    [routerLink]="['/projekte', w.slug]"
                    (mouseenter)="zeige(w)"
                    (focus)="zeige(w)"
                  >
                    <span class="pl__nr">{{ w.nr }}</span>
                    <span class="pl__haupt">
                      <h3 class="pl__titel">{{ w.titel }}</h3>
                      <span class="pl__lede">{{ w.lede }}</span>
                      <span class="pl__meta">{{ w.kicker }}</span>
                    </span>
                  </a>
                </li>
              }
            </ul>
          </section>
        }
      </div>

      @if (vorschau()) {
        <div class="pl__vorschau" aria-hidden="true">
          <div class="pl__rahmen">
            @if (aktives(); as w) {
              @if (w.plate?.kind === 'bild') {
                <app-tafel [plate]="w.plate" />
              } @else if (w.fluss) {
                <app-system-flow [stationen]="w.fluss" [kopf]="w.titel" [kompakt]="true" />
              } @else if (w.plate) {
                <app-tafel [plate]="w.plate" />
              }
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .pl__gruppe + .pl__gruppe { margin-top: clamp(40px, 4.5vw, 64px); }
      .pl__gruppentitel { padding-bottom: $s4; }
      .pl__liste { border-top: $strich-haar solid $linie; }
      .pl__zeile {
        display: grid;
        grid-template-columns: 2.6rem minmax(0, 1fr);
        column-gap: clamp(14px, 2vw, 32px);
        align-items: start;
        padding-block: clamp(16px, 1.8vw, 24px);
        border-bottom: $strich-haar solid $linie;
        transition: background-color 120ms linear;
      }
      .pl__zeile:hover { background: $papier-tief; }
      .pl__zeile:hover .pl__titel, .pl__zeile:focus-visible .pl__titel { color: $petrol; }
      .pl__nr {
        font-family: $mono; font-size: 11.5px; color: $tusche-2;
        padding-top: 0.5em; font-variant-numeric: tabular-nums;
      }
      .pl__titel {
        display: block; font-family: $serif; font-weight: 400;
        font-size: clamp(21px, 2.1vw, 29px); line-height: 1.15; letter-spacing: -0.01em;
        transition: color 120ms linear;
      }
      .pl__lede {
        display: block; margin-top: 6px; max-width: 52ch;
        color: $tusche-2; font-size: 15.5px; line-height: 1.5;
      }
      /* Kicker steht unter der Lede — auf jeder Breite, auch mit Vorschau */
      .pl__meta {
        display: block; margin-top: $s3;
        font-family: $mono; font-size: 11.5px; letter-spacing: 0.03em; color: $tusche-2;
      }

      /* Ausbildungsprojekte: kleinerer Grad, gleiche Sprache */
      .pl__gruppe--leise .pl__titel { font-size: clamp(18px, 1.6vw, 22px); }
      .pl__gruppe--leise .pl__zeile { padding-block: clamp(12px, 1.3vw, 16px); }
      .pl__gruppe--leise .pl__lede { font-size: 14.5px; }

      /* Vorschau nur dort, wo es ein Zeigegerät und Platz gibt */
      .pl__vorschau { display: none; }
      @media (min-width: 1080px) and (hover: hover) {
        .pl--mit-vorschau {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 27rem);
          column-gap: clamp(24px, 3vw, 56px);
          align-items: start;
        }
        .pl__vorschau { display: block; position: sticky; top: $s7; }
        .pl__rahmen {
          border-top: $strich-haar solid $linie;
          padding-top: clamp(16px, 1.8vw, 24px);
        }
      }
      @media (max-width: $bp-m) {
        .pl__zeile { grid-template-columns: 2.2rem minmax(0, 1fr); }
      }
    `,
  ],
})
export class ProjektListeComponent {
  readonly projekte = input.required<Work[]>();
  readonly vorschau = input(false);
  private readonly gewaehlt = signal<string | null>(null);

  /** Gruppen in Reihenfolge des ersten Auftretens, Werke in Listenreihenfolge. */
  readonly gruppen = computed<Gruppe[]>(() => {
    const out: Gruppe[] = [];
    for (const w of this.projekte()) {
      let g = out.find((x) => x.key === w.gruppe);
      if (!g) {
        g = { key: w.gruppe, titel: GRUPPEN_TITEL[w.gruppe], werke: [] };
        out.push(g);
      }
      g.werke.push(w);
    }
    return out;
  });

  readonly aktives = computed(() => {
    const alle = this.projekte();
    return alle.find((w) => w.slug === this.gewaehlt()) ?? alle[0];
  });

  zeige(w: Work): void { this.gewaehlt.set(w.slug); }
}
