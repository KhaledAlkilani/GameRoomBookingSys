/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarEventDto } from '../models/CalendarEventDto';
import type { RoomBookingDto } from '../models/RoomBookingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoomBookingsService {
    /**
     * @param requestBody
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static bookGameRoom(
        requestBody?: RoomBookingDto,
    ): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gameroombookings/bookgameroom',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static updateRoomBooking(
        id: number,
        requestBody?: RoomBookingDto,
    ): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gameroombookings/booking/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getUpcomingBookings(): CancelablePromise<Array<RoomBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/upcomingbookings',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getOngoingBookings(): CancelablePromise<Array<RoomBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/ongoingbookings',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getHistoryBookings(): CancelablePromise<Array<RoomBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/historybookings',
        });
    }
    /**
     * @param id
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getRoomBookingById(
        id: number,
    ): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static deleteBooking(
        id: number,
    ): CancelablePromise<Array<RoomBookingDto>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gameroombookings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param playerId
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getRoomBookingsByPlayerId(
        playerId: number,
    ): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/player/{playerId}',
            path: {
                'playerId': playerId,
            },
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getAllBookings(): CancelablePromise<Array<RoomBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/allbookings',
        });
    }
    /**
     * @param date
     * @returns CalendarEventDto OK
     * @throws ApiError
     */
    public static getFreeTimeEventsForDay(
        date?: string,
    ): CancelablePromise<Array<CalendarEventDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombookings/free-time-events',
            query: {
                'date': date,
            },
        });
    }
}
