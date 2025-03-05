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

  public onToggleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const language = input.checked ? 'de' : 'en';
    this.translate.switchLanguage(language);
  }

  isMenuOpen = false;

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
  constructor(private scrollService: ScrollService) {}

  navigateWithOffset(targetId: string, offset: number = 100) {
    this.scrollService.navigateWithOffset(targetId, offset);
  }
}