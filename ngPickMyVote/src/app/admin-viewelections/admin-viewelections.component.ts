import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Election } from '../election';
import { ElectionService } from '../election.service';
import { RegistrationService } from '../registration.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-admin-viewelections',
  templateUrl: './admin-viewelections.component.html',
  styleUrls: ['./admin-viewelections.component.css']
})
export class AdminViewelectionsComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  elections: Election[] = [];
  orgID:any[] = [];

  constructor(private observer: BreakpointObserver, private Reg_service: RegistrationService, private Election_service: ElectionService, private Organization_service: OrganizationService,  private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    //check browser session for admin login
    if(!this.email){
      this._router.navigate(['/login'])
    }
    if(this.uRole!="ROLE_ADMIN"){
      this._router.navigate(['/login'])
    }
    
    this.getElections();
    // this.getOrgName();
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

  private getElections(){
    this.Election_service.getElectionList(this.email,this.password).subscribe(
      res => {
        this.elections = res;
        // console.log(res[0].orgid);
        for(let i = 0; i <= this.elections.length; i++) {
          this.Organization_service.getOrganizationName(this.email,this.password, res[i].orgid).subscribe(
            name => {
              this.elections[i].orgname = name.name;
            }
          );
        }
      }
    );
  }

  // private getOrgName(){
  //   let id = 1;
  //   for(let i = 0; i <= this.elections.length; i++) {
  //     this.Organization_service.getOrganizationName(this.email,this.password, id).subscribe(
  //         name => {
  //           this.elections[i].orgname = name.name;
  //           console.log("111");
  //         }
  //       );
  //   }
  // }

}
