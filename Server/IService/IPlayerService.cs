using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDto> GetPlayerByEmail(string email);

    }
}
