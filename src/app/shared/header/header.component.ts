import {
  Component,
  inject,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  translate = inject(TranslationService);
  isMenuOpen = false;
  selectedLanguage: string = 'en';

  constructor(private scrollService: ScrollService) {
    this.loadLanguage(); // Sprache beim Laden der Komponente setzen
  }

  public onToggleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedLanguage = input.checked ? 'de' : 'en';
    this.translate.switchLanguage(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage); // Sprache im localStorage speichern
  }

  loadLanguage(): void {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.translate.switchLanguage(this.selectedLanguage);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Output() closeMenuEmitter = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  closeOnClickOutside(event: Event) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  closeMenu() {
    this.closeMenuEmitter.emit();
    this.isMenuOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  navigateWithOffset(targetId: string, offset: number = 100) {
    this.scrollService.navigateWithOffset(targetId, offset);
  }
}
