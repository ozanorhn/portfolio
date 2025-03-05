import { Component, Input, inject} from '@angular/core';
import { NgxFastMarqueeModule } from 'ngx-fast-marquee';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgxFastMarqueeModule, TranslateModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
@Input() banner: string[] = [
  'Available for remote work',
  'Frontend Developer',
  'Based in Hannover',
  'Open to work',
]
translate = inject(TranslationService);
}