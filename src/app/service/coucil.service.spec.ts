import { TestBed } from '@angular/core/testing';

import { CoucilService } from './coucil.service';

describe('CoucilService', () => {
  let service: CoucilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoucilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
