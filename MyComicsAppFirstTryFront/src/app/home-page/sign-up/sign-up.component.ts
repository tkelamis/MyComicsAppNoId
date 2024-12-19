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
  SuccessfullLoginSignUp: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private responseHandlerService: ResponseHandlerService
  ) { }


  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required]],
    Password: [''],
    UserRole: [''],
    isAdminChecked: [false, Validators.required],
    isUserChecked: [false, Validators.required]
  })


  signUpUser(): void {
    this.userToLogIn = this.createUserFromForm();

    this.sendUserToBackEnd(this.userToLogIn);

    

  }

  sendUserToBackEnd(userToRegister: User): void {
    this.userService.postUserDataToBackEnd(userToRegister).subscribe(
      (response: HttpResponse<User>) => {
        if (response.status === 200) {
          if (this.userToLogIn.email) {
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

  createUserFromForm(): User {
    return {
      email: this.myReactiveForm.value.Email,
      password: this.myReactiveForm.value.Password,
      role: "User"
    }
  }

  navigateToUserLoggedIn(user : string): void {
    this.navigationService.navigateToLoggedInScreen(user);
  }
}
