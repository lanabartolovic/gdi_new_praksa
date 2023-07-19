using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Core.Entities;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Controllers
{
    [Route("api/projection-types")]
    [ApiController]
    public class ProjectionTypeController : ControllerBase
    {
        private readonly PraksaDbContext _dbContext;
        private readonly HttpClient _httpClient;
        public ProjectionTypeController(PraksaDbContext dbContext, HttpClient httpClient)
        {

            _dbContext = dbContext;
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<ActionResult<List<ProjectionTypeDTO>>> GetProjectionTypes()
        {
            var listaProjectionTypes=await _dbContext.ProjectionTypes.Select(x=> new ProjectionTypeDTO(x.Id, x.Name)).ToListAsync();
            return Ok(listaProjectionTypes);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectionTypeDTO>> GetProjectionType(long id)
        {
            var listaProjectionTypes = await _dbContext.ProjectionTypes.Where(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(listaProjectionTypes);
        }
        [HttpPost("add-projection-type")]
        public async Task<ActionResult<ProjectionTypeDTO>> AddProjectionType([FromBody] ProjectionTypeDTO proj)
        {
            var Genre = new ProjectionType { Id = proj.Id, Name = proj.Name };
            var genre1 = await _dbContext.ProjectionTypes.FirstOrDefaultAsync(x => x.Id == proj.Id);
            if (genre1 != null)
            {
                //error jer vec postoji taj 
                return this.StatusCode(204, "Projection type already exists");
            }
            _dbContext.ProjectionTypes.Add(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
        [HttpPut("update-projection-type/{id}")]
        public async Task<ActionResult<ProjectionTypeDTO>> UpdateProjectionType([FromBody] ProjectionTypeDTO proj, long id)
        {
            var genreNew = await _dbContext.ProjectionTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (genreNew == null)
            {
                return this.StatusCode(204, "Projection type doesn't exist");
            }
            genreNew.Name = proj.Name;
            //genreNew.Id= genre.Id;
            await _dbContext.SaveChangesAsync();
            return Ok(genreNew);
        }

        [HttpDelete("delete-projection-type/{id}")]
        public async Task<ActionResult<ProjectionTypeDTO>> DeleteProjectionType(long id)
        {
            var Genre = await _dbContext.ProjectionTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (Genre == null)
            {
                return this.StatusCode(204, "There is no projection type of this id");
            }
            _dbContext.ProjectionTypes.Remove(Genre);
            await _dbContext.SaveChangesAsync();
            return this.Ok();
        }
    }
}
