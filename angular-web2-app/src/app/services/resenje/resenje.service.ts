import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenjeService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllResenja():Observable<any>{
    return this.http.get<any>(this.APIUrl + "/Resenje/GetAll");
  }

  getResenje(id:number){
    return this.http.get<any>(this.APIUrl + "/Resenje/" + id);
  }

  addResenje(resenje:any){
    return this.http.post(this.APIUrl + "/Resenje/", resenje);
  }
}
