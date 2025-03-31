using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IPlayersService
    {
        Task<PlayerDto> GetPlayerByEmail(string email);
        Task<PlayerDto> GetPlayerByUsername(string username);
        Task<List<PlayerDto>> GetAllPlayers();
        Task<PlayerDto> UpdatePlayerInfo(PlayerDto playerDto);

    }
}
