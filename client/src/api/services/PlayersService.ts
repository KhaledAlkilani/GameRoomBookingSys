/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Player } from '../models/Player';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayersService {
    /**
     * @returns Player Success
     * @throws ApiError
     */
    public static getApiPlayers(): CancelablePromise<Array<Player>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players',
        });
    }
}
