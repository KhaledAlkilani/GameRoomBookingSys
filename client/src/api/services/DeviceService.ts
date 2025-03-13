/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceDto } from '../models/DeviceDto';
import type { RoomBookingDto } from '../models/RoomBookingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceService {
    /**
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static getAllDevices(): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/device/devices',
        });
    }
    /**
     * @param id
     * @returns RoomBookingDto OK
     * @throws ApiError
     */
    public static getDevicebyId(
        id: number,
    ): CancelablePromise<RoomBookingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/device/{id}',
            path: {
                'id': id,
            },
        });
    }
}
