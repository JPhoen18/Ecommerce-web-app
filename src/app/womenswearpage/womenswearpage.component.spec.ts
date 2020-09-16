import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenswearpageComponent } from './womenswearpage.component';

describe('WomenswearpageComponent', () => {
  let component: WomenswearpageComponent;
  let fixture: ComponentFixture<WomenswearpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenswearpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenswearpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
