using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using gameroombookingsys.Helpers;
using gameroombookingsys.IRepository;

namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/token")]
    public class TokenController : ControllerBase
    {
        private readonly IPlayersRepository _playersRepository;

        public TokenController(IPlayersRepository playersRepository)
        {
            _playersRepository = playersRepository;
        }

        [HttpGet("generate")]
        public async Task<ActionResult> GenerateToken([FromQuery] string email)
        {
            // Validate email parameter.
            if (string.IsNullOrEmpty(email) || !email.EndsWith("@edu.xamk.fi", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Invalid email. Only school emails ending with '@edu.xamk.fi' are allowed.");
            }

            // Check if the email is registered in your database
            var player = await _playersRepository.GetPlayerByEmail(email);
            if (player == null)
            {
                return NotFound("User not registered.");
            }

            // Define claims using the provided email.
            var claims = new[]
            {
                new Claim("email", email)
            };

            // Set expiration to 1 hour from now.
            var token = JwtTokenGenerator.CreateJwt(claims, DateTime.UtcNow.AddHours(1));
            return Ok(token);
        }
    }
}
