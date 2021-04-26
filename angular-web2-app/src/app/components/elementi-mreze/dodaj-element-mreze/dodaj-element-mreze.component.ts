import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { OpremaService } from 'src/app/services/oprema/oprema.service';

@Component({
  selector: 'app-dodaj-element-mreze',
  templateUrl: './dodaj-element-mreze.component.html',
  styleUrls: ['./dodaj-element-mreze.component.css']
})
export class DodajElementMrezeComponent implements OnInit {
  dodajOpremuForm = this.formBuilder.group({
    Tip: ['Prekidac', Validators.required],
    Kordinate: ['', Validators.required],
    Adresa: ['', Validators.required]
  });
  
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private formBuilder:FormBuilder, private opremaService:OpremaService) { }

  ngOnInit(): void {
  }

  onSubmitOprema() {
    this.messageEvent.emit("Uspesno ste dodali element!");

    console.warn('Dodali ste opremu!', this.dodajOpremuForm.value);

    this.opremaService.addOprema(this.dodajOpremuForm.value).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
  }
}
