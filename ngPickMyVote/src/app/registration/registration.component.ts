import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import { User } from '../user';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  step: any = 1;
  user = new User;
  msg = '';
  maxDate: any;

  hide = true;

  question1 = ['What was the make and model of your first car?',
              'What was the house number and street name you lived in as a child?',
              'What were the last four digits of your childhood telephone number?',
              'What is the last name of the teacher who gave you your first failing grade?',
              'What primary school did you attend?'];

  question2 = ['What was the name of your elementary / primary school?',
              'In what city or town does your nearest sibling live?',
              'What was the name of your first stuffed animal, doll, or action figure?',
              'What time of the day were you born? (hh:mm)',
              'What was your favorite place to visit as a child?'];

  roles = "ROLE_USER";

  constructor(private _service: RegistrationService, private _router : Router, private EncrDecr: EncrDecrServiceService) { }

  ngOnInit(): void {
    this.user.roles = "ROLE_USER";
    this.futureDateDisable();
  }

  futureDateDisable() {
    var date: any = new Date(); 
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if(todayDate < 10) {
      todayDate = "0" + todayDate;
    }

    if(month < 10) {
      month = "0" + month;
    }

    this.maxDate = year + "-" + month + "-" + todayDate;
    
    console.log(this.maxDate);
  }

  registerUser() {

    

    this.step = this.step +1;
    console.log("Next");
    console.log(this.step);
    
    if(this.step == 4){

      var enc_pass = this.EncrDecr.hash(this.user.password);
    this.user.password = enc_pass;

    console.log(this.user.password);
      this._service.registerUserFromRemote(this.user).subscribe(
        data => {
          console.log("Response receive");
          this._router.navigate(['/login'])
        },

        error => {
          console.log("Exception Occured");
          this.msg = "Something went wrong! Please try again.";
          
        }
      )
    }
  }

  previous(){
    this.step = this.step -1;
    console.log("Previous");
    console.log(this.step);
  }

  // next(){
  //   this.step = this.step +1;
  // }

}
