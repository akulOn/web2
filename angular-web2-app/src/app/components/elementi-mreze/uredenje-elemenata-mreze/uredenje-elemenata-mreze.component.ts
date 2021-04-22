import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Oprema } from 'src/app/entities/oprema/oprema';
import { OpremaService } from 'src/app/services/oprema/oprema.service';

@Component({
  selector: 'app-uredenje-elemenata-mreze',
  templateUrl: './uredenje-elemenata-mreze.component.html',
  styleUrls: ['./uredenje-elemenata-mreze.component.css']
})
export class UredenjeElemenataMrezeComponent implements OnInit {
  urediOpremuForm = this.formBuilder.group({
    Tip: ['', Validators.required],
    Kordinate: ['', Validators.required],
    Adresa: ['', Validators.required]
  });

  Oprema:any;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private formBuilder:FormBuilder, private opremaService:OpremaService) { }

  ngOnInit(): void {

  }

  FormConstructor(id:number) {
    this.opremaService.getOprema(id).subscribe((data) => {
      this.Oprema = data;
      console.log(this.Oprema[0]);
      this.urediOpremuForm = this.formBuilder.group({
        Tip: [this.Oprema[0].Tip, Validators.required],
        Kordinate: [this.Oprema[0].Kordinate, Validators.required],
        Adresa: [this.Oprema[0].Adresa, Validators.required]
      });
    });
  }

  onSubmitOprema() {
    this.messageEvent.emit("Uspesno ste uredili element! " + this.Oprema[0].idOpreme);

    let temp:Oprema = new Oprema(this.Oprema[0].idOpreme, this.Oprema[0].Naziv, this.Oprema[0].Tip, this.urediOpremuForm.value.Kordinate, this.urediOpremuForm.value.Adresa);
    console.warn('Uredili ste opremu!', temp);
    this.opremaService.updateOprema(temp).subscribe() // server odgovara, mogu da uzmem odgovor sa lambda
  }
}
