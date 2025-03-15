using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IPlayersService
    {
        Task<PlayerDto> GetPlayerByEmail(string email);

    }
}
