import { TestBed } from '@angular/core/testing';

import { WomenswearsearchService } from './womenswearsearch.service';

describe('WomenswearsearchService', () => {
  let service: WomenswearsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WomenswearsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
