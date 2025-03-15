using gameroombookingsys.IRepository;
using Gameroombookingsys.Models;
using Microsoft.EntityFrameworkCore;

namespace gameroombookingsys.Repository
{
    public class DevicesRepository : IDevicesRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DevicesRepository> _logger;

        public DevicesRepository(AppDbContext context, ILogger<DevicesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Device> AddDevice(Device device)
        {
            try
            {
                _context.Devices.Add(device);
                await _context.SaveChangesAsync();
                return device;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding device in repository.");
                throw;
            }
        }

        public async Task<Device> UpdateDevice(Device device)
        {
            try
            {
                _context.Devices.Update(device);
                await _context.SaveChangesAsync();
                return device;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating device in repository.");
                throw;
            }
        }

        public async Task<Device> DeleteDevice(int deviceId)
        {
            try
            {
                var device = await _context.Devices.FindAsync(deviceId);
                if (device == null)
                    throw new KeyNotFoundException("Device not found.");

                _context.Devices.Remove(device);
                await _context.SaveChangesAsync();
                return device;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting device in repository.");
                throw;
            }
        }

        public async Task<Device> GetDeviceById(int deviceId)
        {
            try
            {
                var device = await _context.Devices.FindAsync(deviceId);
                if (device == null)
                    throw new KeyNotFoundException("Device not found.");
                return device;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving device with ID {deviceId}.");
                throw;
            }
        }

        public async Task<List<Device>> GetAllDevices()
        {
            try
            {
                return await _context.Devices.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all devices in repository.");
                throw;
            }
        }

        public async Task<List<Device>> GetAvailableDevices()
        {
            try
            {
                // Assumes available devices have Status == DeviceStatus.Available.
                return await _context.Devices
                    .Where(d => d.Status == gameroombookingsys.Enums.DeviceStatus.Available)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving available devices in repository.");
                throw;
            }
        }

        public async Task<List<Device>> GetUnavailableDevices()
        {
            try
            {
                // Assumes unavailable devices have Status != Available.
                return await _context.Devices
                    .Where(d => d.Status != gameroombookingsys.Enums.DeviceStatus.Available)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving unavailable devices in repository.");
                throw;
            }
        }
    }
}
