import { TestBed } from '@angular/core/testing';

import { JewelryfetcherService } from './jewelryfetcher.service';

describe('JewelryfetcherService', () => {
  let service: JewelryfetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JewelryfetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
