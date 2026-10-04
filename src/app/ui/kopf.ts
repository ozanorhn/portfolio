import {
  Component, ChangeDetectionStrategy, ElementRef, HostListener,
  computed, inject, signal, viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Menu, X, Sun, Moon } from 'lucide-angular';
import { SITE } from '../core/site';
import { ThemeService } from '../core/theme.service';

interface MenuPunkt {
  label: string;
  pfad: string;
  fragment?: string;
}

@Component({
  selector: 'app-kopf',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip" href="#inhalt">Zum Inhalt springen</a>

    <header class="kopf">
      <div class="wrap kopf__zeile">
        <!-- Marke -->
        <a routerLink="/" class="kopf__marke" [attr.aria-label]="site.name + ', Startseite'">
          <svg class="kopf__zeichen" viewBox="0 0 20 22" aria-hidden="true" focusable="false">
            <path
              fill-rule="evenodd"
              d="M5.2 2.5h11.3a1.6 1.6 0 0 1 1.6 1.6v13.8a1.6 1.6 0 0 1-1.6 1.6H1.4Zm1.4 4.1v2.6L10.3 11l-3.7 2.4v2.6L14.8 11Z"
            />
          </svg>
          <span class="kopf__wort">ozan.orhan</span>
        </a>

        <!-- Navigation ab mittleren Breiten -->
        <nav class="kopf__nav" aria-label="Hauptnavigation">
          @for (p of punkte; track p.label) {
            @if (p.fragment) {
              <a [routerLink]="p.pfad" [fragment]="p.fragment">{{ p.label }}</a>
            } @else {
              <a [routerLink]="p.pfad" routerLinkActive="ist-aktiv">{{ p.label }}</a>
            }
          }
        </nav>

        <div class="kopf__rechts">
          <button
            type="button"
            class="kopf__knopf"
            (click)="theme.wechseln()"
            [attr.aria-label]="dunkel() ? 'Zu hellem Erscheinungsbild wechseln' : 'Zu dunklem Erscheinungsbild wechseln'"
            [attr.aria-pressed]="dunkel()"
          >
            <lucide-icon [img]="dunkel() ? IconSun : IconMoon" [size]="19" [strokeWidth]="1.75" />
          </button>

          <a class="kopf__cta" routerLink="/" fragment="kontakt">Kontakt</a>

          <!-- Menü nur auf schmalen Geräten -->
          <div class="kopf__menue">
            <button
              #knopf
              type="button"
              class="kopf__knopf"
              [attr.aria-expanded]="offen()"
              aria-controls="hauptmenue"
              [attr.aria-label]="offen() ? 'Menü schließen' : 'Menü öffnen'"
              (click)="umschalten()"
            >
              <lucide-icon [img]="offen() ? IconX : IconMenu" [size]="22" [strokeWidth]="1.75" />
            </button>

            @if (offen()) {
              <nav #panel id="hauptmenue" class="kopf__panel" aria-label="Navigation">
                <ul>
                  @for (p of alleP; track p.label) {
                    <li>
                      @if (p.fragment) {
                        <a [routerLink]="p.pfad" [fragment]="p.fragment" (click)="schliessen()">
                          {{ p.label }}
                        </a>
                      } @else {
                        <a
                          [routerLink]="p.pfad"
                          routerLinkActive="ist-aktiv"
                          [routerLinkActiveOptions]="{ exact: p.pfad === '/' }"
                          (click)="schliessen()"
                        >{{ p.label }}</a>
                      }
                    </li>
                  }
                </ul>
                <hr class="regel-haar" />
                <ul class="kopf__panel-klein">
                  @for (p of rechtliches; track p.label) {
                    <li><a [routerLink]="p.pfad" (click)="schliessen()">{{ p.label }}</a></li>
                  }
                </ul>
              </nav>
            }
          </div>
        </div>
      </div>
      <hr class="regel-haar" />
    </header>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;

      .kopf__zeile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: $s6;
        padding-block: clamp(18px, 1.9vw, 28px);
      }

      /* ─── Marke ─────────────────────────────────────────────────── */
      .kopf__marke { display: inline-flex; align-items: center; gap: $s3; flex: none; }
      .kopf__zeichen { width: 20px; height: auto; fill: $petrol; flex: none; }
      .kopf__wort {
        font-family: $mono;
        font-size: 15.5px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
      }

      /* ─── Inline-Navigation ─────────────────────────────────────── */
      .kopf__nav {
        display: flex;
        gap: clamp(20px, 2.6vw, 40px);
        margin-left: auto;
        font-family: $sans;
        font-size: 12.5px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: $tusche-2;
      }
      .kopf__nav a {
        padding-block: 4px;
        border-bottom: $strich-regel solid transparent;
        transition: color 120ms linear, border-color 120ms linear;
      }
      .kopf__nav a:hover { color: $tusche; border-bottom-color: $linie; }
      .kopf__nav a.ist-aktiv { color: $petrol; border-bottom-color: $petrol; }

      .kopf__rechts { display: flex; align-items: center; gap: $s4; flex: none; }

      .kopf__knopf {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: $tusche-2;
        transition: color 120ms linear;
      }
      .kopf__knopf:hover { color: $petrol; }

      /* ─── Kontakt als gerahmter Knopf, Radius bleibt bei 2px ────── */
      .kopf__cta {
        display: inline-flex;
        align-items: center;
        height: 40px;
        padding-inline: $s5;
        border: $strich-regel solid $linie;
        border-radius: 2px;
        font-family: $sans;
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: $tusche;
        transition: border-color 120ms linear, color 120ms linear, background-color 120ms linear;
      }
      .kopf__cta:hover { color: $petrol; border-color: $petrol; background: $papier-tief; }

      /* ─── Menü nur schmal ───────────────────────────────────────── */
      .kopf__menue { position: relative; display: none; }

      .kopf__panel {
        position: absolute;
        top: calc(100% + #{$s3});
        right: 0;
        z-index: 60;
        min-width: 14rem;
        padding: $s4 0;
        background: $papier;
        border: $strich-regel solid $linie;
      }
      .kopf__panel a {
        display: block;
        padding: $s3 $s5;
        font-family: $serif;
        font-size: 20px;
        line-height: 1.2;
        letter-spacing: -0.01em;
        transition: color 120ms linear, background-color 120ms linear;
      }
      .kopf__panel a:hover { color: $petrol; background: $papier-tief; }
      .kopf__panel a.ist-aktiv { color: $petrol; }
      .kopf__panel .regel-haar { margin: $s3 $s5; }
      .kopf__panel-klein a {
        font-family: $sans;
        font-size: 12.5px;
        letter-spacing: 0.04em;
        color: $tusche-2;
        padding-block: 6px;
      }

      @media (max-width: 720px) {
        .kopf__nav { display: none; }
        .kopf__menue { display: block; }
      }
      @media (max-width: 400px) {
        .kopf__cta { display: none; }
      }
    `,
  ],
})
export class KopfComponent {
  readonly site = SITE;
  readonly theme = inject(ThemeService);
  readonly dunkel = computed(() => this.theme.theme() === 'dunkel');

  readonly IconMenu = Menu;
  readonly IconX = X;
  readonly IconSun = Sun;
  readonly IconMoon = Moon;

  readonly offen = signal(false);
  private readonly knopf = viewChild<ElementRef<HTMLButtonElement>>('knopf');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  /** Inline sichtbar */
  readonly punkte: MenuPunkt[] = [
    { label: 'Projekte', pfad: '/projekte' },
    { label: 'Profil', pfad: '/', fragment: 'profil' },
  ];
  /** Im Menü auf schmalen Geräten, inklusive Kontakt */
  readonly alleP: MenuPunkt[] = [
    { label: 'Start', pfad: '/' },
    { label: 'Projekte', pfad: '/projekte' },
    { label: 'Profil', pfad: '/', fragment: 'profil' },
    { label: 'Kontakt', pfad: '/', fragment: 'kontakt' },
  ];
  readonly rechtliches: MenuPunkt[] = [
    { label: 'Faktenseite', pfad: '/facts' },
    { label: 'Impressum', pfad: '/impressum' },
    { label: 'Datenschutz', pfad: '/datenschutz' },
  ];

  umschalten(): void { this.offen.update((o) => !o); }

  schliessen(): void {
    this.offen.set(false);
    this.knopf()?.nativeElement.focus();
  }

  @HostListener('document:keydown.escape')
  beiEscape(): void { if (this.offen()) this.schliessen(); }

  @HostListener('document:pointerdown', ['$event'])
  beiKlickAussen(ev: PointerEvent): void {
    if (!this.offen()) return;
    const ziel = ev.target as Node;
    if (this.panel()?.nativeElement.contains(ziel)) return;
    if (this.knopf()?.nativeElement.contains(ziel)) return;
    this.offen.set(false);
  }
}
