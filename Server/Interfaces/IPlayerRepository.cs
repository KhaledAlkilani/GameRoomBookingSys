using Gameroombookingsys.Models;

namespace gameroombookingsys.Interfaces
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByEmailAsync(string email);
    }
}
