import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router) {}

  navigateWithOffset(targetId: string, offset: number = 0) {
    this.router.navigate(['/'], { fragment: targetId }).then(() => {
      setTimeout(() => {  // Timeout, um sicherzustellen, dass das Element existiert
        const element = document.getElementById(targetId);
        if (element) {
          const offsetPosition = element.offsetTop - offset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }
  
}
