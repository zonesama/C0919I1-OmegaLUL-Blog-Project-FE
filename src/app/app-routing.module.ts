import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './auth/register/register.component';


const routes: Routes = [
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: RegisterComponent
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
