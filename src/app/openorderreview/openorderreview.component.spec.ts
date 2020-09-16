import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenorderreviewComponent } from './openorderreview.component';

describe('OpenorderreviewComponent', () => {
  let component: OpenorderreviewComponent;
  let fixture: ComponentFixture<OpenorderreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenorderreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenorderreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
