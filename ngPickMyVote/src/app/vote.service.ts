// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Votes } from './votes';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpclient: HttpClient) { }
  getElectionDetails(username:any,password:any,votes:Votes):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpclient.get<Votes>("http://localhost:8080//vote/{elec_id}",{headers});
  }
}
