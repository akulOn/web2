using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Incident
    {
        public string NazivTipIncidenta { get; set; }
        public int Prioritet { get; set; }
        public bool Potvrdjen { get; set; }
        public string NazivStatusaIncidenta { get; set; }
        public DateTime ETA { get; set; }
        public DateTime ATA { get; set; }
        public DateTime ETR { get; set; }
        public float NivoNapona { get; set; }
        public DateTime PlaniranoVremeRada { get; set; }
        public int IdKorisnika { get; set; } // osoba koja treba da resi incident, moze biti osoba koja je dodala incident ili nekome da se dodeli
    }
}