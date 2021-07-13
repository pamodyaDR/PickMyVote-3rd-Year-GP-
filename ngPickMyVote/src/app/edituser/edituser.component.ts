import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  user = new User;

  constructor(private _service: RegistrationService, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    console.log(id);
    this._service.getUserFromRemote(id).subscribe(
      res => {this.user =res;
      } 
    )
    
  }

}
