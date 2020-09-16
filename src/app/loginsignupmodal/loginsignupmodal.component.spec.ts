import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsignupmodalComponent } from './loginsignupmodal.component';

describe('LoginsignupmodalComponent', () => {
  let component: LoginsignupmodalComponent;
  let fixture: ComponentFixture<LoginsignupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginsignupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsignupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
