using Microsoft.EntityFrameworkCore;
using Gameroombookingsys.Models;

namespace gameroombookingsys
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Player> Players { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<RoomBooking> RoomBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RoomBooking>(entity =>
            {
                entity.Property(e => e.BookingDateTime)
               .HasColumnType("datetime2");
            });
        }
    }
}
