import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from "./modules/components-module/components.module";
import {MongoComponent} from './components/mongo/mongo.component';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {UserModule} from "./modules/user-module/user.module";


@NgModule({
  declarations: [
    MongoComponent,
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HttpClientModule }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
