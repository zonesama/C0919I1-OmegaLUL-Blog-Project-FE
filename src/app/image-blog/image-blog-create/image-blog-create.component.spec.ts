import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogCreateComponent } from './image-blog-create.component';

describe('ImageBlogCreateComponent', () => {
  let component: ImageBlogCreateComponent;
  let fixture: ComponentFixture<ImageBlogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBlogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
