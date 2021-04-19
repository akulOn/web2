export class Resenje {
    NazivUzroka:string;
    NazivPoduzroka:string;
    NazivTipKonstrukcije:string;
    NazivTipMaterijala:string;

    constructor(nazivUzroka:string, nazivPoduzroka:string, nazivTipKonstrukcije:string, nazivTipMaterijala:string) {
        this.NazivUzroka = nazivUzroka;
        this.NazivPoduzroka = nazivPoduzroka;
        this.NazivTipKonstrukcije = nazivTipKonstrukcije;
        this.NazivTipMaterijala = nazivTipMaterijala;
    }
}