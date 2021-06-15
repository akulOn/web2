import { Component, OnInit } from '@angular/core';
import { OpremaService } from 'src/app/services/oprema/oprema.service';
import { FormBuilder, Validators } from "@angular/forms";
import { PozivService } from 'src/app/services/poziv/poziv.service';
import { Poziv } from 'src/app/entities/poziv/poziv';

@Component({
  selector: 'app-dodaj-poziv',
  templateUrl: './dodaj-poziv.component.html',
  styleUrls: ['./dodaj-poziv.component.css']
})
export class DodajPozivComponent implements OnInit {
  Poziv!:Poziv;
  idPotrosaca:number = 0; // korisnik
  Oprema:any = [];
  opremaPoziv:number[] = []; // oprema za koju treba vezati poziv

  dodajPozivForm = this.formBuilder.group({
    razlog: ['Nema struje', Validators.required],
    komentar: [''],
    kvar: ['', Validators.required]
  });
  constructor(
    private formBuilder:FormBuilder, 
    private opremaService:OpremaService,
    private pozivService:PozivService
  ) { }

  ngOnInit(): void {
    this.opremaService.getAllOprema().subscribe(data => {
      this.Oprema = data;
    });
  }

  addIdOpreme(id:number)
  {
    if(!this.opremaPoziv.includes(id))
    {
      alert("Prijavili ste da se desio kvar sa opremon id: " + id);

      this.opremaPoziv.push(id);    
    }
    else
    {
      alert("Odustali ste od prijave kvara za opremu id: " + id);

      this.opremaPoziv.splice(this.opremaPoziv.indexOf(id), 1);
    }
    console.log(this.opremaPoziv);
  }

  onSubmitPoziv() {
    if(this.opremaPoziv.length == 0 || this.opremaPoziv == undefined)
    {
      alert("Morate prvo izabrati opremu!");
      return;
    }

    this.pozivService.addPoziv(new Poziv(0 /* nebitno */, this.dodajPozivForm.value.razlog, this.dodajPozivForm.value.komentar,
       this.dodajPozivForm.value.kvar, this.idPotrosaca)).subscribe(data => {

      this.Poziv = data[0];
      this.opremaService.addPozivToOprema(this.opremaPoziv, data[0].idPoziva).subscribe();
    });

    alert("Uspesno ste prijavili kvar!");
  }
}
