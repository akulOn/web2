export class Oprema {
    idOpreme:number;
    Naziv:string;
    Tip:string;
    Kordinate:string;
    Adresa:string;

    constructor(idOpreme:number, Naziv:string, Tip:string, Kordinate:string, Adresa:string) {
        this.idOpreme = idOpreme;
        this.Naziv = Naziv;
        this.Tip = Tip;
        this.Kordinate = Kordinate;
        this.Adresa = Adresa;
    }
}