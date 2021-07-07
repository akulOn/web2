import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/app/entities/korisnik/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllKorisnici():Observable<Korisnik[]>{
    return this.http.get<Korisnik[]>(this.APIUrl + "/Korisnik/GetAll");
  }

  getAllPotrosaci():Observable<Korisnik[]>{
    return this.http.get<Korisnik[]>(this.APIUrl + "/Korisnik/getAllPotrosaci");
  }

  getKorisnik(id:number):Observable<Korisnik[]>{
    return this.http.get<Korisnik[]>(this.APIUrl + "/Korisnik/" + id);
  }

  addKorisnik(korisnik:Korisnik){
    return this.http.post(this.APIUrl + "/Korisnik/", korisnik);
  }

  getDokumenti(id:number):any{
    return this.http.get<any>(this.APIUrl + "/Korisnik/Dokumenti/" + id);
  }
}
