import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Incident } from 'src/app/entities/incident/incident';
import { EkipaService } from 'src/app/services/ekipa/ekipa.service';
import { IncidentService } from "src/app/services/incident/incident.service";
import { OpremaService } from 'src/app/services/oprema/oprema.service';
import { PozivService } from 'src/app/services/poziv/poziv.service';

@Component({
  selector: 'app-dodaj-incident',
  templateUrl: './dodaj-incident.component.html',
  styleUrls: ['./dodaj-incident.component.css']
})
export class DodajIncidentComponent implements OnInit {
  dodajIncidentForm = this.formBuilder.group({
    tipIncidenta: ['Planirani', Validators.required],
    prioritet: ['', [Validators.required, Validators.min(0)]] ,
    potvrdjen: '',
    statusIncidenta: ['submitted', Validators.required],
    ETA: ['', Validators.required],
    ATA: '',
    ETR: '',
    nivoNapona: ['', [Validators.required, Validators.min(0)]],
    planiranoVremeRada: '',
    idKorisnika: null
    },
    {
      validator: [DateValidator('ETA', 'ATA'), DateValidator('ATA', 'ETR'), DateValidator('ETR', 'planiranoVremeRada')]
    }
  );

  dodajResenjeForm = this.formBuilder.group({
    uzrok: ['', Validators.required],
    poduzrok: ['', Validators.required],
    tipKonstrukcije: ['Podzemni', Validators.required],
    tipMaterijala: ['Metal', Validators.required]
  });

  dodajPozivForm = this.formBuilder.group({
    razlog: ['', Validators.required],
    komentar: [''],
    kvar: ['', Validators.required],
    idPotrosaca: ['']
  })

  Oprema:any = [];
  Pozivi:any = [];
  Ekipe:any = [];
  opremaIncident:number[] = []; // oprema koja se treba dodati treuntnom incidentu

  constructor(
    private formBuilder:FormBuilder, 
    private service:IncidentService, 
    private opremaService:OpremaService,
    private pozivService:PozivService,
    private ekipaService:EkipaService
    ) { }

  ngOnInit(): void {
    this.opremaService.getAllOprema().subscribe(data => {
      this.Oprema = data;
    });

    this.ekipaService.getAllEkipe().subscribe(data => {
      this.Ekipe = data
    })
  }

  onSubmit(){
    // tu se moze pokupiti id trenutno logovanog korisnika
    console.warn('Dodali ste incident!', this.dodajIncidentForm.value);

    this.service.addIncident(this.dodajIncidentForm.value).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
  }

  addId(id:number){
    if(!this.opremaIncident.includes(id))
    {
      this.opremaIncident.push(id);
      this.opremaService.getAllPoziviVezaniZaOpremu(id).subscribe(data => {
        this.Pozivi = data;
      });
    }
    else
    {
      this.opremaIncident.splice(this.opremaIncident.indexOf(id));
      this.Pozivi.splice(this.Pozivi.indexOf(id));
    }
    console.log(this.opremaIncident);
  }
}

export function DateValidator(date1: string, date2: string) { // treba mi pomoc
  return function (frm:any) {
    let Date1:Date = new Date(frm.get(date1).value);
    let Date2:Date = new Date(frm.get(date2).value);

    if (Date1.getTime() > Date2.getTime()) {
      return { 'match': `value ${Date2} is greter then ${Date1}` }
    }
    return null;  
  }
}
