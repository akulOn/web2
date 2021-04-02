using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Poziv
    {
        public int IdRazloga { get; set; }
        public string Komentar { get; set; }
        public string Kvar { get; set; }
        public string IdPotrosaca { get; set; }
    }
}