import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecificBlogListComponent } from './user-specific-blog-list.component';

describe('UserSpecificBlogListComponent', () => {
  let component: UserSpecificBlogListComponent;
  let fixture: ComponentFixture<UserSpecificBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSpecificBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSpecificBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
