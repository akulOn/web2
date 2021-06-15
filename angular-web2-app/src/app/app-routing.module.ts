import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncidentiComponent } from './components/incidenti/incidenti/incidenti.component';
import { NeRegistrovanComponent } from './components/neRegistrovan/ne-registrovan/ne-registrovan.component';
import { DodajIncidentComponent } from "./components/incidenti/dodaj-incident/dodaj-incident.component";
import { BezbednosniDokumentComponent } from './components/bezbednosniDokumenti/bezbednosni-dokument/bezbednosni-dokument.component';
import { PregledElemenataMrezeComponent } from './components/elementi-mreze/pregled-elemenata-mreze/pregled-elemenata-mreze.component';
import { MojProfilComponent } from './components/moj-profil/moj-profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DodajPozivComponent } from './components/dodaj-poziv/dodaj-poziv.component';


const routes: Routes = [
  { path : 'incidenti-svi', component: IncidentiComponent },
  { path : 'incidenti/:id', component: IncidentiComponent },
  { path : 'ne-registrovan', component: NeRegistrovanComponent },
  { path : 'dodaj-incident', component: DodajIncidentComponent },
  { path : 'bezbednosni-dokumenti-svi', component: BezbednosniDokumentComponent },
  { path : 'bezbednosni-dokumenti/:id', component : BezbednosniDokumentComponent },
  { path : 'elementi-mreze', component: PregledElemenataMrezeComponent },
  { path : 'moj-profil', component: MojProfilComponent },
  { path : 'dashboard', component: DashboardComponent },
  { path : 'dodaj-poziv', component: DodajPozivComponent },
  { path : '', redirectTo: 'ne-registrovan', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
