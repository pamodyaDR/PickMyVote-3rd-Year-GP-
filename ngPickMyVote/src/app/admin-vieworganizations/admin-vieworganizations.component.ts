import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { Organization } from '../organization';
import { RegistrationService } from '../registration.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-admin-vieworganizations',
  templateUrl: './admin-vieworganizations.component.html',
  styleUrls: ['./admin-vieworganizations.component.css']
})
export class AdminVieworganizationsComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  organizations: Organization[] = [];
  orgID:any[] = [];

  constructor(private observer: BreakpointObserver, private Reg_service: RegistrationService, private Organization_service: OrganizationService,  private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    //check browser session for admin login
    if(!this.email){
      this._router.navigate(['/login'])
    }
    if(this.uRole!="ROLE_ADMIN"){
      this._router.navigate(['/login'])
    }

    this.getOrganizations();
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

  private getOrganizations(){
    this.Organization_service.getOrganizationList(this.email,this.password).subscribe(
      res => {
        this.organizations = res;
      }
    );
  }

}
