/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingStatus } from './BookingStatus';
import type { Device } from './Device';
export type RoomBookingDto = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    bookingDateTime?: string;
    duration?: string;
    devices?: Array<Device> | null;
    isPlayingAlone?: boolean;
    fellows?: Array<number> | null;
    status?: BookingStatus;
};

