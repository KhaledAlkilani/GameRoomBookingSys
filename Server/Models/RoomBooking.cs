using gameroombookingsys.Enums;

namespace Gameroombookingsys.Models
{
    public class RoomBooking : BaseEntity
    {
        public DateTime BookingDateTime { get; set; }
        public TimeSpan Duration { get; set; }
        public List<Device> Devices { get; set; } = new List<Device>();
        public bool isPlayingAlone { get; set; }
        public List<int> Fellows { get; set; } = new List<int>();
        public BookingStatus Status { get; set; } = BookingStatus.Pending;
    }
}