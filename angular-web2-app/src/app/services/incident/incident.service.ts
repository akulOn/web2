import { Injectable } from '@angular/core';
import { Incident } from '../../entities/incident/incident';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; // async

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllIncidenti():Observable<Incident[]>{
    return this.http.get<Incident[]>(this.APIUrl + "/Incident/GetAll");
  }

  getIncident(id:number){
    return this.http.get<Incident>(this.APIUrl + "/Incident/" + id);
  }

  getIncidentKorisnik(id:number){
    return this.http.get<Incident[]>(this.APIUrl + "/Incident/Korisnik/" + id);
  }

  addIncident(incident:Incident){
    return this.http.post(this.APIUrl + "/Incident/", incident);
  }

  preuzmi(IdIncidenta:number, IdKorisnika:number) {
    return this.http.put(this.APIUrl + '/Incident/KorisnikPreuzmi/', {IdIncidenta, IdKorisnika} )
  }

  addOpremaToIncident(IdIncidenta:number, IdOpreme:number){
    return this.http.put(this.APIUrl + "/Incident/DodajOpremu", {IdIncidenta, IdOpreme} )
  }

  deleteOpremaFromIncident(IdIncidenta:number, IdOpreme:number){
    return this.http.put(this.APIUrl + "/Incident/IzbaciOpremu", {IdIncidenta, IdOpreme} )
  }

  addEkipaToIncident(IdIncidenta:number, IdEkipe:number){
    return this.http.put(this.APIUrl + "/Incident/DodajEkipu", {IdIncidenta, IdEkipe} )
  }

  addResenjeToIncident(IdIncidenta:number, IdResenja:number){
    return this.http.put(this.APIUrl + "/Incident/DodajResenje", {IdIncidenta, IdResenja} )
  }

  addSlikaToIncident(id:number, slika:FormData){
    return this.http.put(this.APIUrl + "/Incident/DodajSliku/" + id, slika);
  }
}
