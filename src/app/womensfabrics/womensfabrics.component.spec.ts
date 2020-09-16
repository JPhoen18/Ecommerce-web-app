import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensfabricsComponent } from './womensfabrics.component';

describe('WomensfabricsComponent', () => {
  let component: WomensfabricsComponent;
  let fixture: ComponentFixture<WomensfabricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomensfabricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensfabricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
