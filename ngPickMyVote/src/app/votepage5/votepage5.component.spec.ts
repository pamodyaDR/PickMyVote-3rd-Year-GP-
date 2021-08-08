import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Votepage5Component } from './votepage5.component';

describe('Votepage5Component', () => {
  let component: Votepage5Component;
  let fixture: ComponentFixture<Votepage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Votepage5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Votepage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
