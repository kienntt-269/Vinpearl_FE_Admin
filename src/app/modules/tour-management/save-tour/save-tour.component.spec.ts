import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTourComponent } from './save-tour.component';

describe('SaveTourComponent', () => {
  let component: SaveTourComponent;
  let fixture: ComponentFixture<SaveTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
