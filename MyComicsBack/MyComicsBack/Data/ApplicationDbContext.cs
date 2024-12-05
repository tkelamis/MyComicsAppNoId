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
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Comic>().HasData(
                new Comic { Id = 1, Title = "Infinite Crisis", Pages = 230 },
                new Comic { Id = 2, Title = "Green Lantern", Pages = 320 }
            );
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { Id = 1, Role = RoleType.Admin },
                new UserRole { Id = 2, Role = RoleType.User }
            );
        }
    }
}
