using Microsoft.AspNetCore.Mvc; 
using System.Security.Claims;
using gameroombookingsys.Interfaces;
using gameroombookingsys.DTOs;
using Swashbuckle.AspNetCore.Annotations;

[ApiController]
[Route("api/player")]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;

    public PlayerController(IPlayerService playerService)
    {
        _playerService = playerService;
    }

    // GET api/player/profile
    [HttpGet("profile")]
    [ProducesResponseType(typeof(PlayerDto), StatusCodes.Status200OK)]
    [SwaggerOperation(OperationId = "GetPlayerInfo")]
    public async Task<ActionResult> GetPlayerInfo()
    {
        try
        {
            // Retrieve the player's email from the authentication claims.
            //var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var email = "khaledkelany@gmail.com";
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("No email claim found.");
            }

            var playerDto = await _playerService.GetPlayerByEmailAsync(email);
            if (playerDto == null)
            {
                return NotFound("Player not found.");
            }

            return Ok(playerDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching player info", error = ex.Message });
        }
    }

//    // GET api/player/{id}
//    [HttpGet("{id}")]
//    public async Task<IActionResult> GetPlayerById(int id)
//    {
//        try
//        {
//            var player = await _dbcontext.Players.FindAsync(id);
//            if (player == null)
//            {
//                return NotFound(new {message = "Player not found" });
//            }
//            return Ok();
//        }
//        catch (Exception e)
//        {
//            return StatusCode(500, new { message = "Error fetching player by ID", error = e.Message });
//        }
//    }

//    // GET api/player (for admin, might add an authorization attribute)
//    [HttpGet]
//    public async Task<IActionResult> GetAllPlayers()
//    {
//        try
//        {
//            var players = await _dbcontext.Players.ToListAsync();
//            return Ok(players);
//        } 
//        catch (Exception e)
//        {
//            return StatusCode(500, new { message = "Error fetching players", error = e.Message });
//        }
       
//    }
}