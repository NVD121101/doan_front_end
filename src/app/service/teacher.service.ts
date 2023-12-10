import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  public getAllTeacher(teacherName: String, offset: number, limit: number, subjectId: Number){
    const url = AppConstants.BASE_URL_API + `/teacher?teacherName=${teacherName}&offset=${offset}&limit=${limit}&subjectId=${subjectId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getTeacherById(id: number){
    const url = AppConstants.BASE_URL_API + `/teacher/${id}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public findTeachersHDWithStudents(subjectId: number){
    const url = AppConstants.BASE_URL_API + `/teacher/gvhd/${subjectId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public findTeachersPBWithStudents(subjectId: number){
    const url = AppConstants.BASE_URL_API + `/teacher/gvpb/${subjectId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public editTeacher(data: any){
    const url = AppConstants.BASE_URL_API + `/teacher`;
    return this.httpClient.put<any>(url, data, httpOptions);
  }

  public editNumStudents(data: any){
    const url = AppConstants.BASE_URL_API + `/teacher/edit-num-student`;
    return this.httpClient.put<any>(url, data, httpOptions);
  }

  public addTeacher(data: any){
    const url = AppConstants.BASE_URL_API + `/teacher`;
    return this.httpClient.post<any>(url, data, httpOptions);
  }
}
