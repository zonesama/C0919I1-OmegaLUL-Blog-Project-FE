import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
    runGuardsAndResolvers: 'always'
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
