using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FirstProjectionView : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            create view FirstProjection as
            select mt.Name as MovieTheatreName,mt.Id as MovieTheatreId, mt.Lat, mt.Long, m.Name as MovieName
            from Projections p join MovieTheatres mt on p.MovieTheatreId=mt.Id
            join Movies m on m.Id=p.MovieId
            where CAST(p.ProjectionDateTime AS TIME) <= ALL (
            SELECT CAST(pr.ProjectionDateTime AS TIME) FROM Projections pr WHERE
            pr.MovieTheatreId=mt.Id
            )
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                drop view FirstProjection;
            ");
        }
    }
}
