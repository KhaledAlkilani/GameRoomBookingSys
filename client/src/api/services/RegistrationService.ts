/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegistrationRequest } from '../models/RegistrationRequest';
import type { RegistrationResponse } from '../models/RegistrationResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegistrationService {
    /**
     * @param requestBody
     * @returns RegistrationResponse OK
     * @throws ApiError
     */
    public static sendRegistrationLink(
        requestBody?: RegistrationRequest,
    ): CancelablePromise<RegistrationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/registration/send-registration-link',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
