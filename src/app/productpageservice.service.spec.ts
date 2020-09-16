import { TestBed } from '@angular/core/testing';

import { ProductpageserviceService } from './productpageservice.service';

describe('ProductpageserviceService', () => {
  let service: ProductpageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductpageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
