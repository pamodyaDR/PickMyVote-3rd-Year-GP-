import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votepage2Component } from './votepage2.component';

describe('Votepage2Component', () => {
  let component: Votepage2Component;
  let fixture: ComponentFixture<Votepage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Votepage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Votepage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
