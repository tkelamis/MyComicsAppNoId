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
  roles: string[] = [];
;

  myReactiveForm = this.formBuilder.group({
    Email: ['', [Validators.required]],
    Password: [''],
  })

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  registerUserToBackEnd(): void {

    const userToRegister = this.SetUserDataToSendFromForm();

    this.sendUserToBackEnd(userToRegister);
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

  SetUserDataToSendFromForm(): User {
    this.userToSend.email = this.myReactiveForm.value.Email;
    this.userToSend.password = this.myReactiveForm.value.Password;
    return this.userToSend;
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
