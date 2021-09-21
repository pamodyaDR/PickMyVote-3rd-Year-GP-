import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { VoteService } from '../vote.service';
import { ElectionService } from '../election.service';
import { InvisVote } from '../invis-vote';
import { Election } from '../election';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
  password = sessionStorage.getItem('session_password');
  email = sessionStorage.getItem('session_username');

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  observer: any;
  invisvote : InvisVote[]=[];
  election : Election[] = [];
  elec_Status: Boolean;
  electionStatusMsg = '';
  cdate='';
  elecObj: Election = new Election();
  ongoing : Boolean;
  elecongoing :Election[] = [];
  elecclose :Election[] = [];
  elecsheduled : Election[] = [];

  constructor(public datepipe: DatePipe,private _router : Router, private _route: ActivatedRoute,private Vote_service : VoteService,private Election_service : ElectionService ) { }

  ngOnInit(): void {
    if(!this.email){
          this._router.navigate(['/login'])
        }

        this.Vote_service.getInvisVoteByEmail(this.email,this.password).subscribe(
          data => {
            this.invisvote = data;
            console.log(this.invisvote);
            // this.invisvote.forEach((el) => {
            //   console.log(el.elecID);
            // })
            let j =0;
            let k=0;
            let l=0;
            for(let i=0;i<this.invisvote.length;i++){
              console.log(this.invisvote[i].elecID);
              this.Election_service.getElectionById(this.email,this.password,this.invisvote[i].elecID).subscribe(
                data1 => {
                  this.election[i] = data1;

                  let currentDate = new Date();
                  let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
                  console.log(latest_date);
                  console.log(this.election[i].startdatetime);

                  console.log("Check Election dates");

                  if (latest_date) {
                    //this.cdate=latest_date;
                    if (latest_date < this.election[i].startdatetime) {
                      this.elecsheduled[j] = this.election[i];
                      j++;
                     
                    }
                    if (latest_date > this.election[i].enddatetime) {
                      this.elecclose[k] = this.election[i];
                      k++;
                     
                    }
                    if ((this.election[i].startdatetime < latest_date) && (latest_date < this.election[i].enddatetime)) {
                      this.elecongoing[l]=this.election[i];
                      l++;
                    }
                  }
    
                }
    
             // this._router.navigate(['/result', this.invisvote[i].elecID]);
              )
            }
          }
        )

        console.log("Sheduled");
        console.log( this.elecsheduled);
        console.log("END");
        console.log( this.elecclose);
        console.log("Ongoing");
        console.log( this.elecongoing);
  }

  goToCreateElection() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/createElection', id]);
  }

  viewResult(id:number) {
    
    this._router.navigate(['/userresult', id]);
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

  
  }


