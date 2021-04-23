import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BezbednosniDokumentService } from 'src/app/services/bezbednosni-dokument/bezbednosni-dokument.service';

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

  constructor(private formBuilder:FormBuilder, private bezbednosniDokumentService:BezbednosniDokumentService) {}

  ngOnInit(): void {
  }

  onSubmitBezbednosniDokument() {
    this.messageEvent.emit("Uspesno ste dodali bezbednosni dokument!");

    console.warn('Dodali ste bezbednosni dokument!', this.dodajBezbednosniDokumentForm.value);

    this.bezbednosniDokumentService.addBezbednosniDokument(this.dodajBezbednosniDokumentForm.value).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
  }
}
