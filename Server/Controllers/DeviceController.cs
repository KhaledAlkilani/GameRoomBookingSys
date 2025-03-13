using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/device")]
    public class DeviceController : ControllerBase
    {

        private readonly IDeviceService _deviceService;

        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        // GET api/device/devices
        [HttpGet("devices")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(DeviceDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "GetAllDevices")]
        public async Task<ActionResult> getAllDevices()
        {
            return Ok("All devices");
        }

        // GET api/device/{id}
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
