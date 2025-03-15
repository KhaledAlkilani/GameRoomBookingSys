using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IRoomBookingsService
    {
        Task<RoomBookingDto> BookGameRoom(RoomBookingDto dto);
        Task<RoomBookingDto> UpdateRoomBooking(int id, RoomBookingDto dto);
        Task<RoomBookingDto> GetRoomBookingByPlayerId(int playerId);
        Task<List<RoomBookingDto>> GetAllBookings();
        Task<List<RoomBookingDto>> GetUpcomingBookings();
        Task<List<RoomBookingDto>> GetOngoingBookings();
        Task<List<RoomBookingDto>> GetHistoryBookings();
    }
}
