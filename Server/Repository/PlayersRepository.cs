﻿using Gameroombookingsys.Models;
using Microsoft.EntityFrameworkCore;
using gameroombookingsys;
using gameroombookingsys.IRepository;

namespace Gameroombookingsys.Repository
{
    public class PlayersRepository : IPlayersRepository
    {
        private readonly AppDbContext _context;

        public PlayersRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Player> GetPlayerByEmail(string email)
        {
            var playerByEmail = await _context.Players.FirstOrDefaultAsync(p => p.Email == email);
            return playerByEmail;
        }

        public async Task<Player> GetPlayerByUsername(string username)
        {
            var playerByUserName = await _context.Players.FirstOrDefaultAsync(p => p.Username == username);
            return playerByUserName;
        }

        public async Task<List<Player>> GetAllPlayers()
        {
            var players = await _context.Players.ToListAsync();
            return players;
        }


    }
}
