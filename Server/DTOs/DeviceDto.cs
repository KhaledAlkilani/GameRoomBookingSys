using gameroombookingsys.Enums;
using Gameroombookingsys.Models;

namespace gameroombookingsys.DTOs
{
    public class DeviceDto : BaseEntity
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? Quantity { get; set; }
        public DeviceStatus? Status { get; set; }
        public int? PlayerId { get; set; }
    }
}
