namespace Gameroombookingsys.Models
{
    public class Player : BaseEntity
    {
        public string Username { get; set; }
        public string PictureUrl { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Theme { get; set; }
        public ICollection<RoomBooking> RoomBookings { get; set; } = new List<RoomBooking>();

    }
};