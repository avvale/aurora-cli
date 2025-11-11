import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreateAccessTokenCommand {
    constructor(
        public readonly payload: {
            id: string;
            clientId: string;
            scopes?: string[];
            accountId?: string;
            name?: string;
            expiredAccessToken: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
