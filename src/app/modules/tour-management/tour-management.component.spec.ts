import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourManagementComponent } from './tour-management.component';

describe('TourManagementComponent', () => {
  let component: TourManagementComponent;
  let fixture: ComponentFixture<TourManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
