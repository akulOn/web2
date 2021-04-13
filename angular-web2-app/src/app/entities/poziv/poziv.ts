export class Poziv {
    IdPoziva:number;
    IdRazloga:number;
    Komentar:string;
    Kvar:string;
    IdTipPotrosaca:number;

    constructor(IdPoziva:number, IdRazloga:number, Komentar:string, Kvar:string, IdTipPotrosaca:number){
        this.IdPoziva = IdPoziva;
        this.IdRazloga = IdRazloga;
        this.Komentar = Komentar;
        this.Kvar = Kvar;
        this.IdTipPotrosaca = IdTipPotrosaca;
    }
}