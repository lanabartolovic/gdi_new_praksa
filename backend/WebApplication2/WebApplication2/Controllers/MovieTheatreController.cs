using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<ProjectionDTO>> GetFirstProjection(long id)
        {
            var result = await _dbContext.Projections.Where(x=> x.MovieTheatreId == id).OrderBy(x=> x.ProjectionDateTime.TimeOfDay).FirstOrDefaultAsync();
            var ime = await _dbContext.Movies.Where(x=> x.Id == result.MovieId).FirstOrDefaultAsync();
            var projekcija = new ProjectionDTO(result.Id, result.MovieId, result.MovieTheatreId, result.ProjectionDateTime, result.ProjectionTypeId, ime.Name);
            return Ok(projekcija);
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
