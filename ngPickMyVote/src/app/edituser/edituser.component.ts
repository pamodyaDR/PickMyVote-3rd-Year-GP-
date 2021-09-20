import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');

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

  showMsg2: boolean = false;

  errorOTPProfile: boolean;
  errorOTPPswd: boolean;

  otpcode ='';

  constructor(private _service: RegistrationService, private observer: BreakpointObserver, private EncrDecr: EncrDecrServiceService,  private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    console.log(id);
    console.log(this.email);
    
    if(!this.email){
      this._router.navigate(['/login'])
    }

    this.futureDateDisable();

    this._service.getUserFromRemote(this.email,this.password,id).subscribe(
      res => {
        this.user =res;
      } 
    )

    this.isShown = false;
    this.isShown2 = false;
    this.showMsgError = false;
    this.errorOTPProfile = false;
    this.errorOTPPswd = false;
    
  }

  futureDateDisable() {
    var date: any = new Date(); 
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if(todayDate < 10) {
      todayDate = "0" + todayDate;
    }

    if(month < 10) {
      month = "0" + month;
    }

    this.maxDate = year + "-" + month + "-" + todayDate;
    
    console.log(this.maxDate);
  }

  viewHome() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/userprofile', id]);
  }

  viewUser() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/edituser', id]);
  }

  viewElection() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/elections', id]);
  }

  
  viewOrganization() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/organizations', id]);
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
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
    this.isShown = ! this.isShown;

    const id = this._route.snapshot.params['id'];

    this._service.sendotp(this.user.email, this.user.password, this.user).subscribe(
      res=> {
        this.otpcode = res;
      }
    );
    console.log(this.otpcode);

    this._service.getUserFromRemote(this.email,this.password,id).subscribe(
      res => {
        this.user2 = res;
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
        console.log(this.user3);
      }
    )

  }

  updateFname() {

    const id = this._route.snapshot.params['id'];

    if(this.user.enteredverificationcode != this.user2.otpcode){
      this.errorOTPProfile = true;
      console.log("Invalid OTP code!");
      
    }else {
      console.log("Correct OTP");
      this.errorOTPProfile = false;
      let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

      resp.subscribe(
        res => {
          this.userDetails =res;
          console.log(this.userDetails);
          console.log(this.userDetails.f_name);
          this.message = res;
          this.showMsg= true;
          this.errorOTPProfile = false;
          this.isShown = false;
          this.user.enteredverificationcode = '';
        },

        error => {
        console.log("Exception Occured");
        this.msg = "Error occured"
        }
      );
    }
  }
  
  // updateFname() {
  //   let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

  //   resp.subscribe(
  //     res => {
  //       this.userDetails =res;
  //       console.log(this.userDetails);
  //       console.log(this.userDetails.f_name);
  //       console.log(this.userDetails.verificationcode);
  //       this.message = res;
  //       this.showMsg= true;
  //     },

  //     error => {
  //       console.log("Exception Occured");
  //       this.msg = "Error occured"
  //     }
  //   );
  // }

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

}
