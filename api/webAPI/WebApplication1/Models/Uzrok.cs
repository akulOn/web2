using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Uzrok
    {
        // poduzrok ce imati idRoditelja, dok uzrok nece imati idRoditelja
        public string NazivUzroka { get; set; }
        public string NazivPoduzroka { get; set; }
        // public int IdRoditelja { get; set; }
    }
}