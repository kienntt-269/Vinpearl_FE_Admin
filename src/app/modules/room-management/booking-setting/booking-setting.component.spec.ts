import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSettingComponent } from './booking-setting.component';

describe('BookingSettingComponent', () => {
  let component: BookingSettingComponent;
  let fixture: ComponentFixture<BookingSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
