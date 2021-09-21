import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionService } from '../election.service';
import { Organization } from '../organization';
import { Election } from '../election';
import { Payment } from '../payment';
import { DatePipe } from '@angular/common';
import { Candidate } from '../candidate';
import { Voter } from '../voter.model';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateElectionComponent implements OnInit {

  username = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');
  uid = sessionStorage.getItem('session_uid');

  organizations : Organization[];

  newOrganization : Organization = new Organization();

  newElection : Election = new Election();

  newPayment : Payment = new Payment();

  newElecId = 0; newElecType = 0;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  newCandidatesArray : Array<Candidate> = [];
  candidateName : string;
  candidatePosition: string;

  newVotersArray : Array<Voter> = [];
  voterEmail : string;

  newKeyArray : Array<Voter> = [];
  emailEncrypt : string;

  csvFile : File;

  panelOpenState = false;

  hiddenVariable = "d-none";
  userId = 0;

  electionVotersCapacity = 0;

  electionCapacityValidationBorderColor = "";
  electionCapacityValidationText = "d-none";

  hiddenVariableVoterCountError = "d-none";

  constructor(private _service: ElectionService, private _router : Router, private _route: ActivatedRoute, private _formBuilder: FormBuilder,public datepipe: DatePipe,private EncrDecr: EncrDecrServiceService) { }

  ngOnInit(): void {

    const id = this._route.snapshot.params['id'];
    this.userId = id;
    //console.log(id);

    this.getOrganization(this.username, this.password, id)

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  private getOrganization(username:any, password:any, id:Number){
    this._service.getOwnerOrgList(username, password, id).subscribe(data => {
      this.organizations = data;
    })
  }

  createNewOrganization(username:any, password:any){
    const id = this._route.snapshot.params['id'];
    this.newOrganization.ownerID = id;
    this._service.createNewOrganization(username, password, this.newOrganization).subscribe(data => {
      console.log(data);
      window.location.reload();
    },
    error => console.log(error));
  }

  createNewElection(username:any, password:any){
    //console.log(this.newElection);
    if(this.newVotersArray.length <= this.electionVotersCapacity){
      this._service.createNewElection(username, password, this.newElection).subscribe(data => {
        this.newElecId = data.id;
        this.newElecType = data.type;
        console.log(data);
  
        this.createNewPayment(username,password);
      },
      error => console.log(error));
    }
    else{
      console.log("voter count error");
      this.hiddenVariableVoterCountError = "";
    }   
  }

  createNewPayment(username:any, password:any){
    console.log(this.newElecId);
    if(this.newElecId != 0){
      if(this.newElecType == 1){
        this.newPayment.amount = 8;
      }
      else if(this.newElecType == 2 ){
        this.newPayment.amount = 6;
      }
      this.newPayment.elec_id = this.newElecId;

      let myDate = new Date();
      let someDateVar = this.datepipe.transform(myDate, 'yyyy-MM-dd');

      this.newPayment.date = someDateVar;
      //console.log(this.newPayment);

      this._service.createNewPayment(username, password, this.newPayment).subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
    }

    this.createNewCandidates(username,password)
  }

  addCandidate(cName:string, cPosition:string){
    let cd = new Candidate();
    cd.name = cName;
    cd.position = cPosition;
    this.newCandidatesArray.push(cd);
    //console.log(this.newCandidatesArray);
    this.candidateName = ""; this.candidatePosition = "";
  }

  deleteCandidte(){
    this.newCandidatesArray.pop();
  }

  createNewCandidates(username:any, password:any){
    for (var candidate of this.newCandidatesArray) {
      candidate.elecid = this.newElecId;
    }

    this._service.createNewCandidates(username, password, this.newCandidatesArray).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));

    this.createNewVoters(username,password)
  }

  //new Voters add functions for the election
  addVoter(voterEmail : string){
    let nv = new Voter();
    nv.emkey = voterEmail;
    nv.elecID = this.newElecId;
    nv.privateKey = this.EncrDecr.set('123456$#@$^@1ERF', nv.emkey);
    nv.count  = 0;
    this.newVotersArray.push(nv);
    this.voterEmail = "";
  }

  deleteVoter(){
    this.newVotersArray.pop();
  }

  csvFileUploadListner(event : any){
    this.csvFile = event.target.files[0]
  }

  uploadAndConvertCSVIntoVotersArray(){
    //console.log(this.csvFile)
    let reader: FileReader = new FileReader()
    reader.readAsText(this.csvFile)
    reader.onload = (e) => {
      let csvData:any = reader.result
      let emailsInCSV = []
      emailsInCSV = csvData.split(",")
      //console.log(emailsInCSV)

      //push data to this.newVotersArray
      for(var oneEmail of emailsInCSV){
        //console.log(oneEmail)
        let nv = new Voter();
        nv.emkey = oneEmail;
        console.log(nv.emkey);
        nv.privateKey = this.EncrDecr.set('123456$#@$^@1ERF', nv.emkey);
        nv.count  = 0;
        this.newVotersArray.push(nv);
      }
    }
  }

  createNewVoters(username:any, password:any){

    for (var voter of this.newVotersArray) {
      voter.elecID = this.newElecId;
    }

    this._service.createNewVoters(username, password, this.newVotersArray).subscribe(data => {
      console.log(data);
    
    },
    error => console.log(error));

    this.hiddenVariable = ""; //for show the election creation success messaged
  }

  electionCreationFinishAndGoBackEle(){
    this._router.navigate(['/elections',this.userId])
  }

  selectElectionAndPressNextButton(){
    if(this.newElection.type == 1){
      this.electionVotersCapacity = 500;
    }
    else if(this.newElection.type == 2){
      this.electionVotersCapacity = 1000;
    }

    console.log(this.electionVotersCapacity)
  }

  electionCapacityInputValidation(){
    if(this.newElection.capacity > this.electionVotersCapacity){
      this.electionCapacityValidationBorderColor = "warn";
      this.electionCapacityValidationText = "ms-2 text-danger";
    }
    else{
      this.electionCapacityValidationBorderColor = "";
      this.electionCapacityValidationText = "d-none";
    }
  }

  electionFinishVoterCountError(){
    this.hiddenVariableVoterCountError = "d-none";
  }

  viewHome(){
    this._router.navigate(['/userprofile', this.uid]);
  }
}
