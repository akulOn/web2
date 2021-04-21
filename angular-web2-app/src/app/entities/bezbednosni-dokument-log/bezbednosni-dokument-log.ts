export class BezbednosniDokumentLog {
    idBezbednosnogDokumenta:number;
    Status:string;
    //idKorisnika:number;
    DatumPromene:Date;

    constructor(idBezbednosnogDokumenta:number, Status:string, DatumPromene:Date) {
        this.idBezbednosnogDokumenta = idBezbednosnogDokumenta;
        this.Status = Status;
        this.DatumPromene = DatumPromene;
    }
}
