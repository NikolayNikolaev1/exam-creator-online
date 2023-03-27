using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFacilityDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Facility",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Facility");
        }
    }
}
