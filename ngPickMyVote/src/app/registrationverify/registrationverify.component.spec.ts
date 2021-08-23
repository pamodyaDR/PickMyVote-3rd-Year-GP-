import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationverifyComponent } from './registrationverify.component';

describe('RegistrationverifyComponent', () => {
  let component: RegistrationverifyComponent;
  let fixture: ComponentFixture<RegistrationverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
