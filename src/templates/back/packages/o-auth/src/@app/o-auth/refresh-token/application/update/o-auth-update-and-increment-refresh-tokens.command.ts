import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateAndIncrementRefreshTokensCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accessTokenId?: string;
            token?: string;
            isRevoked?: boolean;
            expiresAt?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
