using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class BezbednosniDokumentLog
    {
        public int idBezbednosnogDokumenta { get; set; }
        public DateTime DatumPromene { get; set; }
        public int idKorisnika { get; set; }
        public string Status { get; set; }
    }
}