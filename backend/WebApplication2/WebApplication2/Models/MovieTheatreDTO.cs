using Core.Entities;

namespace WebApplication2.Models
{
    public record MovieTheatreDTO
    (
        long Id,
        string Name,
        double Long,
        double Lat
    );
}
