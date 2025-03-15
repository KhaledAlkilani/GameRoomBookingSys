/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomBookingDto } from '../models/RoomBookingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoomBookingService {
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static bookRoom(): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gameroombooking/bookroom',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getUpcomingBookings(): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombooking/upcomingbookings',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getOngoingBookings(): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombooking/ongoingbookings',
        });
    }
    /**
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getHistoryBookings(): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombooking/historybookings',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiGameroombooking(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gameroombooking/{id}',
            path: {
                'id': id,
            },
        });
    }
}
