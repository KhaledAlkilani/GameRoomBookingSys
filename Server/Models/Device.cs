using gameroombookingsys.Enums;

namespace Gameroombookingsys.Models
{
	public class Device : BaseEntity
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public int Quantity { get; set; }
		public DeviceStatus Status { get; set; }
		public int PlayerId { get; set; }

	}
}