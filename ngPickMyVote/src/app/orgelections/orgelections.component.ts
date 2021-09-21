import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Election } from '../election';
import { ElectionService } from '../election.service';
import { RegistrationService } from '../registration.service';
import { OrganizationService } from '../services/organization.service';
import { UserelectionService } from '../services/userelection.service';
import { User } from '../user';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-orgelections',
  templateUrl: './orgelections.component.html',
  styleUrls: ['./orgelections.component.css']
})


export class OrgelectionsComponent implements OnInit {

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  orgelection : Election[];
  orgelecend : Array<Election> = [];
  user = new User;

  constructor(private Reg_service: RegistrationService,public datepipe: DatePipe,private UserElc_service: UserelectionService, private _router: Router, private _route: ActivatedRoute, private Election_service: ElectionService,private Organization_service: OrganizationService,private Vote_service: VoteService) { }

  ngOnInit(): void {
    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }

    this.getOrgElec();
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
  
  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  private getOrgElec() {
    const orgid = this._route.snapshot.params['id'];
    
    this.Election_service.getelections(this.email, this.password, orgid).subscribe(
      res => {
        this.orgelection = res;
        console.log(this.orgelection);

        let k=0;

        let currentDate = new Date();
        let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

        for(let i=0; i<this.orgelection.length; i++){

          if(latest_date){
            if (latest_date > this.orgelection[i].enddatetime) {
              // console.log(this.orgelection[0]);

              this.orgelecend[k] = this.orgelection[i];
              console.log(k);
              k++;

            }
          }
        }
        console.log("this.orgelecend");
        console.log(this.orgelecend);
      }
    );
  }

  viewOrgElecResult(id:number) {
    
    this._router.navigate(['/orgelecresult', id]);
  }
  
  userprofile(){
    this.Reg_service.getUserbyEmail(this.email,this.password,this.email).subscribe(
      res =>{
        this.user = res;
        console.log( this.user.id);
        this._router.navigate(['/organization',this.user.id ]);
      })
    
  }
}
