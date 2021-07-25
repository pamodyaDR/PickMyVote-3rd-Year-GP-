import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor( private _http : HttpClient) { }

  public loginUserFromRemote(user : User):Observable<any> {
    return this._http.post<any>("http://localhost:8080/login", user);
  }

  public registerUserFromRemote(user : User):Observable<any> {
    return this._http.post<any>("http://localhost:8080/registerUser", user);
  }

  public getUserFromRemote(id : Number):Observable<any>{
    return this._http.get<any>("http://localhost:8080/getUser/"+ id);
  }

  public TestMethod() {
    return this._http.post<any>("http://localhost:8080/greetings",{ headers: { authorization: 'Basic ' + window.btoa("user:4e05a215-4b0b-4362-afc2-ffabe7d6a397") } });
  }

  login(username:string,password:string){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get("http://localhost:8080/greetings",{headers,responseType: 'text' as 'json'})
  }

}
