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
import {TestUploadComponent} from './test-upload/test-upload.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';


export function socialsConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleAppId)
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('486275401920877')
    },
  ]);
  return config;
}

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CKEditorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders, AuthService,
    {provide: AuthServiceConfig, useFactory: socialsConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
