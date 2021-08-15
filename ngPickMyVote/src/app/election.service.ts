import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Election } from './election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  // baseURL: string ="http://localhost:8080/api/v1/employees";
  constructor(private httpclient: HttpClient) { }

   getVotepage2(): Observable<Election[]>{
     return this.httpclient.get<Election[]>('${this.baseURL}');
   }

  login(username:string,password:string,election:Election):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpclient.get<Election>("http://localhost:8080//vote/{elec_id}",{headers});
  }

}
