import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votepage3Component } from './votepage3.component';

describe('Votepage3Component', () => {
  let component: Votepage3Component;
  let fixture: ComponentFixture<Votepage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Votepage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Votepage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
