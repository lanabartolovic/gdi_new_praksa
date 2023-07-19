using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class foreignkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Series_Genreid",
                table: "Series",
                column: "Genreid");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_Genres_Genreid",
                table: "Series",
                column: "Genreid",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_Genres_Genreid",
                table: "Series");

            migrationBuilder.DropIndex(
                name: "IX_Series_Genreid",
                table: "Series");
        }
    }
}
