import { TestBed } from '@angular/core/testing';

import { TemplateFunctionsService } from './template-functions.service';

describe('TemplateFunctionsService', () => {
  let service: TemplateFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
