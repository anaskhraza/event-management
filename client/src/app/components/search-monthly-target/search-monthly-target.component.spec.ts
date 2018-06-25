import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMonthlyTargetComponent } from './search-monthly-target.component';

describe('SearchMonthlyTargetComponent', () => {
  let component: SearchMonthlyTargetComponent;
  let fixture: ComponentFixture<SearchMonthlyTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMonthlyTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMonthlyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
