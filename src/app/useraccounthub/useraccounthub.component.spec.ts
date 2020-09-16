import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccounthubComponent } from './useraccounthub.component';

describe('UseraccounthubComponent', () => {
  let component: UseraccounthubComponent;
  let fixture: ComponentFixture<UseraccounthubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccounthubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccounthubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
