import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensjewelrypageComponent } from './womensjewelrypage.component';

describe('WomensjewelrypageComponent', () => {
  let component: WomensjewelrypageComponent;
  let fixture: ComponentFixture<WomensjewelrypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomensjewelrypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensjewelrypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
