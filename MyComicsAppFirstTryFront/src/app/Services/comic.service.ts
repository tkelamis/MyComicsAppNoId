import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../Shared/Models/Comic';
import { HttpClient, HttpResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private apiGetUrl = 'https://localhost:7206/api/Comic';
  //private apiGetUrl = 'http://localhost:5131/api/Comic';

  constructor(private httpService: HttpClient) { }

  getComics(): Observable<Comic[]> {
    return this.httpService.get<Comic[]>(this.apiGetUrl);
  }

  getComicById(Id:string): Observable<Comic> {
    return this.httpService.get<Comic>(`${this.apiGetUrl}/${Id}`);
  }

  postComicToBackEnd(comic: Comic): Observable<HttpResponse<any>> {
    return this.httpService.post<Comic>(this.apiGetUrl, comic, { observe: 'response' });
  }

  deleteComicFromDatabase(Id: string):Observable<any> {
    return this.httpService.delete(`${this.apiGetUrl}/${Id}`);
  }

  addComicToUserCollection(comic: Comic): Observable<Comic> {
    return this.httpService.post<Comic>(`${this.apiGetUrl}/add-to-collection`, comic);
  }


}
