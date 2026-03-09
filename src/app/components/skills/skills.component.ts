import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Skill {
  title: string;
  icon: string;
  technologies: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills: Skill[] = [
    {
      title: 'Frontend',
      icon: '⚙️',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'SCSS', 'JavaScript'],
    },
    {
      title: 'AI & Automation',
      icon: '🤖',
      technologies: ['AI Workflows', 'LLM Integrationen', 'Prompt Engineering', 'AI Agents'],
    },
    {
      title: 'Tools',
      icon: '🔧',
      technologies: ['n8n', 'Supabase', 'Docker', 'GitHub', 'APIs'],
    },
    {
      title: 'Architektur',
      icon: '🏗️',
      technologies: ['Scalable Apps', 'Design Patterns', 'Performance', 'Best Practices'],
    },
  ];
}
