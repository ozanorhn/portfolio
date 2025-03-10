import { Component, Input } from '@angular/core';
import { ProjectInterface } from '../../../interface/project.interface';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.scss',
})
export class SingleProjectComponent {
  @Input() project!: ProjectInterface;;
}
