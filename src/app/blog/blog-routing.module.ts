import {RouterModule, Routes} from '@angular/router';
import {BlogCreateComponent} from './blog-create/blog-create.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'newBlog',
    component: BlogCreateComponent
  },
  {
    path: 'blogDetail',
    component: BlogDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRouting {
}
