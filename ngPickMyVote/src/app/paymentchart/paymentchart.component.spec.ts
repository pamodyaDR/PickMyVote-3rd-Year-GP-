import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentchartComponent } from './paymentchart.component';

describe('PaymentchartComponent', () => {
  let component: PaymentchartComponent;
  let fixture: ComponentFixture<PaymentchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
