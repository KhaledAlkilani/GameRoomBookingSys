import * as DeviceServiceExports from "./services/DeviceService";
import * as PlayerServiceExports from "./services/PlayerService";
import * as RoomBookingServiceExports from "./services/RoomBookingService";


export const api = {
  ...DeviceServiceExports,
  ...PlayerServiceExports,
  ...RoomBookingServiceExports
};


export * from "./models/BookingStatus";
export * from "./models/Device";
export * from "./models/DeviceDto";
export * from "./models/DeviceStatus";
export * from "./models/PlayerDto";
export * from "./models/RoomBookingDto";
