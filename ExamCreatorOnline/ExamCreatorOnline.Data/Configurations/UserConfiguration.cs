namespace ExamCreatorOnline.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> user)
        {
            user
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            user
                .HasMany(l => l.Examinings)
                .WithOne(e => e.Lecturer)
                .HasForeignKey(e => e.LecturerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
