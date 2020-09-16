import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurniturepageComponent } from './furniturepage.component';

describe('FurniturepageComponent', () => {
  let component: FurniturepageComponent;
  let fixture: ComponentFixture<FurniturepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurniturepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurniturepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
