import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogDetailComponent } from './image-blog-detail.component';

describe('ImageBlogDetailComponent', () => {
  let component: ImageBlogDetailComponent;
  let fixture: ComponentFixture<ImageBlogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBlogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
