import { TestBed } from '@angular/core/testing';

import { UserelectionService } from './userelection.service';

describe('UserelectionService', () => {
  let service: UserelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
