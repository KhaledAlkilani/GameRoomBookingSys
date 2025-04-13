using gameroombookingsys.Enums;
using Gameroombookingsys.Models;

namespace gameroombookingsys.DTOs
{
    public class DeviceDto : BaseEntity
    {
        public DeviceDto() { } // parameterless constructor for deserialization

        // Mapping constructor from Device entity
        public DeviceDto(Device device)
        {
            Id = device.Id;
            Name = device.Name;
            Description = device.Description;
            Quantity = device.Quantity;
            Status = device.Status;
            PlayerId = device.PlayerId; 
        } 
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? Quantity { get; set; }
        public DeviceStatus? Status { get; set; }
        public int? PlayerId { get; set; }
    }
}