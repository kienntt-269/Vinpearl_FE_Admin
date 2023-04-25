import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerHotelComponent } from './report-customer-hotel.component';

describe('ReportCustomerHotelComponent', () => {
  let component: ReportCustomerHotelComponent;
  let fixture: ComponentFixture<ReportCustomerHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
