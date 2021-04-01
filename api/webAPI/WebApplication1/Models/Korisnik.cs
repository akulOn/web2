using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Korisnik
    {
        public int IdKorisnika { get; set; }
        public string KorisnickoIme { get; set; }
        public string Email { get; set; }
        public string Lozinka { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime DatumRodenja { get; set; }
        public string Adresa { get; set; }
        public int IdTipKorisnika { get; set; }
        public int IdSlika { get; set; }

    }
}