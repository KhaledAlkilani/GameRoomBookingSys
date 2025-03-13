using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IRoomBookingService
    {
        Task<RoomBookingDto> BookGameRoom();
        Task<RoomBookingDto> UpdateRoomBooking(RoomBookingDto roomBookingDto);
        Task<RoomBookingDto> CancelRoomBooking(int roomBookingId);
        Task<RoomBookingDto> GetRoomBookingByPlayerId(int playerId);
        Task<List<RoomBookingDto>> GetAllBookings();
        Task<List<RoomBookingDto>> GetUpcomingBookings();
        Task<List<RoomBookingDto>> GetOngoingBookings();
        Task<List<RoomBookingDto>> GetHistoryBookings();
    }
}
