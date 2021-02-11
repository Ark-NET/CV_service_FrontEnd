import { TestBed } from '@angular/core/testing';

import { RequestDBService } from './request-db.service';

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
