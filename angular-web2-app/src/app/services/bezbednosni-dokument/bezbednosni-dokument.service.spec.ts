import { TestBed } from '@angular/core/testing';

import { BezbednosniDokumentService } from './bezbednosni-dokument.service';

describe('BezbednosniDokumentService', () => {
  let service: BezbednosniDokumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BezbednosniDokumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
