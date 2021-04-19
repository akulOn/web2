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
    public class IncidentController : ApiController
    {
        [Route("api/Incident/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select * from Incident
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
                    select * from Incident where idIncidenta = " + id
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
        public HttpResponseMessage Post(Incident incident)
        {
            string procedure = "dbo.InsertIncident";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@nazivTipa", incident.NazivTipIncidenta));
                        command.Parameters.Add(new SqlParameter("@prioritet", incident.Prioritet));
                        command.Parameters.Add(new SqlParameter("@potvrdjen", incident.Potvrdjen));
                        command.Parameters.Add(new SqlParameter("@nazivStatusa", incident.NazivStatusaIncidenta));
                        command.Parameters.Add(new SqlParameter("@ETA", incident.ETA));
                        command.Parameters.Add(new SqlParameter("@ATA", incident.ATA));
                        command.Parameters.Add(new SqlParameter("@ETR", incident.ETR));
                        command.Parameters.Add(new SqlParameter("@nivoNapona", incident.NivoNapona));
                        command.Parameters.Add(new SqlParameter("@planiramoVremeRada", incident.PlaniranoVremeRada));
                        command.Parameters.Add(new SqlParameter("@idKorisnika", incident.IdKorisnika));

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

        [HttpPost]
        [Route("api/Incident/DodajOpremu")]
        public HttpResponseMessage DodajOpremu(IncidentOprema incidentOprema)
        {
            string query = @"
                    if not exists(select idOpreme from IncidentOprema where idIncidenta = " + incidentOprema.IdIncidenta + " and idOpreme = " + incidentOprema.IdOpreme + ")" +
                        "insert into IncidentOprema(idIncidenta, idOpreme) values (" + incidentOprema.IdIncidenta + "," + incidentOprema.IdOpreme + ")"
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
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [HttpPut]
        [Route("api/Incident/DodajEkipu")]
        public HttpResponseMessage DodajEkipu(IncidentEkipa incidentEkipa)
        {
            string query = @"
                    update Incident
                    set idEkipe = " + incidentEkipa.IdEkipe
                    + "where idIncidenta = " + incidentEkipa.IdIncidenta
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
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [HttpPut]
        [Route("api/Incident/DodajResenje")]
        public HttpResponseMessage DodajResenje(IncidentResenje incidentResenje)
        {
            string query = @"
                    update Incident
                    set idResenja = " + incidentResenje.IdResenja
                    + "where idIncidenta = " + incidentResenje.IdIncidenta
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
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}