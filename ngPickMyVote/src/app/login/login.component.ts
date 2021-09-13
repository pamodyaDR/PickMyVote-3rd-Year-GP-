import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
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

  ischangedpsw : boolean = false;

  constructor(private _service: RegistrationService, private _router: Router, private EncrDecr: EncrDecrServiceService) { }

  ngOnInit(): void {

    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'password@123456');
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);

    // console.log('Encrypted :' + encrypted);
    // console.log('Encrypted :' + decrypted);

    // var enc = this.EncrDecr.hash('pass123');
    // console.log(this.EncrDecr.hash('pass123'));

    if(sessionStorage.getItem('ispswdchanged') == 'Password Changed Successfully!') {
      this.ischangedpsw = true;
    }


  }

  loginUser() {

    this._service.loginUserFromRemote(this.user).subscribe(
      res => {
        this.userDetails = res;
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


  doLogin() {

    var enc_pass = this.EncrDecr.hash(this.user.password);
    this.user.password = enc_pass;
    console.log(this.user.password);
    let resp = this._service.login(this.user.email, this.user.password, this.user);
    this.ischangedpsw = false;

    resp.subscribe(
      res => {
        this.userDetails = res;
        console.log(this.userDetails);
        console.log(this.userDetails.f_name);
        sessionStorage.setItem('session_uid', this.userDetails.id.toString());
        sessionStorage.setItem('session_username', this.userDetails.email);
        sessionStorage.setItem('session_password', this.userDetails.password);
        sessionStorage.setItem('user_role', this.userDetails.roles);

        if (sessionStorage.getItem('user_role') == "ROLE_USER") {
          this._router.navigate(['/userprofile/', this.userDetails.id])
        } else if (sessionStorage.getItem('user_role') == "ROLE_ADMIN") {
          this._router.navigate(['/admin']);
        }
      },
      error => {
            console.log("Exception Occured");
            this.user.password="";
            this.msg = "Bad credentials. Please enter the valid email and password."
          }

    )

    // resp.subscribe(
    //   data => {
    //     this.message = data;
    //     sessionStorage.setItem('session_username', this.userDetails.email);
    //     sessionStorage.setItem('session_password', this.userDetails.password);
    //     //console.log(sessionStorage.getItem('session_password'));
    //     sessionStorage.setItem('user_role', this.userDetails.roles);

    //     if (sessionStorage.getItem('user_role') == "ROLE_USER") {
    //       this._router.navigate(['/userprofile/', this.userDetails.id])
    //     } else if(sessionStorage.getItem('user_role') == "ROLE_ADMIN") {
    //       this._router.navigate(['/admin']);
    //     }

    //   },

    //   error => {
    //     console.log("Exception Occured");
    //     this.msg = "Bad credentials. Please enter the valid email and password."
    //   }
    // );
  }

}
