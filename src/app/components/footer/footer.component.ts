import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { LucideAngularModule, Heart } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  readonly heartIcon = Heart;

  constructor(private scrollService: ScrollService) {}

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
