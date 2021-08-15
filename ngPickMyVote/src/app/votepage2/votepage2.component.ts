import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Election } from '../election';
import { ElectionService } from '../election.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votepage2',
  templateUrl: './votepage2.component.html',
  styleUrls: ['./votepage2.component.css']
})
export class Votepage2Component implements OnInit {
  election = new Election;
  elections: Election[];
  // id:number;
  // title: String ;
  // start_date_time: String ;
  // end_date_time: String ;
  

  constructor(private electionService:ElectionService,private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getElection();
  }

  private getElection(){
    this.electionService.getVotepage2().subscribe((data: Election[]) =>{
      this.elections=data;
    })
  }
}
