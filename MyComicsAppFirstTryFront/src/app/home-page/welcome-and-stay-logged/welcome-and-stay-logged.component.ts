import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../Shared/Models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { NavigationService } from '../../Services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome-and-stay-logged',
  templateUrl: './welcome-and-stay-logged.component.html',
  styleUrl: './welcome-and-stay-logged.component.css'
})
export class WelcomeAndStayLoggedComponent implements OnInit {
  userLoggedIn: string | null = '';
  userObserve: string = '';
  logOutButtonClicked: boolean = false;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar
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
    this.snackBar.open(`Successfully signed out`, "",
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  }

  stayLoggedIn() {
    this.navigationService.navigateToLoggedInScreen(this.userLoggedIn);
    console.log(this.userLoggedIn);
    this.logOutButtonClicked = false;
  }

  logOutClicked() {
    this.logOutButtonClicked = true;
    console.log("Imm here")
  }


}
