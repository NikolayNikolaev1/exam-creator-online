﻿// <auto-generated />
#nullable disable

namespace ExamCreatorOnline.Data.Migrations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Infrastructure;
    using Microsoft.EntityFrameworkCore.Migrations;

    [DbContext(typeof(ExamCreatorDbContext))]
    [Migration("20230219123218_AddMarksAndRoles")]
    partial class AddMarksAndRoles
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Answear", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answears");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Exam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AveragePoints")
                        .HasColumnType("int");

                    b.Property<int>("ExcelentPoints")
                        .HasColumnType("int");

                    b.Property<int>("FacilityId")
                        .HasColumnType("int");

                    b.Property<int>("GoodPoints")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.Property<int>("VeryGoodPoints")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FacilityId");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Facility", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId")
                        .IsUnique();

                    b.ToTable("Facility");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Mark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnswearId")
                        .HasColumnType("int");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AnswearId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Mark");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.StudentExam", b =>
                {
                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.Property<int>("TeacherId")
                        .HasColumnType("int");

                    b.HasKey("StudentId", "ExamId");

                    b.HasIndex("ExamId");

                    b.HasIndex("TeacherId");

                    b.ToTable("StudentExam");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.StudentMark", b =>
                {
                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<int>("MarkId")
                        .HasColumnType("int");

                    b.HasKey("StudentId", "MarkId");

                    b.HasIndex("MarkId");

                    b.ToTable("StudentMark");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FacilityId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int?>("StudentSystemId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FacilityId");

                    b.HasIndex("RoleId");

                    b.HasIndex("StudentSystemId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Answear", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Question", "Question")
                        .WithMany("Answears")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Exam", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Facility", "Facility")
                        .WithMany("Exams")
                        .HasForeignKey("FacilityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Facility");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Facility", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.User", "Owner")
                        .WithOne()
                        .HasForeignKey("ExamCreatorOnline.Data.Models.Facility", "OwnerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Mark", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Answear", "Answear")
                        .WithMany("Marks")
                        .HasForeignKey("AnswearId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.Question", "Question")
                        .WithMany("Marks")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Answear");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Question", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Exam", "Exam")
                        .WithMany("Questions")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Exam");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.StudentExam", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Exam", "Exam")
                        .WithMany("Students")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.User", "Student")
                        .WithMany("Exams")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.User", "Teacher")
                        .WithMany("Examinings")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Exam");

                    b.Navigation("Student");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.StudentMark", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Mark", "Mark")
                        .WithMany("Students")
                        .HasForeignKey("MarkId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.User", "Student")
                        .WithMany("Marks")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Mark");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.User", b =>
                {
                    b.HasOne("ExamCreatorOnline.Data.Models.Facility", "Facility")
                        .WithMany("Teachers")
                        .HasForeignKey("FacilityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ExamCreatorOnline.Data.Models.Facility", "StudentSystem")
                        .WithMany("Students")
                        .HasForeignKey("StudentSystemId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Facility");

                    b.Navigation("Role");

                    b.Navigation("StudentSystem");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Answear", b =>
                {
                    b.Navigation("Marks");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Exam", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("Students");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Facility", b =>
                {
                    b.Navigation("Exams");

                    b.Navigation("Students");

                    b.Navigation("Teachers");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Mark", b =>
                {
                    b.Navigation("Students");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Question", b =>
                {
                    b.Navigation("Answears");

                    b.Navigation("Marks");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ExamCreatorOnline.Data.Models.User", b =>
                {
                    b.Navigation("Examinings");

                    b.Navigation("Exams");

                    b.Navigation("Marks");
                });
#pragma warning restore 612, 618
        }
    }
}
