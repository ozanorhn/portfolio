import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translate.service';
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule, HeaderComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  translate = inject(TranslationService);
}
