import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateAndIncrementAccessTokensCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            clientId?: string;
            accountId?: string;
            token?: string;
            name?: string;
            isRevoked?: boolean;
            expiresAt?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
