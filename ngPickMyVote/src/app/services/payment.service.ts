import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http : HttpClient) { }

  getPayment(username:any,password:any):Observable<Payment[]>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._http.get<Payment[]>("http://localhost:8080/getPayments/",{headers})
  }
}
