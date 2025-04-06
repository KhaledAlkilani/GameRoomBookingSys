/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingStatus } from './BookingStatus';
import type { DeviceDto } from './DeviceDto';
export type RoomBookingDto = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    bookingDateTime?: string;
    duration?: number;
    devices?: Array<DeviceDto> | null;
    isPlayingAlone?: boolean;
    fellows?: number;
    status?: BookingStatus;
    playerId?: number;
};

