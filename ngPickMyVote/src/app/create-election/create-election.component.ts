import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionService } from '../election.service';
import { Organization } from '../organization';

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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
  }

  private getOrganization(username:any, password:any, id:Number){
    this._service.getOwnerOrgList(username, password, id).subscribe(data => {
      this.organizations = data;
    })
  }

}
