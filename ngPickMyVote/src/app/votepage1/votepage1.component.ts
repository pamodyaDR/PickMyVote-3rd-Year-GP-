import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votepage1',
  templateUrl: './votepage1.component.html',
  styleUrls: ['./votepage1.component.css']
})
export class Votepage1Component implements OnInit {

  electionID: Number;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  nextStep(){
    console.log(this.electionID);
    this._router.navigate(['/votepage2',this.electionID]);
  }

}
