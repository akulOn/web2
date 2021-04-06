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

  constructor(private incidentService:IncidentService) { 
  }

  ngOnInit(): void {
    this.ucitajIncidente();
  }

  ucitajIncidente(){
    this.incidentService.getAllIncidenti().subscribe(data => {
      this.incidenti = data;
    }); 
  }
}
