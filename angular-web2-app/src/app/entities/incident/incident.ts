export class Incident {
    idIncidenta:number;
    nazivTipIncidenta:string;
    prioritet:number;
    potvrdjen:boolean;
    nazivStatusaIncidenta:string;
    ETA:Date;
    ATA:Date;
    ETR:Date;
    nivoNapona:number;
    planiranoVremeRada:Date;
    idKorisnika:number;

    constructor(idIncidenta:number, nazivTipIncidenta:string, prioritet:number, potvrdjen:boolean, nazivStatusaIncidenta:string, ETA:Date,
        ATA:Date, ETR:Date, nivoNapona:number, planiranoVremeRada:Date, idKorisnika:number) {
        this.idIncidenta = idIncidenta;
        this.nazivTipIncidenta = nazivTipIncidenta;
        this.prioritet = prioritet;
        this.potvrdjen = potvrdjen;
        this.nazivStatusaIncidenta = nazivStatusaIncidenta;
        this.ETA = ETA;
        this.ATA = ATA;
        this.ETR = ETR;
        this.nivoNapona = nivoNapona;
        this.planiranoVremeRada = planiranoVremeRada;
        this.idKorisnika = idKorisnika;
    }
}
