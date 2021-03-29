import { Injectable } from '@angular/core';
import { Incident } from '../../entities/incident/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  mockedIncidenti() : Array<Incident>
  {
    let incidenti = new Array<Incident>();

    const i1 = new Incident(new Date('2021-01-01'), '0637747444', 'done', 'Aksentija Marodica 73');
    const i2 = new Incident(new Date('1998-01-27'), '0615756842', 'draft', 'Beogradski put 66');
    const i3 = new Incident(new Date('1996-04-30'), '0698243213', 'submited', 'Matija Gubca 69');
    const i4 = new Incident(new Date('2001-03-31'), '0624984649', 'danger', 'Braca Radica 25');

    incidenti.push(i1);
    incidenti.push(i2);
    incidenti.push(i3);
    incidenti.push(i4);

    return incidenti;
  }

  constructor() { }
}
