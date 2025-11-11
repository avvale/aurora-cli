import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedApplicationEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                code: string;
                name: string;
                secret: string;
                isMaster: boolean;
                clientIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
