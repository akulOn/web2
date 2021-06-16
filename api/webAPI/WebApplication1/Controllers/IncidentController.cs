using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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
                    select 
	                    idIncidenta,
	                    ti.Naziv as NazivTipIncidenta,
	                    Prioritet,
	                    Potvrdjen,
	                    si.Naziv as NazivStatusaIncidenta,
	                    ETA,
	                    ATA,
	                    ETR,
	                    AfektovaniPotrosaci,
	                    Pozivi,
	                    NivoNapona,
	                    PlaniranoVremeRada,
	                    idKorisnika
                    from Incident i
	                    join TipIncidenta ti on i.idTipIncidenta = ti.idTipIncidenta
	                    join StatusIncidenta si on i.idStatusIncidenta = si.idStatusIncidenta
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
	                    idIncidenta,
	                    ti.Naziv as NazivTipIncidenta,
	                    Prioritet,
	                    Potvrdjen,
	                    si.Naziv as NazivStatusaIncidenta,
	                    ETA,
	                    ATA,
	                    ETR,
	                    AfektovaniPotrosaci,
	                    Pozivi,
	                    NivoNapona,
	                    PlaniranoVremeRada,
	                    idKorisnika
                    from Incident i
	                    join TipIncidenta ti on i.idTipIncidenta = ti.idTipIncidenta
	                    join StatusIncidenta si on i.idStatusIncidenta = si.idStatusIncidenta
                    where idIncidenta = " + id
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

        [Route("api/Incident/Korisnik/{id}")]
        [HttpGet]
        public HttpResponseMessage GetKorisnik(int id)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select 
	                    idIncidenta,
	                    ti.Naziv as NazivTipIncidenta,
	                    Prioritet,
	                    Potvrdjen,
	                    si.Naziv as NazivStatusaIncidenta,
	                    ETA,
	                    ATA,
	                    ETR,
	                    AfektovaniPotrosaci,
	                    Pozivi,
	                    NivoNapona,
	                    PlaniranoVremeRada,
	                    idKorisnika
                    from Incident i
	                    join TipIncidenta ti on i.idTipIncidenta = ti.idTipIncidenta
	                    join StatusIncidenta si on i.idStatusIncidenta = si.idStatusIncidenta
                    where idKorisnika = " + id
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

        [Route("api/Incident/KorisnikPreuzmi")]
        [HttpPut]
        public HttpResponseMessage PutKorisnikPreuzmi(IncidentKorisnik incidentKorisnik)
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    update Incident
                        set idKorisnika = " + incidentKorisnik.IdKorisnika +
                    " where idIncidenta = " + incidentKorisnik.IdIncidenta
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
                        // command.Parameters.Add(new SqlParameter("@idKorisnika", incident.IdKorisnika)); 

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

        [Route("api/Incident/Oprema/{id}")]
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
                        join IncidentOprema id on o.idOpreme = id.idOpreme
                    where Status = 1
                        and id.idIncidenta = " + id;
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

        [HttpPut]
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
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [HttpPut]
        [Route("api/Incident/IzbaciOpremu")]
        public HttpResponseMessage IzbaciOpremu(IncidentOprema incidentOprema)
        {
            string query = @"
                    delete from IncidentOprema where idIncidenta = " + incidentOprema.IdIncidenta + " and idOpreme = " + incidentOprema.IdOpreme
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
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
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
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Route("api/Incident/Slike/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSlika(int id)
        {
            string query = @"
                    select
	                    i.idSlike,
	                    s.Putanja
                    from IncidentSlika i
	                    join Slika s on i.idSlike = s.idSlike
                    where i.idIncidenta = " + id;
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

        [Route("api/Incident/DodajSliku/{id}")]
        [HttpPut]
        public HttpResponseMessage DodajSliku(int id)
        {
            string procedure = "dbo.DodajSlikuIncidentu";
            DataTable table = new DataTable();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                //foreach (HttpPostedFile postedFile in httpRequest.Files)
                //{
                    var postedFile = httpRequest.Files[0]; // gleda samo prvi fajl, ako ih je vise izabrano
                    string fileName = postedFile.FileName;
                    string physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + fileName);

                    postedFile.SaveAs(physicalPath);

                    using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                    {
                        using (var command = new SqlCommand(procedure, connection))
                        {
                            // 3. add parameter to command, which will be passed to the stored procedure
                            command.Parameters.Add(new SqlParameter("@idIncidenta", id)); // tu bi trebalo proslediti informacije o trenutno logovanom korisniku
                            command.Parameters.Add(new SqlParameter("@Putanja", physicalPath));

                            using (var adapter = new SqlDataAdapter(command))
                            {
                                command.CommandType = CommandType.StoredProcedure;
                                adapter.Fill(table);
                            }
                        }
                    }
                //}
                
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Route("api/Incident/IzbaciSliku")]
        [HttpPut]
        public HttpResponseMessage IzbaciOpremu(IncidentSlika i)
        {
            string query = @"
                    delete from IncidentSlika where idSlike = " + i.idSlike + " and idIncidenta = " + i.idIncidenta
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

        [Route("api/Incident/PrebaciSliku")]
        [HttpPut]
        public HttpResponseMessage PrebaciSliku(IncidentSlika i)
        {
            string query = @"
                    update IncidentSlika set idIncidenta = " + i.idIncidenta + " where idSlike = " + i.idSlike
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