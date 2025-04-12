using gameroombookingsys.Enums;
using Gameroombookingsys.Models;
using System;

namespace gameroombookingsys.DTOs
{
    public class RoomBookingDto : BaseEntity
    {
        // Parameterless constructor for deserialization
        public RoomBookingDto() { }

         public RoomBookingDto(RoomBooking roomBooking)
        {
            Id = roomBooking.Id;
            BookingDateTime = roomBooking.BookingDateTime;
            Duration = roomBooking.Duration;
            Devices = roomBooking.Devices?.Select(d => new DeviceDto(d)).ToList();
            isPlayingAlone = roomBooking.isPlayingAlone;
            Fellows = roomBooking.Fellows;
            Status = roomBooking.Status;
            PlayerId = roomBooking.PlayerId;
            PassCode = roomBooking.PassCode;
            IsPassCodeValid = roomBooking.IsPassCodeValid;
        }

        public DateTime BookingDateTime { get; set; }
        public double Duration { get; set; }
        public List<DeviceDto> Devices { get; set; } = new List<DeviceDto>();
        public bool isPlayingAlone { get; set; }
        public int Fellows { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Upcoming;
        public int PlayerId { get; set; }
        public string? PassCode { get; set; }
        public bool IsPassCodeValid { get; set; }
    }
}
