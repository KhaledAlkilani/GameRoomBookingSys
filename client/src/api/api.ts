import * as DevicesServiceExports from "./services/DevicesService";
import * as PlayersServiceExports from "./services/PlayersService";
import * as RoomBookingsServiceExports from "./services/RoomBookingsService";
import * as TokenServiceExports from "./services/TokenService";


export const api = {
  ...DevicesServiceExports,
  ...PlayersServiceExports,
  ...RoomBookingsServiceExports,
  ...TokenServiceExports
};


export * from "./models/BookingStatus";
export * from "./models/DeviceDto";
export * from "./models/DeviceStatus";
export * from "./models/PlayerDto";
export * from "./models/RoomBookingDto";
