import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg = '';
  userDetails: User = <User>{};

  username!: string;
  password!: string;
  message: any

  constructor(private _service: RegistrationService, private _router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){

    this._service.loginUserFromRemote(this.user).subscribe(
      res => {
        this.userDetails =res;
        console.log(this.userDetails);
        console.log(this.userDetails.id);
      }
    )

    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("Response receive");
        this._router.navigate(['/userprofile', this.userDetails.id]);
      },

      error => {
        console.log("Exception Occured");
        this.msg = "Bad credentials. Please enter the valid email and password."
      }
    )
    
  }

  test(){
    this._service.TestMethod().subscribe(
      data => {
        console.log("Response receive");
      }
    )
  }

  doLogin() {
    let resp = this._service.login(this.username, this.password);
    resp.subscribe(data => {
      this.message = data;
     this._router.navigate(["/userprofile/1"])
    },
    error => {
      console.log("Exception Occured");
      this.msg = "Bad credentials. Please enter the valid email and password."
    }
    );
  }

}