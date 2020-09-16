import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewusercartsComponent } from './reviewusercarts.component';

describe('ReviewusercartsComponent', () => {
  let component: ReviewusercartsComponent;
  let fixture: ComponentFixture<ReviewusercartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewusercartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewusercartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
