import { TestBed, inject } from '@angular/core/testing';

import { MockResponseService } from './mock-response.service';

describe('MockResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockResponseService]
    });
  });

  it('should be created', inject([MockResponseService], (service: MockResponseService) => {
    expect(service).toBeTruthy();
  }));
});
