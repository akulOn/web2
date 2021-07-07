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
    public class TipKonstrukcijeController : ApiController
    {
        [Route("api/TipKonstrukcije/GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string query = @"
                    select * from TipKonstrukcije
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
                    select * from dbo.TipKonstrukcije where idTipKonstrukcije = " + id
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
        public HttpResponseMessage Post(TipKonstrukcije tipKonstrukcije)
        {
            string query = @"
                    if not exists(select * from TipKonstrukcije where Naziv = '" + tipKonstrukcije.Naziv + "')" +
                        "insert into TipKonstrukcije(Naziv) values ('" + tipKonstrukcije.Naziv + "')"
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
            catch (Exception)
            {

                return Request.CreateResponse(System.Net.HttpStatusCode.BadRequest, table);
            }
            
        }
    }
}
