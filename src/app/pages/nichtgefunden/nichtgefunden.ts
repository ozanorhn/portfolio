import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KopfComponent } from '../../ui/kopf';
import { FussComponent } from '../../ui/fuss';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-nichtgefunden',
  standalone: true,
  imports: [RouterLink, KopfComponent, FussComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-kopf />
    <main id="inhalt" class="wrap nf">
      <p class="nf__code">404</p>
      <h1 class="titel nf__titel">Route nicht gefunden.</h1>
      <p class="nf__pfad" aria-hidden="true">
        <span>request</span><span class="nf__linie"></span><span class="nf__x">×</span><span class="nf__linie"></span><span>route</span>
      </p>
      <p class="nf__aktionen">
        <a class="aktion aktion--primaer" routerLink="/projekte">Zu den Projekten</a>
        <a class="aktion" routerLink="/">Startseite</a>
      </p>
    </main>
    <app-fuss />
  `,
  styles: [
    `
      @use 'styles/tokens' as *;
      .nf { padding-block: clamp(48px, 8vw, 120px); }
      .nf__code { font-family: $mono; font-size: 12px; letter-spacing: 0.16em; color: $tusche-2; }
      .nf__titel { margin-top: $s4; max-width: 16ch; }
      .nf__pfad {
        display: flex; align-items: center; gap: $s3;
        margin-block: $s6 $s7;
        font-family: $mono; font-size: 12.5px; color: $tusche-2;
      }
      .nf__linie { flex: 0 1 6rem; height: $strich-regel; background: $linie; }
      .nf__x { color: $petrol; font-size: 15px; }
      .nf__aktionen { display: flex; flex-wrap: wrap; gap: $s6; }
    `,
  ],
})
export class NichtGefundenComponent implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.set({
      titel: 'Route nicht gefunden — Ozan Orhan',
      beschreibung: 'Diese Adresse existiert nicht.',
      pfad: '/404',
      noindex: true,
    });
  }
}
