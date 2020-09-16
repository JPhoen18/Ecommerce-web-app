import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinythingsComponent } from './shinythings.component';

describe('ShinythingsComponent', () => {
  let component: ShinythingsComponent;
  let fixture: ComponentFixture<ShinythingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShinythingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShinythingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
