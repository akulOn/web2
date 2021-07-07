using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class BezbednosniDokumentController : ApiController
    {
        [Route("api/BezbednosniDokument/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select 
	                    bd.idBezbednosnogDokumenta,
	                    td.Naziv as Tip,
	                    sd.Naziv as Status,
	                    e.Naziv as Ekipa,
	                    --bd.idKorisnika,
	                    bd.Detalji,
	                    bd.Beleske,
	                    bd.TelefonskiBroj,
	                    bd.DatumKreiranja,
	                    bd.AllWorkOperationsCompleted,
	                    bd.AllTagsRemoved,
	                    bd.GroundingRemoved,
	                    bd.ReadyForService
                    from BezbednosniDokument bd
	                    join TipDokumenta td on bd.idTipDokumenta = td.idTipDokumenta
	                    join StatusDokumenta sd on bd.idStatusDokumenta = sd.idStatusDokumenta
	                    join Ekipa e on bd.idEkipe = e.idEkipe
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

        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select 
	                    bd.idBezbednosnogDokumenta,
	                    td.Naziv as Tip,
	                    sd.Naziv as Status,
	                    e.Naziv as Ekipa,
	                    --bd.idKorisnika,
	                    bd.Detalji,
	                    bd.Beleske,
	                    bd.TelefonskiBroj,
	                    bd.DatumKreiranja,
	                    bd.AllWorkOperationsCompleted,
	                    bd.AllTagsRemoved,
	                    bd.GroundingRemoved,
	                    bd.ReadyForService
                    from BezbednosniDokument bd
	                    join TipDokumenta td on bd.idTipDokumenta = td.idTipDokumenta
	                    join StatusDokumenta sd on bd.idStatusDokumenta = sd.idStatusDokumenta
	                    join Ekipa e on bd.idEkipe = e.idEkipe
                    where bd.idBezbednosnogDokumenta = " + id
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

        [Route("api/BezbednosniDokument/Korisnik/{id}")]
        [HttpGet]
        public HttpResponseMessage GetKorisnik(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select 
	                    bd.idBezbednosnogDokumenta,
	                    td.Naziv as Tip,
	                    sd.Naziv as Status,
	                    e.Naziv as Ekipa,
	                    --bd.idKorisnika,
	                    bd.Detalji,
	                    bd.Beleske,
	                    bd.TelefonskiBroj,
	                    bd.DatumKreiranja,
	                    bd.AllWorkOperationsCompleted,
	                    bd.AllTagsRemoved,
	                    bd.GroundingRemoved,
	                    bd.ReadyForService
                    from BezbednosniDokument bd
	                    join TipDokumenta td on bd.idTipDokumenta = td.idTipDokumenta
	                    join StatusDokumenta sd on bd.idStatusDokumenta = sd.idStatusDokumenta
	                    join Ekipa e on bd.idEkipe = e.idEkipe
                    where bd.idKorisnika = " + id
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

        [HttpPost]
        public HttpResponseMessage Post(BezbednosniDokument bezbednosniDokument)
        {
            string procedure = "dbo.InsertBezbednosniDokument";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@Tip", bezbednosniDokument.Tip));
                        command.Parameters.Add(new SqlParameter("@Status", bezbednosniDokument.Status));
                        command.Parameters.Add(new SqlParameter("@Ekipa", bezbednosniDokument.Ekipa));
                        command.Parameters.Add(new SqlParameter("@Detalji", bezbednosniDokument.Detalji));
                        command.Parameters.Add(new SqlParameter("@Beleske", bezbednosniDokument.Beleske));
                        command.Parameters.Add(new SqlParameter("@TelefonskiBroj", bezbednosniDokument.TelefonskiBroj));
                        command.Parameters.Add(new SqlParameter("@AllWorkOperationsCompleted", bezbednosniDokument.AllWorkOperationsCompleted));
                        command.Parameters.Add(new SqlParameter("@AllTagsRemoved", bezbednosniDokument.AllTagsRemoved));
                        command.Parameters.Add(new SqlParameter("@GroundingRemoved", bezbednosniDokument.GroundingRemoved));
                        command.Parameters.Add(new SqlParameter("@ReadyForService", bezbednosniDokument.ReadyForService));

                        using (var adapter = new SqlDataAdapter(command))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            adapter.Fill(table);
                        }
                    }
                }
                return Request.CreateResponse(System.Net.HttpStatusCode.Created, table);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }

        }

        [Route("api/BezbednosniDokument/UpdateBezbednosniDokument")]
        [HttpPut]
        public HttpResponseMessage UpdateBezbednosniDokument(BezbednosniDokumentStatus dokumentStatus)
        {
            string query = @"
                    update BezbednosniDokument
		                set idStatusDokumenta =" + dokumentStatus.idStatusa
                 + "where idBezbednosnogDokumenta = " + dokumentStatus.idBezbednosnogDokumenta
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

        [Route("api/BezbednosniDokument/Slike/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSlika(int id)
        {
            string query = @"
                    select 
	                    bds.idSlike,
	                    s.Putanja
                    from BezbednosniDokumentSlika bds
	                    join Slika s on bds.idSlike = s.idSlike
                    where idDokumenta = " + id;
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

        [Route("api/BezbednosniDokument/DodajSliku/{id}")]
        [HttpPut]
        public HttpResponseMessage DodajSliku(int id) // ako se doda ista slika nisam siguran sta se desi
        {
            string procedure = "dbo.DodajSlikuBezbednosnomDokumentu";
            DataTable table = new DataTable();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0]; // gleda samo prvi fajl, ako ih je vise izabrano
                string fileName = postedFile.FileName;
                string physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + fileName);

                postedFile.SaveAs(physicalPath);

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@idBezbednosnogDokumenta", id)); // tu bi trebalo proslediti informacije o trenutno logovanom korisniku
                        command.Parameters.Add(new SqlParameter("@Putanja", physicalPath));

                        using (var adapter = new SqlDataAdapter(command))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            adapter.Fill(table);
                        }
                    }
                }
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Route("api/BezbednosniDokument/IzbaciSliku")]
        [HttpPut]
        public HttpResponseMessage IzbaciOpremu(BezbednosniDokumetSlika bds)
        {
            string query = @"
                    delete from BezbednosniDokumentSlika where idSlike = "+ bds.idSlike + " and idDokumenta = " + bds.idBezbednosnogDokumenta
                    ;
            DataTable table = new DataTable();
            try
            {
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
                return Request.CreateResponse(System.Net.HttpStatusCode.Created, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Route("api/BezbednosniDokument/PrebaciSliku")]
        [HttpPut]
        public HttpResponseMessage PrebaciSliku(BezbednosniDokumetSlika bds)
        {
            string query = @"
                    update BezbednosniDokumentSlika set idDokumenta = " + bds.idBezbednosnogDokumenta + " where idSlike = " + bds.idSlike 
                    ;
            DataTable table = new DataTable();
            try
            {
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
                return Request.CreateResponse(System.Net.HttpStatusCode.Created, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Route("api/BezbednosniDokument/Oprema/{id}")]
        [HttpGet]
        public HttpResponseMessage GetOprema(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select
	                    o.idOpreme,
	                    o.Naziv,
	                    t.Naziv as Tip,
	                    o.Kordinate,
	                    o.Adresa
                    from Oprema o
	                    join TipOpreme t on o.idTipOpreme = t.idTipOpreme
                        join BezbednosniDokumentOprema bdo on o.idOpreme = bdo.idOpreme
                    where Status = 1
                        and bdo.idBezbednosnogDokumenta = " + id;
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

        [Route("api/BezbednosniDokument/DodajOpremu")]
        [HttpPut]
        public HttpResponseMessage DodajOpremu(BezbednosniDokumentOpreme bdo)
        {
            DataTable table = new DataTable();
            foreach (int item in bdo.idOpreme)
            {
                string query = @"
                    if not exists(select * from BezbednosniDokumentOprema where idOpreme = " + item + " and idBezbednosnogDokumenta = " + bdo.idBezbednosnogDokumenta
                    + ")insert into BezbednosniDokumentOprema(idBezbednosnogDokumenta, idOpreme) values (" + bdo.idBezbednosnogDokumenta + ", " + item + ")"
                       ;

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
            }
            return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
        }

        [HttpPut]
        [Route("api/BezbednosniDokument/IzbaciOpremu")]
        public HttpResponseMessage IzbaciOpremu(BezbednosniDokumentOprema bdo)
        {
            string query = @"
                    delete from BezbednosniDokumentOprema where idBezbednosnogDokumenta = " + bdo.idBezbednosnogDokumenta + " and idOpreme = " + bdo.idOpreme
                    ;
            DataTable table = new DataTable();
            try
            {
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
                return Request.CreateResponse(System.Net.HttpStatusCode.Created, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}
