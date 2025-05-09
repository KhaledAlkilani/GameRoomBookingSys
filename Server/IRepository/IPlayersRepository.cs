﻿using Gameroombookingsys.Models;

namespace gameroombookingsys.IRepository
{
    public interface IPlayersRepository
    {
        Task<Player> GetPlayerByEmail(string email);
        Task<Player> GetPlayerByUsername(string username);
        Task<List<Player>> GetAllPlayers();
        Task<Player> UpdatePlayer(Player player);
        Task<Player> GetPlayerById(int playerId);
    }
}
