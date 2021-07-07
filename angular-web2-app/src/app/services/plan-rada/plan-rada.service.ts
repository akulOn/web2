import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanRadaService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getPlanRada(id:number) {
    return this.http.get(this.APIUrl + "/PlanRada/" + id);
  }

  getPlanRadaKorisnik(id:number) {
    return this.http.get(this.APIUrl + "/PlanRada/Korisnik/" + id);
  }
}
