import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageBlogCreateComponent } from './image-blog-create/image-blog-create.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxPrintModule} from 'ngx-print';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageBlogRouting} from './image-blog-routing.module';
import {httpInterceptorProviders} from '../auth/auth-interceptor';



@NgModule({
  declarations: [ImageBlogCreateComponent],
  imports: [
    CommonModule, NgxPaginationModule, NgxPrintModule, HttpClientModule, FormsModule, ReactiveFormsModule, ImageBlogRouting
  ],
  providers: [httpInterceptorProviders]
})
export class ImageBlogModule { }
