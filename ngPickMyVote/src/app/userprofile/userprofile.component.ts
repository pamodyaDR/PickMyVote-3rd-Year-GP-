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
import { VoteService } from '../vote.service';
import { InvisVote } from '../invis-vote';
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

  constructor(private UserElc_service: UserelectionService, private _router: Router, private _route: ActivatedRoute, private Election_service: ElectionService,private Organization_service: OrganizationService,private Vote_service: VoteService) { }

  organizations: OrgSubscribedUser[] = [];
  elections: Election[][] = [];
  elections1: Election[] = [];
  oranizationname = '';
  notice = '';
  org: Organization[] = [];
  invisvote :InvisVote[]=[];
  election : Election[] = [];

  ngOnInit(): void {

    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }
    this.getElections();

    this.Vote_service.getInvisVoteByEmail(this.email,this.password).subscribe(
      data => {
        this.invisvote = data;
        console.log(this.invisvote);
        // this.invisvote.forEach((el) => {
        //   console.log(el.elecID);
        // })
        
        for(let i=0;i<this.invisvote.length;i++){
          console.log(this.invisvote[i].elecID);
          this.Election_service.getElectionById(this.email,this.password,this.invisvote[i].elecID).subscribe(
            data1 => {
              this.election[i] = data1;

            }

         // this._router.navigate(['/result', this.invisvote[i].elecID]);
          )
        }
      }
    )

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

  viewResult(id:number) {
    
    this._router.navigate(['/result', id]);
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
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
        
      }
    );
  }



}
