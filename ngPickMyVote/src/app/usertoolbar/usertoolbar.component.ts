import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertoolbar',
  templateUrl: './usertoolbar.component.html',
  styleUrls: ['./usertoolbar.component.css']
})
export class UsertoolbarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

}
