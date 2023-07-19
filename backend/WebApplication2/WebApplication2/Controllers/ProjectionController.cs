using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Controllers
{
    [Route("api/projections")]
    [ApiController]
    public class ProjectionController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public ProjectionController(PraksaDbContext dbContext, HttpClient httpClient)
        {
            _dbContext = dbContext;
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<ActionResult<List<ProjectionDTO>>> Getprojections()
        {
            var genresTemp = await _dbContext.Projections.Select(x => new ProjectionDTO(x.Id, x.MovieId, x.MovieTheatreId, x.ProjectionDateTime, x.ProjectionTypeId, "")).ToListAsync();


            return Ok(genresTemp);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectionDTO>> GetProjection(long id)
        {
            var mtheatre = await _dbContext.Projections.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(mtheatre);
        }
        [HttpPost("add-projection")]
        public async Task<ActionResult<Projection>> AddProjection([FromBody] ProjectionDTO mtheatre)
        {
            var Genre = new Projection { Id = mtheatre.Id, MovieId=mtheatre.MovieId, MovieTheatreId=mtheatre.MovieTheatreId, ProjectionDateTime=mtheatre.projectionDateTime,
            ProjectionTypeId=mtheatre.ProjectionTypeId};
            var genre1 = await _dbContext.Projections.FirstOrDefaultAsync(x => x.Id == mtheatre.Id);
            if (genre1 != null)
            {
                //error jer vec postoji taj 
                return this.StatusCode(204, "Projection already exists");
            }
            _dbContext.Projections.Add(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }

        [HttpPut("update-projection/{id}")]
        public async Task<ActionResult<ProjectionDTO>> UpdateProjection([FromBody] ProjectionDTO mtheatre, long id)
        {
            var genreNew = await _dbContext.Projections.FirstOrDefaultAsync(x => x.Id == id);
            if (genreNew == null)
            {
                return this.StatusCode(204, "Projection doesn't exist");
            }
            genreNew.MovieId = mtheatre.MovieId;
            genreNew.MovieTheatreId = mtheatre.MovieTheatreId;
            genreNew.ProjectionDateTime = mtheatre.projectionDateTime;
            genreNew.ProjectionTypeId = mtheatre.ProjectionTypeId;
            //genreNew.Id= genre.Id;
            await _dbContext.SaveChangesAsync();
            return Ok(genreNew);
        }

        [HttpDelete("delete-projection/{id}")]
        public async Task<ActionResult<ProjectionDTO>> DeleteProjection(long id)
        {
            var Genre = await _dbContext.Projections.FirstOrDefaultAsync(x => x.Id == id);
            if (Genre == null)
            {
                return this.StatusCode(204, "There is no projection of this id");
            }
            _dbContext.Projections.Remove(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
    }
}
