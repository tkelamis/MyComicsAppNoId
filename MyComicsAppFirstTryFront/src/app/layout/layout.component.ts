import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userLoggedIn: string | null = "";
  userObserve: string = 'elanio';

  constructor(private userService: UserService) {}

  ngOnInit() {
    /*this.userService.user$.subscribe((user => this.userObserve = user));
    console.log(this.userObserve);
    console.log("Im in layout")*/

    /*if (typeof window !== 'undefined') {
      if (localStorage.getItem('loggedUser')) {
        this.userLoggedIn = localStorage.getItem('loggedUser');
        console.log(this.userLoggedIn);
      }
    }*/

  }
}
