import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Lock } from 'lucide-angular';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  order: 'left' | 'right' | 'center';
  liveUrl?: string;
  githubUrl?: string;
  confidential?: boolean;
  category?: 'ai' | 'open-source';
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  readonly lockIcon = Lock;
}
