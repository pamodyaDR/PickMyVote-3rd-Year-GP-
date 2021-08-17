import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  
  constructor( private _http : HttpClient) { }

  public getOrganizationName(username:any,password:any,id : Number):Observable<Organization>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<Organization>("http://localhost:8080/getOrganizationName/"+ id,{headers})
  }
}
