/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
    /**
     * @param email
     * @returns any OK
     * @throws ApiError
     */
    public static getApiTokenGenerate(
        email?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/token/generate',
            query: {
                'email': email,
            },
        });
    }
}
