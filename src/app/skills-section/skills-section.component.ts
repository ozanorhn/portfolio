import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
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
export class SkillsSectionComponent implements AfterViewInit {

  service = inject(ProjectsService);
  translate = inject(TranslationService);
  private el = inject(ElementRef);

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    const elements = this.el.nativeElement.querySelectorAll('.slide-in-left, .slide-in-up');
    elements.forEach((el: HTMLElement) => observer.observe(el));
  }

  navigateWithOffset(targetId: string, offset: number = 100) {
    this.scrollService.navigateWithOffset(targetId, offset);
  }
}
