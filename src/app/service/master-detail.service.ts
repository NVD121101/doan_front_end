import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constans';
import { editMasterdetail } from '../model/editMasterDetailRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class MasterDetailService {

  constructor(private httpClient: HttpClient) { }

  public getMasterDetailByStatusDepartment(status: any){
    const url = AppConstants.BASE_URL_API + `/masterdetail/by-department?status=${status}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getAllMasterDetail(){
    const url = AppConstants.BASE_URL_API + `/masterdetail`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getMasterDetailSuccess(){
    const url = AppConstants.BASE_URL_API + `/masterdetail/successful-defense`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterDetailNoSuccess(){
    const url = AppConstants.BASE_URL_API + `/masterdetail/sv<5`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterDetailSuccessByMaster(idMater: number){
    const url = AppConstants.BASE_URL_API + `/masterdetail/successful-defense/${idMater}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterDetailNoSuccessByMaster(idMater: number){
    const url = AppConstants.BASE_URL_API + `/masterdetail/sv<5/${idMater}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterDetailByGvhd(id: number, masterId: number){
    const url = AppConstants.BASE_URL_API + `/masterdetail/gvhd/${id}/${masterId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getMasterDetailByGvpb(id: number, masterId: number){
    const url = AppConstants.BASE_URL_API + `/masterdetail/gvpb/${id}/${masterId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public getSuccessfulDefenseStudents(){
    const url = AppConstants.BASE_URL_API + `/masterdetail/successful-defense`;
    return this.httpClient.get<any>(url, httpOptions);
  }
  public getAllMasterDetailByCoucil(coucilId: number){
    const url = AppConstants.BASE_URL_API + `/masterdetail/by-coucil/${coucilId}`;
    return this.httpClient.get<any>(url, httpOptions);
  }

  public editMasterDetail(data: editMasterdetail){
    const url =AppConstants.BASE_URL_API + '/masterdetail/edit-by-department';
    return this.httpClient.put<any>(url, data, httpOptions);
  }
}
