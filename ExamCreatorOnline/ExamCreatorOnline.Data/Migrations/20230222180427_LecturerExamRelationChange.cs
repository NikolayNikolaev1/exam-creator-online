#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    /// <inheritdoc />
    public partial class LecturerExamRelationChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentExam_Users_TeacherId",
                table: "StudentExam");

            migrationBuilder.DropIndex(
                name: "IX_StudentExam_TeacherId",
                table: "StudentExam");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "StudentExam");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Exams");

            migrationBuilder.AddColumn<bool>(
                name: "IsOpen",
                table: "Exams",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "LecturerId",
                table: "Exams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Exams_LecturerId",
                table: "Exams",
                column: "LecturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Users_LecturerId",
                table: "Exams",
                column: "LecturerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Users_LecturerId",
                table: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Exams_LecturerId",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "IsOpen",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "LecturerId",
                table: "Exams");

            migrationBuilder.AddColumn<int>(
                name: "TeacherId",
                table: "StudentExam",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Time",
                table: "Exams",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_StudentExam_TeacherId",
                table: "StudentExam",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentExam_Users_TeacherId",
                table: "StudentExam",
                column: "TeacherId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
