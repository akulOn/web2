import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncidentiComponent } from './components/incidenti/incidenti/incidenti.component';
import { NeRegistrovanComponent } from './components/neRegistrovan/ne-registrovan/ne-registrovan.component';

const routes: Routes = [
  { path : 'incidenti', component: IncidentiComponent },
  { path : 'neReg', component: NeRegistrovanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
