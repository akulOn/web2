import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poziv } from 'src/app/entities/poziv/poziv';

@Injectable({
  providedIn: 'root'
})
export class PozivService {

  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllPozivi():Observable<Poziv>{
    return this.http.get<Poziv>(this.APIUrl + "/Poziv/GetAll");
  }

  getPoziv(id:number){
    return this.http.get<Poziv>(this.APIUrl + "/Poziv/" + id);
  }

  addPoziv(poziv:Poziv){
    return this.http.post(this.APIUrl + "/Poziv/", poziv);
  }
}
