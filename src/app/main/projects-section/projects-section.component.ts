import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { ProjectPopUpComponent } from './project-pop-up/project-pop-up.component';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, ProjectPopUpComponent, SingleProjectComponent, TranslateModule],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss'
})
export class ProjectsSectionComponent {
  translate = inject(TranslationService);
  service = inject(ProjectsService);
  private el = inject(ElementRef);

  selectedProject: any = null;
  popupVisible: boolean = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    const elements = this.el.nativeElement.querySelectorAll(
      '.slide-in-left, .slide-in-right, .slide-in-up'
    );
    elements.forEach((el: HTMLElement) => observer.observe(el));
  }

  openProject(index: number) {
    this.selectedProject = this.service.projects[index];
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
    this.selectedProject = null;
  }
}
