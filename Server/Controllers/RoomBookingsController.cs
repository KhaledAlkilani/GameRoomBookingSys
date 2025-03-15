using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;


namespace gameroombookingsys.Controllers
{
    [ApiController]
    [Route("api/gameroombookings")]
    public class RoomBookingsController : ControllerBase
    {
        private readonly IRoomBookingsService _roomBookingService;

        public RoomBookingsController(IRoomBookingsService roomBookingService)
        {
            _roomBookingService = roomBookingService;
        }

        // POST api/gameroombookings/bookroom
        [HttpPost("bookgameroom")]
        // Ensure Swagger sees RoomBookingDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "BookGameRoom")]
        public async Task<ActionResult<RoomBookingDto>> BookGameRoom([FromBody] RoomBookingDto dto)
        {
            try
            {

                var booking = await _roomBookingService.BookGameRoom(dto);
                return Ok(booking);
            }
            catch (InvalidOperationException ex)
            {
                // Typically thrown if the room is not available
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                // Generic error handling
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = ex.Message });
            }
        }

        // Put api/gameroombookings/{id}
        [HttpPut("booking/{id}")]
        // Ensure Swagger sees RoomBookingDto
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        // Control the method name
        [SwaggerOperation(OperationId = "UpdateRoomBooking")]
        public async Task<ActionResult<RoomBookingDto>> UpdateRoomBooking(int id, [FromBody] RoomBookingDto dto)
        {
            try
            {
                var updatedBooking = await _roomBookingService.UpdateRoomBooking(id, dto);
                return Ok(updatedBooking);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        // GET api/gameroombookings/upcomingbookings
        [HttpGet("upcomingbookings")]
        [ProducesResponseType(typeof(List<RoomBookingDto>), StatusCodes.Status200OK)]
        [SwaggerOperation(OperationId = "GetUpcomingBookings")]
        public async Task<ActionResult<List<RoomBookingDto>>> GetUpcomingBookings()
        {
            try
            {
                var bookings = await _roomBookingService.GetUpcomingBookings();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        // GET api/gameroombookings/ongoingbookings
        [HttpGet("ongoingbookings")]
        [ProducesResponseType(typeof(List<RoomBookingDto>), StatusCodes.Status200OK)]
        [SwaggerOperation(OperationId = "GetOngoingBookings")]
        public async Task<ActionResult<List<RoomBookingDto>>> GetOngoingBookings()
        {
            try
            {
                var bookings = await _roomBookingService.GetOngoingBookings();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        // GET api/gameroombookings/historybookings
        [HttpGet("historybookings")]
        [ProducesResponseType(typeof(List<RoomBookingDto>), StatusCodes.Status200OK)]
        [SwaggerOperation(OperationId = "GetHistoryBookings")]
        public async Task<ActionResult<List<RoomBookingDto>>> GetHistoryBookings()
        {
            try
            {
                var bookings = await _roomBookingService.GetHistoryBookings();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        // GET api/gameroombookings/{id}
        // (Assumes that you have added a GetRoomBookingById method in your service layer.)
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        [SwaggerOperation(OperationId = "GetRoomBookingById")]
        public async Task<ActionResult<RoomBookingDto>> GetRoomBookingById(int id)
        {
            try
            {
                var booking = await _roomBookingService.GetRoomBookingById(id);
                return Ok(booking);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpGet("player/{playerId}")]
        [ProducesResponseType(typeof(RoomBookingDto), StatusCodes.Status200OK)]
        [SwaggerOperation(OperationId = "GetRoomBookingByPlayerId")]
        public async Task<ActionResult<RoomBookingDto>> GetRoomBookingByPlayerId(int playerId)
        {
            try
            {
                var booking = await _roomBookingService.GetRoomBookingByPlayerId(playerId);
                return Ok(booking);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }
    }
}
