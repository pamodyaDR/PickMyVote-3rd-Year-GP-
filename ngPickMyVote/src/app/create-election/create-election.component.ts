import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionService } from '../election.service';
import { Organization } from '../organization';
import { Election } from '../election';
import { Payment } from '../payment';

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

  organizations : Organization[];

  newOrganization : Organization = new Organization();

  newElection : Election = new Election();

  newPayment : Payment = new Payment();

  newElecId = 1; newElecType = 1;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _service: ElectionService, private _router : Router, private _route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const id = this._route.snapshot.params['id'];
    console.log(id);

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
    this._service.createNewElection(username, password, this.newElection).subscribe(data => {
      this.newElecId = data.id;
      this.newElecType = data.type;
      console.log(data);
    },
    error => console.log(error));
  }

  createNewPayment(){
    
  }

}
