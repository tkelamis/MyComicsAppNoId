import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Shared/Models/User';
import { Observable } from 'rxjs/internal/Observable';
import { DecodedToken } from '../Shared/Models/Decoded_Token';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetUrl = 'https://localhost:7206/api/User';
  private apiGetUrlForExisting = 'https://localhost:7206/api/existing';

  user?: User;
  userName: string = "";
  private userSubject = new BehaviorSubject<any>(null);
  private flagSubject = new BehaviorSubject<any>(null);

  
  constructor(private httpService: HttpClient) { }

  postUserDataToBackEnd(user: User): Observable<HttpResponse<any>> {
    return this.httpService.post<User>(this.apiGetUrl, user, { observe: 'response' });
  }

  postUserDataToBackEndToCheckExisting(user: User): Observable<HttpResponse<any>> {
    return this.httpService.post<User>(this.apiGetUrlForExisting, user, { observe: 'response' });
  }


  user$ = this.userSubject.asObservable();
  setUserObservable(user: any) {
    this.userSubject.next(user);
  }

  storeUserLoggedIn(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user.email));
  }

  logOutUser() {
    localStorage.removeItem('loggedUser');
    this.userSubject.next(null);
  }


  userInLocalStorageExists(): boolean {
    var retrieved = localStorage.getItem('loggedUser');
    if (retrieved) {
      return true;
    }
    else {
      return false;
    }
  }

  retrieveSignedUpUserFromLocalStorage() {
    var retrieved = localStorage.getItem('loggedUser');
    return retrieved;
    /*if (retrieved) {
      try {
        var userObject = JSON.parse(retrieved);
        return userObject.email;
      }
      catch (error) {
        console.error('Error parsing JSON from local storage:', error);
      }
    }
    else {
      console.log('No data found in local storage for key:', name)
    }*/
  }
}
