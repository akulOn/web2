import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BezbednosniDokument } from 'src/app/entities/bezbednosni-dokument/bezbednosni-dokument';

@Injectable({
  providedIn: 'root'
})
export class BezbednosniDokumentService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllBezbednosneDokumente():Observable<BezbednosniDokument[]>{
    return this.http.get<BezbednosniDokument[]>(this.APIUrl + "/BezbednosniDokument/GetAll");
  }

  getBezbednosniDokument(id:number){
    return this.http.get<BezbednosniDokument>(this.APIUrl + "/BezbednosniDokument/" + id);
  }

  getBezbednosniDokumentKorisnik(id:number){
    return this.http.get<BezbednosniDokument>(this.APIUrl + "/BezbednosniDokument/Korisnik/" + id);
  }

  addBezbednosniDokument(bezbednosniDokument:BezbednosniDokument):Observable<BezbednosniDokument[]>{
    return this.http.post<BezbednosniDokument[]>(this.APIUrl + "/BezbednosniDokument/", bezbednosniDokument);
  }

  updateBezbednosniDokument(idBezbednosnogDokumenta:number, idStatusa:number){
    return this.http.put(this.APIUrl + "/BezbednosniDokument/UpdateBezbednosniDokument/", {idBezbednosnogDokumenta, idStatusa});
  }

  addSlikaToBezbednosniDokument(id:number, slika:FormData) {    
    return this.http.put(this.APIUrl + "/BezbednosniDokument/DodajSliku/" + id, slika);
  }

  addOpremaToBezbednosniDokument(idBezbednosnogDokumenta:number, idOpreme:number[]) {
    return this.http.put(this.APIUrl + "/BezbednosniDokument/DodajOpremu/",  {idBezbednosnogDokumenta, idOpreme});
  }
}
