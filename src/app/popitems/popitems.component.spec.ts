import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopitemsComponent } from './popitems.component';

describe('PopitemsComponent', () => {
  let component: PopitemsComponent;
  let fixture: ComponentFixture<PopitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
