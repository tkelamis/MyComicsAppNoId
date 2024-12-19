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
  signedSuccessfullyAndContinue: boolean = false;
  userObserve: string = '';

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {

    /*if (typeof window !== 'undefined') {
      this.navigationService.addLoggedInUserFromStorageIfExistsToURL();

      if (this.navigationService.loggedInUserToURLExists()) {
        this.userLoggedIn = this.userService.retrieveSignedUpUserFromLocalStorage();
        this.setsignedSuccessfullyAndContinue();
      }
      else {
        this.signedSuccessfullyAndContinue = false;
      }
    }*/
    /*getLoggedUserFromUrl(): string {
      var userName = '';
      this.route.queryParams.subscribe((userNameFromUrl) => {
        userName = userNameFromUrl['user']
      });
      return userName;
    }*/
    if (typeof window !== 'undefined') {
      if (this.navigationService.loggedInUserToURLExists()) {
        if (this.userService.userInLocalStorageExists()) {
          this.userLoggedIn = this.userService.retrieveSignedUpUserFromLocalStorage();
        }
      }
    }
    
  }

  setsignedSuccessfullyAndContinue() {
    this.signedSuccessfullyAndContinue = true;
  }
}
