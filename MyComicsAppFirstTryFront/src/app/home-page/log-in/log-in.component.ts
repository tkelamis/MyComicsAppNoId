import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User } from '../../Shared/Models/User';
import { HttpResponse } from '@angular/common/http';
import { NavigationService } from '../../Services/navigation.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  userToLogIn: User = {};


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private navigationService: NavigationService) { }


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
          this.userService.storeUserLoggedIn(this.userToLogIn);
        }
        else if (response.status === 409) {
        }
      },
      error => {
        if (error.status === 409) {

        } else {
          console.error('Unexpected error:', error);
        }
      })
  }

  createUserFromForm(): User {
    return {
      email: this.myReactiveForm.value.Email,
      password: this.myReactiveForm.value.Password,
      role: "User"
    }
  }


  navigateToHome(): void {
    this.navigationService.navigateToHome();
  }
}
