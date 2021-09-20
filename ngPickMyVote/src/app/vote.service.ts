import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvisVote } from './invis-vote';
import { Votes } from './votes';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _http : HttpClient) { }

  getElectionDetails(username:any,password:any,id:Number):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<Votes>("http://localhost:8080/vote/"+id,{headers});
  }

  getInvisVote(username:any,password:any,emkey_decrypted:any,elecid:any):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/vote/"+ emkey_decrypted + "/" + elecid, {headers});
  }

  addVote(username:any,password:any,emkey_decrypted:any,elecid:any,candidateid:any):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/vote/add/"+ emkey_decrypted + "/" + elecid + "/" + candidateid,{headers});
  }

  getInvisVoteByEmail(username:any,password:any):Observable<InvisVote[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<InvisVote[]>("http://localhost:8080/vote/getelections/"+username,{headers});
  }

  getTotalVoters(username:any,password:any,elecid:any):Observable<InvisVote[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<InvisVote[]>("http://localhost:8080/vote/getvoters/"+elecid,{headers});
  }
}
