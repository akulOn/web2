using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Poziv
    {
        public int idPoziva { get; set; }
        public string Razlog { get; set; }
        public string Komentar { get; set; }
        public string Kvar { get; set; }
        public int idPotrosaca { get; set; }
    }
}