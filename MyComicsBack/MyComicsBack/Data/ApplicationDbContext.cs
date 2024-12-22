using Microsoft.EntityFrameworkCore;
using MyComicsBack.Models;

namespace MyComicsBack.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Comic> Comics { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
            .HasOne(u => u.UserRole)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.UserRoleId);


            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Comic>().HasData(
                new Comic { Id = 1, Title = "Infinite Crisis", Pages = 230 },
                new Comic { Id = 2, Title = "Green Lantern", Pages = 320 }
            );
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "keajvn", Password = "sbkonfos", UserRoleId = 1 },
                new User { Id = 2, Email = "dfbdfb", Password = "345", UserRoleId = 2 },
                new User { Id = 3, Email = "despoina", Password = "3463", UserRoleId = 1 }
            );
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { Id = 1, RoleType = "Admin" },
                new UserRole { Id = 2, RoleType = "User" }
            );
        }
    }
}
