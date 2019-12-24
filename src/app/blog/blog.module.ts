import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogRouting} from './blog-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CKEditorModule} from 'ckeditor4-angular';
import {BlogCreateComponent} from './blog-create/blog-create.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogService} from './blog.service';


@NgModule({
  declarations: [BlogCreateComponent, BlogDetailComponent],
  imports: [
    CommonModule, BlogRouting, HttpClientModule, RouterModule, CKEditorModule, ReactiveFormsModule, FormsModule
  ],
  providers: [BlogService]
})
export class BlogModule {
}
