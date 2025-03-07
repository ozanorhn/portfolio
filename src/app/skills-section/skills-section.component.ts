import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';
import { ScrollService } from '../services/scroll.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {

  service = inject(ProjectsService);
  translate = inject(TranslationService);

  constructor(private scrollService: ScrollService) {}

  navigateWithOffset(targetId: string, offset: number = 100) {
    this.scrollService.navigateWithOffset(targetId, offset);
  }
}
