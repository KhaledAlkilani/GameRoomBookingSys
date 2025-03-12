using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDto> GetPlayerByEmailAsync(string email);
    }
}
