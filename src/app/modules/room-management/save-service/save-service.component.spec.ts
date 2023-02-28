import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveServiceComponent } from './save-service.component';

describe('SaveServiceComponent', () => {
  let component: SaveServiceComponent;
  let fixture: ComponentFixture<SaveServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
