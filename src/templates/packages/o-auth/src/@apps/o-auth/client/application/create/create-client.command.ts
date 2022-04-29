import { CQMetadata } from 'aurora-ts-core';

export class CreateClientCommand
{
    constructor(
        public readonly payload: {
            id: string;
            grantType: string;
            name: string;
            secret: string;
            authUrl?: string;
            redirect?: string;
            expiredAccessToken?: number;
            expiredRefreshToken?: number;
            isActive: boolean;
            isMaster: boolean;
            applicationIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}