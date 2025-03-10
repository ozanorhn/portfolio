import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ProjectInterface } from '../../../interface/project.interface';
import { ProjectsService } from '../../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-pop-up',
  standalone: true,
  templateUrl: './project-pop-up.component.html',
  styleUrls: ['./project-pop-up.component.scss'],
})
export class ProjectPopUpComponent {
  @Input() project!: ProjectInterface;
  @Output() close = new EventEmitter<void>();
  
  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslatedText();
    });
  }
  service = inject(ProjectsService);
  projectIndex: number = 0;

  ngOnInit() {
    this.updateTranslatedText(); 
    this.projectIndex = this.service.projects.findIndex(
      (p) => p === this.project
    );
  }

  closePopup() {
    this.close.emit();
  }

  nextProject() {
    const currentIndex = this.service.projects.findIndex(
      (p) => p === this.project
    );
    const nextIndex = (currentIndex + 1) % this.service.projects.length;
    this.project = this.service.projects[nextIndex];
    this.projectIndex = nextIndex;
    this.updateTranslatedText();
  }

  public translatedDescription: string = '';
  public translatedH3: string = '';
  public translatedH3eng: string = 'What is this project about?';
  public translatedH3de: string = 'Worum geht es in diesem Projekt?';

  private updateTranslatedText() {
    const currentLang = this.translate.currentLang; 
    this.translatedDescription = currentLang === 'de' ? this.project.description_de : this.project.description_en;
    this.translatedH3 = currentLang === 'de' ? this.translatedH3de : this.translatedH3eng;
  }
}
