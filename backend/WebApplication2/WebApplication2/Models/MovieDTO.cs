using Core.Entities;

namespace WebApplication2.Models
{
    public record GetSeriesResponse(List<Movie> Series);
    public record MovieDTO(
        long Id, 
        long GenreId, 
        string Name, 
        DateTime DatumIzlaska, 
        long DurationMinutes,
        string GenreName);

}
