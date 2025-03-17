using gameroombookingsys.Enums;
using Gameroombookingsys.Models;

namespace gameroombookingsys.DTOs
{
    public class RoomBookingDto : BaseEntity
    {
        public DateTime BookingDateTime { get; set; }
        public TimeSpan Duration { get; set; }
        public List<DeviceDto> Devices { get; set; } = new List<DeviceDto>();
        public bool isPlayingAlone { get; set; }
        public int Fellows { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Upcoming;
    }
}
