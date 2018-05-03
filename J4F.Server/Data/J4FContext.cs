using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace J4F.Server
{
    public class J4FContext : DbContext
    {
        public DbSet<Product> Product { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AddDate)
                    .HasColumnName("addDate")
                    .HasColumnType("date");

                entity.Property(e => e.AddIp)
                    .HasColumnName("addIP")
                    .HasMaxLength(15);

                entity.Property(e => e.Category)
                    .HasColumnName("category")
                    .HasMaxLength(20);

                entity.Property(e => e.Isdel).HasColumnName("isdel");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(20);

                entity.Property(e => e.Pictureid).HasColumnName("pictureid");

                entity.Property(e => e.Status).HasColumnName("status");
            });
        }
    }
}
