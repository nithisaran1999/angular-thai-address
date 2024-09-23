import { TestBed } from '@angular/core/testing';

import { ThaiAddressService } from './thai-address.service';

describe('ThaiAddressService', () => {
  let service: ThaiAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThaiAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
