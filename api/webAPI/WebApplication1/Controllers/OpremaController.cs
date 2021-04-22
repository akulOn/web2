using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class OpremaController : ApiController
    {
        [Route("api/Oprema/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
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
                    where Status = 1
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

        [Route("api/Oprema/GetAllSafe")]
        [HttpGet]
        public HttpResponseMessage GetAllSafe()
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
                    where idOpreme not in (select idOpreme from IncidentOprema)
                        and o.Status = 1
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
            string query = @"
                    select
	                    o.idOpreme,
	                    o.Naziv,
	                    t.Naziv as Tip,
	                    o.Kordinate,
	                    o.Adresa
                    from Oprema o
	                    join TipOpreme t on o.idTipOpreme = t.idTipOpreme
                    where idOpreme = " + id
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
        public HttpResponseMessage Post(Oprema oprema)
        {
            string procedure = "InsertOprema";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@Tip", oprema.Tip));
                        command.Parameters.Add(new SqlParameter("@Kordinate", oprema.Kordinate));
                        command.Parameters.Add(new SqlParameter("@Adresa", oprema.Adresa));

                        using (var adapter = new SqlDataAdapter(command))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            adapter.Fill(table);
                        }
                    }
                }
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [HttpPut]
        public HttpResponseMessage Put(Oprema oprema) // nece baciti error ako oprema ne postoji u bazi
        {
            string query = @"
                    Update Oprema
                    set Adresa = '" + oprema.Adresa + "', Kordinate = '" + oprema.Kordinate + "'" +
                    "where idOpreme = " + oprema.idOpreme
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
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id) // prolazi ako ne postoji oprema
        {
            string procedure = "dbo.DeleteOprema";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@id", id));
                        using (var adapter = new SqlDataAdapter(command))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            adapter.Fill(table);
                        }
                    }
                }
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [Route("api/Oprema/DodajPoziv")]
        [HttpPost]
        public HttpResponseMessage DodajPoziv(OpremaPoziv opremaPoziv)
        {
            string query = @"
                    insert into OpremaPoziv values (" + opremaPoziv.IdOpreme + "," + opremaPoziv.IdPoziva + ")"
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
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [Route("api/Oprema/GetAllPoziviVezaniZaOpremu/")]
        [HttpGet]
        public HttpResponseMessage GetAllPoziviVezaniZaOpremu(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select * from Poziv where idPoziva in (select idPoziva from OpremaPoziv where idOpreme = " + id +")";
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
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
            }
            catch(Exception e)
            {
                return Request.CreateResponse(System.Net.HttpStatusCode.BadRequest);
            }
            
        }
    }
}
