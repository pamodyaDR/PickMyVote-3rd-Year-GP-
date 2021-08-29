import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserelectionService } from '../services/userelection.service';
import { OrgSubscribedUser } from '../org-subscribed-user';
import { Election } from '../election';
import { ElectionService } from '../election.service';
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

  constructor(private UserElc_service: UserelectionService, private _router: Router, private _route: ActivatedRoute, private Election_service: ElectionService) { }

  organizations: OrgSubscribedUser[] = [];
  elections: Election[] = [];

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
        //   for(let i = 0; i <= this.organizations.length; i++) {
        //     this.Election_service.getelections(this.email,this.password, res[i].orgid).subscribe(
        //       res2 => {
        //         this.elections[i].id = res2.id;
        //       }
        //     );
        //   }
      }
    );
  }

}
