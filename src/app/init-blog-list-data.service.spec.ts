import { TestBed } from '@angular/core/testing';

import { InitBlogListDataService } from './init-blog-list-data.service';

describe('InitBlogListDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitBlogListDataService = TestBed.get(InitBlogListDataService);
    expect(service).toBeTruthy();
  });
});
