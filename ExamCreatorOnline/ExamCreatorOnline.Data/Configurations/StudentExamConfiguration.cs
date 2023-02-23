namespace ExamCreatorOnline.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class StudentExamConfiguration : IEntityTypeConfiguration<StudentExam>
    {
        public void Configure(EntityTypeBuilder<StudentExam> studentExam)
        {
            studentExam
                .HasKey(ue => new { ue.StudentId, ue.ExamId });

            studentExam
                .HasOne(s => s.Exam)
                .WithMany(e => e.Students)
                .HasForeignKey(s => s.ExamId)
                .OnDelete(DeleteBehavior.Restrict);

            studentExam
                .HasOne(e => e.Student)
                .WithMany(s => s.Exams)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
