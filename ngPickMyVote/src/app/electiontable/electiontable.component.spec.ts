import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiontableComponent } from './electiontable.component';

describe('ElectiontableComponent', () => {
  let component: ElectiontableComponent;
  let fixture: ComponentFixture<ElectiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectiontableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
