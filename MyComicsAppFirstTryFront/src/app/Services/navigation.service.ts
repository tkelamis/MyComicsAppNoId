import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }



  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToSignUpForm(): void {
    this.router.navigate(['/home', 'signup']);
  }

  navigateToLogInForm(): void {
    this.router.navigate(['/home', 'login']);
  }
}
