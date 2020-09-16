import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserordersreviewComponent } from './userordersreview.component';

describe('UserordersreviewComponent', () => {
  let component: UserordersreviewComponent;
  let fixture: ComponentFixture<UserordersreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserordersreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserordersreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
