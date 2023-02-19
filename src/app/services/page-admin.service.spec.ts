import { TestBed } from '@angular/core/testing';

import { PageAdminService } from './page-admin.service';

describe('PageAdminService', () => {
  let service: PageAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
