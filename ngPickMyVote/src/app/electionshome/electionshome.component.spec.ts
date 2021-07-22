import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionshomeComponent } from './electionshome.component';

describe('ElectionshomeComponent', () => {
  let component: ElectionshomeComponent;
  let fixture: ComponentFixture<ElectionshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
