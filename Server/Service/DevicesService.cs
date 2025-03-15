using gameroombookingsys.DTOs;
using gameroombookingsys.Interfaces;

namespace gameroombookingsys.Service
{
    public class DevicesService : IDevicesService
    {
        public Task<DeviceDto> AddDevice(DeviceDto deviceDto)
        {
            throw new NotImplementedException();
        }

        public Task<DeviceDto> DeleteDevice(int deviceId)
        {
            throw new NotImplementedException();
        }

        public Task<List<DeviceDto>> GetAllDevices()
        {
            throw new NotImplementedException();
        }

        public Task<List<DeviceDto>> GetAvailableDevices()
        {
            throw new NotImplementedException();
        }

        public Task<DeviceDto> GetDeviceById(int deviceId)
        {
            throw new NotImplementedException();
        }

        public Task<List<DeviceDto>> GetDevicesByStatus(string deviceStatus)
        {
            throw new NotImplementedException();
        }

        public Task<List<DeviceDto>> GetDevicesByType(string deviceType)
        {
            throw new NotImplementedException();
        }

        public Task<List<DeviceDto>> GetUnavailableDevices()
        {
            throw new NotImplementedException();
        }

        public Task<DeviceDto> UpdateDevice(DeviceDto deviceDto)
        {
            throw new NotImplementedException();
        }
    }
}
