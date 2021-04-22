using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Oprema
    {
        public int idOpreme { get; set; } // dodaje se u bazi
        public string Naziv { get; set; } // dodaje se u bazi
        public string Tip { get; set; }
        public string Kordinate { get; set; }
        public string Adresa { get; set; }

    }
}