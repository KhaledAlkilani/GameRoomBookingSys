using Gameroombookingsys.Models;
using Microsoft.EntityFrameworkCore; 
using gameroombookingsys.Interfaces;
using gameroombookingsys;

namespace Gameroombookingsys.Repository
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Player> GetPlayerByEmailAsync(string email)
        {
            return await _context.Players.FirstOrDefaultAsync(p => p.Email == email);
        }
    }
}
