namespace ExamCreatorOnline.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class MarkConfiguration : IEntityTypeConfiguration<Mark>
    {
        public void Configure(EntityTypeBuilder<Mark> mark)
        {
            mark.HasKey(m => m.Id);

            mark
                .HasOne(m => m.Answear)
                .WithMany(a => a.Marks)
                .HasForeignKey(m => m.AnswearId)
                .OnDelete(DeleteBehavior.Restrict);

            mark
                .HasOne(m => m.Question)
                .WithMany(q => q.Marks)
                .HasForeignKey(m => m.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
