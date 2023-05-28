using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMarksObject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mark_Answears_AnswearId",
                table: "Mark");

            migrationBuilder.DropForeignKey(
                name: "FK_Mark_Questions_QuestionId",
                table: "Mark");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentMark_Mark_MarkId",
                table: "StudentMark");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mark",
                table: "Mark");

            migrationBuilder.RenameTable(
                name: "Mark",
                newName: "Marks");

            migrationBuilder.RenameIndex(
                name: "IX_Mark_QuestionId",
                table: "Marks",
                newName: "IX_Marks_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Mark_AnswearId",
                table: "Marks",
                newName: "IX_Marks_AnswearId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Marks",
                table: "Marks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_Answears_AnswearId",
                table: "Marks",
                column: "AnswearId",
                principalTable: "Answears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_Questions_QuestionId",
                table: "Marks",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentMark_Marks_MarkId",
                table: "StudentMark",
                column: "MarkId",
                principalTable: "Marks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marks_Answears_AnswearId",
                table: "Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_Marks_Questions_QuestionId",
                table: "Marks");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentMark_Marks_MarkId",
                table: "StudentMark");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Marks",
                table: "Marks");

            migrationBuilder.RenameTable(
                name: "Marks",
                newName: "Mark");

            migrationBuilder.RenameIndex(
                name: "IX_Marks_QuestionId",
                table: "Mark",
                newName: "IX_Mark_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Marks_AnswearId",
                table: "Mark",
                newName: "IX_Mark_AnswearId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mark",
                table: "Mark",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mark_Answears_AnswearId",
                table: "Mark",
                column: "AnswearId",
                principalTable: "Answears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Mark_Questions_QuestionId",
                table: "Mark",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentMark_Mark_MarkId",
                table: "StudentMark",
                column: "MarkId",
                principalTable: "Mark",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
