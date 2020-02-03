import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {TestUploadComponent} from './test-upload/test-upload.component';
import {HomeComponent} from './home/home.component';




const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'imgBlog',
    loadChildren: './image-blog/image-blog.module#ImageBlogModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: RegisterComponent
  },
  {
    path: 'uploadTest',
    component: TestUploadComponent
  }
];

@NgModule({
  // declarations: [],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
