import { TestBed } from '@angular/core/testing';

import { PlanRadaService } from './plan-rada.service';

describe('PlanRadaService', () => {
  let service: PlanRadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
