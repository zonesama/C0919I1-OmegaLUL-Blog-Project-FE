import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogRouting} from './blog-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BlogCreateComponent} from './blog-create/blog-create.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogService} from './blog.service';
import {BlogPostComponent} from './blog-post/blog-post.component';
import {BlogListComponent} from './blog-list/blog-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {SafeHtmlPipe} from './SafeHtmlPipe';
import {NgxPrintModule} from 'ngx-print';
import {ShareButtonModule} from '@ngx-share/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CKEditorModule} from 'ckeditor4-angular';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {UserSpecificBlogListComponent} from './user-specific-blog-list/user-specific-blog-list.component';
import { TagsSpecificBlogListComponent } from './tags-specific-blog-list/tags-specific-blog-list.component';
import { ImageBlogCreateComponent } from './image-blog-create/image-blog-create.component';
import { ImageBlogDetailComponent } from './image-blog-detail/image-blog-detail.component';
import { ImageBlogPostComponent } from './image-blog-post/image-blog-post.component';
import { ImageBlogEditComponent } from './image-blog-edit/image-blog-edit.component';


@NgModule({
  declarations: [BlogCreateComponent, BlogDetailComponent, BlogPostComponent, BlogListComponent, BlogEditComponent, SafeHtmlPipe,
    UserSpecificBlogListComponent,
    TagsSpecificBlogListComponent,
    ImageBlogCreateComponent,
    ImageBlogDetailComponent,
    ImageBlogPostComponent,
    ImageBlogEditComponent,],
  imports: [
    CommonModule, BlogRouting, HttpClientModule, RouterModule, CKEditorModule, ReactiveFormsModule, FormsModule, NgxPaginationModule,
    NgxPrintModule, ShareButtonModule, MatSlideToggleModule
  ],
  providers: [BlogService, httpInterceptorProviders]
})
export class BlogModule {
}
