using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class foreignkeys3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_Genres_Genreid",
                table: "Series");

            migrationBuilder.RenameColumn(
                name: "Genreid",
                table: "Series",
                newName: "GenreId");

            migrationBuilder.RenameIndex(
                name: "IX_Series_Genreid",
                table: "Series",
                newName: "IX_Series_GenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_Genres_GenreId",
                table: "Series",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_Genres_GenreId",
                table: "Series");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "Series",
                newName: "Genreid");

            migrationBuilder.RenameIndex(
                name: "IX_Series_GenreId",
                table: "Series",
                newName: "IX_Series_Genreid");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_Genres_Genreid",
                table: "Series",
                column: "Genreid",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
