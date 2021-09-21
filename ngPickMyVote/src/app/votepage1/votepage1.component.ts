import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvisVote } from '../invis-vote';
import { VoteService } from '../vote.service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { ElectionService } from '../election.service';
import { Election } from '../election';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';
import { Candidate } from '../candidate';
import { Positions } from '../positions';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-votepage1',
  templateUrl: './votepage1.component.html',
  styleUrls: ['./votepage1.component.css']
})

export class Votepage1Component implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uRole = sessionStorage.getItem('user_role');

  electionID: Number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  invisVote: InvisVote = new InvisVote();

  errormsg = '';
  msg = '';
  submitmsg = '';
  sendotp = '';
  showotpmsg: Boolean;
  showerrormsg: Boolean;
  showmsg: Boolean;

  elecObj: Election = new Election();
  orgObj: Organization = new Organization();
  userObj: User = new User();
  userObj1: User = new User();
  user: User = new User();
  user2: User = new User();
  user3: User = new User();
  candidateObj: Candidate[];
  tmpcandidateObj: Candidate[];
  positions: Array<Positions> = [];

  access: Boolean;
  election: Boolean;
  isShown: boolean;

  otpcode = '';

  electionStatusMsg = '';
  elec_Status: Boolean;
  ongoing: Boolean;
  submitSuccess: Boolean;
  submitUnsuccess: Boolean;


  constructor(public datepipe: DatePipe, private vote_service: VoteService, private elec_service: ElectionService, private org_service: OrganizationService, private reg_service: RegistrationService, private _formBuilder: FormBuilder, private EncrDecr: EncrDecrServiceService, private observer: BreakpointObserver, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    //check browser session for admin login
    if (!this.email) {
      this._router.navigate(['/login'])

    }

    this.showerrormsg = false;
    this.showmsg = false;
    this.access = false;
    this.election = false;
    this.isShown = false;
    this.showotpmsg = false;
    this.elec_Status = false;
    this.ongoing = false;
    this.submitSuccess = false;
    this.submitUnsuccess = false;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl2: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      secondCtrl2: ['', Validators.required],
      secondCtrl3: ['', Validators.required]
    });

    this.reg_service.getUserbyEmail(this.email, this.password, this.email).subscribe(
      res => {
        this.user3 = res;
      }
    )

  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

  }

  viewHome() {
    this._router.navigate(['/userprofile', this.user3.id]);
  }

  viewUser() {
    this._router.navigate(['/edituser', this.user3.id]);
  }

  viewElection() {
    this._router.navigate(['/elections', this.user3.id]);
  }

  viewOrganization() {
    this._router.navigate(['/organization', this.user3.id]);
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  authentication() {

    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'malminavindi98@gmail.com');
    // console.log(encrypted);
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    // console.log(decrypted);
    var emkeyDecrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.invisVote.private_key);
    // console.log(emkeyDecrypted);

    if (emkeyDecrypted != this.email) {
      this.showerrormsg = true;
      this.errormsg = "Invalid Private Key"
      console.log("Invalid Private KEy");

    } else {
      this.showerrormsg = false;
      console.log("Valid Private Key");
      console.log(emkeyDecrypted);

      this.vote_service.getInvisVote(this.email, this.password, emkeyDecrypted, this.invisVote.elecID).subscribe(
        data => {
          console.log(data);

          if (data) {
            this.showmsg = true;
            this.msg = "Authentication Successful! Access Granted. Click Next to continue."
            this.access = true;
            console.log("Authentication Successful! Access Granted.");

            //get election data
            this.elec_service.getElectionById(this.email, this.password, this.invisVote.elecID).subscribe(
              res => {
                this.elecObj = res;
                if (this.elecObj) {
                  this.election = true;
                  console.log(this.elecObj);

                  console.log("Currebt date");
                  let currentDate = new Date();
                  let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
                  console.log(latest_date);
                  console.log(this.elecObj.startdatetime);

                  console.log("Check Election dates");

                  if (latest_date) {
                    if (latest_date < this.elecObj.startdatetime) {
                      this.elec_Status = true;
                      this.electionStatusMsg = "This election is still not started. This will be held on " + this.elecObj.startdatetime + " until " + this.elecObj.enddatetime
                      console.log(this.electionStatusMsg);
                    }
                    if (latest_date > this.elecObj.enddatetime) {
                      this.elec_Status = true;
                      this.electionStatusMsg = "This election was closed."
                      console.log(this.electionStatusMsg);
                    }
                    if ((this.elecObj.startdatetime < latest_date) && (latest_date < this.elecObj.enddatetime)) {
                      this.elec_Status = false;
                      this.ongoing = true;
                      console.log("ongoing");

                    }
                  }

                  if (this.ongoing) {

                    //get organization data
                    this.org_service.getOrganizationName(this.email, this.password, this.elecObj.orgid).subscribe(
                      resorg => {
                        this.orgObj = resorg;
                        console.log(this.orgObj);

                        //get candidates data
                        this.elec_service.getcandidatesByEId(this.email, this.password, this.invisVote.elecID).subscribe(
                          resc => {
                            this.candidateObj = resc;
                            this.tmpcandidateObj = resc;
                            console.log(this.candidateObj);

                            //group by positions
                            //initial position
                            let pos = new Positions();
                            pos.name = this.candidateObj[0].position;
                            this.positions.push(pos);
                            console.log(this.positions);

                            //group positions except 1st one
                            for (let i = 1; i < this.candidateObj.length; i++) {
                              var loop = true;
                              this.positions.forEach((ele) => {
                                if (loop) {
                                  if (this.candidateObj[i].position == ele.name) {
                                    // let pos = new Positions();
                                    // pos.name =this.candidateObj[i].position;
                                    // this.positions.push(pos);
                                    loop = false;
                                  }
                                }

                              }
                              )
                              if (loop) {
                                let pos = new Positions();
                                pos.name = this.candidateObj[i].position;
                                this.positions.push(pos);
                              }

                            }
                            console.log(this.positions);
                          }
                        );


                      }
                    );
                  }


                } else {
                  this.election = false;
                }
              }

            );

          } else {
            this.showerrormsg = true;
            this.errormsg = "Access Denied!"
            console.log("Access Denied!");

          }

        },

        error => {
          this.showerrormsg = false;
          console.log("Exception Occured");
          this.errormsg = "Something went wrong! Please try again.";

        }
      )

    }

  }

  vote() {
    var emkeyDecrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.invisVote.private_key);

    console.log(this.positions);

    if (emkeyDecrypted == this.email) {
      this.reg_service.getUserbyEmail(this.email, this.password, emkeyDecrypted).subscribe(
        res => {
          this.userObj = res;
          if (this.userObj) {
            console.log(this.userObj);
          }
        }
      );
    }
  }

  sendOTP() {

    if ((this.userObj.giveta1 == this.userObj.a1) && (this.userObj.giveta2 == this.userObj.a2)) {
      this.showotpmsg = false;
      this.isShown = true;
      this.sendotp = "Answers are correct!"
      console.log(this.sendotp);

      var emkeyDecrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.invisVote.private_key);

      this.reg_service.getUserbyEmail(this.email, this.password, emkeyDecrypted).subscribe(
        res => {
          this.user = res;
          if (this.user) {
            console.log(this.user);
          }

          this.reg_service.sendotp(this.email, this.password, this.user).subscribe(
            res => {
              this.otpcode = res;
            }
          );
        }
      );

    } else {
      this.showotpmsg = true;
      this.isShown = false;
      this.sendotp = "Invalid answers!"
      console.log(this.sendotp);

    }

  }

  submit() {
    var emkeyDecrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.invisVote.private_key);

    if (emkeyDecrypted == this.email) {
      this.reg_service.getUserbyEmail(this.email, this.password, emkeyDecrypted).subscribe(
        res => {
          this.user2 = res;
          if (this.user2) {
            console.log("this.user2");
            console.log(this.user2);
          }

          if (this.userObj.enteredverificationcode == this.user2.otpcode) {
            this.showotpmsg = false;
            console.log("Valid OTP!");

            for (let i = 0; i < this.positions.length; i++) {
              if (this.positions[i].vote_id) {
                this.vote_service.addVote(this.email, this.password, emkeyDecrypted, this.invisVote.elecID, this.positions[i].vote_id)
                  .subscribe(
                    res => {
                      if (res) {
                        this.submitSuccess = true;
                        this.submitUnsuccess = false;
                        this.isShown = false;
                        this.submitmsg = "You were voted successfully! Thank you for being with us."
                        console.log(this.submitmsg);
                      } else {
                        this.submitSuccess = false;
                        this.submitUnsuccess = true;
                        this.submitmsg = "Something went wrong! Your vote was unsuccessful."
                        console.log(this.submitmsg);
                      }
                    }
                  );

              }
            }

          } else {
            this.showotpmsg = true;
            this.sendotp = "Invalid OTP!"
            console.log("Invalid OTP!");

          }
        }
      );
    }
  }

  gotohome() {
    this._router.navigate(['/userprofile', this.user3.id]);
  }

  nextStep() {
    console.log(this.electionID);
    this._router.navigate(['/votepage2', this.electionID]);
  }

}
