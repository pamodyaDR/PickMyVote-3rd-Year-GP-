import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVieworganizationsComponent } from './admin-vieworganizations.component';

describe('AdminVieworganizationsComponent', () => {
  let component: AdminVieworganizationsComponent;
  let fixture: ComponentFixture<AdminVieworganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVieworganizationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVieworganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
