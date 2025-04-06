using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;
using gameroombookingsys.IRepository;
using Gameroombookingsys.Models;

namespace gameroombookingsys.Service
{
    public class DevicesService : IDevicesService
    {
        private readonly IDevicesRepository _repository;
        private readonly ILogger<DevicesService> _logger;

        public DevicesService(IDevicesRepository repository, ILogger<DevicesService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<DeviceDto> AddDevice(DeviceDto deviceDto)
        {
            try
            {
                var existingDevice = await _repository.GetDeviceByName(deviceDto.Name);
                if (existingDevice != null)
                    throw new InvalidOperationException("Device already exists."); 

                var deviceEntity = new Device
                {
                    Name = deviceDto.Name,
                    Description = deviceDto.Description,
                    Quantity = deviceDto.Quantity,
                    Status = deviceDto.Status,
                    PlayerId = deviceDto.PlayerId
                }; 

                var addedDevice = await _repository.AddDevice(deviceEntity);

                return new DeviceDto(addedDevice); // Map to DTO

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding device in service.");
                throw;
            }
        }

        public async Task<DeviceDto> UpdateDevice(DeviceDto deviceDto)
        {
            try
            {
                var existingDevice = await _repository.GetDeviceById(deviceDto.Id);
                if (existingDevice == null)
                    throw new KeyNotFoundException("Device not found.");

                existingDevice.Name = deviceDto.Name;
                existingDevice.Description = deviceDto.Description;
                existingDevice.Quantity = deviceDto.Quantity;
                existingDevice.Status = deviceDto.Status;
                existingDevice.PlayerId = deviceDto.PlayerId;

                var updatedDevice = await _repository.UpdateDevice(existingDevice);

                return new DeviceDto(updatedDevice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating device in service.");
                throw;
            }
        }

        public async Task<DeviceDto> DeleteDevice(int deviceId)
        {
            try
            {
                var deletedDevice = await _repository.DeleteDevice(deviceId);
                return new DeviceDto(deletedDevice);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting device in service.");
                throw;
            }
        }

        public async Task<DeviceDto> GetDeviceById(int deviceId)
        {
            try
            {
                var device = await _repository.GetDeviceById(deviceId);
                return new DeviceDto(device);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving device with ID {deviceId} in service.");
                throw;
            }
        }

        public async Task<List<DeviceDto>> GetAllDevices()
        {
            try
            {
                var devices = await _repository.GetAllDevices();
                return devices.Select(d => new DeviceDto(d)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all devices in service.");
                throw;
            }
        }

        public async Task<List<DeviceDto>> GetAvailableDevices()
        {
            try
            {
                var devices = await _repository.GetAvailableDevices();
                return devices.Select(d => new DeviceDto(d)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving available devices in service.");
                throw;
            }
        }

        public async Task<List<DeviceDto>> GetUnavailableDevices()
        {
            try
            {
                var devices = await _repository.GetUnavailableDevices();
                return devices.Select(d => new DeviceDto(d)).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving unavailable devices in service.");
                throw;
            }
        }
    }
}
