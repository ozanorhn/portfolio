import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { AboutMeSectionComponent } from "./about-me-section/about-me-section.component";
import { ProjectsSectionComponent } from "./projects-section/projects-section.component";
import { ContactMeSectionComponent } from "./contact-me-section/contact-me-section.component";
import { SkillsSectionComponent } from "../skills-section/skills-section.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, AboutMeSectionComponent, ProjectsSectionComponent, ContactMeSectionComponent, SkillsSectionComponent, HeroSectionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 800;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
