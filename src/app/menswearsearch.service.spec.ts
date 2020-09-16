import { TestBed } from '@angular/core/testing';

import { MenswearsearchService } from './menswearsearch.service';

describe('MenswearsearchService', () => {
  let service: MenswearsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenswearsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
