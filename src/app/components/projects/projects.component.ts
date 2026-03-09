import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent, Project } from '../project-card/project-card.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 'ai-visibility',
      title: 'AI Visibility Dashboard',
      description:
        'Dashboard zur Analyse der Marken-Sichtbarkeit in AI-Systemen. Das System analysiert, welche Marken in Antworten von Large Language Models erwähnt werden. Mit umfangreicher Datenvisualisierung und Echtzeit-Analysen.',
      technologies: ['Angular', 'Supabase', 'APIs', 'Data Analysis', 'TypeScript'],
      order: 'right',
      githubUrl: 'https://github.com/ozanorhn/ai-visibility-dashboard',
    },
    {
      id: 'ai-seo-blog',
      title: 'AI SEO Blog Automation',
      description:
        'Automatisierter Workflow zur Erstellung von SEO optimierten Blogartikeln mit AI. Das System generiert hochwertige Inhalte mit automatischer Keyword-Optimierung und Content-Management.',
      technologies: ['AI Models', 'Automation', 'APIs', 'Angular', 'Firebase', 'Material Design'],
      order: 'left',
      githubUrl: 'https://github.com/ozanorhn/ai-seo-automation',
    },
    {
      id: 'meeting-summary',
      title: 'Meeting Summary Automation',
      description:
        'Automatisches System zur Erstellung von Meeting-Zusammenfassungen aus Transkripten. Nutzt NLP und AI, um wichtige Punkte zu extrahieren und strukturierte Zusammenfassungen zu erstellen.',
      technologies: ['AI Models', 'NLP', 'TypeScript', 'Automation', 'REST APIs'],
      order: 'center',
      githubUrl: 'https://github.com/ozanorhn/meeting-summary-ai',
    },
  ];
}
