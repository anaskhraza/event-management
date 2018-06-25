import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyTargetComponent } from './add-monthly-target.component';

describe('AddMonthlyTargetComponent', () => {
  let component: AddMonthlyTargetComponent;
  let fixture: ComponentFixture<AddMonthlyTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonthlyTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonthlyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
