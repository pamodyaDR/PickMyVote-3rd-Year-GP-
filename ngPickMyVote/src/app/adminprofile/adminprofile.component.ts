import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../registration.service';
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

  user = new User;
  msg = '';
  userDetails: User = <User>{};
  message: any
  showMsg: boolean = false;
  maxDate: any;

  constructor(private _service: RegistrationService, private observer: BreakpointObserver, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    //check browser session for admin login
    if(!this.email){
      this._router.navigate(['/login'])
    }
    if(this.uRole!="ROLE_ADMIN"){
      this._router.navigate(['/login'])
    }

    this.futureDateDisable();

    this._service.getUserbyEmail(this.email,this.password,this.email).subscribe(
      res => {
        this.user =res;
        console.log(this.user);
      } 
    )
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

  updateFname() {
    let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

    resp.subscribe(
      res => {
        this.userDetails =res;
        console.log(this.userDetails);
        console.log(this.userDetails.f_name);
      }
    )

    resp.subscribe(
      data => {
      this.message = data;
      this.showMsg= true;
      //this._router.navigate(['/userprofile/', this.userDetails.id])
    },
    error => {
      console.log("Exception Occured");
      this.msg = "Error occured"
    }
    );
  }

}
