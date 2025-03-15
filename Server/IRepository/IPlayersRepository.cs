using Gameroombookingsys.Models;

namespace gameroombookingsys.IRepository
{
    public interface IPlayersRepository
    {
        Task<Player> GetPlayerByEmail(string email);
    }
}
