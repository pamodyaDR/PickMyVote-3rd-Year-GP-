// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-votepage2',
//   templateUrl: './votepage2.component.html',
//   styleUrls: ['./votepage2.component.css']
// })
// export class Votepage2Component implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Votes } from '../votes';
import { VoteService } from '../vote.service';
import { Election } from '../election';

@Component({
  selector: 'app-votepage2',
  templateUrl: './votepage2.component.html',
  styleUrls: ['./votepage2.component.css']
})
export class Votepage2Component implements OnInit {
  votes = new Votes;
  // voteService: any;
  // id:number;
  // title: String ;
  // start_date_time: String ;
  // end_date_time: String ;
  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  msg = '';
  electionData = new Election;
  message: any
  showMsg: boolean = false;

  constructor(private voteService: VoteService, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  
    const id = this._route.snapshot.params['id'];
    console.log(id);

    if(!this.email){
      this._router.navigate(['/login'])
    }


    this.voteService.getElectionDetails(this.email,this.password,id).subscribe(
      res => {
        this.electionData =res;
        console.log(this.electionData);
      } 
    )
  }

  // private getVotes(){
  //   this.voteService.getVotepage2().subscribe((data: Votes[]) =>{
  //     this.vote=data;
  //   })
  // }
}



