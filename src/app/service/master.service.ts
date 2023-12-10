import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpClient: HttpClient) { }

  public getMasterBySubjectAndStatus(idSubject: any, status: any, schoolYear: string){
    const url = AppConstants.BASE_URL_API + `/master/by-department/${idSubject}?status=${status}&schoolYear=${schoolYear}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterBySubject(idSubject: number){
    const url = AppConstants.BASE_URL_API + `/master/by-subject/${idSubject}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public editMasterByDepartment(data: any){
    const url =AppConstants.BASE_URL_API + '/master/edit-by-department';
    return this.httpClient.put<any>(url, data, httpOptions);
  }

  public findAllByUniqueSchoolYear(subjectId: number){
    const url = AppConstants.BASE_URL_API + `/master/get-school-year/${subjectId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
}
