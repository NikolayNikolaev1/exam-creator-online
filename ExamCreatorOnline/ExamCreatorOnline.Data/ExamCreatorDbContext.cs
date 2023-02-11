namespace ExamCreatorOnline.Data
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class ExamCreatorDbContext : DbContext
    {
        public DbSet<Exam> Exams { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Answear> Answears { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {

            builder.UseSqlServer(@"Server=HP-ELITEBOOK\SQLEXPRESS;Database=ExamCreatorOnline;Integrated Security=True;TrustServerCertificate=True;");
            base.OnConfiguring(builder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Question>()
                .HasOne(q => q.Exam)
                .WithMany(e => e.Questions)
                .HasForeignKey(q => q.ExamId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Answear>()
                .HasOne(a => a.Question)
                .WithMany(q => q.Answears)
                .HasForeignKey(a => a.QuestionId);

            base.OnModelCreating(builder);
        }
    }
}
