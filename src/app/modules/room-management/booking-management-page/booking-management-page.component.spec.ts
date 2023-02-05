import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingManagementPageComponent } from './booking-management-page.component';

describe('BookingManagementComponent', () => {
  let component: BookingManagementPageComponent;
  let fixture: ComponentFixture<BookingManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
