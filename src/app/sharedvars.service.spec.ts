import { TestBed } from '@angular/core/testing';

import { SharedvarsService } from './sharedvars.service';

describe('SharedvarsService', () => {
  let service: SharedvarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedvarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
