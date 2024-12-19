import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

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

  addLoggedInUserFromStorageIfExistsToURL() {


    let userEmail: string | null = null;
    if (this.userService.userInLocalStorageExists()) {
      userEmail = this.userService.retrieveSignedUpUserFromLocalStorage();


      this.route.queryParams.subscribe(params => {
        this.router.navigate([], {
          queryParams: { user: userEmail },
          queryParamsHandling: 'merge', // Keeps existing query params
        });
      })
    }
  }

  loggedInUserToURLExists(): Observable<boolean> {
    return this.route.queryParams.pipe(
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
}



    /*this.route.queryParams.subscribe(existingUserEmail => {
      if (existingUserEmail['user'] !== userEmail) {
        this.router.navigate([], {
          queryParams: { user: userEmail },
          queryParamsHandling: 'merge', // Keeps existing query params
        });
      }
    })*/

  

  
