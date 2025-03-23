import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-me-section',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './contact-me-section.component.html',
  styleUrl: './contact-me-section.component.scss'
})
export class ContactMeSectionComponent {
  translate = inject(TranslationService);
  http = inject(HttpClient);
  private el = inject(ElementRef); // <–– DOM Zugriff

  ngAfterViewInit(): void {
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

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  checkboxState = false;
  mailTest = false;

  post = {
    endPoint: 'https://ozan-orhan.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'text' as 'json'  
    },
  };
  

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.openPopup();
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log(this.contactData);
      this.openPopup();
      ngForm.resetForm();
    } else {
      this.setFormControlsTouched(ngForm);
    }
  }

  private setFormControlsTouched(ngForm: NgForm) {
    Object.keys(ngForm.controls).forEach(controlName => {
      ngForm.controls[controlName].markAsTouched();
    });
  }

  showPopup: boolean = false;
  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }
}

