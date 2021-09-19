import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InvisVote } from '../invis-vote';
import { VoteService } from '../vote.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { ElectionService } from '../election.service';
import { Election } from '../election';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';
import { Candidate } from '../candidate';
import { Positions } from '../positions';

@Component({
  selector: 'app-votepage1',
  templateUrl: './votepage1.component.html',
  styleUrls: ['./votepage1.component.css']
})

export class Votepage1Component implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  electionID: Number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  invisVote: InvisVote = new InvisVote();

  errormsg = '';
  msg = '';
  showerrormsg: Boolean;
  showmsg: Boolean;

  elecObj: Election = new Election();
  orgObj: Organization = new Organization();
  candidateObj: Candidate[];
  tmpcandidateObj: Candidate[];
  positions: Array<Positions>=[];
  

  access:Boolean;

  election: Boolean;

  constructor(private vote_service: VoteService, private elec_service: ElectionService, private org_service: OrganizationService, private _formBuilder: FormBuilder, private EncrDecr: EncrDecrServiceService, private observer: BreakpointObserver, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }

    this.showerrormsg = false;
    this.showmsg = false;
    this.access = false;
    this.election = false;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl2: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

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

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  authentication() {

    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'malminavindi98@gmail.com');
    // console.log(encrypted);
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    // console.log(decrypted);
    var emkeyDecrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.invisVote.private_key);
    // console.log(emkeyDecrypted);
    
    if(emkeyDecrypted != this.email) {
      this.showerrormsg = true;
      this.errormsg = "Invalid Private Key"
      console.log("Invalid Private KEy");

    }else {
      this.showerrormsg = false;
      console.log("Valid Private Key");
      console.log(emkeyDecrypted);

      this.vote_service.getInvisVote(this.email, this.password, emkeyDecrypted, this.invisVote.elecid).subscribe(
        data => {
          console.log(data);

          if(data){
            this.showmsg = true;
            this.msg = "Authentication Successful! Access Granted. Click Next to continue."
            this.access = true;
            console.log("Authentication Successful! Access Granted.");

            this.elec_service.getElectionById(this.email, this.password, this.invisVote.elecid).subscribe(
              res => {
                this.elecObj = res;
                if(this.elecObj) {
                  this.election = true;
                  console.log(this.elecObj);
                  this.org_service.getOrganizationName(this.email, this.password, this.elecObj.orgid).subscribe(
                    resorg => {
                      this.orgObj = resorg;
                      console.log(this.orgObj);
                    }
                  );

                  this.elec_service.getcandidatesByEId(this.email, this.password, this.invisVote.elecid).subscribe(
                    resc => {
                      this.candidateObj = resc;
                      this.tmpcandidateObj = resc;
                      console.log(this.candidateObj);

                      let pos = new Positions();
                      pos.name =this.candidateObj[0].position;
                      this.positions.push(pos);

                      for(let i=1; i<this.candidateObj.length; i++){

                        // if(!this.positions){
                        //   let pos = new Positions();
                        //     pos.name =this.candidateObj[0].position;
                        //     this.positions.push(pos);
                            
                        // }
                        
                        // this.positions.forEach((ele) =>{

                        //   if(this.candidateObj[i].position != ele.name) {
                        //     let pos = new Positions();
                        //     pos.name =this.candidateObj[i].position;
                        //     this.positions.push(pos);
                              
                        //   }
                        // }

                        // )
                      
                        for(let j=0; j<this.positions.length; j++) {
                          let pos = new Positions();
                          pos.name =this.candidateObj[i].position;
                          this.positions.push(pos);
                        }
                          
                          
                      }
                      
                      console.log(this.positions);
                      
                    }
                  );

                } else {
                  this.election = false;
                }  
              }
            );
                
          }else {
            this.showerrormsg = true;
            this.errormsg = "Access Denied!"
            console.log("Access Denied!");

          }
  
        },
  
        error => {
          this.showerrormsg = false;
          console.log("Exception Occured");
          this.errormsg = "Something went wrong! Please try again.";
          
        }
      )

    }
    
  }

  nextStep(){
    console.log(this.electionID);
    this._router.navigate(['/votepage2',this.electionID]);
  }

}
