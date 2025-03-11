import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule, HeaderComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'] 
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    private translate: TranslationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      setTimeout(() => {
        if (!fragment || fragment === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50); // Kleiner Delay, um sicherzustellen, dass die Seite geladen ist
    });
  }
  
}
