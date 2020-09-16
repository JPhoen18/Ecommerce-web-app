import { TestBed } from '@angular/core/testing';

import { FetchthebooksService } from './fetchthebooks.service';

describe('FetchthebooksService', () => {
  let service: FetchthebooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchthebooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
