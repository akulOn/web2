import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../../services/incident/incident.service';
import { Incident } from '../../../entities/incident/incident';

import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-incidenti',
  templateUrl: './incidenti.component.html',
  styleUrls: ['./incidenti.component.css']
})
export class IncidentiComponent implements OnInit {
  incidenti:Array<Incident>;
  sortedData:Array<Incident>;
  order:string = "id";

  constructor(private incidentService:IncidentService) { 
    this.incidenti = new Array<Incident>();
    this.sortedData = this.incidenti.slice();
  }

  ngOnInit(): void {
  }

  ucitajIncidente()
  {
    this.incidentService.mockedIncidenti().forEach(x => this.incidenti.push(x))
    this.sortedData = this.incidenti.slice();
  }

  sortData(sort: Sort) {
    const data = this.incidenti.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'desc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'adresa': return this.compare(a.adresa, b.adresa, isAsc);
        case 'pocetniDatum': return this.compare(a.pocetniDatum, b.pocetniDatum, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'brojTelefona': return this.compare(a.brojTelefona, b.brojTelefona, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
