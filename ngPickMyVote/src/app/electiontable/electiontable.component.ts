import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electiontable',
  templateUrl: './electiontable.component.html',
  styleUrls: ['./electiontable.component.css']
})
export class ElectiontableComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  viewResult(id:number){
    this._router.navigate(['/result/'+id]);
  }
}
