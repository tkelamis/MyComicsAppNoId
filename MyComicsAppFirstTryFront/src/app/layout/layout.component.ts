import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../Shared/Models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userLoggedIn: boolean = false;
  userName: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.userName = user;
    })
  }
}
