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

                // Update Duration column to be a float (SQL Server float corresponds to a C# double)
                entity.Property(e => e.Duration)
                    .HasColumnType("float");
            });

            modelBuilder.Entity<RoomBooking>()
               .HasOne(rb => rb.Player)
               .WithMany(p => p.RoomBookings)
               .HasForeignKey(rb => rb.PlayerId)
               .HasConstraintName("FK_RoomBookings_Players_PlayerId")
               .OnDelete(DeleteBehavior.Cascade);

            // Configure many-to-many relationship between RoomBooking and Device using an auto join table.
            modelBuilder.Entity<RoomBooking>()
                .HasMany(rb => rb.Devices)
                .WithMany(d => d.RoomBookings)
                .UsingEntity<Dictionary<string, object>>(
                    "DeviceRoomBooking",
                    j => j
                        .HasOne<Device>()
                        .WithMany()
                        .HasForeignKey("DeviceId")
                        .HasConstraintName("FK_DeviceRoomBooking_Devices_DeviceId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<RoomBooking>()
                        .WithMany()
                        .HasForeignKey("RoomBookingId")
                        .HasConstraintName("FK_DeviceRoomBooking_RoomBookings_RoomBookingId")
                        .OnDelete(DeleteBehavior.Cascade) 
                );
        }
    }
}
