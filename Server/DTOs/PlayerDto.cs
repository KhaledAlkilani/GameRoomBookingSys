using Gameroombookingsys.Models;

namespace gameroombookingsys.DTOs
{
    public class PlayerDto : BaseEntity
    {
        public string PictureUrl { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Theme { get; set; }
    }
}
