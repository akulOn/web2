import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/neRegistrovan/login/login.component';
import { HeaderComponent } from './components/neRegistrovan/header/header.component';
import { NeRegistrovanComponent } from './components/neRegistrovan/ne-registrovan/ne-registrovan.component';
import { IncidentiComponent } from './components/incidenti/incidenti/incidenti.component';

import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NeRegistrovanComponent,
    IncidentiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
