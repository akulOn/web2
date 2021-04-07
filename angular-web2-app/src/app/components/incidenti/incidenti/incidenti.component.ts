import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidentService } from '../../../services/incident/incident.service';
import { Incident } from '../../../entities/incident/incident';

import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-incidenti',
  templateUrl: './incidenti.component.html',
  styleUrls: ['./incidenti.component.css']
})
export class IncidentiComponent implements OnInit {
  incidenti:any = [];
  sortedData:any = [];
  paginationData:any = [];

  constructor(private incidentService:IncidentService) { 
  }

  ngOnInit(): void {
    this.ucitajIncidente();
  }

  ucitajIncidente(){
    this.incidentService.getAllIncidenti().subscribe(data => {
      this.incidenti = data;
      this.sortedData = data;
      this.paginationData = data;
    });
  }
  sortData(sort: Sort) {
    const data = this.incidenti.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any ) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'Prioritet': return this.compare(a.Prioritet, b.Prioritet, isAsc);
        case 'Potvrdjen': return this.compare(a.Potvrdjen, b.Potvrdjen, isAsc);
        case 'ETA': return this.compare(a.ETA, b.ETA, isAsc);
        case 'ATA': return this.compare(a.ATA, b.ATA, isAsc);
        case 'ETR': return this.compare(a.ETR, b.ETR, isAsc);
        case 'Nivo Napona': return this.compare(a.NivoNapona, b.NivoNapona, isAsc);
        default: return 0;
      }
    });

    this.paginationData = data.sort((a: any, b: any ) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'Prioritet': return this.compare(a.Prioritet, b.Prioritet, isAsc);
        case 'Potvrdjen': return this.compare(a.Potvrdjen, b.Potvrdjen, isAsc);
        case 'ETA': return this.compare(a.ETA, b.ETA, isAsc);
        case 'ATA': return this.compare(a.ATA, b.ATA, isAsc);
        case 'ETR': return this.compare(a.ETR, b.ETR, isAsc);
        case 'Nivo Napona': return this.compare(a.NivoNapona, b.NivoNapona, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  pagination(length:number){
    if(length === 0)
    {
      this.sortedData = this.incidenti;
      return;
    }
    
    if(length > this.sortedData.length)
      this.sortedData = this.paginationData.slice(0, length);
    else
      this.sortedData = this.sortedData.slice(0, length);
  }
}
