import { Component, OnInit } from '@angular/core';
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
  idKoirniska:number = 0;
  incidentiStatusi:number[] = [0, 0, 0];
  bezbednosniDokumentiStatusi:number[] = [0, 0, 0];
  planoviRadaStatusi:number[] = [0, 0, 0]

  incidentiMulti:any; // podaci za area-chart
  // options
  view: [number, number] = [700, 370];
  colorSchemeArea = {
    domain: ['#704FC4', '#4B852C']
  };
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Datum';
  yAxisLabel: string = 'Kolicina';
  timeline: boolean = true;

  dokumenti:any; // podaci za pie-chart
  colorSchemePie = {
    domain: ['#704FC4', '#4B852C', '#B67A3D']
  };

  constructor(
    private incidentService:IncidentService,
    private bezbednosniDokumentService:BezbednosniDokumentService, 
    private planRadaService:PlanRadaService,
    private korisnkService:KorisnikService
  ) { }

  ngOnInit(): void {
    // Area - 0 - idKorisnik za kojeg smo dodali podatke
    this.incidentService.chart(this.idKoirniska).subscribe(data => {
      this.incidentiMulti = data;
    });

    // Pita - 0 - idKorisnik za kojeg smo dodali podatke
    this.korisnkService.getDokumenti(this.idKoirniska).subscribe(data => {   
      this.dokumenti = this.parsePieData(data);
    });

     // Status incidenata - 0 - idKorisnik za kojeg smo dodali podatke
    this.incidentService.getIncidentKorisnik(this.idKoirniska).subscribe((Incidenti) => {
      this.parseIncidentiStatusi(Incidenti);
    });

    // Status bezbednosnih dokumenta - 0 - idKorisnik za kojeg smo dodali podatke
    this.bezbednosniDokumentService.getBezbednosniDokumentKorisnik(this.idKoirniska).subscribe(data => {
      this.parseBezbednosniDokumentiStatusi(data);
    });

    // Status plana rada - 0 - idKorisnik za kojeg smo dodali podatke
    this.planRadaService.getPlanRadaKorisnik(this.idKoirniska).subscribe(data => {
      this.parsePlanoviRadaStatusi(data);
    });
  }

  parsePieData(data) : any[] {
    let paresedData:any[] = [];
    paresedData.push({name: "Bezbednosni dokumenti", value: 0});
    paresedData.push({name: "Incidenti", value: 0});
    paresedData.push({name: "Planovi rada", value: 0});

      for (var i = 0; i < paresedData.length; i++)
      {
        if (paresedData[i].name == "Bezbednosni dokumenti")
        {
          paresedData[i].value = data[0].BezbednosniDokument;
        }
        else if(paresedData[i].name == "Incidenti")
        {
          paresedData[i].value = data[0].Incidenti;
        }
        else if(paresedData[i].name == "Planovi rada")
        {
          paresedData[i].value = data[0].PlanRada;
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

