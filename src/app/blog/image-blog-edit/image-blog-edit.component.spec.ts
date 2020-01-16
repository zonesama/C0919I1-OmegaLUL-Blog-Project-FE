import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogEditComponent } from './image-blog-edit.component';

describe('ImageBlogEditComponent', () => {
  let component: ImageBlogEditComponent;
  let fixture: ComponentFixture<ImageBlogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBlogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
