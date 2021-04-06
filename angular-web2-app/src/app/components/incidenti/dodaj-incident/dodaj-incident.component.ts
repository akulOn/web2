import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Incident } from 'src/app/entities/incident/incident';
import { IncidentService } from "src/app/services/incident/incident.service";

@Component({
  selector: 'app-dodaj-incident',
  templateUrl: './dodaj-incident.component.html',
  styleUrls: ['./dodaj-incident.component.css']
})
export class DodajIncidentComponent implements OnInit {
  dodajForm = this.formBuilder.group({
    tipIncidenta: ['', Validators.required],
    prioritet: ['', [Validators.required, Validators.min(0)]] ,
    potvrdjen: '',
    statusIncidenta: ['', Validators.required],
    ETA: '',
    ATA: '',
    ETR: '',
    nivoNapona: ['', [Validators.required, Validators.min(0)]],
    planiranoVremeRada: '',
    idKorisnika: null
  });

  constructor(private formBuilder:FormBuilder, private service:IncidentService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // tu se moze pokupiti id trenutno logovanog korisnika
    console.warn('Dodali ste incident!', this.dodajForm.value);

    this.service.addIncident(new Incident(0, this.dodajForm.value.tipIncidenta, this.dodajForm.value.prioritet, this.dodajForm.value.potvrdjen === null ? false : true, // desi se null
      this.dodajForm.value.statusIncidenta, this.dodajForm.value.ETA, this.dodajForm.value.ATA, this.dodajForm.value.ETR, this.dodajForm.value.nivoNapona,
      this.dodajForm.value.planiranoVremeRada, this.dodajForm.value.idKorisnika)).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
  }

}
