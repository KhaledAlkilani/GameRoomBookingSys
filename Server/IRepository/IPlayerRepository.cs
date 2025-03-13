using Gameroombookingsys.Models;

namespace gameroombookingsys.IRepository
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByEmail(string email);
    }
}
