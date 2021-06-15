import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { DodajElementMrezeComponent } from './components/elementi-mreze/dodaj-element-mreze/dodaj-element-mreze.component';
import { PregledElemenataMrezeComponent } from './components/elementi-mreze/pregled-elemenata-mreze/pregled-elemenata-mreze.component';
import { UredenjeElemenataMrezeComponent } from './components/elementi-mreze/uredenje-elemenata-mreze/uredenje-elemenata-mreze.component';
import { BezbednosniDokumentDodavanjeComponent } from './components/bezbednosniDokumenti/bezbednosni-dokument-dodavanje/bezbednosni-dokument-dodavanje.component';
import { MojProfilComponent } from './components/moj-profil/moj-profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DodajPozivComponent } from './components/dodaj-poziv/dodaj-poziv.component'; 

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
    DodajElementMrezeComponent,
    PregledElemenataMrezeComponent,
    UredenjeElemenataMrezeComponent,
    BezbednosniDokumentDodavanjeComponent,
    MojProfilComponent,
    DashboardComponent,
    DodajPozivComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
