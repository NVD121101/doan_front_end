import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) { }
  
  public getSubject(){
    const url = AppConstants.BASE_URL_API + `/subject`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getNumStudents(id: number){
    const url = AppConstants.BASE_URL_API + `/subject/count-student/${id}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getNumStudentsSuccess(id: number){
    const url = AppConstants.BASE_URL_API + `/subject/count-student-success/${id}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getSubjectById(id: number){
    const url = AppConstants.BASE_URL_API + `/subject/${id}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public editSubject(data: any){
    const url = AppConstants.BASE_URL_API + `/subject`;
    return this.httpClient.put<any>(url, data, httpOptions);
  }
  public addtSubject(data: any){
    const url = AppConstants.BASE_URL_API + `/subject`;
    return this.httpClient.post<any>(url, data, httpOptions);
  }
}
