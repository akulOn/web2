using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class PlanRadaController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select
	                    pr.idPlanaRada,
	                    td.Naziv as Tip,
	                    --pr.idNalogaZaRad,
	                    sd.Naziv as Status,
	                    pr.idIncidenta,
	                    pr.Ulica,
	                    pr.DatumVremePocetkaRada,
	                    pr.DatumVremeZavrsetkaRada,
	                    e.Naziv as Ekipa,
	                    pr.idKorisnika,
	                    pr.Beleske,
	                    pr.Kompanija,
	                    pr.TelefonskiBroj,
	                    pr.DatumVremeKreiranjaDokumenta
                    from PlanRada pr
	                    join TipDokumenta td on pr.idTipDokumenta = td.idTipDokumenta
	                    join StatusDokumenta sd on pr.idStatusDokumenta = sd.idStatusDokumenta
	                    join Ekipa e on pr.idEkipe = e.idEkipe
                    where
                        pr.idPlanaRada = " + id
                    ;
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

        [Route("api/PlanRada/Korisnik/{id}")]
        [HttpGet]
        public HttpResponseMessage GetKorisnik(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select
	                    pr.idPlanaRada,
	                    td.Naziv as Tip,
	                    --pr.idNalogaZaRad,
	                    sd.Naziv as Status,
	                    pr.idIncidenta,
	                    pr.Ulica,
	                    pr.DatumVremePocetkaRada,
	                    pr.DatumVremeZavrsetkaRada,
	                    e.Naziv as Ekipa,
	                    pr.idKorisnika,
	                    pr.Beleske,
	                    pr.Kompanija,
	                    pr.TelefonskiBroj,
	                    pr.DatumVremeKreiranjaDokumenta
                    from PlanRada pr
	                    join TipDokumenta td on pr.idTipDokumenta = td.idTipDokumenta
	                    join StatusDokumenta sd on pr.idStatusDokumenta = sd.idStatusDokumenta
	                    join Ekipa e on pr.idEkipe = e.idEkipe
                    where
                        pr.idKorisnika = " + id
                    ;
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
