import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor( private _http : HttpClient ) { }

  public getOwnerOrgList(username:any, password:any, ownerId:Number):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/api/v1/getOrgsOfOwner/"+ ownerId,{headers});
  }
}
