import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensfabricsComponent } from './mensfabrics.component';

describe('MensfabricsComponent', () => {
  let component: MensfabricsComponent;
  let fixture: ComponentFixture<MensfabricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensfabricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensfabricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
