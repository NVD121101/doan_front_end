import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class CoucilService {
  constructor(private httpClient: HttpClient) { }
  public getCoucilByStatus(subjectId: any, status: any, schoolYear: string){
    const url = AppConstants.BASE_URL_API + `/coucil/by-department?subjectId=${subjectId}&status=${status}&schoolYear=${schoolYear}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public editCoucilByDepartment(data: any){
    const url =AppConstants.BASE_URL_API + '/coucil/edit-by-department';
    return this.httpClient.put<any>(url, data, httpOptions);
  }
  public findAllByUniqueSchoolYear(subjectId: number){
    const url = AppConstants.BASE_URL_API + `/coucil/get-school-year/${subjectId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
}
