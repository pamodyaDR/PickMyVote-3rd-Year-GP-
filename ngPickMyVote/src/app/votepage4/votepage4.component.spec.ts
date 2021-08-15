import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votepage4Component } from './votepage4.component';

describe('Votepage4Component', () => {
  let component: Votepage4Component;
  let fixture: ComponentFixture<Votepage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Votepage4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Votepage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
