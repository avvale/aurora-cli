import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreateRefreshTokenCommand {
    constructor(
        public readonly payload: {
            id: string;
            accessTokenId: string;
            expiredRefreshToken: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
