using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class BezbednosniDokumentLogController : ApiController
    {
        [Route("api/BezbednosniDokumentLog/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select 
	                    bdl.idBezbednosnogDokumenta,
	                    bdl.DatumPromene,
	                    bdl.idKorisnika,
	                    sd.Naziv as Status
                    from BezbednosniDokumentLog bdl
	                    join StatusDokumenta sd on bdl.idStatusDokumenta = sd.idStatusDokumenta
                       ";
            DataTable table = new DataTable();

            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
            {
                using (var command = new SqlCommand(query, connection))
                {
                    using (var adapter = new SqlDataAdapter(command))
                    {
                        command.CommandType = CommandType.Text;
                        adapter.Fill(table);
                    }
                }
            }
            return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
        }
    }
}
