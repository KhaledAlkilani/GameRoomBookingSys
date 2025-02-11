using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class GameRoomBookingSysContext : DbContext
    {
        public GameRoomBookingSysContext(DbContextOptions<GameRoomBookingSysContext> options) : base(options)
        {
        }

        public DbSet<Player> Players { get; set; } = null!;
    }
}
