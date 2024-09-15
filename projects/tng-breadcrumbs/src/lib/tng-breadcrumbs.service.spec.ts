import { TestBed } from '@angular/core/testing';

import { TngBreadcrumbsService } from './tng-breadcrumbs.service';

describe('TngBreadcrumbsService', () => {
  let service: TngBreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TngBreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
