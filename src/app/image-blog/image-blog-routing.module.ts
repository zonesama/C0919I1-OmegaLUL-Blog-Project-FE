import {RouterModule, Routes} from '@angular/router';
import {ImageBlogCreateComponent} from './image-blog-create/image-blog-create.component';
import {AuthGuard} from '../auth/auth.guard';
import {NgModule} from '@angular/core';
import {ImageBlogListComponent} from './image-blog-list/image-blog-list.component';
import {ImageBlogDetailComponent} from './image-blog-detail/image-blog-detail.component';

const routes: Routes = [
  {
    path: 'newImgBlog',
    component: ImageBlogCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imgBlogList',
    component: ImageBlogListComponent
  },
  {
    path: 'imgBlogDetails/:id',
    component: ImageBlogDetailComponent
  },
  {
    path: 'updateImgBlog/:id',
    component: ImageBlogDetailComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageBlogRouting {
}
