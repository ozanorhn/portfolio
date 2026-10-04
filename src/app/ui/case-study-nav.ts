import {
  Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy,
  inject, input, signal, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Abschnitt } from '../data/works';

/** Sticky Abschnittsnavigation. Desktop als schmale Seitenspalte, Mobil als Leiste. */
@Component({
  selector: 'app-case-study-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="csn" aria-label="Abschnitte dieser Seite">
      <ul class="csn__liste">
        @for (a of abschnitte(); track a.id) {
          <li>
            <a
              [href]="'#' + a.id"
              class="csn__link"
              [class.ist-aktiv]="aktiv() === a.id"
              [attr.aria-current]="aktiv() === a.id ? 'true' : null"
              (click)="springe($event, a.id)"
            >{{ a.titel }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .csn { position: sticky; top: $s6; }
      .csn__liste { display: flex; flex-direction: column; gap: $s2; }
      .csn__link {
        display: block; padding: 4px 0 4px $s4;
        border-left: $strich-regel solid $linie;
        font-family: $sans; font-size: 12.5px; letter-spacing: 0.04em; color: $tusche-2;
        transition: color 120ms linear, border-color 120ms linear;
      }
      .csn__link:hover { color: $tusche; }
      .csn__link.ist-aktiv { color: $petrol; border-left-color: $petrol; }

      @media (max-width: $bp-m) {
        .csn {
          top: 0; z-index: 20;
          margin-inline: calc(#{$gosse} * -1);
          padding-inline: $gosse;
          background: $papier;
          border-bottom: $strich-haar solid $linie;
        }
        .csn__liste {
          flex-direction: row; gap: $s5;
          overflow-x: auto; scrollbar-width: none;
          padding-block: 0;
        }
        .csn__liste::-webkit-scrollbar { display: none; }
        .csn__link {
          padding: 12px 0; border-left: 0;
          border-bottom: $strich-stark solid transparent; white-space: nowrap;
        }
        .csn__link.ist-aktiv { border-bottom-color: $petrol; }
      }
    `,
  ],
})
export class CaseStudyNavComponent implements AfterViewInit, OnDestroy {
  private readonly platform = inject(PLATFORM_ID);
  readonly abschnitte = input.required<Abschnitt[]>();
  readonly aktiv = signal('');
  private beobachter: IntersectionObserver | undefined;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform) || typeof IntersectionObserver === 'undefined') return;
    this.beobachter = new IntersectionObserver(
      (eintraege) => {
        const sichtbar = eintraege
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (sichtbar?.target.id) this.aktiv.set(sichtbar.target.id);
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 },
    );
    for (const a of this.abschnitte()) {
      const el = document.getElementById(a.id);
      if (el) this.beobachter.observe(el);
    }
  }

  springe(ev: Event, id: string): void {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduziert ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    (el as HTMLElement).focus({ preventScroll: true });
    this.aktiv.set(id);
  }

  ngOnDestroy(): void { this.beobachter?.disconnect(); }
}
