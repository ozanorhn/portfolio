import { Component, inject } from '@angular/core';
import { SingleProjectComponent } from './single-project/single-project.component';
import { ProjectPopUpComponent } from './project-pop-up/project-pop-up.component';
import { ProjectsService } from '../services/projects.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';

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

  selectedProject: any = null;
  popupVisible: boolean = false;

  openProject(index: number) {
    this.selectedProject = this.service.projects[index];
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
    this.selectedProject = null;
}

}

