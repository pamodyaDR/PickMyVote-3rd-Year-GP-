import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgSubscribedUser } from '../org-subscribed-user';
import { Organization } from '../organization';
import { OrganizationService } from '../services/organization.service';
import { UserelectionService } from '../services/userelection.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  org: Organization[] = [];
  organizations: OrgSubscribedUser[] = [];
  message = '';
  isshown : Boolean;


  constructor(private Organization_service: OrganizationService, private UserElc_service: UserelectionService, private _route: ActivatedRoute, private _router: Router) { }


  ngOnInit(): void {

    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }
    this.isshown=false;
    this.getElections();
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
    this._router.navigate(['/organization', id]);
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  private getElections() {
    const id = this._route.snapshot.params['id'];


    this.Organization_service.getOrgByOwnerId(this.email, this.password, id).subscribe(
      res => {
        this.org = res;
        console.log(this.org);
        if(this.org.length==0){
          this.isshown=true;
          this.message ="You are not an owner of an Organization"
          console.log(this.message);
        }
      }
    );
  }

  viewElec(id:Number){
    
    this._router.navigate(['/orgelections', id]);
  }

}
