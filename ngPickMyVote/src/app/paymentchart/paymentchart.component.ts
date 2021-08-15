import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../payment';
import { RegistrationService } from '../registration.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-paymentchart',
  templateUrl: './paymentchart.component.html',
  styleUrls: ['./paymentchart.component.css']
})
export class PaymentchartComponent implements OnInit {

  email = sessionStorage.getItem('session_username');
  password = sessionStorage.getItem('session_password');

  //Payments = Payment:[];
  List!: Array<Payment>;

  payments:any[] = [];
  date:any[] = [];

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  this.date;

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: 'Income',
      data: this.payments
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  constructor(private Reg_service: RegistrationService, private Payment_service: PaymentService, private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    if(!this.email){
      this._router.navigate(['/login'])
    }

    this.Payment_service.getPayment(this.email,this.password).subscribe(
      res => {this.List =res;
        this.List.forEach((el) => this.payments.push(el.amount));
        this.List.forEach((el) => this.date.push(el.date))
      } 
    )

  }

}
