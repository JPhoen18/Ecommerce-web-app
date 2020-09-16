import { TestBed } from '@angular/core/testing';

import { LikeditemsService } from './likeditems.service';

describe('LikeditemsService', () => {
  let service: LikeditemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeditemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
