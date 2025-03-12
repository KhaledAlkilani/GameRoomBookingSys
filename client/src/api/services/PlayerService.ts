/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerDto } from '../models/PlayerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayerService {
    /**
     * @returns PlayerDto OK
     * @throws ApiError
     */
    public static getPlayerInfo(): CancelablePromise<PlayerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/player/profile',
        });
    }
}
