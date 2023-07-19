using Core.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public MovieController(PraksaDbContext dbContext, HttpClient httpClient)
        {

            _dbContext = dbContext;
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<ActionResult<List<MovieDTO>>> GetMovies()
        {
            var query= from serija in _dbContext.Movies
                          join genre in _dbContext.Genres
                          on serija.GenreId equals genre.Id
                          select new
                          {
                              serija,
                              genre.Name
                          };
            List<MovieDTO> result = new List<MovieDTO>();
            var results = await query.ToListAsync();
            foreach (var item in results)
            {
                MovieDTO i = new MovieDTO(item.serija.Id, item.serija.GenreId, item.serija.Name, item.serija.DatumIzlaska, item.serija.DurationMinutes, item.Name);
                result.Add(i);
            }
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDTO>> GetMovie(long id)
        {
            var series = await _dbContext.Movies.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(series);
        }
        [HttpPost("add-movie")]
        public async Task<ActionResult<MovieDTO>> AddMovie( [FromBody] MovieDTO series)
        {
            var Series = new Movie
            {
                Id = series.Id,
                GenreId = series.GenreId,
                Name = series.Name,
                DurationMinutes = series.DurationMinutes,
                DatumIzlaska = series.DatumIzlaska
        };
            var serija=await _dbContext.Movies.FirstOrDefaultAsync(x=> x.Id == series.Id);
            if (serija != null)
            {
                return this.StatusCode(204, "Series of this id already exists");
            }
             _dbContext.Movies.Add(Series);
            await _dbContext.SaveChangesAsync();

            return this.Ok();
        }
        [HttpDelete("delete-movie/{id}")]
        public async Task<ActionResult<MovieDTO>> DeleteMovie(long id)
        {
            var serija1=await _dbContext.Movies.FirstOrDefaultAsync(x=> x.Id == id);
            if (serija1 == null)
            {
                return this.StatusCode(204, "No series of this id");
            }
            _dbContext.Movies.Remove(serija1);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
        [HttpPut("update-movie/{id}")]
        public async Task<ActionResult<MovieDTO>> UpdateMovie([FromBody] MovieDTO serija, long id)
        {
            var serija1 = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
            if (serija1 == null)
            {
                return this.StatusCode(204, "No series of this id");
            }
            var genre = await _dbContext.Genres.FirstOrDefaultAsync(x => x.Id == serija.GenreId);
            if(genre == null)
            {
                return this.StatusCode(204, "No genre of this id");
            }
            serija1.Name=serija.Name;
            serija1.DurationMinutes=serija.DurationMinutes;
            serija1.GenreId=serija.GenreId;
            serija1.DatumIzlaska=serija.DatumIzlaska;
            
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
    }
}
