import { TestBed } from '@angular/core/testing';

import { MembresStructureRechService } from './membres-structure-rech.service';

describe('MembresStructureRechService', () => {
  let service: MembresStructureRechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembresStructureRechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
