using Core.Entities;
namespace WebApplication2.Models
{
    public record ProjectionDTO
    (
        long Id,
        long MovieId,
        long MovieTheatreId,
        DateTime projectionDateTime,
        long ProjectionTypeId,
        string MovieName
    );
}
