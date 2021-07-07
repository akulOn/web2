using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Resenje
    {
        public int idResenje { get; set; }
        public string NazivUzroka { get; set; }
        public string NazivPoduzroka { get; set; }
        public string NazivTipKonstrukcije { get; set; }
        public string NazivTipMaterijala { get; set; }
    }
}