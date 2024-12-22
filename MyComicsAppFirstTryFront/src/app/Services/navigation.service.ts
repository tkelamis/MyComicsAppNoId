import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToSignUpForm(): void {
    this.router.navigate(['/home', 'signup']);
  }

  navigateToLogInForm(): void {
    this.router.navigate(['/home', 'login']);
  }

  navigateToLoggedInScreen(user: string | null): void {
    this.router.navigate(['/home', 'signup', 'loggedIn'], {
      queryParams: { user: user },
      queryParamsHandling: 'merge'
    });
  }

  addLoggedInUserToURL(userName: string) {
    this.router.navigate([], {
      queryParams: { user: userName },
      queryParamsHandling: 'merge'
    });
  }

  loggedInUserToURLExists(): Observable<boolean> {
    return this.route.queryParams.pipe(
      take(1),
      map(user => {
        if (user['user']) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  loggedInUserToURLExistsNoPipes(): boolean {
    let existingUserInURL = '';

    this.route.queryParams.subscribe(a => {
      existingUserInURL = a['user'];
    })

    if (existingUserInURL) {
      return true;
    }
    else {
      return false;
    }
  }

  navigateToAdminHome() {
    this.router.navigate(['admin']);
  }
}
