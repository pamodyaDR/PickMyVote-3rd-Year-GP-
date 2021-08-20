import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  constructor(private observer: BreakpointObserver, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    //check browser session for admin login
    if(!this.email){
      this._router.navigate(['/login'])
    }
    if(this.uRole!="ROLE_ADMIN"){
      this._router.navigate(['/login'])
    }
    
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

}
