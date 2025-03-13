using Gameroombookingsys.Models;
using Microsoft.EntityFrameworkCore;
using gameroombookingsys;
using gameroombookingsys.IRepository;

namespace Gameroombookingsys.Repository
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Player> GetPlayerByEmail(string email)
        {
            return await _context.Players.FirstOrDefaultAsync(p => p.Email == email);
        }
    }
}
