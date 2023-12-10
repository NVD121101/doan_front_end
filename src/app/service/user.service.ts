import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  public addUser(data: any){
    const url =AppConstants.BASE_URL_API + '/user/register';
    return this.httpClient.post<any>(url, data, httpOptions);
  }

  public editUser(data: any){
    const url = AppConstants.BASE_URL_API + `/user`;
    return this.httpClient.put<any>(url, data, httpOptions);
  }

  public getUserById(id: number){
    const url = AppConstants.BASE_URL_API + `/user/${id}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
}
