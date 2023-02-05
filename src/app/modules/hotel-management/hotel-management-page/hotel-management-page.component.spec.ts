import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementPageComponent } from './account-management-page.component';

describe('AccountManagementPageComponent', () => {
  let component: AccountManagementPageComponent;
  let fixture: ComponentFixture<AccountManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
