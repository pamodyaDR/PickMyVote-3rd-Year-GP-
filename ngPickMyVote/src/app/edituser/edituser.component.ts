import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

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

  user = new User;
  user2 = new User;
  msg = '';
  userDetails: User = <User>{};
  message: any
  showMsg: boolean = false;
  maxDate: any;

  isShown: boolean;

  otpcode ='';

  constructor(private _service: RegistrationService, private observer: BreakpointObserver, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    console.log(id);

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

    this._service.sendotp(this.user.email, this.user.password, this.user).subscribe(
      res=> {
        this.otpcode = res;
      }
    );
    console.log(this.otpcode);
  }

  viewHome(){
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
    this._router.navigate(['/organization', id]);
  }

  updateFname() {

    const id = this._route.snapshot.params['id'];

    this._service.getUserFromRemote(this.email,this.password,id).subscribe(
      res => {
        this.user2 = res;
        console.log(this.user2);
      } 
    )

    if(this.user.enteredverificationcode != this.user2.otpcode){
      this.msg = "Invalid OTP code!";
      console.log("Invalid OTP code!");
      
    }else {
      console.log("Correct OTP");
      let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

      resp.subscribe(
        res => {
          this.userDetails =res;
          console.log(this.userDetails);
          console.log(this.userDetails.f_name);
          this.message = res;
          this.showMsg= true;
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

}
