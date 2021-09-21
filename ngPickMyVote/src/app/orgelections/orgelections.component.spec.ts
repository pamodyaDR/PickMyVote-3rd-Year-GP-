import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgelectionsComponent } from './orgelections.component';

describe('OrgelectionsComponent', () => {
  let component: OrgelectionsComponent;
  let fixture: ComponentFixture<OrgelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgelectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
