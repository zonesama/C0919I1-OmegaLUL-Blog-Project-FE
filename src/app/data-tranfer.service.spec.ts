import { TestBed } from '@angular/core/testing';

import { DataTranferService } from './data-tranfer.service';

describe('DataTranferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTranferService = TestBed.get(DataTranferService);
    expect(service).toBeTruthy();
  });
});
