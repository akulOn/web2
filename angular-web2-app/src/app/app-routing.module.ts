import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncidentiComponent } from './components/incidenti/incidenti/incidenti.component';
import { NeRegistrovanComponent } from './components/neRegistrovan/ne-registrovan/ne-registrovan.component';
import { DodajIncidentComponent } from "./components/incidenti/dodaj-incident/dodaj-incident.component";
import { BezbednosniDokumentComponent } from './components/bezbednosniDokumenti/bezbednosni-dokument/bezbednosni-dokument.component';

const routes: Routes = [
  { path : 'incidenti', component: IncidentiComponent },
  { path : 'neReg', component: NeRegistrovanComponent },
  { path : 'dodaj-incident', component: DodajIncidentComponent },
  { path : 'bezbednosni-dokumenti', component: BezbednosniDokumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
