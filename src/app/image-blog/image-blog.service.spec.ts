import { TestBed } from '@angular/core/testing';

import { ImageBlogService } from './image-blog.service';

describe('ImageBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageBlogService = TestBed.get(ImageBlogService);
    expect(service).toBeTruthy();
  });
});
