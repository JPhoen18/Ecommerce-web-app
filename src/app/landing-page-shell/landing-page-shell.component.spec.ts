import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageShellComponent } from './landing-page-shell.component';

describe('LandingPageShellComponent', () => {
  let component: LandingPageShellComponent;
  let fixture: ComponentFixture<LandingPageShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
