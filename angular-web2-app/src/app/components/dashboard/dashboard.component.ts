import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { IncidentService } from "src/app/services/incident/incident.service";
import { KorisnikService } from 'src/app/services/korisnik/korisnik.service';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';
import { PlanRadaService } from 'src/app/services/plan-rada/plan-rada.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  incidentiStatusi:number[] = [0, 0, 0];
  bezbednosniDokumentiStatusi:number[] = [0, 0, 0];
  planoviRadaStatusi:number[] = [0, 0, 0]

  constructor(
    private incidentService:IncidentService,
    private bezbednosniDokumentService:BezbednosniDokumentService, 
    private planRadaService:PlanRadaService,
    private korisnkService:KorisnikService
  ) { }

  ngOnInit(): void {
    // Stubovi - 0 - idKorisnik za kojeg smo dodali podatke
    this.incidentService.getIncidentKorisnik(0).subscribe((Incidenti) => {
      this.parseIncidentiStatusi(Incidenti); // Status incidenata

      let chartColumn = new CanvasJS.Chart("columnChartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Incidenti stubovi graf"
        },
        data: [{
          type: "column",
          dataPoints: this.parseColumnData(Incidenti)
        }]
      });
      chartColumn.render();
    });

    // Pita - 0 - idKorisnik za kojeg smo dodali podatke
    this.korisnkService.getDokumenti(0).subscribe(data => {   
      let chartPie = new CanvasJS.Chart("pieChartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Dokumenti pita graf"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: this.parsePieData(data)
        }]
      });
      chartPie.render();
    });

    // Status bezbednosnih dokumenta - 0 - idKorisnik za kojeg smo dodali podatke
    this.bezbednosniDokumentService.getBezbednosniDokumentKorisnik(0).subscribe(data => {
      this.parseBezbednosniDokumentiStatusi(data);
    });

    // Status plana rada - 0 - idKorisnik za kojeg smo dodali podatke
    this.planRadaService.getPlanRadaKorisnik(0).subscribe(data => {
      this.parsePlanoviRadaStatusi(data);
    });
  }

  parseColumnData(data) : any[]{
    let paresedData:any[] = [];
    paresedData.push({y: 0, label: "Planirani"});
    paresedData.push({y: 0, label: "Neplanirani"});

    for (var i = 0; i < data.length; i++) 
    {
      for (var j = 0; j < paresedData.length; j++)
      {
        if (paresedData[j].label == data[i].NazivTipIncidenta)
        {
          paresedData[j].y = paresedData[j].y + 1;
        }
      }
    }
    return paresedData;
  }

  parsePieData(data) : any[] {
    let paresedData:any[] = [];
    paresedData.push({y: 0, name: "Bezbednosni dokumenti"});
    paresedData.push({y: 0, name: "Incidenti"});
    paresedData.push({y: 0, name: "Planovi rada"});

      for (var i = 0; i < paresedData.length; i++)
      {
        if (paresedData[i].name == "Bezbednosni dokumenti")
        {
          paresedData[i].y = data[0].BezbednosniDokument;
        }
        else if(paresedData[i].name == "Incidenti")
        {
          paresedData[i].y = data[0].Incidenti;
        }
        else if(paresedData[i].name == "Planovi rada")
        {
          paresedData[i].y = data[0].PlanRada;
        }
      }
    return paresedData;
  }

  parseIncidentiStatusi(data) {    
    data.map(x => {      
      if (x.NazivStatusaIncidenta == "Resen")
      {
        this.incidentiStatusi[0]++;
      }
      else if (x.NazivStatusaIncidenta == "Izraden")
      {
        this.incidentiStatusi[1]++;
      }
      else if (x.NazivStatusaIncidenta == "Dostavljen")
      {
        this.incidentiStatusi[2]++;
      }
    });
  }

  parseBezbednosniDokumentiStatusi(data) {    
    data.map(x => {      
      if (x.Status == "Izraden")
      {
        this.bezbednosniDokumentiStatusi[0]++;
      }
      else if (x.Status == "Greska")
      {
        this.bezbednosniDokumentiStatusi[1]++;
      }
      else if (x.Status == "Obustavljen")
      {
        this.bezbednosniDokumentiStatusi[2]++;
      }
    });
  }

  parsePlanoviRadaStatusi(data) {
    data.map(x => {
      if (x.Status == "Izraden")
      {
        this.planoviRadaStatusi[0]++;
      }
      else if (x.Status == "Greska")
      {
        this.planoviRadaStatusi[1]++;
      }
      else if (x.Status == "Obustavljen")
      {
        this.planoviRadaStatusi[2]++;
      }
    });
  }
}
