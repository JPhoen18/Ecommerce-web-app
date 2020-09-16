import { TestBed } from '@angular/core/testing';

import { LandingpageserviceService } from './landingpageservice.service';

describe('LandingpageserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandingpageserviceService = TestBed.get(LandingpageserviceService);
    expect(service).toBeTruthy();
  });
});
