import { Component, inject} from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';
import { ScrollService } from '../../services/scroll.service';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-hero-section',
  standalone: true, 
  imports: [BannerComponent, TranslateModule, HeaderComponent], 
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  translate = inject(TranslationService);

  constructor(private scrollService: ScrollService) {}

  navigateWithOffset(targetId: string, offset: number = 100) {
    this.scrollService.navigateWithOffset(targetId, offset);
  }

  
}



