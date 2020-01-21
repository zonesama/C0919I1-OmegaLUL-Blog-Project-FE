import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CKEditorModule} from 'ckeditor4-angular';

import {AppComponent} from './app.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './navbar/navbar.component';
import {DashbroadComponent} from './dashbroad/dashbroad.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './auth/register/register.component';
import { TestUploadComponent } from './test-upload/test-upload.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { TagBarComponent } from './tag-bar/tag-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavbarComponent,
    DashbroadComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TestUploadComponent,
    HomeComponent,
    TagBarComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CKEditorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
