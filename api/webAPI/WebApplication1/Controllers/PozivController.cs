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
    public class PozivController : ApiController
    {
        [Route("api/Poziv/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select * from Poziv
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
                    select * from dbo.Poziv where idPoziva = " + id
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
        public HttpResponseMessage Post(Poziv poziv)
        {
            string procedure = "dbo.InsertPoziv";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@idRazloga", poziv.IdRazloga));
                        command.Parameters.Add(new SqlParameter("@komentar", poziv.Komentar));
                        command.Parameters.Add(new SqlParameter("@kvar", poziv.Kvar));
                        command.Parameters.Add(new SqlParameter("@idPotrosaca", poziv.IdPotrosaca));

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
    }
}
