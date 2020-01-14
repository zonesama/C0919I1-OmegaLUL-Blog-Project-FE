import {RouterModule, Routes} from '@angular/router';
import {ImageBlogCreateComponent} from './image-blog-create/image-blog-create.component';
import {AuthGuard} from '../auth/auth.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'newImgBlog',
    component: ImageBlogCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageBlogRouting {
}
