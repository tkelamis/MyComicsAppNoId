import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../Shared/Models/User';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationService } from '../Services/navigation.service';



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
      this.navigationService.addLoggedInUserFromStorageIfExistsToURL();

      if (this.navigationService.loggedInUserToURLExistsNoPipes()) {
        this.userToLogIn.email = this.userService.retrieveSignedUpUserFromLocalStorage();
        this.navigationService.navigateToLoggedInScreen(this.userToLogIn.email)
      }


      /*this.navigationService.loggedInUserToURLExists().subscribe(flag => {
        if (flag) {
          this.userToLogIn.email = this.userService.retrieveSignedUpUserFromLocalStorage();
          this.navigationService.navigateToLoggedInScreen(this.userToLogIn.email)
        }
        else {
        }
      })*/
    }
  }

  navigateToSignUpForm(): void {
    this.navigationService.navigateToSignUpForm();
    
  }

  navigateToLogInForm(): void {
    this.navigationService.navigateToLogInForm();
  }
}
