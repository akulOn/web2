import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/neRegistrovan/login/login.component';
import { HeaderComponent } from './components/neRegistrovan/header/header.component';
import { NeRegistrovanComponent } from './components/neRegistrovan/ne-registrovan/ne-registrovan.component';
import { IncidentiComponent } from './components/incidenti/incidenti/incidenti.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DodajIncidentComponent } from './components/incidenti/dodaj-incident/dodaj-incident.component';
import { BezbednosniDokumentComponent } from './components/bezbednosniDokumenti/bezbednosni-dokument/bezbednosni-dokument.component';
import { BezbednosniDokumentLogComponent } from './components/bezbednosniDokumenti/bezbednosni-dokument-log/bezbednosni-dokument-log.component';

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NeRegistrovanComponent,
    IncidentiComponent,
    DodajIncidentComponent,
    BezbednosniDokumentComponent,
    BezbednosniDokumentLogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
