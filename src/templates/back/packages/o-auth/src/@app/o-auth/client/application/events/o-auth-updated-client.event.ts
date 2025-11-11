import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpdatedClientEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                grantType: string;
                name: string;
                secret: string;
                authUrl: string;
                redirect: string;
                scopeOptions: any;
                expiredAccessToken: number;
                expiredRefreshToken: number;
                isActive: boolean;
                isMaster: boolean;
                applicationIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
