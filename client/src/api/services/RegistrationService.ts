/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceDto } from '../models/DeviceDto';
import type { RegistrationRequest } from '../models/RegistrationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegistrationService {
    /**
     * @param requestBody
     * @returns DeviceDto OK
     * @throws ApiError
     */
    public static sendRegistrationLink(
        requestBody?: RegistrationRequest,
    ): CancelablePromise<DeviceDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/registration/send-registration-link',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
