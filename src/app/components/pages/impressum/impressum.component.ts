import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KopfComponent } from '../../../ui/kopf';
import { FussComponent } from '../../../ui/fuss';
import { SeoService } from '../../../core/seo.service';
import { SEITEN_META } from './meta';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterModule, KopfComponent, FussComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
})
export class ImpressumComponent implements OnInit {
  private readonly seo = inject(SeoService);
  ngOnInit(): void { this.seo.set(SEITEN_META); }
}
