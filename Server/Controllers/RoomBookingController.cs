using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/gameroombooking")]
    public class RoomBookingController : ControllerBase
    {
        private readonly IRoomBookingService _roomBookingService;

        public RoomBookingController(IRoomBookingService roomBookingService)
        {
            _roomBookingService = roomBookingService;
        }

        // POST api/gameroombooking/bookroom
        [HttpPost("bookroom")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "BookRoom")]
        public async Task<ActionResult> BookRoom()
        {
            return Ok("Book room");
        }

        // GET api/gameroombooking/upcomingbookings
        [HttpGet("upcomingbookings")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "GetUpcomingBookings")]
        public async Task<ActionResult> GetUpcomingBookings()
        {
            return Ok("Upcoming room bookings");
        }

        // GET api/gameroombooking/ongoingbookings
        [HttpGet("ongoingbookings")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "GetOngoingBookings")]
        public async Task<ActionResult> GetOngoingBookings()
        {
            return Ok("Ongoing room bookings");
        }

        // GET api/gameroombooking/historybookings
        [HttpGet("historybookings")]
        // Ensure Swagger sees PlayerDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "GetHistoryBookings")]
        public async Task<ActionResult> GetHistoryBookings()
        {
            return Ok("History room bookings");
        }

        // GET api/roombooking/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> getRoomBookingbyId(int id)
        {
            return Ok("Room booking by id");
        }

    }
}
