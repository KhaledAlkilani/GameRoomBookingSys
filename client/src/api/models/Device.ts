/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceStatus } from './DeviceStatus';
export type Device = {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string | null;
    description?: string | null;
    quantity?: number;
    status?: DeviceStatus;
    playerId?: number;
};

