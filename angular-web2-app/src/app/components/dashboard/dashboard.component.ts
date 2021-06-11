import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { IncidentService } from "src/app/services/incident/incident.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private incidentService:IncidentService, 
  ) { }

  ngOnInit(): void {
    // 0 - idKorisnik za kojeg smo dodali podatke
    this.incidentService.getIncidentKorisnik(0).subscribe((Incidenti) => {
            
      let chartColumn = new CanvasJS.Chart("columnChartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Incidenti column chart"
        },
        data: [{
          type: "column",
          dataPoints: this.parseColumnData(Incidenti)
        }]
      });
        
      let chartPie = new CanvasJS.Chart("pieChartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Dokumenti pie chart"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: 450, name: "Food" },
            { y: 120, name: "Insurance" },
            { y: 300, name: "Traveling" },
            { y: 800, name: "Housing" },
            { y: 150, name: "Education" },
            { y: 150, name: "Shopping"},
            { y: 250, name: "Others" }
          ]
        }]
      });
  
      chartColumn.render();
      chartPie.render();
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



    return paresedData;
  }
}
