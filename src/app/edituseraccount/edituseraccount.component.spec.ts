import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituseraccountComponent } from './edituseraccount.component';

describe('EdituseraccountComponent', () => {
  let component: EdituseraccountComponent;
  let fixture: ComponentFixture<EdituseraccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituseraccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituseraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
