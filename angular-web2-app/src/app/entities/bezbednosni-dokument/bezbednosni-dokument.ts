export class BezbednosniDokument {
    idBezbednosnogDokumenta:number;
    Tip:string;
    Status:string;
    //idKorisnika:number;
    Ekipa:string;
    Detalji:string;
    Beleske:string;
    TelefonskiBroj:string;
    DatumKreiranja:Date;
    AllWorkOperationsCompleted:boolean;
    AllTagsRemoved:boolean;
    GroundingRemoved:boolean;
    ReadyForService:boolean;

    constructor(idBezbednosnogDokumenta:number, Tip:string, Status:string, Ekipa:string, Detalji:string, Beleske:string,
        TelefonskiBroj:string, DatumKreiranja:Date, AllWorkOperationsCompleted:boolean, AllTagsRemoved:boolean, GroundingRemoved:boolean, ReadyForService:boolean) {
            this.idBezbednosnogDokumenta = idBezbednosnogDokumenta;
            this.Tip = Tip;
            this.Status = Status;
            this.Ekipa = Ekipa;
            this.Detalji = Detalji;
            this.Beleske = Beleske;
            this.TelefonskiBroj = TelefonskiBroj;
            this.DatumKreiranja = DatumKreiranja;
            this.AllWorkOperationsCompleted = AllWorkOperationsCompleted;
            this.AllTagsRemoved = AllTagsRemoved;
            this.GroundingRemoved = GroundingRemoved;
            this.ReadyForService = ReadyForService;
    }
}
