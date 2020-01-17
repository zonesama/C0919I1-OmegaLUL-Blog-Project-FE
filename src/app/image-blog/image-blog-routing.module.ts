import {RouterModule, Routes} from '@angular/router';
import {ImageBlogCreateComponent} from './image-blog-create/image-blog-create.component';
import {AuthGuard} from '../auth/auth.guard';
import {NgModule} from '@angular/core';
import {ImageBlogListComponent} from './image-blog-list/image-blog-list.component';
import {ImageBlogDetailComponent} from './image-blog-detail/image-blog-detail.component';
import {ImageBlogEditComponent} from './image-blog-edit/image-blog-edit.component';

const routes: Routes = [
  {
    path: 'newImgBlog',
    component: ImageBlogCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ImageBlogListComponent
  },
  {
    path: 'imgBlogDetails/:id',
    component: ImageBlogDetailComponent
  },
  {
    path: 'updateImgBlog/:id',
    component: ImageBlogEditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageBlogRouting {
}
