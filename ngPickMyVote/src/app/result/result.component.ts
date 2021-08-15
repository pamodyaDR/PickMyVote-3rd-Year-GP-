import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate';
import { RegistrationService } from '../registration.service';
import { ResultService } from '../services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  //candidates = Candidate:[];
  List!: Array<Candidate>;

  votes:any[] = [];
  names:any[] = [];

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


  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]
  


  constructor(private Reg_service: RegistrationService, private Res_service: ResultService, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this._route.snapshot.params['elid'];
    //console.log(id);

    if(!this.email){
      this._router.navigate(['/login'])
    }
      
    this.Res_service.getResult(this.email,this.password,id).subscribe(
      res => {this.List =res;
        this.List.forEach((el) => this.votes.push(el.votes));
        this.List.forEach((el) => this.names.push(el.name))
      } 
    )

    

  }

}

