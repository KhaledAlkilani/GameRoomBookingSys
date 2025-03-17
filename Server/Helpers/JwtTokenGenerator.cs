using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace gameroombookingsys.Helpers
{
    public static class JwtTokenGenerator
    {
        public static string CreateJwt(IEnumerable<Claim> claims, DateTime expiresAt)
        {
            // Use a sufficiently long symmetric key (at least 32 characters for 256 bits)
            var symmetricKeyString = "gameroombookingsys_gameroombookingsys"; // 32 characters
            var symmetricKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symmetricKeyString));
            symmetricKey.KeyId = "1";
            var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiresAt,
                Issuer = "your issuer",    // You can set these values as needed
                Audience = "your audience", // You can set these values as needed
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
