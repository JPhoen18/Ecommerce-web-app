import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopartComponent } from './popart.component';

describe('PopartComponent', () => {
  let component: PopartComponent;
  let fixture: ComponentFixture<PopartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
