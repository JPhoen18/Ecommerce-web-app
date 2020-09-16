import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryorderviewComponent } from './everyorderview.component';

describe('EveryorderviewComponent', () => {
  let component: EveryorderviewComponent;
  let fixture: ComponentFixture<EveryorderviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveryorderviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryorderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
