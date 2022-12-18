import { TestBed } from '@angular/core/testing';

import { LocalStorageReferenceService } from './local-storage-reference.service';

describe('LocalStorageReferenceService', () => {
  let service: LocalStorageReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
