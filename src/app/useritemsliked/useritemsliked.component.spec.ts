import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseritemslikedComponent } from './useritemsliked.component';

describe('UseritemslikedComponent', () => {
  let component: UseritemslikedComponent;
  let fixture: ComponentFixture<UseritemslikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseritemslikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseritemslikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
