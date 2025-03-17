/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerDto } from '../models/PlayerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayersService {
    /**
     * @returns PlayerDto OK
     * @throws ApiError
     */
    public static getPlayerInfo(): CancelablePromise<PlayerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/players/profile',
        });
    }
    /**
     * @param username
     * @returns PlayerDto OK
     * @throws ApiError
     */
    public static getPlayerByUsername(
        username: string,
    ): CancelablePromise<PlayerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/players/byusername/{username}',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @returns PlayerDto OK
     * @throws ApiError
     */
    public static getAllPlayers(): CancelablePromise<Array<PlayerDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/players/all',
        });
    }
}
