namespace WebApplication2.Models
{
    public record FirstProjectionDTO
    (  
        long MovieTheatreId,
        string MovieTheatreName,
        string MovieName,
        double Lat,
        double Long,
        string fetchtime
    );
}
