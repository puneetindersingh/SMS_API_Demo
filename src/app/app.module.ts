import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SharedModule } from './shared/shared.module';
import { APIModule } from './api/api.module';
import { ErrorModule } from './errors/error.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    SharedModule,
    APIModule,
    ErrorModule,
    HttpModule,
    routing
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
