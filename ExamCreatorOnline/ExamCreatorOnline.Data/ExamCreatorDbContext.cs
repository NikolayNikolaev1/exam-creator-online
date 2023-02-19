namespace ExamCreatorOnline.Data
{
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Reflection;

    public class ExamCreatorDbContext : DbContext
    {
        public ExamCreatorDbContext(DbContextOptions<ExamCreatorDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Facility> Facility { get; set; }

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
                .Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
            // Using reflection for property relations configuration.
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
