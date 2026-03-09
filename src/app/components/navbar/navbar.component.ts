import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems = [
    { label: 'Startseite', id: 'home' },
    { label: 'Über mich', id: 'about' },
    { label: 'Projekte', id: 'projects' },
    { label: 'Kontakt', id: 'contact' },
  ];

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.updateScrollState();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    this.isScrolled = this.scrollService.getCurrentScroll() > 50;
  }

  scrollToSection(sectionId: string): void {
    this.isMobileMenuOpen = false;
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
