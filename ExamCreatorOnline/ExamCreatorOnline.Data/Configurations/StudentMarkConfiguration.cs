namespace ExamCreatorOnline.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class StudentMarkConfiguration : IEntityTypeConfiguration<StudentMark>
    {
        public void Configure(EntityTypeBuilder<StudentMark> studentMark)
        {
            studentMark
                .HasKey(sm => new { sm.StudentId, sm.MarkId });

            studentMark
                .HasOne(s => s.Mark)
                .WithMany(m => m.Students)
                .HasForeignKey(s => s.MarkId)
                .OnDelete(DeleteBehavior.Restrict);

            studentMark
                .HasOne(m => m.Student)
                .WithMany(s => s.Marks)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
