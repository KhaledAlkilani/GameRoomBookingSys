﻿using Gameroombookingsys.Models;
using System.Threading.Tasks;
using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using gameroombookingsys.IRepository;

namespace Gameroombookingsys.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<PlayerDto> GetPlayerByEmail(string email)
        {
            var player = await _playerRepository.GetPlayerByEmail(email);
            if (player == null)
                return null;

            // Map Player to PlayerDto; you can also use AutoMapper if preferred.
            return new PlayerDto
            {
                Id = player.Id,
                PictureUrl = player.PictureUrl,
                PhoneNumber = player.PhoneNumber,
                Email = player.Email,
                Theme = player.Theme
            };
        }
    }
}
