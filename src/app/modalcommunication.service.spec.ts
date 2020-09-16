import { TestBed } from '@angular/core/testing';

import { ModalcommunicationService } from './modalcommunication.service';

describe('ModalcommunicationService', () => {
  let service: ModalcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
