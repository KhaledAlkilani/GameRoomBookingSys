using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using gameroombookingsys.Helpers;

namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/token")]
    public class TokenController : ControllerBase
    {
        [HttpGet("generate")]
        public ActionResult GenerateToken([FromQuery] string email)
        {
            // Validate email parameter.
            if (string.IsNullOrEmpty(email) || !email.EndsWith("@edu.xamk.fi", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Invalid email. Only school emails ending with '@edu.xamk.fi' are allowed.");
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
