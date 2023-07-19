using Core.Entities;
namespace WebApplication2.Models
{
    public record GetGenresResponse(
        List<Genre> Movies
        );
    public record GenreDTO(
        long Id, 
        string Name
        );
}
