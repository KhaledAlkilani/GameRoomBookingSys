﻿using gameroombookingsys.DTOs;

namespace gameroombookingsys.Interfaces
{
    public interface IDeviceService
    {
        Task<DeviceDto> AddDevice(DeviceDto deviceDto);
        Task<DeviceDto> UpdateDevice(DeviceDto deviceDto);
        Task<DeviceDto> DeleteDevice(int deviceId);
        Task<DeviceDto> GetDeviceById(int deviceId);
        Task<List<DeviceDto>> GetAllDevices();
        Task<List<DeviceDto>> GetAvailableDevices();
        Task<List<DeviceDto>> GetUnavailableDevices();
        Task<List<DeviceDto>> GetDevicesByType(string deviceType);
        Task<List<DeviceDto>> GetDevicesByStatus(string deviceStatus);

    }
}
