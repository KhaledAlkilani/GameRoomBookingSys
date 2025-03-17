using Gameroombookingsys.Models;
using System.Threading.Tasks;
using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using gameroombookingsys.IRepository;

namespace Gameroombookingsys.Services
{
    public class PlayersService : IPlayersService
    {
        private readonly IPlayersRepository _playerRepository;

        public PlayersService(IPlayersRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<PlayerDto> GetPlayerByEmail(string email)
        {
            // This check is optional if Keycloak already filters correctly.
            if (!email.EndsWith("@edu.xamk.fi", StringComparison.OrdinalIgnoreCase))
            {
                throw new ArgumentException("Only school emails ending with '@edu.xamk.fi' are allowed.");
            }

            var player = await _playerRepository.GetPlayerByEmail(email);
            if (player == null)
                return null;

            return new PlayerDto
            {
                Id = player.Id,
                Username = player.Username,
                PictureUrl = player.PictureUrl,
                PhoneNumber = player.PhoneNumber,
                Email = player.Email,
                Theme = player.Theme
            };
        }
        public async Task<PlayerDto> GetPlayerByUsername(string username)
        {
            var player = await _playerRepository.GetPlayerByUsername(username);
            if (player == null)
                return null;

            return new PlayerDto
            {
                Id = player.Id,
                Username = player.Username,
                PictureUrl = player.PictureUrl,
                PhoneNumber = player.PhoneNumber,
                Email = player.Email,
                Theme = player.Theme
            };
        }

        public async Task<List<PlayerDto>> GetAllPlayers()
        {
            var players = await _playerRepository.GetAllPlayers();
            return players.Select(player => new PlayerDto
            {
                Id = player.Id,
                Username = player.Username,
                PictureUrl = player.PictureUrl,
                PhoneNumber = player.PhoneNumber,
                Email = player.Email,
                Theme = player.Theme
            }).ToList();
        }
    }
}
