import { TestBed } from '@angular/core/testing';

import { ProjetRechService } from './projet-rech.service';

describe('ProjetRechService', () => {
  let service: ProjetRechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetRechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
