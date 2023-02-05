import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfRoomComponent } from './type-of-room.component';

describe('TypeOfRoomComponent', () => {
  let component: TypeOfRoomComponent;
  let fixture: ComponentFixture<TypeOfRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
