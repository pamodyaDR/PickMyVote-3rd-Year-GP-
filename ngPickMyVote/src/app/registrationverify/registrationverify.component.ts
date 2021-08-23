import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-registrationverify',
  templateUrl: './registrationverify.component.html',
  styleUrls: ['./registrationverify.component.css']
})
export class RegistrationverifyComponent implements OnInit {
  msg = '';
  user = new User();

  constructor(private _service: RegistrationService, private _router: Router,private route: ActivatedRoute) { }

 // code = '9BLUKOj3708BElyVN5gkE6knYJesYthR0Gx33N8F46KWk7FkgUob5pN6n4h05Ms8';
  ngOnInit(): void {

  //   this.msg = this.route.snapshot.url[2].path;
  //   console.log(this.msg);


  //   let resp = this._service.verifyUserFromRemote(this.code).subscribe(
  //     data => {
  //       console.log("Response receive");
  //     },
  

  //     error => {
  //       console.log("Exception Occured");
  //       this.msg = "Something went wrong! Please try again.";
        
  //     }
  //   )
  }

}
