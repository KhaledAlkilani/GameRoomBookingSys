﻿
using gameroombookingsys.DTOs;
using gameroombookingsys.Enums;
using gameroombookingsys.Helpers;
using gameroombookingsys.Interfaces;
using gameroombookingsys.IRepository;
using Gameroombookingsys.Models;
using Gameroombookingsys.Repository;

namespace gameroombookingsys.Service
{
    public class RoomBookingsService : IRoomBookingsService
    {
        private readonly IRoomBookingsRepository _repository;
        private readonly IPlayersRepository _playersRepository;
        private readonly ILogger<RoomBookingsService> _logger;
        private readonly KeycloakHelper _keycloakHelper;
        public RoomBookingsService(IRoomBookingsRepository repository,
        IPlayersRepository playersRepository,
        ILogger<RoomBookingsService> logger,
        KeycloakHelper keycloakHelper)
        {
            _repository = repository;
            _playersRepository = playersRepository;
            _logger = logger;
            _keycloakHelper = keycloakHelper;
        }
        public async Task<RoomBookingDto> BookGameRoom(RoomBookingDto dto)
        {
            try
            {
                // Get the authenticated user's email from the HttpContext via KeycloakHelper
                var email = _keycloakHelper.GetUserEmail();
                if (string.IsNullOrEmpty(email))
                    throw new Exception("User not authenticated.");

                // Look up the player by email
                var player = await _playersRepository.GetPlayerByEmail(email);
                if (player == null)
                    throw new Exception("Player not found for the authenticated user.");

                // Set the booking's playerId to the authenticated player's ID
                dto.PlayerId = player.Id;

                // Validate booking date/time
                if (dto.BookingDateTime == default)
                    throw new ArgumentException("Booking date/time is required.");
                if (dto.BookingDateTime <= DateTime.Now)
                    throw new ArgumentException("Booking date/time must be in the future.");

                // Validate duration: must be > 0 and <= 2 hours.
                if (dto.Duration <= 0)
                    throw new ArgumentException("Duration must be greater than zero.");
                if (dto.Duration > 2)
                    throw new ArgumentException("Duration must be 2 hours or less.");

                if (dto.isPlayingAlone && dto.Fellows > 0)
                    throw new ArgumentException("You cannot play alone and have fellows at the same time.");
                if (!dto.isPlayingAlone && dto.Fellows == 0)
                    throw new ArgumentException("If you are not playing alone, you must specify the number of fellows.");

                bool isAvailable = await _repository.IsRoomAvailable(dto.BookingDateTime, dto.Duration);
                if (!isAvailable)
                    throw new InvalidOperationException("Room is not available at the requested time.");

                if (dto.BookingDateTime <= DateTime.Now)
                    throw new ArgumentException("Booking date/time must be in the future.");

                // Set status to Upcoming
                dto.Status = BookingStatus.Upcoming;

                // Map DTO to entity
                var booking = new RoomBooking
                {
                    BookingDateTime = dto.BookingDateTime,
                    Duration = dto.Duration,
                    isPlayingAlone = dto.isPlayingAlone,
                    Fellows = dto.Fellows,
                    Status = dto.Status,
                    PlayerId = dto.PlayerId
                };

                // Convert each DeviceDto -> Device and add to booking.Devices
                if (dto.Devices != null && dto.Devices.Count > 0)
                {
                    foreach (var deviceDto in dto.Devices)
                    {
                        var device = new Device
                        {
                            Name = deviceDto.Name,
                            Description = deviceDto.Description,
                            Quantity = deviceDto.Quantity,
                            Status = deviceDto.Status,
                            PlayerId = deviceDto.PlayerId
                        };
                        booking.Devices.Add(device);
                    }
                }

                // Save
                var savedBooking = await _repository.AddRoomBooking(booking);

                // Update the DTO's ID to reflect the newly created booking
                dto.Id = savedBooking.Id;
                return dto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in BookGameRoom in service.");
                throw;
            }
        } 
        public async Task<RoomBookingDto> UpdateRoomBooking(int id, RoomBookingDto dto)
        {
            try
            {
                // Use the id from the URL as the definitive identifier.
                dto.Id = id;

                // Retrieve the existing booking by id.
                var booking = await _repository.GetRoomBookingById(id);
                if (booking == null)
                    throw new KeyNotFoundException("Booking not found.");

                // Check if the booking is already cancelled.
                if (booking.Status == BookingStatus.Cancelled)
                    throw new InvalidOperationException("Booking is already cancelled and cannot be updated.");

                // If the update is intended to cancel the booking,
                // the client can simply set the status to Cancelled.
                if (dto.Status == BookingStatus.Cancelled)
                {
                    // Prevent cancellation if the booking is in the past.
                    if (booking.BookingDateTime < DateTime.Now)
                        throw new InvalidOperationException("Cannot cancel a booking in the past.");

                    booking.Status = BookingStatus.Cancelled;
                }
                else
                {
                    // Update the booking fields
                    booking.BookingDateTime = dto.BookingDateTime;
                    booking.Duration = dto.Duration; 
                    booking.isPlayingAlone = dto.isPlayingAlone;
                    booking.Fellows = dto.Fellows;
                    booking.Status = dto.Status;

                    // Clear existing or update them individually
                    booking.Devices.Clear();

                    if (dto.Devices != null && dto.Devices.Count > 0)
                    {
                        foreach (var deviceDto in dto.Devices)
                        {
                            var device = new Device
                            {
                                Id = deviceDto.Id,  
                                Name = deviceDto.Name,
                                Description = deviceDto.Description,
                                Quantity = deviceDto.Quantity,
                                Status = deviceDto.Status,
                                PlayerId = deviceDto.PlayerId
                            };
                            booking.Devices.Add(device);
                        }
                    }
                }

                // Save the updated booking through the repository.
                var updatedBooking = await _repository.UpdateRoomBooking(booking);

                // Map updated entity back to DTO
                var updatedDto = new RoomBookingDto(updatedBooking);
                return updatedDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating room booking.");
                throw;
            }
        }

        private void UpdateBookingStatus(RoomBooking booking)
        {
            if (booking.Status != BookingStatus.Cancelled)
            {
                var now = DateTime.Now;
                if (now >= booking.BookingDateTime && now < booking.BookingDateTime.AddHours(booking.Duration))
                {
                    booking.Status = BookingStatus.Ongoing;
                }
                else if (now >= booking.BookingDateTime.AddHours(booking.Duration))
                {
                    booking.Status = BookingStatus.Completed;
                }
                else
                {
                    booking.Status = BookingStatus.Upcoming;
                }
            }
        }

        public async Task<List<RoomBookingDto>> GetAllBookings()
        {
            try
            {
                // Assuming repository returns a list of RoomBooking entities.
                var bookings = await _repository.GetAllBookings();
                // Update the status for each booking based on current time.
                foreach (var booking in bookings)
                {
                    UpdateBookingStatus(booking);
                }
                return bookings.Select(b => new RoomBookingDto(b)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all bookings.");
                throw;
            }
        }
        public async Task<List<RoomBookingDto>> GetHistoryBookings()
        {
            try
            {
                // Get all bookings and update statuses.
                var bookings = await _repository.GetAllBookings();
                foreach (var booking in bookings)
                {
                    UpdateBookingStatus(booking);
                }
                // Filter bookings marked as Completed.
                var historyBookings = bookings.Where(b => b.Status == BookingStatus.Completed).ToList();
                return historyBookings.Select(b => new RoomBookingDto(b)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving history bookings.");
                throw;
            }
        }

        public async Task<List<RoomBookingDto>> GetOngoingBookings()
        {
            try
            {
                var bookings = await _repository.GetAllBookings();
                foreach (var booking in bookings)
                {
                    UpdateBookingStatus(booking);
                }
                // Filter bookings marked as Ongoing.
                var ongoingBookings = bookings.Where(b => b.Status == BookingStatus.Ongoing).ToList();
                return ongoingBookings.Select(b => new RoomBookingDto(b)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ongoing bookings.");
                throw;
            }
        }

        public async Task<List<RoomBookingDto>> GetUpcomingBookings()
        {
            try
            {
                var bookings = await _repository.GetAllBookings();
                foreach (var booking in bookings)
                {
                    UpdateBookingStatus(booking);
                }
                // Filter bookings marked as Upcoming.
                var upcomingBookings = bookings.Where(b => b.Status == BookingStatus.Upcoming).ToList();
                return upcomingBookings.Select(b => new RoomBookingDto(b)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving upcoming bookings.");
                throw;
            }
        }

        public async Task<RoomBookingDto> GetRoomBookingById(int id)
        {
            try
            {
                var booking = await _repository.GetRoomBookingById(id);
                if (booking == null)
                    throw new KeyNotFoundException("Booking not found.");

                // Update the status based on current time.
                UpdateBookingStatus(booking);
                // Persist any status changes.
                var updatedBooking = await _repository.UpdateRoomBooking(booking);

                return new RoomBookingDto(updatedBooking);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving booking by ID {id}.");
                throw;
            }
        }

        public async Task<RoomBookingDto> GetRoomBookingByPlayerId(int playerId)
        {
            try
            {
                // Retrieve the booking by player ID.
                var booking = await _repository.GetRoomBookingByPlayerId(playerId);
                if (booking == null)
                    throw new KeyNotFoundException("Booking for the specified player not found.");

                // Update the booking status in memory.
                UpdateBookingStatus(booking);

                // Persist any changes made by UpdateBookingStatus.
                var updatedBooking = await _repository.UpdateRoomBooking(booking);

                // Map the updated entity to a DTO and return it.
                return new RoomBookingDto(updatedBooking);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving booking for player with ID {playerId}.");
                throw;
            }
        }  
    }
}
