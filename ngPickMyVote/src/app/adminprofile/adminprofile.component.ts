import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { User } from '../user';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  ispswdchanged = 'Password Changed Successfully!';

  user = new User;
  user2 = new User;
  user3 = new User;
  msg = '';
  userDetails: User = <User>{};
  message: any
  showMsg: boolean = false;
  maxDate: any;

  isShown: boolean;
  isShown2: boolean;
  showMsgError: boolean;
  isShown3: boolean;

  showMsg2: boolean = false;

  errorOTPProfile: boolean;
  errorOTPPswd: boolean;

  otpcode = '';

  constructor(private _service: RegistrationService, private observer: BreakpointObserver, private EncrDecr: EncrDecrServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])
    }
    if (this.uRole != "ROLE_ADMIN") {
      this._router.navigate(['/login'])
    }

    this.futureDateDisable();

    this._service.getUserbyEmail(this.email, this.password, this.email).subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      }
    )

    this.isShown = false;
    this.isShown2 = false;
    this.isShown3 = false;
    this.showMsgError = false;
    this.errorOTPProfile = false;
    this.errorOTPPswd = false;
  }

  futureDateDisable() {
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if (todayDate < 10) {
      todayDate = "0" + todayDate;
    }

    if (month < 10) {
      month = "0" + month;
    }

    this.maxDate = year + "-" + month + "-" + todayDate;

    console.log(this.maxDate);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  sendOTP() {
    this.isShown = !this.isShown;

    this._service.sendotp(this.user.email, this.user.password, this.user).subscribe(
      res => {
        this.otpcode = res;
      }
    );
    console.log(this.otpcode);

    this._service.getUserbyEmail(this.email, this.password, this.email).subscribe(
      res => {
        this.user2 = res;
        console.log("this.user2");
        console.log(this.user2);
      }
    )
  }

  sendOTPToChangePswd() {

    var enc_pass_curr = this.EncrDecr.hash(this.user.currentpassword);
    
    console.log("this.user.password");
    console.log(this.user.password);
    console.log("this.user.currentpassword");
    console.log(enc_pass_curr);

    if(this.user.password != enc_pass_curr) {
      this.showMsgError = true;
      console.log("Invalid Current Password!");
    
    } else {
      this.isShown2 = !this.isShown2;
      this.showMsgError = false;
      
      this._service.sendotp(this.user.email, this.user.password, this.user).subscribe(
        res => {
          this.otpcode = res;
        }
      );
      console.log("Valid Current Password.");
      console.log(this.otpcode);
    }

    this._service.getUserbyEmail(this.email, this.password, this.email).subscribe(
      res => {
        this.user3 = res;
        console.log("this.user3");
        console.log(this.user3);
      }
    )

  }

  sendOTPToChangeEmail() {
    this.isShown3 = !this.isShown3;
  }

  updateFname() {

    if (this.user.enteredverificationcode != this.user2.otpcode) {
      this.errorOTPProfile = true;
      console.log("Invalid OTP code!");
      console.log("enteredverificationcode");
      console.log(this.user.enteredverificationcode);
      console.log("otpcode");
      console.log(this.user2.otpcode);

    } else {
      console.log("Correct OTP");
      this.errorOTPProfile = false;
      let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

      // resp.subscribe(
      //   res => {
      //     this.userDetails =res;
      //     console.log(this.userDetails);
      //     console.log(this.userDetails.f_name);
      //   }
      // )

      resp.subscribe(
        res => {
          this.userDetails = res;
          console.log(this.userDetails);
          console.log(this.userDetails.f_name);
          this.message = res;
          this.showMsg = true;
          this.errorOTPProfile = false;
          this.isShown = false;
          this.user.enteredverificationcode = '';
        },

        // data => {
        // this.message = data;
        // this.showMsg= true;
        // //this._router.navigate(['/userprofile/', this.userDetails.id])
        // },

        error => {
          console.log("Exception Occured");
          this.msg = "Error occured"
        }
      );
    }
  }

  changePassword() {

    if (this.user.enteredverificationcode != this.user3.otpcode) {
      this.errorOTPPswd = true;
      console.log("Invalid OTP code!");

    } else {
      console.log("Correct OTP");

      const pswd = this.user.password;
      this.user.password = this.EncrDecr.hash(this.user.newpassword);
      console.log(this.user.password);

      let resp = this._service.changeUserPassword(this.user.email, pswd, this.user);

      resp.subscribe(
        res => {
          this.userDetails = res;
          console.log(this.userDetails);
          console.log(this.userDetails.f_name);
          this.message = res;
          this.showMsg2 = true;
          this.errorOTPPswd = false;
          this.isShown2 = false;
          this.user.enteredverificationcode = '';
          sessionStorage.setItem('ispswdchanged', this.ispswdchanged);
          this._router.navigate(['/login']);
          
        },

        error => {
          console.log("Exception Occured");
          this.msg = "Error occured"
        }
      );
    }

  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  changeEmail() {

  }

}
