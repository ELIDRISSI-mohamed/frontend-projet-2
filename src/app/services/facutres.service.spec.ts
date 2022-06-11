import { TestBed } from '@angular/core/testing';

import { FacutresService } from './facutres.service';

describe('FacutresService', () => {
  let service: FacutresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacutresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
