import { Component } from '@angular/core';
import { ComicService } from '../Services/comic.service';
import { Comic } from '../Shared/Models/Comic';
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

  userToSend: User = {};
  signUpFlag: boolean = false;
  logInFlag: boolean = false;

  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required]],
    Password: [''],
    UserRole: ['']
  })

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  sendUserToBackEnd(userToRegister: User): void {
    this.userService.postUserDataToBackEnd(userToRegister).subscribe(
      (response: HttpResponse<User>) => {
        if (response.status === 201) {
          this.snackBar.open(`User sended successfully!`, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        this.snackBar.open('Failed to send User.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  registerUserToBackEnd(): void {

    const userToRegister = this.SetUserDataToSendFromForm();

    this.sendUserToBackEnd(userToRegister);
  }

  SetUserDataToSendFromForm(): User {
    this.userToSend.email = this.myReactiveForm.value.Email;
    this.userToSend.password = this.myReactiveForm.value.Password;
    this.userToSend.role = this.myReactiveForm.value.UserRole;
    return this.userToSend;
  }



  setSignUp(): void {
    this.signUpFlag = true;
  }
  setLogIn(): void {
    this.logInFlag = true;
  }
  resetSingUpLoginFlag(): void {
    this.signUpFlag = false;
    this.logInFlag = false;
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

  
}
