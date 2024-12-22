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
    if (typeof window !== 'undefined') {
      if (this.userService.userInLocalStorageExists()) {
        this.userService.setUserObservable(this.userService.retrieveSignedUpUserFromLocalStorage());
      };
    }
    
    

    this.userService.user$.subscribe(userValue => {
      this.userObserve = userValue;
    })

  }
}
