import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BlogCreateComponent} from './blog/blog-create/blog-create.component';


const routes: Routes = [
  { path: 'blog/create', component: BlogCreateComponent}
];
@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
