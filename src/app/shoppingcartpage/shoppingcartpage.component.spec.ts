import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartpageComponent } from './shoppingcartpage.component';

describe('ShoppingcartpageComponent', () => {
  let component: ShoppingcartpageComponent;
  let fixture: ComponentFixture<ShoppingcartpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingcartpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
