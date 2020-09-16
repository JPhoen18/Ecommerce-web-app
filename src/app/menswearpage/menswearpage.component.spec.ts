import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenswearpageComponent } from './menswearpage.component';

describe('MenswearpageComponent', () => {
  let component: MenswearpageComponent;
  let fixture: ComponentFixture<MenswearpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenswearpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenswearpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
