using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class BezbednosniDokument
    {
        public int idBezbednosnogDokumenta { get; set; }
        public string Tip { get; set; }
        public string Status { get; set; }
        //public int idKorisnika { get; set; }
        public string Ekipa { get; set; }
        public string Detalji { get; set; }
        public string Beleske { get; set; }
        public string TelefonskiBroj { get; set; }
        public DateTime DatumKreiranja { get; set; }
        public bool AllWorkOperationsCompleted { get; set; }
        public bool AllTagsRemoved { get; set; }
        public bool GroundingRemoved { get; set; }
        public bool ReadyForService { get; set; }
    }
}