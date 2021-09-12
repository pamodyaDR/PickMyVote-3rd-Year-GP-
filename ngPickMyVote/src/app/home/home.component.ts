import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('session_uid')){

      if (sessionStorage.getItem('user_role') == "ROLE_USER") {
        this._router.navigate(['/userprofile/', sessionStorage.getItem('session_uid')])
      } else if(sessionStorage.getItem('user_role') == "ROLE_ADMIN") {
        this._router.navigate(['/admin']);
      }

    }
    

  }

}
