import {RouterModule, Routes} from '@angular/router';
import {BlogCreateComponent} from './blog-create/blog-create.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {NgModule} from '@angular/core';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {UserSpecificBlogListComponent} from './user-specific-blog-list/user-specific-blog-list.component';
import {AuthGuard} from '../auth/auth.guard';
import {TagsSpecificBlogListComponent} from './tags-specific-blog-list/tags-specific-blog-list.component';
import {ImageBlogCreateComponent} from './image-blog-create/image-blog-create.component';

const routes: Routes = [
  {
    path: 'newBlog',
    component: BlogCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newImageBlog',
    component: ImageBlogCreateComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'blogDetail/:id',
    component: BlogDetailComponent
  },
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: 'editBlog/:id',
    component: BlogEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userBlogList',
    component: UserSpecificBlogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tagsSearch',
    component: TagsSpecificBlogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRouting {
}
