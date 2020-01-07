import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';


const routes: Routes = [
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'auth/register',
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
