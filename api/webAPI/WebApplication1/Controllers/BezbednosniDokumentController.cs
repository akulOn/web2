using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                return Request.CreateResponse(HttpStatusCode.BadRequest);
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
    }
}
