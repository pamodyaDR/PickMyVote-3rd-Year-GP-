import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votepage1Component } from './votepage1.component';

describe('Votepage1Component', () => {
  let component: Votepage1Component;
  let fixture: ComponentFixture<Votepage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Votepage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Votepage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
