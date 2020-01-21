import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlogListComponent } from './image-blog-list.component';

describe('ImageBlogListComponent', () => {
  let component: ImageBlogListComponent;
  let fixture: ComponentFixture<ImageBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
