import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationtableComponent } from './organizationtable.component';

describe('OrganizationtableComponent', () => {
  let component: OrganizationtableComponent;
  let fixture: ComponentFixture<OrganizationtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
