#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    /// <inheritdoc />
    public partial class UpdateUserFacilityRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answears_Questions_QuestionId",
                table: "Answears");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Facility_FacilityId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Facility_Users_OwnerId",
                table: "Facility");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentExam_Exams_ExamId",
                table: "StudentExam");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentExam_Users_StudentId",
                table: "StudentExam");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Facility_StudentSystemId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_StudentSystemId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Facility_OwnerId",
                table: "Facility");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentExam",
                table: "StudentExam");

            migrationBuilder.DropColumn(
                name: "StudentSystemId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Facility");

            migrationBuilder.RenameTable(
                name: "StudentExam",
                newName: "StudentsExams");

            migrationBuilder.RenameIndex(
                name: "IX_StudentExam_ExamId",
                table: "StudentsExams",
                newName: "IX_StudentsExams_ExamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentsExams",
                table: "StudentsExams",
                columns: new[] { "StudentId", "ExamId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Answears_Questions_QuestionId",
                table: "Answears",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Facility_FacilityId",
                table: "Exams",
                column: "FacilityId",
                principalTable: "Facility",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsExams_Exams_ExamId",
                table: "StudentsExams",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsExams_Users_StudentId",
                table: "StudentsExams",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answears_Questions_QuestionId",
                table: "Answears");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Facility_FacilityId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentsExams_Exams_ExamId",
                table: "StudentsExams");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentsExams_Users_StudentId",
                table: "StudentsExams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentsExams",
                table: "StudentsExams");

            migrationBuilder.RenameTable(
                name: "StudentsExams",
                newName: "StudentExam");

            migrationBuilder.RenameIndex(
                name: "IX_StudentsExams_ExamId",
                table: "StudentExam",
                newName: "IX_StudentExam_ExamId");

            migrationBuilder.AddColumn<int>(
                name: "StudentSystemId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Facility",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentExam",
                table: "StudentExam",
                columns: new[] { "StudentId", "ExamId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_StudentSystemId",
                table: "Users",
                column: "StudentSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_Facility_OwnerId",
                table: "Facility",
                column: "OwnerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Answears_Questions_QuestionId",
                table: "Answears",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Facility_FacilityId",
                table: "Exams",
                column: "FacilityId",
                principalTable: "Facility",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Facility_Users_OwnerId",
                table: "Facility",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentExam_Exams_ExamId",
                table: "StudentExam",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentExam_Users_StudentId",
                table: "StudentExam",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Facility_StudentSystemId",
                table: "Users",
                column: "StudentSystemId",
                principalTable: "Facility",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
