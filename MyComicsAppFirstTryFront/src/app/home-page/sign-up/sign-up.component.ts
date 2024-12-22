import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../Shared/Models/User';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationService } from '../../Services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseHandlerService } from '../../Services/response-handler.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userToLogIn: User = {};
  isDisabled: boolean = false;
  submittedForm: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService,
    private responseHandlerService: ResponseHandlerService
  ) { }


  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    UserRole: ['']
  })


  signUpUser(): void {
    const userFromForm = this.createUserFromForm();
    if (userFromForm) {
      this.userToLogIn = userFromForm;

      this.sendUserToBackEnd(this.userToLogIn);
    }
  }

  sendUserToBackEnd(userToRegister: User): void {
    this.userService.signUpUserToDb(userToRegister).subscribe(
      (response: HttpResponse<User>) => {
        if (response.status === 200) {
          if (this.userToLogIn.email) {
            this.isDisabled = true;
            this.userService.storeUserLoggedIn(this.userToLogIn);
            this.userService.setUserObservable(this.userService.retrieveSignedUpUserFromLocalStorage());
            this.responseHandlerService.handleSuccessForUserSignedUp(response, this.navigateToUserLoggedIn.bind(this, this.userToLogIn.email));
          }
        }
      },
      error => {
          this.responseHandlerService.handleErrorForUserSignedUp(error);
      }
    )
  }

  createUserFromForm(): User | null {
    if (this.myReactiveForm.invalid) {
      console.log("Form submitted:", this.myReactiveForm.value);
      this.submittedForm = true;
      return null;
    }
    else {
      return {
        email: this.myReactiveForm.value.Email,
        password: this.myReactiveForm.value.Password,
        role: "User"
      }
    }
  }

  navigateToUserLoggedIn(user : string): void {
    this.navigationService.navigateToLoggedInScreen(user);
  }
}
