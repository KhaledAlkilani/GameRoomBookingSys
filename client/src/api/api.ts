import * as DevicesServiceExports from "./services/DevicesService";
import * as PlayersServiceExports from "./services/PlayersService";
import * as RegistrationServiceExports from "./services/RegistrationService";
import * as RoomBookingsServiceExports from "./services/RoomBookingsService";
import * as TokenServiceExports from "./services/TokenService";


export const api = {
  ...DevicesServiceExports,
  ...PlayersServiceExports,
  ...RegistrationServiceExports,
  ...RoomBookingsServiceExports,
  ...TokenServiceExports
};


export * from "./models/BookingStatus";
export * from "./models/CalendarEventDto";
export * from "./models/DeviceDto";
export * from "./models/DeviceStatus";
export * from "./models/PlayerDto";
export * from "./models/RegistrationRequest";
export * from "./models/RegistrationResponse";
export * from "./models/RoomBookingDto";
