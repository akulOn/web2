import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Incident } from 'src/app/entities/incident/incident';
import { Resenje } from 'src/app/entities/resenje/resenje';
import { EkipaService } from 'src/app/services/ekipa/ekipa.service';
import { IncidentService } from "src/app/services/incident/incident.service";
import { OpremaService } from 'src/app/services/oprema/oprema.service';
import { PozivService } from 'src/app/services/poziv/poziv.service';
import { ResenjeService } from 'src/app/services/resenje/resenje.service';

@Component({
  selector: 'app-dodaj-incident',
  templateUrl: './dodaj-incident.component.html',
  styleUrls: ['./dodaj-incident.component.css']
})
export class DodajIncidentComponent implements OnInit {
  dodajIncidentForm = this.formBuilder.group({
    NazivTipIncidenta: ['Planirani', Validators.required],
    prioritet: ['', [Validators.required, Validators.min(0)]] ,
    potvrdjen: '',
    NazivStatusaIncidenta: ['submitted', Validators.required],
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

  Incident:any;
  Resenje:any;

  Oprema:any = [];
  Pozivi:any = [];
  Ekipe:any = [];
  opremaIncident:number[] = []; // oprema koja se treba dodati treuntnom incidentu

  constructor(
    private formBuilder:FormBuilder, 
    private incidentService:IncidentService, 
    private opremaService:OpremaService,
    private pozivService:PozivService,
    private ekipaService:EkipaService,
    private resenjeService:ResenjeService
    ) { }

  ngOnInit(): void {
    this.Incident = -1;

    this.opremaService.getAllSafeOprema().subscribe(data => {
      this.Oprema = data;
    });

    this.ekipaService.getAllEkipe().subscribe(data => {
      this.Ekipe = data
    })
  }

  onSubmitIncident(){
    // tu se moze pokupiti id trenutno logovanog korisnika
    console.warn('Dodali ste incident!', this.dodajIncidentForm.value);

    this.incidentService.addIncident(this.dodajIncidentForm.value).subscribe(data => {
      this.Incident = data;
    }) // server odgovara, mogu da uzmem odgovor sa lambda
  }

  onSubmitResenje(){
    if(this.Incident === -1)
      alert("Morate prvo da dodate Incident da bi mogli da dodate resenje!");
    else if (this.Resenje == null)
    {
      this.Resenje = new Resenje(this.dodajResenjeForm.value.uzrok, this.dodajResenjeForm.value.poduzrok, this.dodajResenjeForm.value.tipKonstrukcije, this.dodajResenjeForm.value.tipMaterijala)

      console.warn('Dodali ste resenje!', this.Resenje);

      this.resenjeService.addResenje(this.Resenje).subscribe(data => {
        this.Resenje = data
        console.log(this.Resenje)
        this.incidentService.addResenjeToIncident(this.Incident[0].idIncidenta, this.Resenje[0].idResenja).subscribe()
      }) // server odgovara, mogu da uzmem odgovor sa lambda
    }
    else
    {
      alert("Vec ste dodali resenje!");
    }
  }

  addEkipaToIncident(idEkipe:number){
    if(this.Incident === -1)
      alert("Morate prvo da dodate Incident da bi mogli da dodate ekipu!");
    else
      this.incidentService.addEkipaToIncident(this.Incident[0].idIncidenta, idEkipe).subscribe()
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
