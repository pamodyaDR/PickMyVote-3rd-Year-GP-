import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  constructor(private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  goToCreateElection() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/createElection', id]);
  }

}
