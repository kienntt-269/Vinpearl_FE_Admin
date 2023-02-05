import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfTourComponent } from './type-of-tour.component';

describe('TypeOfTourComponent', () => {
  let component: TypeOfTourComponent;
  let fixture: ComponentFixture<TypeOfTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
