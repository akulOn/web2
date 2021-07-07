export class Poziv {
    idPoziva:number;
    Razlog:string;
    Komentar:string;
    Kvar:string;
    idPotrosaca:number;

    constructor(idPoziva:number, Razlog:string, Komentar:string, Kvar:string, idPotrosaca:number){
        this.idPoziva = idPoziva;
        this.Razlog = Razlog;
        this.Komentar = Komentar;
        this.Kvar = Kvar;
        this.idPotrosaca = idPotrosaca;
    }
}