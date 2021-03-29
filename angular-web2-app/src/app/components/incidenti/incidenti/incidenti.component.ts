import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../../services/incident/incident.service';
import { Incident } from '../../../entities/incident/incident';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-incidenti',
  templateUrl: './incidenti.component.html',
  styleUrls: ['./incidenti.component.css']
})
export class IncidentiComponent implements OnInit {
  incidenti:Array<Incident>;
  order:string = 'id';

  constructor(private incidentService:IncidentService) { 
    this.incidenti = new Array<Incident>();
  }

  ngOnInit(): void {
  }

  ucitajIncidente()
  {
    this.incidenti = this.incidentService.mockedIncidenti();
  }

}
