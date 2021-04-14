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
    ETA: '',
    ATA: ['', this.ATAValidator],
    ETR: '',
    nivoNapona: ['', [Validators.required, Validators.min(0)]],
    planiranoVremeRada: '',
    idKorisnika: null
  });

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

  ETA:Date = new Date();
  ATA:Date = new Date();

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

    this.service.addIncident(new Incident(0, this.dodajIncidentForm.value.tipIncidenta, this.dodajIncidentForm.value.prioritet, this.dodajIncidentForm.value.potvrdjen === null ? false : true, // desi se null
      this.dodajIncidentForm.value.statusIncidenta, this.dodajIncidentForm.value.ETA, this.dodajIncidentForm.value.ATA, this.dodajIncidentForm.value.ETR, this.dodajIncidentForm.value.nivoNapona,
      this.dodajIncidentForm.value.planiranoVremeRada, this.dodajIncidentForm.value.idKorisnika)).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
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

  ATAValidator (control: AbstractControl):{[key: string]: boolean} | null {
    if( control.value === null || control.value > this.ETA){  
      return {'ATAValidator': true}
    }
    return null;
  };
}


