import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHotelComponent } from './customer-management.component';

describe('CustomerHotelComponent', () => {
  let component: CustomerHotelComponent;
  let fixture: ComponentFixture<CustomerHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
