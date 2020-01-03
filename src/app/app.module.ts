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

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavbarComponent,
    DashbroadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CKEditorModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
