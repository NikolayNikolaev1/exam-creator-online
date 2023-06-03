using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExamAddScoreRemoveIsOpen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentMark_Marks_MarkId",
                table: "StudentMark");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentMark_Users_StudentId",
                table: "StudentMark");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentMark",
                table: "StudentMark");

            migrationBuilder.DropColumn(
                name: "IsOpen",
                table: "Exams");

            migrationBuilder.RenameTable(
                name: "StudentMark",
                newName: "StudentsMarks");

            migrationBuilder.RenameIndex(
                name: "IX_StudentMark_MarkId",
                table: "StudentsMarks",
                newName: "IX_StudentsMarks_MarkId");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "StudentsExams",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentsMarks",
                table: "StudentsMarks",
                columns: new[] { "StudentId", "MarkId" });

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsMarks_Marks_MarkId",
                table: "StudentsMarks",
                column: "MarkId",
                principalTable: "Marks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsMarks_Users_StudentId",
                table: "StudentsMarks",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentsMarks_Marks_MarkId",
                table: "StudentsMarks");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentsMarks_Users_StudentId",
                table: "StudentsMarks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentsMarks",
                table: "StudentsMarks");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "StudentsExams");

            migrationBuilder.RenameTable(
                name: "StudentsMarks",
                newName: "StudentMark");

            migrationBuilder.RenameIndex(
                name: "IX_StudentsMarks_MarkId",
                table: "StudentMark",
                newName: "IX_StudentMark_MarkId");

            migrationBuilder.AddColumn<bool>(
                name: "IsOpen",
                table: "Exams",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentMark",
                table: "StudentMark",
                columns: new[] { "StudentId", "MarkId" });

            migrationBuilder.AddForeignKey(
                name: "FK_StudentMark_Marks_MarkId",
                table: "StudentMark",
                column: "MarkId",
                principalTable: "Marks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentMark_Users_StudentId",
                table: "StudentMark",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
