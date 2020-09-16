import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopbooksComponent } from './popbooks.component';

describe('PopbooksComponent', () => {
  let component: PopbooksComponent;
  let fixture: ComponentFixture<PopbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
