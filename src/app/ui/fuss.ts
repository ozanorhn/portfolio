import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowUpRight } from 'lucide-angular';
import { SITE } from '../core/site';

@Component({
  selector: 'app-fuss',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="fuss">
      <div class="wrap">
        <hr class="regel" />
        <div class="fuss__band">
          <div>
            <p class="meta">{{ site.name }}</p>
            <p class="fuss__rolle">{{ site.rolle }}</p>
          </div>
          <nav class="fuss__nav" aria-label="Weitere Seiten">
            <a routerLink="/" fragment="kontakt">Kontakt</a>
            <a [href]="site.github" target="_blank" rel="noopener noreferrer">
              GitHub<lucide-icon [img]="IconExtern" [size]="12" [strokeWidth]="2" />
            </a>
            <a [href]="site.linkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn<lucide-icon [img]="IconExtern" [size]="12" [strokeWidth]="2" />
            </a>
            <a routerLink="/projekte">Projekte</a>
            <a routerLink="/impressum">Impressum</a>
            <a routerLink="/datenschutz">Datenschutz</a>
            <a routerLink="/facts">Faktenseite</a>
          </nav>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .fuss { margin-top: $band; padding-bottom: $s8; }
      .fuss__band {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: $s6;
        padding-top: $s6;
      }
      .fuss__rolle {
        margin-top: $s2;
        font-family: $serif;
        font-size: 18px;
        color: $tusche-2;
      }
      .fuss__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0 $s5;
        align-content: flex-start;
        font-family: $sans;
        font-size: 13px;
        letter-spacing: 0.06em;
        color: $tusche-2;
        max-width: 22rem;
      }
      /* 44 px hohe Ziele, die Marke bleibt klein */
      .fuss__nav a {
        display: inline-flex; align-items: center; gap: 3px; padding-block: 12px;
        border-bottom: $strich-regel solid transparent; transition: color 120ms linear, border-color 120ms linear; }
      .fuss__nav a:hover { color: $tusche; border-bottom-color: $linie; }
    `,
  ],
})
export class FussComponent {
  readonly site = SITE;
  readonly IconExtern = ArrowUpRight;
}
