import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedorderreviewComponent } from './closedorderreview.component';

describe('ClosedorderreviewComponent', () => {
  let component: ClosedorderreviewComponent;
  let fixture: ComponentFixture<ClosedorderreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedorderreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedorderreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
