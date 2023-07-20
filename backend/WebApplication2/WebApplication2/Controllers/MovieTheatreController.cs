using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace WebApplication2.Controllers
{
    [Route("api/movie-theatres")]
    [ApiController]
    public class MovieTheatreController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public MovieTheatreController(PraksaDbContext dbContext, HttpClient httpClient)
        {

            _dbContext = dbContext;
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<ActionResult<List<MovieTheatreDTO>>> GetMovieTheatres()
        {
            var genresTemp = await _dbContext.MovieTheatres.Select(x => new MovieTheatreDTO(x.Id, x.Name, x.Long, x.Lat)).ToListAsync();


            return Ok(genresTemp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieTheatreDTO>> GetMovieTheatre(long id)
        {
            var mtheatre = await _dbContext.MovieTheatres.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(mtheatre);
        }
        [HttpPost("add-movie-theatre")]
        public async Task<ActionResult<MovieTheatre>> AddMovieTheatre([FromBody] MovieTheatreDTO mtheatre)
        {
            var Genre = new MovieTheatre { Id = mtheatre.Id, Name = mtheatre.Name, Lat=mtheatre.Lat, Long=mtheatre.Long };
            var genre1 = await _dbContext.MovieTheatres.FirstOrDefaultAsync(x => x.Id == mtheatre.Id);
            if (genre1 != null)
            {
                //error jer vec postoji taj 
                return this.StatusCode(204, "Movie theatre already exists");
            }
            _dbContext.MovieTheatres.Add(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }

        [HttpGet("first-projection/{id}")]
        public async Task<ActionResult<FirstProjectionDTO>> GetFirstProjection(long id)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            var projection = await _dbContext.Projections
        .Where(x => x.MovieTheatreId == id)
        .OrderBy(x => x.ProjectionDateTime.TimeOfDay)
        .Include(x => x.Movie)
        .Include(x => x.MovieTheatre)
        .FirstOrDefaultAsync();

            sw.Stop();
            TimeSpan ts = sw.Elapsed;
            string fetchtime = String.Format("{0:00}:{1:00}:{2:00}:{3:00}", ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds / 10);
            if (projection == null)
            {
                return null;
            }

            return new FirstProjectionDTO
            (
                projection.MovieTheatreId,
                projection.MovieTheatre?.Name,
                projection.Movie?.Name,
                projection.MovieTheatre?.Lat ?? 0.0,
                projection.MovieTheatre?.Long ?? 0.0,
                fetchtime
            );
        }

        [HttpPut("update-movie-theatre/{id}")]
        public async Task<ActionResult<MovieTheatreDTO>> UpdateMovieTheatre([FromBody] MovieTheatreDTO mtheatre, long id)
        {
            var genreNew = await _dbContext.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);
            if (genreNew == null)
            {
                return this.StatusCode(204, "Movie theatre doesn't exist");
            }
            genreNew.Name = mtheatre.Name;
            //genreNew.Id= genre.Id;
            await _dbContext.SaveChangesAsync();
            return Ok(genreNew);
        }

        [HttpDelete("delete-movie-theatre/{id}")]
        public async Task<ActionResult<MovieTheatreDTO>> DeleteMovieTheatre(long id)
        {
            var Genre = await _dbContext.MovieTheatres.FirstOrDefaultAsync(x => x.Id == id);
            if (Genre == null)
            {
                return this.StatusCode(204, "There is no movie theatre of this id");
            }
            _dbContext.MovieTheatres.Remove(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
    }
}
