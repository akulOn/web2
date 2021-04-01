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
    public class KorisnikController : ApiController
    {
        // GET: Korisnik
        public HttpResponseMessage Get() // zapravo je GetAll
        {
            // trebalo bi da se radi sa procedrama na bazi, nije dobro da ovde direktno kucam SQL upite
            string procedure = "dbo.GetAllKorisnik";
            DataTable table = new DataTable();

            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
            {
                using (var command = new SqlCommand(procedure, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // 3. add parameter to command, which will be passed to the stored procedure
                    // command.Parameters.Add(new SqlParameter("@CustomerID", custId));

                    using (var adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(table);
                    }
                }
            }
            return Request.CreateResponse(System.Net.HttpStatusCode.OK, table);
        }

        // POST: Korisnik

        public HttpResponseMessage Post(Korisnik korisnik) // ako dodas vec postojeceg korisnika nece baciti error, ali nece ga dodati u bazu
        {
            string procedure = "dbo.InsertKorisnik";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@idKorisnika", korisnik.IdKorisnika));
                        command.Parameters.Add(new SqlParameter("@korisnickoIme", korisnik.KorisnickoIme));
                        command.Parameters.Add(new SqlParameter("@email", korisnik.Email));
                        command.Parameters.Add(new SqlParameter("@lozinka", korisnik.Lozinka));
                        command.Parameters.Add(new SqlParameter("@ime", korisnik.Ime));
                        command.Parameters.Add(new SqlParameter("@prezime", korisnik.Prezime));
                        command.Parameters.Add(new SqlParameter("@datumRodenja", korisnik.DatumRodenja));
                        command.Parameters.Add(new SqlParameter("@adresa", korisnik.Adresa));
                        command.Parameters.Add(new SqlParameter("@idTipKorisnika", korisnik.IdTipKorisnika));
                        command.Parameters.Add(new SqlParameter("@idSlika", korisnik.IdSlika));

                        using (var adapter = new SqlDataAdapter(command))
                        {
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

        public HttpResponseMessage Put(Korisnik korisnik) // nece baciti error ako korisnik ne postoji u bazi
        {
            string procedure = "dbo.UpdateKorisnik";
            DataTable table = new DataTable();
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@idKorisnika", korisnik.IdKorisnika));
                        command.Parameters.Add(new SqlParameter("@korisnickoIme", korisnik.KorisnickoIme));
                        command.Parameters.Add(new SqlParameter("@email", korisnik.Email));
                        command.Parameters.Add(new SqlParameter("@lozinka", korisnik.Lozinka));
                        command.Parameters.Add(new SqlParameter("@ime", korisnik.Ime));
                        command.Parameters.Add(new SqlParameter("@prezime", korisnik.Prezime));
                        command.Parameters.Add(new SqlParameter("@datumRodenja", korisnik.DatumRodenja));
                        command.Parameters.Add(new SqlParameter("@adresa", korisnik.Adresa));
                        command.Parameters.Add(new SqlParameter("@idTipKorisnika", korisnik.IdTipKorisnika));
                        command.Parameters.Add(new SqlParameter("@idSlika", korisnik.IdSlika));

                        using (var adapter = new SqlDataAdapter(command))
                        {
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

        public HttpResponseMessage Delete(int id) // prolazi ako ne postoji korisnik
        {
            string procedure = "dbo.DeleteKorisnik";
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ElektroDistribucijaAppDB"].ConnectionString))
                {
                    using (var command = new SqlCommand(procedure, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // 3. add parameter to command, which will be passed to the stored procedure
                        command.Parameters.Add(new SqlParameter("@idKorisnika", id));

                        using (var adapter = new SqlDataAdapter(command))
                        {

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
