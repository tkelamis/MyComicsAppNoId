import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../Shared/Models/User';
import { HttpResponse } from '@angular/common/http';
import { NavigationService } from '../../Services/navigation.service';
import { ResponseHandlerService } from '../../Services/response-handler.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  userToLogIn: User = {};
  SuccessfullLoginSignUp: boolean = false;
  isDisabled: boolean = false;
  submittedForm: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService,
    private responseHandlerService: ResponseHandlerService) { }


  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    UserRole: [''],
    isAdminChecked: [false, Validators.required],
    isUserChecked: [false, Validators.required]
  })

  logInUser(): void {
    const userFromForm = this.createUserFromForm();
    if (userFromForm) {
      this.userToLogIn = userFromForm;
      
      this.sendUserToBackEnd(this.userToLogIn);
    }
  }

  sendUserToBackEnd(user: User): void {
    this.userService.logInUserToDb(user).subscribe(
      (response: HttpResponse<User>) => {
        if (response.status === 200) {
          const user = response.body;
          if (user && user.email) {
            this.isDisabled = true;
            this.userService.storeUserLoggedIn(user);
            this.userService.setUserObservable(this.userService.retrieveSignedUpUserFromLocalStorage());
            this.responseHandlerService.handleSuccessForUserLogIn(response, this.navigateToUserLoggedIn.bind(this, user.email));
          }
        }
      },
      error => {
        this.responseHandlerService.handleErrorForUserLogIn(error);
      })
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

  navigateToUserLoggedIn(user: string): void {
    this.navigationService.navigateToLoggedInScreen(user);
  }
}
