import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedRefreshTokenEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                accessTokenId: string;
                token: string;
                isRevoked: boolean;
                expiresAt: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
