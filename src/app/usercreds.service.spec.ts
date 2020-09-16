import { TestBed } from '@angular/core/testing';

import { UsercredsService } from './usercreds.service';

describe('UsercredsService', () => {
  let service: UsercredsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercredsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
