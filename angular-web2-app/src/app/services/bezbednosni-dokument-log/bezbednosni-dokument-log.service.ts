import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BezbednosniDokumentLog } from 'src/app/entities/bezbednosni-dokument-log/bezbednosni-dokument-log';

@Injectable({
  providedIn: 'root'
})
export class BezbednosniDokumentLogService {
  readonly APIUrl = "https://localhost:44335/api";

  constructor(private http:HttpClient) {  }

  getAllBezbednosneDokumenteLog():Observable<BezbednosniDokumentLog[]>{
    return this.http.get<BezbednosniDokumentLog[]>(this.APIUrl + "/BezbednosniDokumentLog/GetAll");
  }
}
