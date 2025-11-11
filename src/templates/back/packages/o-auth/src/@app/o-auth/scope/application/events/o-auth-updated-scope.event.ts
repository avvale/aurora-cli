import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpdatedScopeEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                code: string;
                name: string;
                roleIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
