import { Injectable } from '@angular/core';
import { Incident } from '../../entities/incident/incident';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; // async
import { Oprema } from 'src/app/entities/oprema/oprema';

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

  getOprema(id:number) : Observable<Oprema[]> {
    return this.http.get<Oprema[]>(this.APIUrl + "/Incident/Oprema/" + id);
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

  getSlike(id:number) {
    return this.http.get<any[]>(this.APIUrl + "/Incident/Slike/" + id);
  }

  addSlikaToIncident(id:number, slika:FormData){
    return this.http.put(this.APIUrl + "/Incident/DodajSliku/" + id, slika);
  }

  deleteSlika(idIncidenta:number, idSlike:number) {
    return this.http.put(this.APIUrl + "/Incident/IzbaciSliku/", {idIncidenta, idSlike});
  }

  prebaciSliku(idIncidenta:number, idSlike:number) {
    return this.http.put(this.APIUrl + "/Incident/PrebaciSliku/", {idIncidenta, idSlike});
  }

  chart(id:number) {
    return this.http.get<any[]>(this.APIUrl + "/Incident/Chart/" + id);
  }
}
