import { TestBed } from '@angular/core/testing';

import { LocalStorageParticipantsService } from './local-storage-participants.service';

describe('LocalStorageParticipantsService', () => {
  let service: LocalStorageParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
