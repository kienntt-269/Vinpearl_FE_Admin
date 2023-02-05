import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTypeOfRoomComponent } from './save-type-of-room.component';

describe('SaveTypeOfRoomComponent', () => {
  let component: SaveTypeOfRoomComponent;
  let fixture: ComponentFixture<SaveTypeOfRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTypeOfRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveTypeOfRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
