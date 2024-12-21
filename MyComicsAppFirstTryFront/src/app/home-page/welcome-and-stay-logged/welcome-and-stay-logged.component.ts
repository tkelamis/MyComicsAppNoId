import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../Shared/Models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { NavigationService } from '../../Services/navigation.service';

@Component({
  selector: 'app-welcome-and-stay-logged',
  templateUrl: './welcome-and-stay-logged.component.html',
  styleUrl: './welcome-and-stay-logged.component.css'
})
export class WelcomeAndStayLoggedComponent implements OnInit {
  userLoggedIn: string | null = '';
  userObserve: string = '';

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      if (!this.userService.userInLocalStorageExists()) {
        console.log("There is no logged in user registered in local storage ")
      }
      else {
        this.userLoggedIn = this.userService.retrieveSignedUpUserFromLocalStorage();
        if (this.userLoggedIn) {
          this.navigationService.addLoggedInUserToURL(this.userLoggedIn);
        }
        else {
          console.log("No value returned from the key in local storage")
        }
      }
    }
  }

  logOut() {
    this.navigationService.navigateToHome();
    this.userService.logOutUser();
  }

}
