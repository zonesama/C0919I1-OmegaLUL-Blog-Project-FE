import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogPostComponent } from './image-blog-post.component';

describe('ImageBlogPostComponent', () => {
  let component: ImageBlogPostComponent;
  let fixture: ComponentFixture<ImageBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
