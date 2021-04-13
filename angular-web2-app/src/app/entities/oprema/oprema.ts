export class Oprema {
    IdOpreme:number;
    Naziv:string;
    IdTipOpreme:number;
    Kordinate:string;
    Adresa:string;

    constructor(IdOpreme:number, Naziv:string, IdTipOpreme:number, Kordinate:string, Adresa:string) {
        this.IdOpreme = IdOpreme;
        this.Naziv = Naziv;
        this.IdTipOpreme = IdTipOpreme;
        this.Kordinate = Kordinate;
        this.Adresa = Adresa;
    }
}