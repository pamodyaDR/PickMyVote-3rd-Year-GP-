import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserelectionService } from '../services/userelection.service';
import { OrgSubscribedUser } from '../org-subscribed-user';
import { Election } from '../election';
import { ElectionService } from '../election.service';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  observer: any;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  constructor(private UserElc_service: UserelectionService, private _router: Router, private _route: ActivatedRoute, private Election_service: ElectionService,private Organization_service: OrganizationService) { }

  organizations: OrgSubscribedUser[] = [];
  elections: Election[][] = [];
  elections1: Election[] = [];
  oranizationname = '';
  notice = '';
  org: Organization[] = [];

  ngOnInit(): void {

    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }
    this.getElections();

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

  }

  viewUser() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/edituser', id]);
  }

  viewElection() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/elections', id]);
  }

  private getElections() {
    const id = this._route.snapshot.params['id'];
    this.UserElc_service.getOrganizations(this.email, this.password, id).subscribe(
      res => {
        this.organizations = res;
        console.log("res");
        let k =0;
          for(let i = 0; i <= this.organizations.length; i++) {
            this.elections[i] = [];

            this.Organization_service.getOrganizationName(this.email,this.password, res[i].orgid).subscribe(
              name => {
                this.oranizationname = name.name;
                this.org[i] = name;
              }
            );

            this.UserElc_service.getelections(this.email, this.password, this.organizations[i].orgid).subscribe(
              res2=> {
                for(let j = 0; j <= res2.length ; j++) {
                  
                  this.elections[i][j] = res2[j];
                  console.log(this.elections[i][j]);
                  this.elections1[k] = this.elections[i][j];
                  this.elections1[k].orgname = this.oranizationname;
                  
                  k++;

                }
                
                k++;
              }
            )
          }
          //console.log("KKKKKKKKKKKKK");
          for(let i = 0; i <= this.elections1.length; i++) {
            console.log(this.elections1[i]);
          }
      }
    );
  }

}
