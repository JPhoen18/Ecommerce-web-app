import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensjewelrypageComponent } from './mensjewelrypage.component';

describe('MensjewelrypageComponent', () => {
  let component: MensjewelrypageComponent;
  let fixture: ComponentFixture<MensjewelrypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensjewelrypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensjewelrypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
