import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitorderpageComponent } from './submitorderpage.component';

describe('SubmitorderpageComponent', () => {
  let component: SubmitorderpageComponent;
  let fixture: ComponentFixture<SubmitorderpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitorderpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitorderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
