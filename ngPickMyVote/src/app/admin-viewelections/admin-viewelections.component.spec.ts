import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewelectionsComponent } from './admin-viewelections.component';

describe('AdminViewelectionsComponent', () => {
  let component: AdminViewelectionsComponent;
  let fixture: ComponentFixture<AdminViewelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewelectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
