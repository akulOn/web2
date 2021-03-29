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
    const i2 = new Incident(new Date('2021-01-01'), '0637747444', 'done', 'Aksentija Marodica 73');
    const i3 = new Incident(new Date('2021-01-01'), '0637747444', 'done', 'Aksentija Marodica 73');
    const i4 = new Incident(new Date('2021-01-01'), '0637747444', 'done', 'Aksentija Marodica 73');

    incidenti.push(i1);
    incidenti.push(i2);
    incidenti.push(i3);
    incidenti.push(i4);

    return incidenti;
  }

  constructor() { }
}
