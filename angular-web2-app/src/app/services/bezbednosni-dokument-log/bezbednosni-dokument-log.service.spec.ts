import { TestBed } from '@angular/core/testing';

import { BezbednosniDokumentLogService } from './bezbednosni-dokument-log.service';

describe('BezbednosniDokumentLogService', () => {
  let service: BezbednosniDokumentLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BezbednosniDokumentLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
