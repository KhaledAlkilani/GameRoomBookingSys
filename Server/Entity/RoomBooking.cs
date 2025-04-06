using gameroombookingsys.Enums;

namespace Gameroombookingsys.Models
{
    public class RoomBooking : BaseEntity
    {
        public DateTime BookingDateTime { get; set; }
        public double Duration { get; set; }
        public ICollection<Device> Devices { get; set; } = new List<Device>();
        public bool isPlayingAlone { get; set; }
        public int Fellows { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Upcoming;
        public int PlayerId { get; set; }
        public Player Player { get; set; }

    }
}