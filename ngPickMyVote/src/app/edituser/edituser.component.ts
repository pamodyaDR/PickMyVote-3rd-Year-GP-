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
  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  msg = '';
  userDetails: User = <User>{};
  message: any
  showMsg: boolean = false;

  constructor(private _service: RegistrationService, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    console.log(id);

    if(!this.email){
      this._router.navigate(['/login'])
    }
    
    this._service.getUserFromRemote(this.email,this.password,id).subscribe(
      res => {this.user =res;
      } 
    )
    
  }

  viewHome(){
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/userprofile', id]);
  }

  viewUser() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/edituser', id]);
  }

  viewElection() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/elections', id]);
  }

  viewOrganization() {
    const id = this._route.snapshot.params['id'];
    this._router.navigate(['/organization', id]);
  }

  updateFname() {
    let resp = this._service.updateUser(this.user.email, this.user.password, this.user);

    resp.subscribe(
      res => {
        this.userDetails =res;
        console.log(this.userDetails);
        console.log(this.userDetails.f_name);
        console.log(this.userDetails.verificationcode);
        this.message = res;
        this.showMsg= true;
      },

      error => {
        console.log("Exception Occured");
        this.msg = "Error occured"
      }
    );
  }

}
