export class Korisnik {
    idKorisnika:number;
    KorisnickoIme:string;
    Email:string;
    Lozinka:string;
    Ime:string;
    Prezime:string;
    DatumRodenja:Date;
    Adresa:string;
    Tip:string;
    Slika:string;

    constructor(idKorisnika:number, KorisnickoIme:string, Email:string, Lozinka:string, Ime:string, Prezime:string, DatumRodenja:Date, Adresa:string, Tip:string, Slika:string) {
        this.idKorisnika = idKorisnika;
        this.KorisnickoIme = KorisnickoIme;
        this.Email = Email;
        this.Lozinka = Lozinka;
        this.Ime = Ime;
        this.Prezime = Prezime;
        this.DatumRodenja = DatumRodenja;
        this.Adresa = Adresa;
        this.Tip = Tip;
        this.Slika = Slika;
    }
}