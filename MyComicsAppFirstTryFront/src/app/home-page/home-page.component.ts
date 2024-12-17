import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../Shared/Models/User';
import { UserService } from '../Services/user.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  userToLogIn: User = {};
  signUpLogInFlag: boolean = false;
  signUpFlag: boolean = false;
  logInFlag: boolean = false;
  afterSignUpOrLogInFlag: boolean = false;


  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required]],
    Password: [''],
    UserRole: [''],
    isAdminChecked: [false, Validators.required],
    isUserChecked: [false, Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // The (typeof window !== 'undefined') is added to ensure that the localStorage that is being used only in the browser environment, not on the server.
    if (typeof window !== 'undefined') {
      var storedFlag = localStorage.getItem('afterSignUpOrLogInFlag');
      if (storedFlag == 'true') {
        this.afterSignUpOrLogInFlag = true;
      }
    }
  }

  signUpUser(): void {
    this.userToLogIn = this.createUserFromForm();

    this.sendUserToBackEnd(this.userToLogIn);

    if (this.userToLogIn.email) {
      this.storeUserLoggedIn(this.userToLogIn.email);
      this.userService.setUser(this.userToLogIn.email);
    }
  }

  sendUserToBackEnd(userToRegister: User): void {
    console.log(userToRegister);
    this.userService.postUserDataToBackEnd(userToRegister).subscribe(
      (response: HttpResponse<User>) =>
      {
        if (response.status === 200) {
          this.snackBarSuccesfull();
        }
      },
      error => {
        this.snackBarError();
      }
    )
  }

  afterSignUpOrLogIn() {
    this.afterSignUpOrLogInFlag = true;
    localStorage.setItem('afterSignUpOrLogInFlag', 'true');
  }

  storeUserLoggedIn(email: string): void {
    localStorage.setItem(email, JSON.stringify(this.userToLogIn));
  }

  storeafterSignUpOrLogInFlag(flag: string) {
    localStorage.setItem(flag, JSON.stringify(this.afterSignUpOrLogInFlag));
  }

  createUserFromForm(): User {
    return {
      email: this.myReactiveForm.value.Email,
      password: this.myReactiveForm.value.Password,
      role: "User"
    }
  }



  setSignUpLogInFLag(input: string): void {
    this.signUpLogInFlag = true;
    if (input === 'Sign Up') {
      this.signUpFlag = true;
    }
    if (input === 'Log In') {
      this.logInFlag = true;
    }
  }
  resetSingUpLoginFlag(): void {
    this.signUpLogInFlag = false;
    this.signUpFlag = false;
    this.logInFlag = false;
  }


  snackBarSuccesfull(): void {
    this.snackBar.open(`User sended successfully!`, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  snackBarError(): void {
    this.snackBar.open('Failed to send User.', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
