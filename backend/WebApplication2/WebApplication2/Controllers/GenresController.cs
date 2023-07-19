using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;


namespace WebApplication2.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public GenresController(PraksaDbContext dbContext, HttpClient httpClient)
        {

            _dbContext = dbContext;
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<ActionResult<List<GenreDTO>>> GetSensors()
        {
            var genresTemp = await _dbContext.Genres.Select(x => new GenreDTO(x.Id, x.Name)).ToListAsync();


            return Ok(genresTemp);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDTO>> GetGenre(long id)
        {
            var genre=await _dbContext.Genres.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(genre);
        }
        [HttpPost("add-genre")]
        public async Task<ActionResult<Genre>> AddGenre([FromBody] GenreDTO genre)
        {
            var Genre = new Genre { Id=genre.Id, Name=genre.Name };
            var genre1= await _dbContext.Genres.FirstOrDefaultAsync(x=> x.Id == genre.Id);
            if(genre1 != null) {
                //error jer vec postoji taj 
                return this.StatusCode(204, "Genre already exists");
            }
            _dbContext.Genres.Add(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
        [HttpPut("update-genre/{id}")]
        public async Task<ActionResult<GenreDTO>> UpdateGenre([FromBody] GenreDTO genre, long id)
        {
            var genreNew=await _dbContext.Genres.FirstOrDefaultAsync(x=> x.Id == id);
            if(genreNew == null)
            {
                return this.StatusCode(204, "Genre doesn't exist");
            }
            genreNew.Name = genre.Name;
            //genreNew.Id= genre.Id;
            await _dbContext.SaveChangesAsync();
            return Ok(genreNew);
        }
        [HttpDelete("delete-genre/{id}")]
        public async Task<ActionResult<GenreDTO>> DeleteGenre(long id)
        {
            var listaSerija = await _dbContext.Movies.Where(x => x.Id == id).ToListAsync();
            if (listaSerija.Count > 0)
            {
                return this.StatusCode(204, "Couldn't delete genre because there are movies of this genre");
            }
            var Genre = await _dbContext.Genres.FirstOrDefaultAsync(x => x.Id == id);
            if (Genre == null)
            {
                return this.StatusCode(204, "There is no genre of this id");
            }
            _dbContext.Genres.Remove(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
        [HttpDelete("delete-genre-cascade/{id}")]
        public async Task<ActionResult<GenreDTO>> DeleteGenreCascade(long id) { 
            var listaSerija = await _dbContext.Movies.Where(x => x.Id == id).ToListAsync();
            if (listaSerija.Count > 0)
            {
                for (var i = 0; i < listaSerija.Count; i++)
                {
                    _dbContext.Movies.Remove(listaSerija[i]);
                }
            }
            var Genre = await _dbContext.Genres.FirstOrDefaultAsync(x => x.Id == id);
            if (Genre == null)
            {
                return this.StatusCode(204, "There is no genre of this id");
            }
            _dbContext.Genres.Remove(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
        [HttpPost("add-genre-series")]
        public async Task<ActionResult<GenreDTO>> AddGenreMovie([FromBody] MovieDTO series)
        {
            using(var transaction=_dbContext.Database.BeginTransaction()) {
                var genre = await _dbContext.Genres.FirstOrDefaultAsync(x => x.Name == series.GenreName);
                if (genre == null)
                {
                    //ne postoji taj zanr, dodaj i njega i film
                    genre = new Genre
                    {
                        Name = series.GenreName
                    };

                    _dbContext.Genres.Add(genre);
                    await _dbContext.SaveChangesAsync();
                    var seriesBase = new Movie
                    {
                        Name = series.Name,
                        DurationMinutes = series.DurationMinutes,
                        DatumIzlaska = series.DatumIzlaska,
                        GenreId = genre.Id
                    };
                    _dbContext.Movies.Add(seriesBase);
                }
                else
                {
                    //dodaj samo film
                    var seriesBase = new Movie
                    {
                        Name = series.Name,
                        DurationMinutes = series.DurationMinutes,
                        DatumIzlaska = series.DatumIzlaska,
                        GenreId = genre.Id
                    };
                    _dbContext.Movies.Add(seriesBase);
                }
                await _dbContext.SaveChangesAsync();
                transaction.Commit();
            }
            return this.Ok();
        }
    }
}
