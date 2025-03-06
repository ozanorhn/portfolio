import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {
  translate = inject(TranslationService);
}
