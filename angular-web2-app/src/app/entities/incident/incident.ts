export class Incident {
    public static globalId:number = 0;

    id:number;
    pocetniDatum:Date;
    brojTelefona:string;
    status:string;
    adresa:string;

    constructor(datum:Date, broj:string, status:string, adresa:string) {
        this.pocetniDatum = datum;
        this.brojTelefona = broj;
        this.status = status;
        this.adresa = adresa;

        this.id = this.incremntId();
    }

    incremntId():number
    {
        return Incident.globalId++;
    }
}
