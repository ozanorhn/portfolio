import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface ContactMethod {
  label: string;
  value: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactMethods: ContactMethod[] = [
    {
      label: 'Email',
      value: 'contact@ozan-orhan.com',
      url: 'mailto:contact@ozan-orhan.com',
      icon: '✉️',
    },
    {
      label: 'LinkedIn',
      value: 'Ozan Orhan',
      url: 'https://www.linkedin.com/in/ozan-o-7014a22a3',
      icon: '💼',
    },
    {
      label: 'GitHub',
      value: '@ozanorhn',
      url: 'https://github.com/ozanorhn',
      icon: '🔗',
    },
  ];
}
