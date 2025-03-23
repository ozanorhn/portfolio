import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent implements AfterViewInit {
  translate = inject(TranslationService);
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    const elements = this.el.nativeElement.querySelectorAll('.slide-in-left, .slide-in-right');
    elements.forEach((el: HTMLElement) => observer.observe(el));
  }
}
