import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../Shared/Models/User';
import { UserService } from '../Services/user.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationService } from '../Services/navigation.service';
import { filter, take } from 'rxjs';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  existingUserInLocalStorage: any;
  userToLogIn: User = {};
  signUpLogInClickFlag: boolean = false;


  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required]],
    Password: [''],
    UserRole: [''],
    isAdminChecked: [false, Validators.required],
    isUserChecked: [false, Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.signUpLogInClickFlag = false;

    if (typeof window !== 'undefined') {

      if (!this.userService.userInLocalStorageExists()) {
        console.log("There is no logged in user registered in local storage ")
      }
      else {
        this.existingUserInLocalStorage = this.userService.retrieveSignedUpUserFromLocalStorage();
        if (this.existingUserInLocalStorage) {
          this.navigationService.addLoggedInUserToURL(this.existingUserInLocalStorage);
        }
        else {
          console.log("No value returned from the key in local storage")
        }
      }

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      ).subscribe(() => {
        this.navigationService.loggedInUserToURLExists().subscribe(userInUrlExists => {
          console.log('Does user exist in URL?', userInUrlExists);
          if (userInUrlExists) {
            this.userToLogIn.email = this.userService.retrieveSignedUpUserFromLocalStorage();
            console.log('User found in URL, email retrieved:', this.userToLogIn.email);
            this.navigationService.navigateToLoggedInScreen(this.userToLogIn.email);
          }
          else {
            console.error('User not found in URL');
          }
        })
        })
      }
  }
  navigateToSignUpForm(): void {
    this.navigationService.navigateToSignUpForm();

  }

  navigateToLogInForm(): void {
    this.navigationService.navigateToLogInForm();
  }
}
