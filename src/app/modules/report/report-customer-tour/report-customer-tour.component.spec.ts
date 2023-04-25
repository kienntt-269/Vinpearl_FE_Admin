import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerTourComponent } from './report-customer-tour.component';

describe('ReportCustomerTourComponent', () => {
  let component: ReportCustomerTourComponent;
  let fixture: ComponentFixture<ReportCustomerTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
