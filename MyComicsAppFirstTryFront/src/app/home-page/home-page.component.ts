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

  userLoggedIn: User = {};
  signUpLogInFlag: boolean = false;
  signUpFlag: boolean = false;
  logInFlag: boolean = false;
  @Output() userEmitter = new EventEmitter<string>();


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
    if (this.userLoggedIn.email){
      this.checkIfLoggedIn(this.userLoggedIn.email);
    }
  }

  signUpUser(): void {
    this.sendUserToBackEnd(this.createUserFromForm());

    this.userLoggedIn = this.createUserFromForm();
    if (this.userLoggedIn.email) {
      this.keepUserLoggedIn(this.userLoggedIn.email);
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

  keepUserLoggedIn(email: string): void {
    localStorage.setItem(email, JSON.stringify(this.userLoggedIn));
  }

  checkIfLoggedIn(email: string): void {
    localStorage.getItem(email);
    console.log(email);
  }

  /*logOut(): void {
    this.userService.logout();
    this.snackBar.open('You have been logged out.', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }*/

  /*getRolesFromToken(): void {
    this.roles = this.userService.getRolesFromToken();
    if (this.roles.length > 0) {
      console.log('User roles:', this.roles);
    }
  }*/

  /*loginUser(user: User): void {
    this.userService.postUserDataToBackEnd(user).subscribe(
      response => {
        if (response) {
          this.snackBar.open(`Welcome ${response.body.email}!`, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }*/
  /*setUserRole(): string {
    var adminCheck = this.onAdminCheckBoxChange();
    var userCheck = this.onUserCheckBoxChange();
    if (adminCheck) {
      return 'Admin';
    }
    if (userCheck) {
      return 'User';
    }
    else {
      return "";
    }
  }*/
}
