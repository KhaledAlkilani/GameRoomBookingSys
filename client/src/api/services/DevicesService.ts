/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceDto } from '../models/DeviceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DevicesService {
    /**
     * @param requestBody
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static addDevice(
        requestBody?: DeviceDto,
    ): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/devices/adddevice',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static updateDevice(
        id: number,
        requestBody?: DeviceDto,
    ): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/devices/device/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static deleteDevice(
        id: number,
    ): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/devices/device/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static getDeviceById(
        id: number,
    ): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/device/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static getAllDevices(): CancelablePromise<Array<DeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices',
        });
    }
    /**
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static getAvailableDevices(): CancelablePromise<Array<DeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/availabledevices',
        });
    }
    /**
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static getUnavailableDevices(): CancelablePromise<Array<DeviceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/unavailabledevices',
        });
    }
}
