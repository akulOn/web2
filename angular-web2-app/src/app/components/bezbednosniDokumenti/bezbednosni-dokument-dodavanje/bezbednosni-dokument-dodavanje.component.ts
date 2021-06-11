import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BezbednosniDokument } from 'src/app/entities/bezbednosni-dokument/bezbednosni-dokument';
import { Oprema } from 'src/app/entities/oprema/oprema';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';
import { OpremaService } from 'src/app/services/oprema/oprema.service';

@Component({
  selector: 'app-bezbednosni-dokument-dodavanje',
  templateUrl: './bezbednosni-dokument-dodavanje.component.html',
  styleUrls: ['./bezbednosni-dokument-dodavanje.component.css']
})
export class BezbednosniDokumentDodavanjeComponent implements OnInit {

  dodajBezbednosniDokumentForm = this.formBuilder.group({
    Tip: ['Planirani rad', Validators.required],
    Status: ['Drafted', Validators.required], // {value: 'Drafted', disabled: true}
    Ekipa: ['KOI Code', Validators.required], // {value: 'KOI Code', disabled: true}
    Detalji: [''],
    Beleske: [''],
    DatumKreiranja:[new Date().toString()], // {value: new Date().toString(), disabled: true}
    AllWorkOperationsCompleted: [false],
    AllTagsRemoved: [false],
    GroundingRemoved: [false],
    ReadyForService: [false]
  });

  // Plan rada => ekipa
  // Korisnik koji je kreirao dokument = > telefonski broj
  // Datum Automatski

  @Output() messageEvent = new EventEmitter<string>();

  Oprema:Oprema[] = [];
  OpremaToAdd:number[] = [];
  izabranaSlika!:File;

  constructor(private formBuilder:FormBuilder,
     private bezbednosniDokumentService:BezbednosniDokumentService,
     private opremaService:OpremaService) {}

  ngOnInit(): void {
    this.opremaService.getAllOprema().subscribe(data => {
      this.Oprema = data;
    });
  }

  onFileSelected(event:any) {
    this.izabranaSlika = event.target!.files[0];
  }

  onSubmitBezbednosniDokument() {
    this.messageEvent.emit("Uspesno ste dodali bezbednosni dokument!");

    console.warn('Dodali ste bezbednosni dokument!', this.dodajBezbednosniDokumentForm.value);

    const slika = new FormData();
    try{
      slika.append('image', this.izabranaSlika, this.izabranaSlika.name);
    }
    catch{
      console.log("Niste izabrali sliku!");
    }
    this.bezbednosniDokumentService.addBezbednosniDokument(this.dodajBezbednosniDokumentForm.value).subscribe( data => {
      console.log(data[0]);
      console.log(this.izabranaSlika.name);
      
      this.bezbednosniDokumentService.addOpremaToBezbednosniDokument(data[0].idBezbednosnogDokumenta, this.OpremaToAdd).subscribe();
      this.bezbednosniDokumentService.addSlikaToBezbednosniDokument(data[0].idBezbednosnogDokumenta, slika).subscribe();
    }) // server odgovara, mogu da uzmem odgovor sa lambda
  }

  addId(idOpreme:number) {
    if(!this.OpremaToAdd.includes(idOpreme))
    {
      this.OpremaToAdd.push(idOpreme);
    }
    else
    {
      this.OpremaToAdd.splice(this.OpremaToAdd.indexOf(idOpreme), 1);
    }
    console.log(this.OpremaToAdd);
  }

  getPlanRada(/*id:number*/) {
    // id - idPlanaRada
    const id:number = 1; // jedini Plan rada u bazi
    this.bezbednosniDokumentService.getPlanRada(id).subscribe(data =>
      {
        console.log(data);
      })
  }
}
