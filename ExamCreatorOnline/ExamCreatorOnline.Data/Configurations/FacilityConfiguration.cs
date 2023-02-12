namespace ExamCreatorOnline.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class FacilityConfiguration : IEntityTypeConfiguration<Facility>
    {
        public void Configure(EntityTypeBuilder<Facility> facility)
        {
            facility
                .HasOne(f => f.Owner)
                .WithOne()
                .HasForeignKey<Facility>(f => f.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            facility
                .HasMany(f => f.Teachers)
                .WithOne(t => t.Facility)
                .HasForeignKey(t => t.FacilityId)
                .OnDelete(DeleteBehavior.Restrict);

            facility
                .HasMany(f => f.Students)
                .WithOne(s => s.StudentSystem)
                .HasForeignKey(s => s.StudentSystemId)
                .OnDelete(DeleteBehavior.Restrict);

            facility
                .HasMany(f => f.Exams)
                .WithOne(e => e.Facility)
                .HasForeignKey(e => e.FacilityId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
