import { TestBed } from '@angular/core/testing';

import { RequestDBService } from './httpClient';

describe('RequestDBService', () => {
  let service: RequestDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
