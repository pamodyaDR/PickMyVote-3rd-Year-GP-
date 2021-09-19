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

  public getUserFromRemote(username:any,password:any,id : Number):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/getUser/"+ id,{headers});
  }

  login(username:string,password:string,user:User):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/getLoggedUser",user,{headers})
  }

  updateUser(username:string,password:string,user:User):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/updateUser",user,{headers})
  }

  verifyUserFromRemote(code:String):Observable<any>{
    
    return this._http.post<any>("http://localhost:8080/verify",code)
  }

  
  getUserbyEmail(username:any,password:any,email:any):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<any>("http://localhost:8080/getUserbyEmail/"+ email, {headers});
  }

  sendotp(username:any,password:any,user:User):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/sendotp",user,{headers})
  }

  changeUserPassword(username:string,password:string,user:User):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.post<any>("http://localhost:8080/changePassword",user,{headers})
  }
}
