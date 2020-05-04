import { TestBed } from '@angular/core/testing';

import { SercheService } from './serche.service';

describe('SercheService', () => {
  let service: SercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
