using Gameroombookingsys.Models;

namespace gameroombookingsys.IRepository
{
    public interface IDevicesRepository
    {
        Task<Device> AddDevice(Device device);
        Task<Device> UpdateDevice(Device device);
        Task<Device> DeleteDevice(int deviceId);
        Task<Device> GetDeviceById(int deviceId);
        Task<List<Device>> GetAllDevices();
        Task<List<Device>> GetAvailableDevices();
        Task<List<Device>> GetUnavailableDevices();

        Task<Device> GetDeviceByName(string name);
    }
}
