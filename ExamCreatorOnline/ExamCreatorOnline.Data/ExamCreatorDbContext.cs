namespace ExamCreatorOnline.Data
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class ExamCreatorDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

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
                .Entity<StudentExam>()
                .HasKey(ue => new { ue.StudentId, ue.ExamId });

            builder
                .Entity<StudentExam>()
                .HasOne(s => s.Exam)
                .WithMany(e => e.Students)
                .HasForeignKey(s => s.ExamId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<StudentExam>()
                .HasOne(e => e.Student)
                .WithMany(s => s.Exams)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<StudentExam>()
                .HasOne(e => e.Teacher)
                .WithMany(t => t.ExamsLeading)
                .HasForeignKey(e => e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

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
