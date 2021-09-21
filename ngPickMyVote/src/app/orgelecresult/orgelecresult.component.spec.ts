import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgelecresultComponent } from './orgelecresult.component';

describe('OrgelecresultComponent', () => {
  let component: OrgelecresultComponent;
  let fixture: ComponentFixture<OrgelecresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgelecresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgelecresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
