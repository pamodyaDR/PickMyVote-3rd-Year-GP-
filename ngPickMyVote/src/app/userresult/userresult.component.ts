import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate';
import { Election } from '../election';
import { ElectionService } from '../election.service';
import { InvisVote } from '../invis-vote';
import { Organization } from '../organization';
import { Positions } from '../positions';
import { RegistrationService } from '../registration.service';
import { OrganizationService } from '../services/organization.service';
import { ResultService } from '../services/result.service';
import { User } from '../user';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-userresult',
  templateUrl: './userresult.component.html',
  styleUrls: ['./userresult.component.css']
})
export class UserresultComponent implements OnInit {

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  //candidates = Candidate:[];
  List!: Array<Candidate>;
  valid_voters: number = 0;
  invited_voters!: Array<InvisVote>;
  votes:any[] = [];
  candidateObj: Candidate[];
  tmpcandidateObj: Candidate[];
  positions: Array<Positions>=[];
  elecObj: Election = new Election();
  orgObj: Organization = new Organization();
  names:any[] = [];
  user=new User

  pie_valid_voters:any[]= [];
  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  this.names;

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      data: this.votes
    }
  ];

  pie_labels = ["Valid Voters","Inactive Voters"];

  pie_chartData = [{data:this.pie_valid_voters}];
  

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(13, 11, 147,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(190, 14, 20, 0.8)'
    }
  ]

  pie_colors = [
    { // 1st Year.
      backgroundColor: ['rgba(13, 11, 147,0.2)','rgba(190, 14, 20,0.2)']
    }
  ]
  constructor(private vote_service: VoteService,private Reg_service: RegistrationService, private Res_service: ResultService, private _router : Router, private _route: ActivatedRoute,private elec_service: ElectionService, private org_service: OrganizationService) { }

  ngOnInit(): void {

    
    this.email = sessionStorage.getItem('session_username');
    this.password = sessionStorage.getItem('session_password');
    const id = this._route.snapshot.params['elecid'];
    console.log(sessionStorage.getItem('session_username'));

    if(!this.email){
     this._router.navigate(['/login'])
    }
      
    //get election data
    this.elec_service.getElectionById(this.email, this.password, id).subscribe(
      res => {
        this.elecObj = res;
        if(this.elecObj) {
          console.log(this.elecObj);

          //get organization data
          this.org_service.getOrganizationName(this.email, this.password, this.elecObj.orgid).subscribe(
            resorg => {
              this.orgObj = resorg;
              console.log(this.orgObj);
            }
          )

          //get total invited voters
          this.vote_service.getTotalVoters(this.email, this.password, id).subscribe(
            res => {
              this.invited_voters = res;
              //console.log(this.invited_voters.length);
              this.invited_voters.forEach((ele)=>{
                if(ele.count>0){
                  this.valid_voters=+1;
                }
                  
              })
              this.pie_valid_voters[0]=this.valid_voters;
              this.pie_valid_voters[1]=this.invited_voters.length;  
            }
          )

        }
      }
    )

    //get candidates data
    this.elec_service.getcandidatesByEId(this.email, this.password, id).subscribe(
      resc => {
        this.candidateObj = resc;
        this.tmpcandidateObj = resc;
        console.log(this.candidateObj);

        //group by positions
          //initial position
        let pos = new Positions();
        pos.name =this.candidateObj[0].position;
        this.positions.push(pos);
        console.log(this.positions);

          //group positions except 1st one
        for(let i=1; i<this.candidateObj.length; i++){
          var loop = true;
          this.positions.forEach((ele) =>{
            if(loop){
              if(this.candidateObj[i].position == ele.name) {
                // let pos = new Positions();
                // pos.name =this.candidateObj[i].position;
                // this.positions.push(pos);
                loop=false;
              }
            }
            
          }
          )
          if(loop){
            let pos = new Positions();
                pos.name =this.candidateObj[i].position;
                this.positions.push(pos);
          }
      
      }
      
      console.log(this.positions);
    }
    );

    this.Res_service.getResult(this.email,this.password,id).subscribe(
      res => {this.List =res;
        this.List.forEach((el) => this.votes.push(el.votes));
        this.List.forEach((el) => this.names.push(el.name))
      } 
    )

    

  }
  logout(){
    this.Reg_service.getUserbyEmail(this.email,this.password,this.email).subscribe(
      res =>{
        this.user = res;
        console.log( this.user.id);
        this._router.navigate(['/userprofile',this.user.id ]);
      })
    
  }

  userprofile(){
    this.Reg_service.getUserbyEmail(this.email,this.password,this.email).subscribe(
      res =>{
        this.user = res;
        console.log( this.user.id);
        this._router.navigate(['/elections',this.user.id ]);
      })
    
  }
}


