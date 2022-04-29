import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateRefreshTokenCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accessTokenId?: string;
            token?: string;
            isRevoked?: boolean;
            expiresAt?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}