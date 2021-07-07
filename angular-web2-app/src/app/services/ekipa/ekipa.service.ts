import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EkipaService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllEkipe():Observable<any>{
    return this.http.get<any>(this.APIUrl + "/Ekipa/GetAll");
  }

  getEkipa(id:number){
    return this.http.get<any>(this.APIUrl + "/Ekipa/" + id);
  }

  addEkipa(ekipa:any){
    return this.http.post(this.APIUrl + "/Ekipa/", ekipa);
  }
}
