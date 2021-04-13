import { Injectable } from '@angular/core';
import { Oprema } from '../../entities/oprema/oprema';
import { Poziv } from "../../entities/poziv/poziv";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; // async

@Injectable({
  providedIn: 'root'
})
export class OpremaService {

  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllOprema():Observable<Oprema>{
    return this.http.get<Oprema>(this.APIUrl + "/Oprema/GetAll");
  }

  getAllSafeOprema():Observable<Oprema>{ // vraca svu opremu koja nije dodeljena nekom incidentu
    return this.http.get<Oprema>(this.APIUrl + "/Oprema/GetAllSafe");
  }

  getOprema(id:number){
    return this.http.get<Oprema>(this.APIUrl + "/Oprema/" + id);
  }

  addOprema(oprema:Oprema){
    return this.http.post(this.APIUrl + "/Oprema/", oprema);
  }

  getAllPoziviVezaniZaOpremu(id:number){
    return this.http.get<Poziv>(this.APIUrl + "/Oprema/GetAllPoziviVezaniZaOpremu/" + id);
  }
}
