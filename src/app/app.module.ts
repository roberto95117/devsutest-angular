import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './_util/app-interceptor';
import { AppRoutingModule } from './_util/app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppComponent } from './app.component';
import { NoEcontradoComponent } from './pages/no-econtrado/no-econtrado.component';


@NgModule({
  declarations: [
    AppComponent,
    NoEcontradoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
