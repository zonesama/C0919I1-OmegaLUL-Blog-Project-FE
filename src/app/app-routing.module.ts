import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {TestUploadComponent} from './test-upload/test-upload.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {ChangeUserInfoComponent} from './auth/change-user-info/change-user-info.component';


const routes: Routes = [
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
    },
    {
      path: 'changePass',
      component: ChangePasswordComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'changeInfo',
      component: ChangeUserInfoComponent,
      canActivate: [AuthGuard]
    }
  ]
;

@NgModule({
  // declarations: [],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
