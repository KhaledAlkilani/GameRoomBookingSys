using gameroombookingsys.DTOs;
using Gameroombookingsys.Models;

namespace gameroombookingsys.IRepository
{
    public interface IRoomBookingsRepository
    {
        Task<bool> IsRoomAvailable(DateTime startTime, TimeSpan duration);
        Task<RoomBooking> AddRoomBooking(RoomBooking booking);
        Task<RoomBooking> GetRoomBookingById(int id);
        Task<RoomBooking> UpdateRoomBooking(RoomBooking booking);
        Task<RoomBooking> GetRoomBookingByPlayerId(int playerId);
        Task<List<RoomBooking>> GetAllBookings();

    }
}
