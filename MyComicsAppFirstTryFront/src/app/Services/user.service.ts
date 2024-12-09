import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Shared/Models/User';
import { Observable } from 'rxjs/internal/Observable';
import { DecodedToken } from '../Shared/Models/Decoded_Token';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetUrl = 'https://localhost:7206/api/User';
  user?: User;

  constructor(private httpService: HttpClient) { }

  postUserDataToBackEnd(user: User): Observable<HttpResponse<any>> {
    return this.httpService.post<User>(this.apiGetUrl, user, { observe: 'response' });
  }
}
