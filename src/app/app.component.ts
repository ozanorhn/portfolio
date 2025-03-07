import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,HeaderComponent, HeroSectionComponent, AboutMeSectionComponent, SkillsSectionComponent, ProjectsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
