import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSpecificBlogListComponent } from './tags-specific-blog-list.component';

describe('TagsSpecificBlogListComponent', () => {
  let component: TagsSpecificBlogListComponent;
  let fixture: ComponentFixture<TagsSpecificBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsSpecificBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsSpecificBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
