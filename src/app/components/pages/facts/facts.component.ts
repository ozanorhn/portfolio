import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KopfComponent } from '../../../ui/kopf';
import { FussComponent } from '../../../ui/fuss';
import { SeoService } from '../../../core/seo.service';
import { SITE } from '../../../core/site';
import { KERNARBEITEN, WORKS } from '../../../data/works';
import { ENTITAET, FAQ, SEITEN_META } from './meta';

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [RouterModule, KopfComponent, FussComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss'],
})
export class FactsComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly site = SITE;
  readonly e = ENTITAET;
  readonly faq = FAQ;
  readonly kernprojekte = KERNARBEITEN;
  readonly weitereProjekte = WORKS.filter((w) => w.gruppe !== 'kern');

  /** ISO-Datum als sichtbares deutsches Datum. */
  datum(iso: string): string {
    const [j, m, t] = iso.split('-');
    return `${t}.${m}.${j}`;
  }

  ngOnInit(): void { this.seo.set(SEITEN_META); }
}
