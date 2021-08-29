import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Election } from './election';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor( private _http : HttpClient ) { }

  public getOwnerOrgList(username:any, password:any, ownerId:Number):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/api/v1/getOrgsOfOwner/"+ ownerId,{headers});
  }

  getElectionList(username:any,password:any):Observable<Election[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<Election[]>("http://localhost:8080/getElections/",{headers})
  }

  createNewOrganization(username:string,password:string,organization:Organization):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/api/v1/createOrganization",organization,{headers})
  }

  createNewElection(username:string,password:string,election:Election):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/api/v1/createElection",election,{headers})
  }

  getelections(username:any,password:any,orgid:number):Observable<Election[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<Election[]>("http://localhost:8080/userelection/"+orgid,{headers})
  }

}
