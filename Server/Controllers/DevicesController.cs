using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class DevicesController : ControllerBase
    {

        private readonly IDevicesService _deviceService;

        public DevicesController(IDevicesService deviceService)
        {
            _deviceService = deviceService;
        }

        // GET api/devices/devices
        [HttpGet("devices")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(DeviceDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "GetAllDevices")]
        public async Task<ActionResult> getAllDevices()
        {
            return Ok("All devices");
        }

        // GET api/devices/{id}
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        //Control the method name
        [SwaggerOperation(OperationId = "getDevicebyId")]
        public async Task<ActionResult> getDevicebyId(int id)
        {
            return Ok("Device by id");
        }

    }
}
