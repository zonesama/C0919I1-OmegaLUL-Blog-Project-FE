import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBlogCreateComponent } from './image-blog-create/image-blog-create.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxPrintModule} from 'ngx-print';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageBlogRouting} from './image-blog-routing.module';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ImageBlogListComponent } from './image-blog-list/image-blog-list.component';
import { ImageBlogPostComponent } from './image-blog-post/image-blog-post.component';
import { ImageBlogDetailComponent } from './image-blog-detail/image-blog-detail.component';



@NgModule({
  declarations: [ImageBlogCreateComponent, ImageBlogListComponent, ImageBlogPostComponent, ImageBlogDetailComponent],
    imports: [
        CommonModule, NgxPaginationModule, NgxPrintModule, HttpClientModule, FormsModule, ReactiveFormsModule, ImageBlogRouting,
      MatSlideToggleModule
    ],
  providers: [httpInterceptorProviders]
})
export class ImageBlogModule { }
