import { TestBed } from '@angular/core/testing';

import { FetchfurnitureService } from './fetchfurniture.service';

describe('FetchfurnitureService', () => {
  let service: FetchfurnitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchfurnitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
