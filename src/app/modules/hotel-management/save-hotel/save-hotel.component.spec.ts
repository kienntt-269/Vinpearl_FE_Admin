import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveHotelComponent } from './save-hotel.component';

describe('SaveHotelComponent', () => {
  let component: SaveHotelComponent;
  let fixture: ComponentFixture<SaveHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
