using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace WebApplication2.Controllers
{
    [Route("api/first-projections")]
    [ApiController]
    public class FirstProjectionController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public FirstProjectionController(PraksaDbContext dbContext, HttpClient httpClient)
        {

            _dbContext = dbContext;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<ActionResult<List<FirstProjectionDTO>>> GetFirstProjections()
        {
            
            var genresTemp = await _dbContext.FirstProjection.Select(x => new FirstProjectionDTO(
                x.MovieTheatreId, x.MovieTheatreName, x.MovieName, x.Lat, x.Long, "")).ToListAsync();

            return Ok(genresTemp);
        }

        [HttpGet("{movieTheatreId}")]
        public async Task<ActionResult<FirstProjectionDTO>> GetCinemasFirstProjection(long movieTheatreId)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            var genre = await _dbContext.FirstProjection.Where(x => x.MovieTheatreId == movieTheatreId).FirstOrDefaultAsync();
            sw.Stop();
            TimeSpan ts = sw.Elapsed;
            string fetchtime = String.Format("{0:00}:{1:00}:{2:00}:{3:00}", ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds / 10);
            var result = new FirstProjectionDTO(genre.MovieTheatreId, genre.MovieTheatreName, genre.MovieName, genre.Lat, genre.Long, fetchtime);
            return Ok(result);
        }
    }
}
