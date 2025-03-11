import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'] // Korrektur hier (Plural)
})
export class ImprintComponent implements OnInit {
  constructor(
    private translate: TranslationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (!fragment || fragment === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
